import { describe, expect, test } from "bun:test";
import { registry } from "../registry.js";

describe("registry", () => {
  test("every entry has required fields", () => {
    for (const [key, entry] of Object.entries(registry)) {
      expect(entry.name).toBe(key);
      expect(entry.description.length).toBeGreaterThan(0);
      expect(entry.files.length).toBeGreaterThan(0);
      expect(Array.isArray(entry.deps)).toBe(true);
    }
  });

  test("button is registered with correct template file", () => {
    expect(registry.button).toBeDefined();
    expect(registry.button.files).toContain("button.tsx");
  });

  test("utils is registered with correct template file", () => {
    expect(registry.utils).toBeDefined();
    expect(registry.utils.files).toContain("utils.ts");
  });

  test("button deps include required shadcn dependencies", () => {
    const { deps } = registry.button;
    expect(deps).toContain("@radix-ui/react-slot");
    expect(deps).toContain("class-variance-authority");
    expect(deps).toContain("clsx");
    expect(deps).toContain("tailwind-merge");
  });
});
