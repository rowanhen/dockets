import { describe, expect, it } from "vitest";
import { cn } from "../lib/utils.js";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deduplicates conflicting Tailwind classes, keeping the last", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("filters out falsy values", () => {
    expect(cn("base", false && "hidden", undefined, null, "end")).toBe(
      "base end"
    );
  });

  it("handles conditional object syntax", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("returns empty string for no arguments", () => {
    expect(cn()).toBe("");
  });
});
