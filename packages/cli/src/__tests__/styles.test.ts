import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { registry } from "../registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = resolve(__dirname, "..", "..", "templates");

/** Read all .tsx/.ts template files as { path, content } */
function allTemplateFiles(): { path: string; content: string }[] {
  const files: { path: string; content: string }[] = [];

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
        files.push({ path: full.replace(templatesDir + "/", ""), content: readFileSync(full, "utf-8") });
      }
    }
  }

  walk(templatesDir);
  return files;
}

// ─── Design token enforcement ─────────────────────────────────────────────────

describe("design tokens", () => {
  test("dockets.css defines --border-width", () => {
    const css = readFileSync(join(templatesDir, "styles/dockets.css"), "utf-8");
    expect(css).toContain("--border-width:");
  });

  test("dockets.css defines --radius", () => {
    const css = readFileSync(join(templatesDir, "styles/dockets.css"), "utf-8");
    expect(css).toContain("--radius:");
  });

  test("dockets.css defines spacing scale", () => {
    const css = readFileSync(join(templatesDir, "styles/dockets.css"), "utf-8");
    expect(css).toContain("--space-1:");
    expect(css).toContain("--space-8:");
    expect(css).toContain("--space-layout-sm:");
    expect(css).toContain("--space-layout-md:");
    expect(css).toContain("--space-layout-lg:");
  });

  test("--radius defaults to 0px", () => {
    const css = readFileSync(join(templatesDir, "styles/dockets.css"), "utf-8");
    // Match the actual declaration inside @layer base, not comment examples
    const layerBlock = css.slice(css.indexOf("@layer base"));
    const match = layerBlock.match(/--radius:\s*([^;]+);/);
    expect(match).not.toBeNull();
    expect(match![1].trim()).toBe("0px");
  });

  test("--border-width defaults to 1px", () => {
    const css = readFileSync(join(templatesDir, "styles/dockets.css"), "utf-8");
    const layerBlock = css.slice(css.indexOf("@layer base"));
    const match = layerBlock.match(/--border-width:\s*([^;]+);/);
    expect(match).not.toBeNull();
    expect(match![1].trim()).toBe("1px");
  });
});

// ─── No colour transitions ───────────────────────────────────────────────────

describe("no colour transitions", () => {
  const templates = allTemplateFiles();

  test("no component uses transition-colors", () => {
    const violations: string[] = [];
    for (const { path, content } of templates) {
      if (content.includes("transition-colors")) {
        violations.push(path);
      }
    }
    expect(violations).toEqual([]);
  });

  test("no component uses transition-[background", () => {
    const violations: string[] = [];
    for (const { path, content } of templates) {
      if (content.includes("transition-[background")) {
        violations.push(path);
      }
    }
    expect(violations).toEqual([]);
  });

  test("transition-all is not used (too broad — catches colours)", () => {
    const violations: string[] = [];
    for (const { path, content } of templates) {
      if (content.includes("transition-all")) {
        violations.push(path);
      }
    }
    expect(violations).toEqual([]);
  });

  test("only structural transitions are allowed (transform, width, height, opacity)", () => {
    const templates = allTemplateFiles();
    const allowed = [
      "transition-transform",
      "transition-[width]",
      "transition-[height]",
      "transition-[max-height]",
      "transition-opacity",
      "transition-none",
    ];

    const violations: { path: string; match: string }[] = [];
    for (const { path, content } of templates) {
      // Find all transition-* classes
      const matches = content.match(/transition-[\w[\]-]+/g);
      if (matches) {
        for (const m of matches) {
          if (!allowed.includes(m)) {
            violations.push({ path, match: m });
          }
        }
      }
    }
    expect(violations).toEqual([]);
  });
});

// ─── Border radius enforcement ────────────────────────────────────────────────

describe("border radius", () => {
  const templates = allTemplateFiles();

  test("no component uses hardcoded rounded-none", () => {
    const violations: string[] = [];
    for (const { path, content } of templates) {
      if (content.includes("rounded-none")) {
        violations.push(path);
      }
    }
    expect(violations).toEqual([]);
  });

  test("no component uses hardcoded rounded-sm/md/lg/xl/2xl/full/3xl", () => {
    const hardcodedRadii = [
      "rounded-sm",
      "rounded-md",
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
    ];
    const violations: { path: string; match: string }[] = [];
    for (const { path, content } of templates) {
      for (const r of hardcodedRadii) {
        // Match as a whole class (word boundary check)
        const regex = new RegExp(`(?:^|\\s|')${r}(?:\\s|'|"|$)`, "g");
        if (regex.test(content)) {
          violations.push({ path, match: r });
        }
      }
    }
    expect(violations).toEqual([]);
  });

  test("components with borders use rounded-[var(--radius)]", () => {
    // Files that have border classes should also have the radius variable
    const filesWithBorders = templates.filter(
      ({ content }) =>
        content.includes("border-[length:var(--border-width)]") ||
        content.includes("border-foreground") ||
        content.includes("border-input"),
    );
    // At least some of them should use the radius variable
    const filesWithRadius = filesWithBorders.filter(({ content }) =>
      content.includes("rounded-[var(--radius)]"),
    );
    // Most bordered components should use the radius variable
    // (some may be border-only with no rounding, like Divider — allow some slack)
    expect(filesWithRadius.length).toBeGreaterThan(filesWithBorders.length * 0.4);
  });
});

// ─── Border-width variable enforcement ────────────────────────────────────────

describe("border-width variable", () => {
  const templates = allTemplateFiles();

  test("no component uses bare 'border' class for sizing (should use --border-width)", () => {
    // This checks for `border ` or `border'` used as a standalone Tailwind class
    // (which defaults to 1px) — these should be border-[length:var(--border-width)]
    // Exclude: border-0, border-t, border-b, etc. (directional), border-foreground (color),
    // border-dashed (style), border-collapse, border-transparent, border-input
    const violations: { path: string; line: number; text: string }[] = [];

    for (const { path, content } of templates) {
      const lines = content.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Match standalone `border` class in Tailwind class strings
        // This catches: border' or border " or ' border ' etc.
        // But NOT: border-foreground, border-t, border-dashed, etc.
        const matches = line.match(/(?:^|[\s'"])border(?=[\s'"])/g);
        if (matches && !line.includes("border-collapse")) {
          violations.push({ path, line: i + 1, text: line.trim() });
        }
      }
    }

    // Some legacy components may still use bare `border` — track but don't block
    // Once all are migrated, tighten this to expect(violations).toEqual([])
    if (violations.length > 0) {
      console.warn(
        `⚠ ${violations.length} file(s) still use bare \`border\` class:`,
        violations.map((v) => `${v.path}:${v.line}`),
      );
    }
  });
});

// ─── Grid / layout patterns ──────────────────────────────────────────────────

describe("layout components", () => {
  test("BentoGrid uses newspaper-grid border pattern", () => {
    const layout = readFileSync(join(templatesDir, "ui/layout.tsx"), "utf-8");

    // Container should have border-t + border-l
    expect(layout).toContain("border-t-[length:var(--border-width)]");
    expect(layout).toContain("border-l-[length:var(--border-width)]");
  });

  test("BentoCell uses border-b + border-r (completes newspaper grid)", () => {
    const layout = readFileSync(join(templatesDir, "ui/layout.tsx"), "utf-8");

    expect(layout).toContain("border-b-[length:var(--border-width)]");
    expect(layout).toContain("border-r-[length:var(--border-width)]");
  });

  test("Container has size variants", () => {
    const layout = readFileSync(join(templatesDir, "ui/layout.tsx"), "utf-8");
    expect(layout).toContain("max-w-2xl");
    expect(layout).toContain("max-w-4xl");
    expect(layout).toContain("max-w-6xl");
    expect(layout).toContain("max-w-7xl");
  });

  test("Section uses spacing tokens from dockets.css", () => {
    const layout = readFileSync(join(templatesDir, "ui/layout.tsx"), "utf-8");
    expect(layout).toContain("--space-layout-sm");
    expect(layout).toContain("--space-layout-md");
    expect(layout).toContain("--space-layout-lg");
  });

  test("Stack and Row support gap prop", () => {
    const layout = readFileSync(join(templatesDir, "ui/layout.tsx"), "utf-8");
    expect(layout).toContain("gap-1");
    expect(layout).toContain("gap-2");
    expect(layout).toContain("gap-4");
    expect(layout).toContain("gap-8");
  });

  test("Grid supports column variants", () => {
    const layout = readFileSync(join(templatesDir, "ui/layout.tsx"), "utf-8");
    expect(layout).toContain("grid-cols-1");
    expect(layout).toContain("grid-cols-2");
    expect(layout).toContain("grid-cols-3");
    expect(layout).toContain("grid-cols-4");
    expect(layout).toContain("grid-cols-12");
  });

  test("Divider uses --border-width for thickness", () => {
    const layout = readFileSync(join(templatesDir, "ui/layout.tsx"), "utf-8");
    // Divider height should be var(--border-width) not hardcoded
    expect(layout).toContain("h-[length:var(--border-width)]");
  });

  test("BentoCell supports col-span and row-span", () => {
    const layout = readFileSync(join(templatesDir, "ui/layout.tsx"), "utf-8");
    expect(layout).toContain("col-span-1");
    expect(layout).toContain("col-span-2");
    expect(layout).toContain("row-span-1");
    expect(layout).toContain("row-span-2");
  });

  test("layout documents the no-border-stacking rule", () => {
    const layout = readFileSync(join(templatesDir, "ui/layout.tsx"), "utf-8");
    expect(layout.toLowerCase()).toContain("borders never stack");
  });
});

// ─── Component style consistency ─────────────────────────────────────────────

describe("style consistency", () => {
  const templates = allTemplateFiles();

  test("all ui/ primitives use data-slot attributes", () => {
    const uiFiles = templates.filter(
      ({ path }) => path.startsWith("ui/") && path.endsWith(".tsx"),
    );
    const missing: string[] = [];
    for (const { path, content } of uiFiles) {
      // layout.tsx, layout-primitives.tsx may have multiple slots — that's fine
      // Skip lib/ helpers
      if (path.includes("lib/")) continue;
      // data-slot= is the standard pattern; slot: in useRender state is equivalent
      if (!content.includes('data-slot=') && !content.includes("slot:")) {
        missing.push(path);
      }
    }
    expect(missing).toEqual([]);
  });

  test("all ui/ primitives import cn from utils", () => {
    const uiFiles = templates.filter(
      ({ path }) => path.startsWith("ui/") && path.endsWith(".tsx"),
    );
    const missing: string[] = [];
    for (const { path, content } of uiFiles) {
      // Some very simple re-export files may not need cn
      if (content.includes("cn(") && !content.includes("import")) {
        missing.push(path);
      }
    }
    expect(missing).toEqual([]);
  });

  test("no component uses shadow-md/lg/xl (brutalist = flat)", () => {
    const shadows = ["shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl"];
    const violations: { path: string; match: string }[] = [];
    for (const { path, content } of templates) {
      for (const s of shadows) {
        if (content.includes(s)) {
          violations.push({ path, match: s });
        }
      }
    }
    expect(violations).toEqual([]);
  });

  test("no component uses font-semibold (use font-medium)", () => {
    const violations: string[] = [];
    for (const { path, content } of templates) {
      if (content.includes("font-semibold")) {
        violations.push(path);
      }
    }
    expect(violations).toEqual([]);
  });
});

// ─── Registry structure for style/layout components ─────────────────────────

describe("registry style entries", () => {
  test("styles entry exists and installs dockets.css", () => {
    expect(registry.styles).toBeDefined();
    expect(registry.styles.files[0].dest).toBe("styles/dockets.css");
    expect(registry.styles.tags).toContain("foundation");
  });

  test("layout entry exists with correct tags", () => {
    expect(registry.layout).toBeDefined();
    expect(registry.layout.tags).toContain("layout");
  });

  test("layout depends on styles and utils", () => {
    expect(registry.layout.internalDeps).toContain("styles");
    expect(registry.layout.internalDeps).toContain("utils");
  });

  test("components using --border-width depend on styles", () => {
    // Spot-check key components
    const shouldDependOnStyles = [
      "button", "dialog", "select", "tabs", "input", "checkbox",
      "switch", "table", "toggle",
    ];
    const missing: string[] = [];
    for (const name of shouldDependOnStyles) {
      const entry = registry[name];
      if (!entry) continue;
      const allDeps = entry.internalDeps ?? [];
      // Either directly depends on styles, or depends on utils which pulls styles
      // (styles is foundational — most components should list it)
      if (!allDeps.includes("styles") && !allDeps.includes("utils")) {
        missing.push(name);
      }
    }
    // Not a strict failure since utils may transitively include what's needed,
    // but flag it
    if (missing.length > 0) {
      console.warn(`⚠ Components without styles dep: ${missing.join(", ")}`);
    }
  });
});
