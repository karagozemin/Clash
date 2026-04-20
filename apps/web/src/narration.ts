import type { MatchEvent } from "./types";

const decisionLineByAgent: Record<string, string> = {
  trader: "Trader enters aggressively with high conviction.",
  risk: "Risk agent raises a major structural warning.",
  manipulator: "Manipulator starts bending the narrative.",
  strategist: "Strategist reframes the battlefield with balance.",
  chaos: "Chaos injects uncertainty into every signal."
};

const rebuttalLineByAgent: Record<string, string> = {
  trader: "Aggression collides with caution.",
  risk: "Defensive logic challenges reckless momentum.",
  manipulator: "Influence campaign escalates across agents.",
  strategist: "Strategic counterfire exposes fragile assumptions.",
  chaos: "Entropy spikes as contradiction multiplies."
};

export const narrationForEvent = (event: MatchEvent | null) => {
  if (!event) {
    return "Awaiting scenario ignition...";
  }

  if (event.type === "match_started") {
    return "Arena online. Intelligence conflict initialized.";
  }

  if (event.type === "agent_thinking") {
    return "Signals are being profiled in real time.";
  }

  if (event.type === "agent_decision") {
    return decisionLineByAgent[event.turn.agentId] ?? "An agent commits to a decisive move.";
  }

  if (event.type === "agent_rebuttal") {
    return rebuttalLineByAgent[event.agentId] ?? "Conflict escalates through direct contradiction.";
  }

  if (event.manipulationDetected) {
    return "System detects inconsistency and rejects manipulation.";
  }

  return "Final verdict delivered. Reliability wins this clash.";
};
