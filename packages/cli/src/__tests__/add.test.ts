import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliEntry = resolve(__dirname, "..", "cli.ts");
const fixtureDir = resolve(__dirname, "..", "..", "__test_output__");

/** Run the CLI via bun and return stdout + stderr */
function runCli(args: string): { stdout: string; stderr: string; exitCode: number } {
  try {
    const stdout = execSync(`bun ${cliEntry} ${args}`, {
      cwd: fixtureDir,
      encoding: "utf-8",
      env: { ...process.env, NO_COLOR: "1" },
    });
    return { stdout, stderr: "", exitCode: 0 };
  } catch (err: any) {
    return {
      stdout: err.stdout ?? "",
      stderr: err.stderr ?? "",
      exitCode: err.status ?? 1,
    };
  }
}

describe("CLI add command", () => {
  beforeEach(() => {
    if (existsSync(fixtureDir)) rmSync(fixtureDir, { recursive: true });
    mkdirSync(fixtureDir, { recursive: true });
  });

  afterEach(() => {
    if (existsSync(fixtureDir)) rmSync(fixtureDir, { recursive: true });
  });

  // ─── Basic install ───────────────────────────────────────────────

  test("installs a single component and its files", () => {
    const { stdout, exitCode } = runCli("add button -y");
    expect(exitCode).toBe(0);
    expect(stdout).toContain("components/ui/button.tsx");
    expect(existsSync(join(fixtureDir, "components/ui/button.tsx"))).toBe(true);
    expect(existsSync(join(fixtureDir, "components/button.tsx"))).toBe(true);
  });

  test("auto-installs internalDeps (utils for button)", () => {
    const { exitCode } = runCli("add button -y");
    expect(exitCode).toBe(0);
    // button depends on utils → lib/utils.ts should exist
    expect(existsSync(join(fixtureDir, "lib/utils.ts"))).toBe(true);
  });

  test("auto-installs transitive deps (dialog → button → utils)", () => {
    const { exitCode } = runCli("add dialog -y");
    expect(exitCode).toBe(0);
    expect(existsSync(join(fixtureDir, "components/ui/dialog.tsx"))).toBe(true);
    expect(existsSync(join(fixtureDir, "components/ui/button.tsx"))).toBe(true);
    expect(existsSync(join(fixtureDir, "lib/utils.ts"))).toBe(true);
  });

  test("installs multiple components in one command", () => {
    const { stdout, exitCode } = runCli("add badge separator -y");
    expect(exitCode).toBe(0);
    expect(existsSync(join(fixtureDir, "components/ui/badge.tsx"))).toBe(true);
    expect(existsSync(join(fixtureDir, "components/ui/separator.tsx"))).toBe(true);
  });

  test("deduplicates shared deps across components", () => {
    const { stdout, exitCode } = runCli("add dialog combobox -y");
    expect(exitCode).toBe(0);
    // Both depend on button → should only appear once in output
    const buttonMatches = stdout.match(/components\/ui\/button\.tsx/g);
    expect(buttonMatches?.length).toBe(1);
  });

  // ─── Overwrite protection ─────────────────────────────────────

  test("skips existing files without -y flag", () => {
    // Pre-create the file
    const destDir = join(fixtureDir, "components/ui");
    mkdirSync(destDir, { recursive: true });
    writeFileSync(join(destDir, "button.tsx"), "// existing");
    mkdirSync(join(fixtureDir, "lib"), { recursive: true });
    writeFileSync(join(fixtureDir, "lib/utils.ts"), "// existing");

    const { stdout, exitCode } = runCli("add button");
    expect(exitCode).toBe(0);
    expect(stdout).toContain("exists");
    // Original content preserved
    expect(readFileSync(join(destDir, "button.tsx"), "utf-8")).toBe("// existing");
  });

  test("overwrites existing files with -y flag", () => {
    const destDir = join(fixtureDir, "components/ui");
    mkdirSync(destDir, { recursive: true });
    writeFileSync(join(destDir, "button.tsx"), "// old");
    mkdirSync(join(fixtureDir, "lib"), { recursive: true });
    writeFileSync(join(fixtureDir, "lib/utils.ts"), "// old");

    const { exitCode } = runCli("add button -y");
    expect(exitCode).toBe(0);
    const content = readFileSync(join(destDir, "button.tsx"), "utf-8");
    expect(content).not.toBe("// old");
    expect(content).toContain("Button");
  });

  // ─── Error handling ───────────────────────────────────────────

  test("exits with error for unknown component", () => {
    const { exitCode, stderr } = runCli("add nonexistent-widget");
    expect(exitCode).not.toBe(0);
  });

  // ─── Dependency reporting ─────────────────────────────────────

  test("reports npm dependencies to install", () => {
    const { stdout, exitCode } = runCli("add button -y");
    expect(exitCode).toBe(0);
    expect(stdout).toContain("class-variance-authority");
  });

  test("reports deps from transitive internalDeps", () => {
    const { stdout, exitCode } = runCli("add dialog -y");
    expect(exitCode).toBe(0);
    // dialog deps: @base-ui/react, lucide-react
    // button dep: class-variance-authority
    // utils deps: clsx, tailwind-merge
    expect(stdout).toContain("@base-ui/react");
    expect(stdout).toContain("clsx");
    expect(stdout).toContain("tailwind-merge");
  });

  // ─── Dest flag ────────────────────────────────────────────────

  test("respects --dest flag for custom output directory", () => {
    const customDir = join(fixtureDir, "my-app");
    mkdirSync(customDir, { recursive: true });
    const { exitCode } = runCli(`add button -y -d ${customDir}`);
    expect(exitCode).toBe(0);
    expect(existsSync(join(customDir, "components/ui/button.tsx"))).toBe(true);
  });

  // ─── Foundation components ────────────────────────────────────

  test("installs styles foundation (dockets.css)", () => {
    const { exitCode } = runCli("add styles -y");
    expect(exitCode).toBe(0);
    expect(existsSync(join(fixtureDir, "styles/dockets.css"))).toBe(true);
    const css = readFileSync(join(fixtureDir, "styles/dockets.css"), "utf-8");
    expect(css).toContain("--border-width");
    expect(css).toContain("--radius");
  });

  test("installs utils foundation", () => {
    const { exitCode } = runCli("add utils -y");
    expect(exitCode).toBe(0);
    expect(existsSync(join(fixtureDir, "lib/utils.ts"))).toBe(true);
    const utils = readFileSync(join(fixtureDir, "lib/utils.ts"), "utf-8");
    expect(utils).toContain("cn(");
  });

  // ─── Layout components ────────────────────────────────────────

  test("installs layout primitives with all exports", () => {
    const { exitCode } = runCli("add layout -y");
    expect(exitCode).toBe(0);
    const content = readFileSync(
      join(fixtureDir, "components/ui/layout.tsx"),
      "utf-8"
    );
    expect(content).toContain("Container");
    expect(content).toContain("Section");
    expect(content).toContain("Stack");
    expect(content).toContain("Row");
    expect(content).toContain("Spacer");
    expect(content).toContain("BentoGrid");
    expect(content).toContain("BentoCell");
    expect(content).toContain("Grid");
    expect(content).toContain("Divider");
  });
});
