import cors from "cors";
import express from "express";
import http from "node:http";
import type { Request, Response } from "express";
import { Server } from "socket.io";
import type { Socket } from "socket.io";
import { z } from "zod";
import { AGENTS } from "./agents.js";
import { runConflictRound } from "./engine.js";
import { MatchEvent } from "./types.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "clash-server" });
});

app.get("/agents", (_req: Request, res: Response) => {
  res.json({ agents: AGENTS });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const scenarioSchema = z.object({
  scenario: z.string().min(3),
  sessionId: z.string().optional()
});

const emitMatchEvent = (sessionId: string, payload: MatchEvent) => {
  io.to(sessionId).emit("match:event", payload);
};

io.on("connection", (socket: Socket) => {
  socket.on("match:join", (sessionId: string) => {
    socket.join(sessionId);
    socket.emit("match:joined", { sessionId });
  });

  socket.on("scenario:start", async (rawInput: unknown) => {
    const parsed = scenarioSchema.safeParse(rawInput);
    if (!parsed.success) {
      socket.emit("match:error", {
        message: "Invalid scenario input"
      });
      return;
    }

    const sessionId = parsed.data.sessionId ?? `match_${Math.random().toString(36).slice(2, 9)}`;
    const scenario = parsed.data.scenario.trim();

    socket.join(sessionId);

    emitMatchEvent(sessionId, {
      type: "match_started",
      sessionId,
      scenario,
      timestamp: Date.now()
    });

    const { turns, rebuttals, outcome } = runConflictRound(scenario);

    const thinkingOrder = [...AGENTS].sort((a, b) => b.speed - a.speed);

    thinkingOrder.forEach((agent, index) => {
      setTimeout(() => {
        emitMatchEvent(sessionId, {
          type: "agent_thinking",
          sessionId,
          agentId: agent.id,
          timestamp: Date.now()
        });
      }, index * 250 + Math.floor(Math.random() * 140));
    });

    turns.forEach((turn, index) => {
      setTimeout(() => {
        emitMatchEvent(sessionId, {
          type: "agent_decision",
          sessionId,
          turn,
          timestamp: Date.now()
        });
      }, 700 + index * 520 + Math.floor(Math.random() * 260));
    });

    rebuttals.forEach((rebuttal, index) => {
      setTimeout(() => {
        emitMatchEvent(sessionId, {
          type: "agent_rebuttal",
          sessionId,
          agentId: rebuttal.agentId,
          targetAgentId: rebuttal.targetAgentId,
          text: rebuttal.text,
          timestamp: Date.now()
        });
      }, 2400 + index * 360 + Math.floor(Math.random() * 260));
    });

    setTimeout(() => {
      emitMatchEvent(sessionId, {
        type: "outcome",
        sessionId,
        ...outcome,
        timestamp: Date.now()
      });
    }, 4600);
  });
});

const PORT = Number(process.env.PORT ?? 8787);
server.listen(PORT, () => {
  console.log(`CLASH server live on http://localhost:${PORT}`);
});
