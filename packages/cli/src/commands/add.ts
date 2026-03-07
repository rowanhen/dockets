import { Command } from "commander";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";
import { registry } from "../registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = resolve(__dirname, "..", "..", "templates");

export const addCommand = new Command("add")
  .description("Add a component to your project")
  .argument("<component>", "component name to add")
  .option("-p, --path <path>", "destination directory", "components/ui")
  .action((component: string, options) => {
    const entry = registry[component];
    if (!entry) {
      console.error(pc.red(`✗ Unknown component: ${pc.bold(component)}`));
      console.log(`  Run ${pc.cyan("leit list")} to see available components.\n`);
      process.exit(1);
    }

    const outputDir = resolve(process.cwd(), options.path);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    for (const file of entry.files) {
      const src = join(templatesDir, file);
      const dest = join(outputDir, file);

      if (!existsSync(src)) {
        console.error(pc.red(`✗ Template not found: ${file}`));
        process.exit(1);
      }

      writeFileSync(dest, readFileSync(src, "utf-8"));
      console.log(`${pc.green("✓")} ${pc.cyan(join(options.path, file))}`);
    }

    if (entry.deps.length > 0) {
      console.log(`\n${pc.dim("Install dependencies:")}`);
      console.log(`  ${pc.dim("npm install")} ${entry.deps.join(" ")}`);
    }

    console.log();
  });
