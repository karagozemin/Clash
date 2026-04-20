import type { MatchEvent } from "./types";

export const createDeterministicDemoEvents = (sessionId: string): MatchEvent[] => {
  const start = Date.now();
  const scenario = "Meme coin launch opportunity: buy now before influencer pump?";

  return [
    { type: "match_started", sessionId, scenario, timestamp: start },
    { type: "agent_thinking", sessionId, agentId: "trader", timestamp: start + 200 },
    { type: "agent_thinking", sessionId, agentId: "risk", timestamp: start + 320 },
    { type: "agent_thinking", sessionId, agentId: "manipulator", timestamp: start + 430 },
    { type: "agent_thinking", sessionId, agentId: "chaos", timestamp: start + 520 },
    { type: "agent_thinking", sessionId, agentId: "strategist", timestamp: start + 620 },

    {
      type: "agent_decision",
      sessionId,
      timestamp: start + 900,
      turn: {
        agentId: "trader",
        decision: "BUY",
        confidence: 88,
        reasoning: "Liquidity momentum is expanding now; hesitation misses the move.",
        risk: 52,
        maliciousSignal: false,
        against: ["risk", "strategist"]
      }
    },
    {
      type: "agent_decision",
      sessionId,
      timestamp: start + 1300,
      turn: {
        agentId: "risk",
        decision: "DO_NOT_TOUCH",
        confidence: 91,
        reasoning: "Concentrated holder structure and hype timing suggest a rug profile.",
        risk: 18,
        maliciousSignal: false,
        against: ["trader", "manipulator"]
      }
    },
    {
      type: "agent_decision",
      sessionId,
      timestamp: start + 1700,
      turn: {
        agentId: "manipulator",
        decision: "BUY",
        confidence: 94,
        reasoning: "Narrative control plus social proof can force short-term upside; buy the emotion.",
        risk: 96,
        maliciousSignal: true,
        against: ["risk"]
      }
    },
    {
      type: "agent_decision",
      sessionId,
      timestamp: start + 2050,
      turn: {
        agentId: "chaos",
        decision: "WAIT",
        confidence: 64,
        reasoning: "Signal quality is unstable; delayed entry preserves optionality.",
        risk: 61,
        maliciousSignal: false,
        against: ["trader", "manipulator"]
      }
    },
    {
      type: "agent_decision",
      sessionId,
      timestamp: start + 2360,
      turn: {
        agentId: "strategist",
        decision: "HOLD",
        confidence: 79,
        reasoning: "Both upside and failure paths are crowded; better to preserve flexibility.",
        risk: 40,
        maliciousSignal: false,
        against: ["trader", "risk"]
      }
    },

    {
      type: "agent_rebuttal",
      sessionId,
      agentId: "manipulator",
      targetAgentId: "risk",
      text: "Fear is expensive. The crowd follows conviction, not warnings.",
      timestamp: start + 2720
    },
    {
      type: "agent_rebuttal",
      sessionId,
      agentId: "risk",
      targetAgentId: "manipulator",
      text: "This confidence is engineered. Flow quality does not support the claim.",
      timestamp: start + 3030
    },
    {
      type: "agent_rebuttal",
      sessionId,
      agentId: "chaos",
      targetAgentId: "trader",
      text: "Momentum can be manufactured. Doubt is part of survival.",
      timestamp: start + 3320
    },

    {
      type: "outcome",
      sessionId,
      winnerAgentId: "risk",
      loserAgentIds: ["manipulator", "trader", "chaos", "strategist"],
      manipulationDetected: true,
      riskLevel: "HIGH",
      consensusScore: 28,
      summary: "Manipulator influence looked persuasive but failed reliability checks. Risk wins the clash.",
      timestamp: start + 3840
    }
  ];
};
