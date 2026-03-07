export interface ComponentEntry {
  name: string;
  description: string;
  /** Files relative to templates dir → installed relative to base path */
  files: {
    src: string;
    /** Where to install relative to the project root. e.g. "components/ui/button.tsx" */
    dest: string;
  }[];
  /** npm dependencies to install */
  deps: string[];
  /** Other registry components that must be installed first */
  internalDeps?: string[];
  /** Tags for categorisation */
  tags?: string[];
}

export const registry: Record<string, ComponentEntry> = {
  // ─── Foundation ────────────────────────────────────────────────────────
  utils: {
    name: "utils",
    description: "cn() utility + helpers for merging Tailwind classes",
    files: [{ src: "lib/utils.ts", dest: "lib/utils.ts" }],
    deps: ["clsx", "tailwind-merge"],
    tags: ["foundation"],
  },

  // ─── Primitives (ui/) ─────────────────────────────────────────────────
  accordion: {
    name: "accordion",
    description: "Collapsible content sections",
    files: [
      { src: "ui/accordion.tsx", dest: "components/ui/accordion.tsx" },
      { src: "accordion.tsx", dest: "components/accordion.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  badge: {
    name: "badge",
    description: "Inline status label with multiple variants",
    files: [
      { src: "ui/badge.tsx", dest: "components/ui/badge.tsx" },
      { src: "badge.tsx", dest: "components/badge.tsx" },
    ],
    deps: ["@base-ui/react", "class-variance-authority"],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  "block-loader": {
    name: "block-loader",
    description: "Animated Unicode spinner with multiple modes",
    files: [
      { src: "ui/block-loader.tsx", dest: "components/ui/block-loader.tsx" },
      { src: "block-loader.tsx", dest: "components/block-loader.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  button: {
    name: "button",
    description: "Versatile button with multiple variants and sizes",
    files: [
      { src: "ui/button.tsx", dest: "components/ui/button.tsx" },
      { src: "button.tsx", dest: "components/button.tsx" },
    ],
    deps: ["class-variance-authority"],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  "code-block": {
    name: "code-block",
    description: "Monospace code display with line numbers",
    files: [
      { src: "ui/code-block.tsx", dest: "components/ui/code-block.tsx" },
      { src: "code-block.tsx", dest: "components/code-block.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  combobox: {
    name: "combobox",
    description: "Searchable select with chips, multi-select, and filtering",
    files: [
      { src: "ui/combobox.tsx", dest: "components/ui/combobox.tsx" },
      { src: "combobox.tsx", dest: "components/combobox.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "button", "input-group"],
    tags: ["primitive", "extended"],
  },
  dialog: {
    name: "dialog",
    description: "Modal dialog with overlay",
    files: [
      { src: "ui/dialog.tsx", dest: "components/ui/dialog.tsx" },
      { src: "dialog.tsx", dest: "components/dialog.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "button"],
    tags: ["primitive", "extended"],
  },
  "dropdown-menu": {
    name: "dropdown-menu",
    description: "Context menu with items, checkboxes, and radio groups",
    files: [
      { src: "ui/dropdown-menu.tsx", dest: "components/ui/dropdown-menu.tsx" },
      { src: "dropdown-menu.tsx", dest: "components/dropdown-menu.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  input: {
    name: "input",
    description: "Text input field",
    files: [{ src: "ui/input.tsx", dest: "components/ui/input.tsx" }],
    deps: ["@base-ui/react"],
    internalDeps: ["utils"],
    tags: ["primitive"],
  },
  "input-group": {
    name: "input-group",
    description: "Grouped input with addons, buttons, and textarea",
    files: [
      { src: "ui/input-group.tsx", dest: "components/ui/input-group.tsx" },
    ],
    deps: ["class-variance-authority"],
    internalDeps: ["utils", "button", "input", "textarea"],
    tags: ["primitive"],
  },
  textarea: {
    name: "textarea",
    description: "Multi-line text input",
    files: [{ src: "ui/textarea.tsx", dest: "components/ui/textarea.tsx" }],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive"],
  },
  "list-item": {
    name: "list-item",
    description: "Keyboard-navigable list item",
    files: [
      { src: "ui/list-item.tsx", dest: "components/ui/list-item.tsx" },
      { src: "list-item.tsx", dest: "components/list-item.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  "receipt-card": {
    name: "receipt-card",
    description: "Receipt-style bordered card with title",
    files: [
      { src: "ui/receipt-card.tsx", dest: "components/ui/receipt-card.tsx" },
      { src: "receipt-card.tsx", dest: "components/receipt-card.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  select: {
    name: "select",
    description: "Dropdown select with groups and scroll arrows",
    files: [
      { src: "ui/select.tsx", dest: "components/ui/select.tsx" },
      { src: "select.tsx", dest: "components/select.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  separator: {
    name: "separator",
    description: "Horizontal or vertical divider line",
    files: [
      { src: "ui/separator.tsx", dest: "components/ui/separator.tsx" },
      { src: "separator.tsx", dest: "components/separator.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  tabs: {
    name: "tabs",
    description: "Tabbed content panels with default and line variants",
    files: [
      { src: "ui/tabs.tsx", dest: "components/ui/tabs.tsx" },
      { src: "tabs.tsx", dest: "components/tabs.tsx" },
    ],
    deps: ["@base-ui/react", "class-variance-authority"],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  tooltip: {
    name: "tooltip",
    description: "Hoverable tooltip with positioning",
    files: [
      { src: "ui/tooltip.tsx", dest: "components/ui/tooltip.tsx" },
      { src: "tooltip.tsx", dest: "components/tooltip.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  "tree-view": {
    name: "tree-view",
    description: "Collapsible file/folder tree with ASCII connectors",
    files: [
      { src: "ui/tree-view.tsx", dest: "components/ui/tree-view.tsx" },
      { src: "tree-view.tsx", dest: "components/tree-view.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },

  // ─── Extended-only components ─────────────────────────────────────────
  breadcrumb: {
    name: "breadcrumb",
    description: "Navigation breadcrumb trail",
    files: [{ src: "breadcrumb.tsx", dest: "components/breadcrumb.tsx" }],
    deps: [],
    tags: ["extended"],
  },
  "form-input": {
    name: "form-input",
    description: "Labelled input with description, error, and validation",
    files: [{ src: "form-input.tsx", dest: "components/form-input.tsx" }],
    deps: [],
    internalDeps: ["utils", "input"],
    tags: ["extended"],
  },
  layouts: {
    name: "layouts",
    description:
      "Bento grid layouts: BentoSplit, BentoLeader, BentoQuad, BentoTriple, HeroPrimary, HeroSecondary, CellGrid, CellRow, StatCell",
    files: [{ src: "layouts.tsx", dest: "components/layouts.tsx" }],
    deps: [],
    internalDeps: ["utils"],
    tags: ["extended"],
  },
  list: {
    name: "list",
    description:
      "Configurable list with arrow, check, check-bordered, and bullet variants",
    files: [
      { src: "list.tsx", dest: "components/list.tsx" },
      { src: "list-items.tsx", dest: "components/list-items.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "list-item"],
    tags: ["extended"],
  },
  logo: {
    name: "logo",
    description: "Leitware SVG logo component",
    files: [{ src: "logo.tsx", dest: "components/logo.tsx" }],
    deps: [],
    tags: ["extended"],
  },
  receipt: {
    name: "receipt",
    description:
      "Receipt primitives: Divider, SectionLabel, Row, DataTable, Glyph, Ledger",
    files: [{ src: "receipt.tsx", dest: "components/receipt.tsx" }],
    deps: [],
    internalDeps: ["utils"],
    tags: ["extended"],
  },
  "theme-toggle": {
    name: "theme-toggle",
    description: "Light / dark / deep theme switcher button",
    files: [
      { src: "theme-toggle.tsx", dest: "components/theme-toggle.tsx" },
    ],
    deps: [],
    internalDeps: ["button"],
    tags: ["extended"],
  },
  "contact-footer": {
    name: "contact-footer",
    description:
      "Contact form footer with Convex integration (requires convex, @/lib/constants)",
    files: [
      { src: "contact-footer.tsx", dest: "components/contact-footer.tsx" },
    ],
    deps: ["convex", "lucide-react"],
    internalDeps: ["button", "block-loader", "form-input"],
    tags: ["extended", "leitware"],
  },
  "marketing-header": {
    name: "marketing-header",
    description: "Sticky marketing nav header with CTA (requires @/lib/constants)",
    files: [
      { src: "marketing-header.tsx", dest: "components/marketing-header.tsx" },
    ],
    deps: [],
    internalDeps: ["logo", "theme-toggle", "button"],
    tags: ["extended", "leitware"],
  },
  "marketing-footer": {
    name: "marketing-footer",
    description: "Simple marketing footer with CTA (requires @/lib/constants)",
    files: [
      { src: "marketing-footer.tsx", dest: "components/marketing-footer.tsx" },
    ],
    deps: [],
    tags: ["extended", "leitware"],
  },
  "simple-header": {
    name: "simple-header",
    description:
      "App header with auth (requires convex, @tanstack/react-router)",
    files: [
      { src: "simple-header.tsx", dest: "components/simple-header.tsx" },
    ],
    deps: ["convex", "@tanstack/react-router"],
    internalDeps: ["logo", "theme-toggle"],
    tags: ["extended", "leitware"],
  },
  "simple-footer": {
    name: "simple-footer",
    description: "App footer with legal links (requires @tanstack/react-router)",
    files: [
      { src: "simple-footer.tsx", dest: "components/simple-footer.tsx" },
    ],
    deps: ["@tanstack/react-router"],
    tags: ["extended", "leitware"],
  },
  "pricing-receipt": {
    name: "pricing-receipt",
    description: "Receipt-styled pricing card",
    files: [
      { src: "pricing-receipt.tsx", dest: "components/pricing-receipt.tsx" },
    ],
    deps: [],
    internalDeps: ["contact-footer"],
    tags: ["extended", "leitware"],
  },
  "pricing-tabs": {
    name: "pricing-tabs",
    description: "Tabbed pricing section with catch-up/keep-up plans",
    files: [
      { src: "pricing-tabs.tsx", dest: "components/pricing-tabs.tsx" },
    ],
    deps: [],
    internalDeps: ["button", "pricing-receipt"],
    tags: ["extended", "leitware"],
  },
};
