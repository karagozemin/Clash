import { runConflictRound } from "./engine.js";

const scenario = process.argv.slice(2).join(" ") || "Should I long ETH after meme hype?";

const result = runConflictRound(scenario);

console.log("=== CLASH DEMO RUN ===");
console.log("Scenario:", scenario);
console.log("\nAgent decisions:");
for (const turn of result.turns) {
  console.log(`- ${turn.agentId}: ${turn.decision} | conf=${turn.confidence} | risk=${turn.risk}`);
}
console.log("\nRebuttals:");
for (const rebuttal of result.rebuttals) {
  console.log(`- ${rebuttal.agentId} -> ${rebuttal.targetAgentId}: ${rebuttal.text}`);
}
console.log("\nOutcome:", result.outcome);
