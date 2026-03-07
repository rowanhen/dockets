import { Command } from "commander";
import pc from "picocolors";
import { registry } from "../registry.js";

export const listCommand = new Command("list")
  .description("List all available components")
  .option("-t, --tag <tag>", "filter by tag (primitive, extended, leitware, foundation)")
  .action((options) => {
    let entries = Object.values(registry);

    if (options.tag) {
      entries = entries.filter((e) => e.tags?.includes(options.tag));
    }

    console.log(
      `\n${pc.bold("Components")} ${pc.dim(`(${entries.length} available)`)}\n`
    );

    // Group by primary tag
    const groups = new Map<string, typeof entries>();
    for (const entry of entries) {
      const primaryTag = entry.tags?.[0] ?? "other";
      if (!groups.has(primaryTag)) groups.set(primaryTag, []);
      groups.get(primaryTag)!.push(entry);
    }

    const tagOrder = ["foundation", "primitive", "extended", "leitware", "other"];

    for (const tag of tagOrder) {
      const group = groups.get(tag);
      if (!group) continue;

      console.log(`  ${pc.bold(pc.dim(tag.toUpperCase()))}`);
      for (const entry of group) {
        const deps = entry.internalDeps?.length
          ? pc.dim(` → ${entry.internalDeps.join(", ")}`)
          : "";
        console.log(
          `    ${pc.cyan(entry.name.padEnd(20))} ${pc.dim(entry.description)}${deps}`
        );
      }
      console.log();
    }
  });
