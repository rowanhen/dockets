import { Command } from "commander";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";
import { type ComponentEntry, registry } from "../registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = resolve(__dirname, "..", "..", "templates");

/** Collect a component and all its transitive internalDeps */
function collectDeps(
  name: string,
  visited = new Set<string>()
): ComponentEntry[] {
  if (visited.has(name)) return [];
  visited.add(name);

  const entry = registry[name];
  if (!entry) return [];

  const result: ComponentEntry[] = [];

  // Resolve internal deps first (depth-first)
  for (const dep of entry.internalDeps ?? []) {
    result.push(...collectDeps(dep, visited));
  }

  result.push(entry);
  return result;
}

export const addCommand = new Command("add")
  .description("Add component(s) to your project")
  .argument("<components...>", "component name(s) to add")
  .option(
    "-d, --dest <path>",
    "project root (files install relative to this)",
    "."
  )
  .option("-y, --yes", "overwrite existing files without prompting", false)
  .option("-a, --alias <prefix>", "import alias prefix (default: @/)", "@/")
  .action((components: string[], options) => {
    const projectRoot = resolve(process.cwd(), options.dest);

    // "all" installs every component in the registry
    if (components.length === 1 && components[0] === "all") {
      components = Object.keys(registry);
    }

    // Resolve all requested components + their deps
    const visited = new Set<string>();
    const toInstall: ComponentEntry[] = [];

    for (const name of components) {
      if (!registry[name]) {
        console.error(pc.red(`✗ Unknown component: ${pc.bold(name)}`));
        console.log(
          `  Run ${pc.cyan("leit list")} to see available components.\n`
        );
        process.exit(1);
      }
      toInstall.push(...collectDeps(name, visited));
    }

    const allDeps = new Set<string>();
    let filesWritten = 0;
    let filesSkipped = 0;

    for (const entry of toInstall) {
      for (const file of entry.files) {
        const src = join(templatesDir, file.src);
        const dest = join(projectRoot, file.dest);

        if (!existsSync(src)) {
          console.error(pc.red(`✗ Template not found: ${file.src}`));
          process.exit(1);
        }

        // Skip if file exists and --yes not set
        if (existsSync(dest) && !options.yes) {
          console.log(
            `${pc.yellow("○")} ${pc.dim(file.dest)} ${pc.dim("(exists, use -y to overwrite)")}`
          );
          filesSkipped++;
          continue;
        }

        const destDir = dirname(dest);
        if (!existsSync(destDir)) {
          mkdirSync(destDir, { recursive: true });
        }

        let content = readFileSync(src, "utf-8");
        if (options.alias && options.alias !== "@/") {
          content = content.replaceAll("'@/", `'${options.alias}`);
          content = content.replaceAll('"@/', `"${options.alias}`);
        }
        writeFileSync(dest, content);
        console.log(`${pc.green("✓")} ${pc.cyan(file.dest)}`);
        filesWritten++;
      }

      for (const dep of entry.deps) {
        allDeps.add(dep);
      }
    }

    // Summary
    console.log();
    if (filesWritten > 0) {
      console.log(
        `${pc.green("✓")} ${filesWritten} file${filesWritten === 1 ? "" : "s"} written`
      );
    }
    if (filesSkipped > 0) {
      console.log(
        `${pc.yellow("○")} ${filesSkipped} file${filesSkipped === 1 ? "" : "s"} skipped`
      );
    }

    if (allDeps.size > 0) {
      console.log(`\n${pc.dim("Install dependencies:")}`);
      console.log(`  ${pc.dim("npm install")} ${[...allDeps].sort().join(" ")}`);
    }

    console.log();
  });
