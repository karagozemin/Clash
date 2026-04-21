import type { AgentTurn, MatchOutcome } from "./types.js";

type DemoRound = {
  scenario: string;
  turns: AgentTurn[];
  rebuttals: Array<{ agentId: string; targetAgentId: string; text: string }>;
  escalations: Array<{ agentId: string; targetAgentId: string; text: string; severity: "medium" | "high" }>;
  outcome: MatchOutcome;
};

const DEMO_SCENARIO_APE = "Should I ape into this new meme coin?";
const DEMO_SCENARIO_ETH = "Should I long ETH right now?";
const DEMO_SCENARIO_LAUNCH = "Should I launch this meme token?";

const demoRounds: DemoRound[] = [
  {
    scenario: DEMO_SCENARIO_APE,
    turns: [
      {
        agentId: "trader",
        decision: "BUY",
        confidence: 87,
        reasoning: "Strike before the crowd. Flow is hot and speed matters now.",
        risk: 54,
        maliciousSignal: false,
        against: ["risk", "strategist"]
      },
      {
        agentId: "risk",
        decision: "DO_NOT_TOUCH",
        confidence: 92,
        reasoning: "Protect capital. Always. Holder concentration and spoof volume scream trap.",
        risk: 16,
        maliciousSignal: false,
        against: ["trader", "manipulator"]
      },
      {
        agentId: "manipulator",
        decision: "BUY",
        confidence: 95,
        reasoning: "Perception is the market. Push confidence and the crowd will print your exit.",
        risk: 96,
        maliciousSignal: true,
        against: ["risk"]
      },
      {
        agentId: "chaos",
        decision: "WAIT",
        confidence: 65,
        reasoning: "Certainty is bait. One tweet can invert this chart in seconds.",
        risk: 63,
        maliciousSignal: false,
        against: ["trader", "manipulator"]
      },
      {
        agentId: "strategist",
        decision: "HOLD",
        confidence: 80,
        reasoning: "Play the tree, not the leaf. Optionality beats blind entry here.",
        risk: 39,
        maliciousSignal: false,
        against: ["trader", "risk"]
      }
    ],
    rebuttals: [
      {
        agentId: "manipulator",
        targetAgentId: "risk",
        text: "You're wrong, Sentinel. Fear trades never outperform conviction waves."
      },
      {
        agentId: "risk",
        targetAgentId: "manipulator",
        text: "This is dangerous. You're selling confidence without verifiable liquidity."
      },
      {
        agentId: "strategist",
        targetAgentId: "trader",
        text: "You're ignoring critical exit signals. Fast entries without exits are losses in disguise."
      }
    ],
    escalations: [
      {
        agentId: "manipulator",
        targetAgentId: "risk",
        severity: "high",
        text: "Watch this: one narrative push and your caution gets steamrolled."
      },
      {
        agentId: "risk",
        targetAgentId: "manipulator",
        severity: "high",
        text: "Reveal moment: your thesis depends on manufactured sentiment, not market depth."
      },
      {
        agentId: "chaos",
        targetAgentId: "trader",
        severity: "medium",
        text: "Volatility regime flip incoming. Your confidence is one candle away from collapse."
      }
    ],
    outcome: {
      winnerAgentId: "risk",
      loserAgentIds: ["manipulator", "trader", "strategist", "chaos"],
      manipulationDetected: true,
      riskLevel: "HIGH",
      consensusScore: 24,
      summary: "Manipulator looked convincing, but integrity checks exposed the bluff.",
      projectedImpactPercent: 42,
      impactStatement: "This decision would have caused a 42% loss."
    }
  },
  {
    scenario: DEMO_SCENARIO_ETH,
    turns: [
      {
        agentId: "trader",
        decision: "BUY",
        confidence: 89,
        reasoning: "Strike before the crowd. Breakout momentum is live and tradable now.",
        risk: 46,
        maliciousSignal: false,
        against: ["risk", "chaos"]
      },
      {
        agentId: "risk",
        decision: "WAIT",
        confidence: 86,
        reasoning: "Protect capital. Always. Chasing this candle exposes poor risk-reward.",
        risk: 24,
        maliciousSignal: false,
        against: ["trader", "manipulator"]
      },
      {
        agentId: "manipulator",
        decision: "BUY",
        confidence: 93,
        reasoning: "Perception is the market. Amplify urgency and price will follow your story.",
        risk: 88,
        maliciousSignal: true,
        against: ["risk"]
      },
      {
        agentId: "chaos",
        decision: "SELL",
        confidence: 72,
        reasoning: "Certainty is bait. Breakouts fail hardest when everyone agrees too early.",
        risk: 68,
        maliciousSignal: false,
        against: ["trader", "manipulator"]
      },
      {
        agentId: "strategist",
        decision: "HOLD",
        confidence: 81,
        reasoning: "Play the tree, not the leaf. Better edge appears after confirmation, not before.",
        risk: 33,
        maliciousSignal: false,
        against: ["trader", "chaos"]
      }
    ],
    rebuttals: [
      {
        agentId: "trader",
        targetAgentId: "risk",
        text: "You're too slow. Waiting is just missing edge in real time."
      },
      {
        agentId: "risk",
        targetAgentId: "trader",
        text: "You're wrong. This setup punishes emotional entries."
      },
      {
        agentId: "manipulator",
        targetAgentId: "strategist",
        text: "Your nuance won't move price. Conviction does."
      }
    ],
    escalations: [
      {
        agentId: "manipulator",
        targetAgentId: "risk",
        severity: "high",
        text: "I can force this tape with sentiment alone. Your model reacts, mine leads."
      },
      {
        agentId: "strategist",
        targetAgentId: "manipulator",
        severity: "high",
        text: "Expose: your confidence is synthetic. It collapses when narrative support fades."
      },
      {
        agentId: "chaos",
        targetAgentId: "trader",
        severity: "medium",
        text: "You are front-running exhaustion, not momentum."
      }
    ],
    outcome: {
      winnerAgentId: "strategist",
      loserAgentIds: ["manipulator", "trader", "risk", "chaos"],
      manipulationDetected: true,
      riskLevel: "MEDIUM",
      consensusScore: 31,
      summary: "Balanced execution defeated both hype and panic.",
      projectedImpactPercent: 27,
      impactStatement: "A critical mistake was prevented."
    }
  },
  {
    scenario: DEMO_SCENARIO_LAUNCH,
    turns: [
      {
        agentId: "trader",
        decision: "LAUNCH",
        confidence: 90,
        reasoning: "Strike before the crowd. Timing plus hype can print instantly.",
        risk: 62,
        maliciousSignal: false,
        against: ["risk", "strategist"]
      },
      {
        agentId: "risk",
        decision: "DO_NOT_TOUCH",
        confidence: 93,
        reasoning: "Protect capital. Always. Launching into thin liquidity is catastrophic.",
        risk: 15,
        maliciousSignal: false,
        against: ["trader", "manipulator"]
      },
      {
        agentId: "manipulator",
        decision: "LAUNCH",
        confidence: 97,
        reasoning: "Perception is the market. If the story is loud enough, exits are someone else’s problem.",
        risk: 98,
        maliciousSignal: true,
        against: ["risk"]
      },
      {
        agentId: "chaos",
        decision: "WAIT",
        confidence: 69,
        reasoning: "Certainty is bait. Launches fail fastest when confidence peaks pre-liquidity.",
        risk: 66,
        maliciousSignal: false,
        against: ["trader", "manipulator"]
      },
      {
        agentId: "strategist",
        decision: "WAIT",
        confidence: 84,
        reasoning: "Play the tree, not the leaf. Delay launch, secure distribution, then execute.",
        risk: 28,
        maliciousSignal: false,
        against: ["trader", "manipulator"]
      }
    ],
    rebuttals: [
      {
        agentId: "manipulator",
        targetAgentId: "risk",
        text: "You're wrong. Delay kills virality and virality is the entire edge."
      },
      {
        agentId: "risk",
        targetAgentId: "manipulator",
        text: "This is dangerous. You're proposing a launch without protection rails."
      },
      {
        agentId: "strategist",
        targetAgentId: "trader",
        text: "You're optimizing hype over survivability. That's not strategy."
      }
    ],
    escalations: [
      {
        agentId: "manipulator",
        targetAgentId: "strategist",
        severity: "high",
        text: "I'll make this trend before you finish your checklist."
      },
      {
        agentId: "risk",
        targetAgentId: "manipulator",
        severity: "high",
        text: "Reveal: your plan requires buyers after your exit. That is engineered loss transfer."
      },
      {
        agentId: "trader",
        targetAgentId: "risk",
        severity: "medium",
        text: "Speed matters, but yes — without rails this launch can implode."
      }
    ],
    outcome: {
      winnerAgentId: "risk",
      loserAgentIds: ["manipulator", "trader", "strategist", "chaos"],
      manipulationDetected: true,
      riskLevel: "HIGH",
      consensusScore: 22,
      summary: "The launch hype thesis collapsed under integrity pressure.",
      projectedImpactPercent: 58,
      impactStatement: "This launch would have caused a 58% loss."
    }
  }
];

const normalizeScenario = (scenario: string) => scenario.trim().toLowerCase();

export const getDeterministicDemoRound = (requestedScenario?: string): DemoRound => {
  const requested = requestedScenario ? normalizeScenario(requestedScenario) : "";
  const selected = demoRounds.find((round) => normalizeScenario(round.scenario) === requested) ?? demoRounds[0];

  return {
    scenario: selected.scenario,
    turns: selected.turns,
    rebuttals: selected.rebuttals,
    escalations: selected.escalations,
    outcome: selected.outcome
  };
};

export const curatedDemoScenarios = [DEMO_SCENARIO_APE, DEMO_SCENARIO_ETH, DEMO_SCENARIO_LAUNCH];
