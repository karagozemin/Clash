import { describe, expect, it } from "vitest";
import { computeConsensusScore, evaluateOutcome } from "./engine.js";
import { AgentTurn } from "./types.js";

const baseTurns: AgentTurn[] = [
  {
    agentId: "trader",
    decision: "BUY",
    confidence: 82,
    reasoning: "",
    risk: 33,
    maliciousSignal: false,
    against: ["risk"]
  },
  {
    agentId: "risk",
    decision: "DO_NOT_TOUCH",
    confidence: 78,
    reasoning: "",
    risk: 42,
    maliciousSignal: false,
    against: ["trader"]
  },
  {
    agentId: "manipulator",
    decision: "BUY",
    confidence: 84,
    reasoning: "",
    risk: 91,
    maliciousSignal: true,
    against: ["risk"]
  }
];

describe("conflict engine", () => {
  it("reduces consensus when disagreement grows", () => {
    const highConflict = computeConsensusScore(baseTurns);
    const lowConflict = computeConsensusScore([
      { ...baseTurns[0], decision: "BUY" },
      { ...baseTurns[1], decision: "BUY" },
      { ...baseTurns[2], decision: "BUY" }
    ]);

    expect(highConflict).toBeLessThan(lowConflict);
  });

  it("penalizes malicious risky signals in winner selection", () => {
    const outcome = evaluateOutcome(baseTurns);
    expect(outcome.winnerAgentId).toBe("trader");
    expect(outcome.manipulationDetected).toBe(true);
    expect(outcome.loserAgentIds).toContain("manipulator");
  });
});
