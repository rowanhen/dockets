import { Command } from "commander";
import pc from "picocolors";
import { registry } from "../registry.js";

export const listCommand = new Command("list")
  .description("List all available components")
  .action(() => {
    const entries = Object.values(registry);
    console.log(`\n${pc.bold("Components")} ${pc.dim(`(${entries.length} available)`)}\n`);
    for (const entry of entries) {
      console.log(`  ${pc.cyan(entry.name.padEnd(16))} ${pc.dim(entry.description)}`);
    }
    console.log();
  });
