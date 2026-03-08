import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { registry } from "../registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = resolve(__dirname, "..", "..", "templates");

describe("registry", () => {
  test("every entry has required fields", () => {
    for (const [key, entry] of Object.entries(registry)) {
      expect(entry.name).toBe(key);
      expect(entry.description.length).toBeGreaterThan(0);
      expect(entry.files.length).toBeGreaterThan(0);
      expect(Array.isArray(entry.deps)).toBe(true);
    }
  });

  test("every template file exists on disk", () => {
    for (const [key, entry] of Object.entries(registry)) {
      for (const file of entry.files) {
        const fullPath = resolve(templatesDir, file.src);
        expect(existsSync(fullPath)).toBe(true);
      }
    }
  });

  test("every internalDep references a valid registry entry", () => {
    for (const [key, entry] of Object.entries(registry)) {
      for (const dep of entry.internalDeps ?? []) {
        expect(registry[dep]).toBeDefined();
      }
    }
  });

  test("no circular internalDeps (max depth 20)", () => {
    function walk(name: string, visited: Set<string>, depth: number) {
      expect(depth).toBeLessThan(20);
      if (visited.has(name)) return;
      visited.add(name);
      for (const dep of registry[name]?.internalDeps ?? []) {
        walk(dep, new Set(visited), depth + 1);
      }
    }
    for (const name of Object.keys(registry)) {
      walk(name, new Set(), 0);
    }
  });

  // Specific component checks
  test("button is registered with primitive + extended files", () => {
    expect(registry.button).toBeDefined();
    expect(registry.button.files).toEqual([
      { src: "ui/button.tsx", dest: "src/components/ui/button.tsx" },
      { src: "ui-opinionated/button.tsx", dest: "src/components/ui-opinionated/button.tsx" },
    ]);
  });

  test("utils is registered", () => {
    expect(registry.utils).toBeDefined();
    expect(registry.utils.files).toEqual([
      { src: "lib/utils.ts", dest: "src/lib/utils.ts" },
    ]);
  });

  test("component count is at least 78", () => {
    expect(Object.keys(registry).length).toBeGreaterThanOrEqual(78);
  });
});
