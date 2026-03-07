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

  styles: {
    name: "styles",
    description: "Dockets CSS tokens: --border-width, spacing scale, receipt aesthetic vars. Import in root layout.",
    files: [{ src: "styles/dockets.css", dest: "styles/dockets.css" }],
    deps: [],
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
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  alert: {
    name: "alert",
    description: "Alert box with icon slot and default/destructive variants",
    files: [
      { src: "ui/alert.tsx", dest: "components/ui/alert.tsx" },
      { src: "alert.tsx", dest: "components/alert.tsx" },
    ],
    deps: ["class-variance-authority", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "alert-dialog": {
    name: "alert-dialog",
    description: "Confirmation dialog with cancel/action buttons",
    files: [
      { src: "ui/alert-dialog.tsx", dest: "components/ui/alert-dialog.tsx" },
      { src: "alert-dialog.tsx", dest: "components/alert-dialog.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "aspect-ratio": {
    name: "aspect-ratio",
    description: "CSS aspect-ratio wrapper with common ratio presets",
    files: [
      { src: "ui/aspect-ratio.tsx", dest: "components/ui/aspect-ratio.tsx" },
      { src: "aspect-ratio.tsx", dest: "components/aspect-ratio.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  avatar: {
    name: "avatar",
    description: "Image with fallback initials, brutalist square style",
    files: [
      { src: "ui/avatar.tsx", dest: "components/ui/avatar.tsx" },
      { src: "avatar.tsx", dest: "components/avatar.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
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
    internalDeps: ["utils", "styles"],
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
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  calendar: {
    name: "calendar",
    description: "Month grid date picker, pure React + Tailwind",
    files: [
      { src: "ui/calendar.tsx", dest: "components/ui/calendar.tsx" },
      { src: "calendar.tsx", dest: "components/calendar.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  card: {
    name: "card",
    description: "General-purpose card with header, content, and footer",
    files: [
      { src: "ui/card.tsx", dest: "components/ui/card.tsx" },
      { src: "card.tsx", dest: "components/card.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  carousel: {
    name: "carousel",
    description: "Horizontal/vertical scroll carousel with prev/next controls",
    files: [
      { src: "ui/carousel.tsx", dest: "components/ui/carousel.tsx" },
      { src: "carousel.tsx", dest: "components/carousel.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  checkbox: {
    name: "checkbox",
    description: "Checkbox input with label and description support",
    files: [
      { src: "ui/checkbox.tsx", dest: "components/ui/checkbox.tsx" },
      { src: "checkbox.tsx", dest: "components/checkbox.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles", "label"],
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
  collapsible: {
    name: "collapsible",
    description: "Expand/collapse panel with animated content",
    files: [
      { src: "ui/collapsible.tsx", dest: "components/ui/collapsible.tsx" },
      { src: "collapsible.tsx", dest: "components/collapsible.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
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
  command: {
    name: "command",
    description: "Command palette / search with groups and keyboard navigation",
    files: [
      { src: "ui/command.tsx", dest: "components/ui/command.tsx" },
      { src: "command.tsx", dest: "components/command.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "context-menu": {
    name: "context-menu",
    description: "Right-click context menu with items, checkboxes, and submenus",
    files: [
      { src: "ui/context-menu.tsx", dest: "components/ui/context-menu.tsx" },
      { src: "context-menu.tsx", dest: "components/context-menu.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
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
    internalDeps: ["utils", "button", "styles"],
    tags: ["primitive", "extended"],
  },
  drawer: {
    name: "drawer",
    description: "Side/top/bottom sliding panel overlay",
    files: [
      { src: "ui/drawer.tsx", dest: "components/ui/drawer.tsx" },
      { src: "drawer.tsx", dest: "components/drawer.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
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
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  form: {
    name: "form",
    description: "Lightweight form context with field, label, control, and error message",
    files: [
      { src: "ui/form.tsx", dest: "components/ui/form.tsx" },
      { src: "form.tsx", dest: "components/form.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  "hover-card": {
    name: "hover-card",
    description: "Hover-triggered preview popover (Base UI PreviewCard)",
    files: [
      { src: "ui/hover-card.tsx", dest: "components/ui/hover-card.tsx" },
      { src: "hover-card.tsx", dest: "components/hover-card.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  input: {
    name: "input",
    description: "Text input field",
    files: [{ src: "ui/input.tsx", dest: "components/ui/input.tsx" }],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  "input-group": {
    name: "input-group",
    description: "Grouped input with addons, buttons, and textarea",
    files: [
      { src: "ui/input-group.tsx", dest: "components/ui/input-group.tsx" },
    ],
    deps: ["class-variance-authority"],
    internalDeps: ["utils", "button", "input", "textarea", "styles"],
    tags: ["primitive"],
  },
  "input-otp": {
    name: "input-otp",
    description: "OTP/PIN code input with separate digit boxes",
    files: [
      { src: "ui/input-otp.tsx", dest: "components/ui/input-otp.tsx" },
      { src: "input-otp.tsx", dest: "components/input-otp.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  label: {
    name: "label",
    description: "Form label element with peer-disabled styling",
    files: [
      { src: "ui/label.tsx", dest: "components/ui/label.tsx" },
      { src: "label.tsx", dest: "components/label.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  layout: {
    name: "layout",
    description: "Layout primitives: Container, Section, Stack, Row, Spacer, Divider, Grid, BentoGrid, BentoCell — with built-in no-border-stacking patterns",
    files: [
      { src: "ui/layout.tsx", dest: "components/ui/layout.tsx" },
      { src: "layout-primitives.tsx", dest: "components/layout-primitives.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended", "layout"],
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
  menubar: {
    name: "menubar",
    description: "Horizontal menu bar with dropdown menus",
    files: [
      { src: "ui/menubar.tsx", dest: "components/ui/menubar.tsx" },
      { src: "menubar.tsx", dest: "components/menubar.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "navigation-menu": {
    name: "navigation-menu",
    description: "Accessible nav menu with link and trigger variants",
    files: [
      { src: "ui/navigation-menu.tsx", dest: "components/ui/navigation-menu.tsx" },
      { src: "navigation-menu.tsx", dest: "components/navigation-menu.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  pagination: {
    name: "pagination",
    description: "Page navigation with prev/next/numbers and ellipsis",
    files: [
      { src: "ui/pagination.tsx", dest: "components/ui/pagination.tsx" },
      { src: "pagination.tsx", dest: "components/pagination.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  popover: {
    name: "popover",
    description: "Click-triggered positioned popover (Base UI)",
    files: [
      { src: "ui/popover.tsx", dest: "components/ui/popover.tsx" },
      { src: "popover.tsx", dest: "components/popover.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  progress: {
    name: "progress",
    description: "Progress bar with optional label and percentage display",
    files: [
      { src: "ui/progress.tsx", dest: "components/ui/progress.tsx" },
      { src: "progress.tsx", dest: "components/progress.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "radio-group": {
    name: "radio-group",
    description: "Radio button group with label and description support",
    files: [
      { src: "ui/radio-group.tsx", dest: "components/ui/radio-group.tsx" },
      { src: "radio-group.tsx", dest: "components/radio-group.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles", "label"],
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
  resizable: {
    name: "resizable",
    description: "Draggable resizable panel group, pure pointer-event implementation",
    files: [
      { src: "ui/resizable.tsx", dest: "components/ui/resizable.tsx" },
      { src: "resizable.tsx", dest: "components/resizable.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "scroll-area": {
    name: "scroll-area",
    description: "Custom scrollbar area using CSS scrollbar-width: thin",
    files: [
      { src: "ui/scroll-area.tsx", dest: "components/ui/scroll-area.tsx" },
      { src: "scroll-area.tsx", dest: "components/scroll-area.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
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
    internalDeps: ["utils", "styles"],
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
  sheet: {
    name: "sheet",
    description: "Side panel overlay (top/bottom/left/right variants)",
    files: [
      { src: "ui/sheet.tsx", dest: "components/ui/sheet.tsx" },
      { src: "sheet.tsx", dest: "components/sheet.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  sidebar: {
    name: "sidebar",
    description: "App sidebar layout with collapsible rail and nav items",
    files: [
      { src: "ui/sidebar.tsx", dest: "components/ui/sidebar.tsx" },
      { src: "sidebar.tsx", dest: "components/sidebar.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  skeleton: {
    name: "skeleton",
    description: "Loading placeholder with pulse animation and text variant",
    files: [
      { src: "ui/skeleton.tsx", dest: "components/ui/skeleton.tsx" },
      { src: "skeleton.tsx", dest: "components/skeleton.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  slider: {
    name: "slider",
    description: "Range slider with optional label and value display",
    files: [
      { src: "ui/slider.tsx", dest: "components/ui/slider.tsx" },
      { src: "slider.tsx", dest: "components/slider.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  switch: {
    name: "switch",
    description: "Toggle switch with optional label and description",
    files: [
      { src: "ui/switch.tsx", dest: "components/ui/switch.tsx" },
      { src: "switch.tsx", dest: "components/switch.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles", "label"],
    tags: ["primitive", "extended"],
  },
  table: {
    name: "table",
    description: "Receipt-style data table with no-border-stacking pattern",
    files: [
      { src: "ui/table.tsx", dest: "components/ui/table.tsx" },
      { src: "table.tsx", dest: "components/table.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
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
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  textarea: {
    name: "textarea",
    description: "Multi-line text input",
    files: [{ src: "ui/textarea.tsx", dest: "components/ui/textarea.tsx" }],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  toast: {
    name: "toast",
    description: "Toast notification system with provider, toaster, and useToast hook",
    files: [
      { src: "ui/toast.tsx", dest: "components/ui/toast.tsx" },
      { src: "toast.tsx", dest: "components/toast.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  toggle: {
    name: "toggle",
    description: "Pressable toggle button with default and outline variants",
    files: [
      { src: "ui/toggle.tsx", dest: "components/ui/toggle.tsx" },
      { src: "toggle.tsx", dest: "components/toggle.tsx" },
    ],
    deps: ["@base-ui/react", "class-variance-authority"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "toggle-group": {
    name: "toggle-group",
    description: "Group of toggle buttons with newspaper-grid border pattern",
    files: [
      { src: "ui/toggle-group.tsx", dest: "components/ui/toggle-group.tsx" },
      { src: "toggle-group.tsx", dest: "components/toggle-group.tsx" },
    ],
    deps: ["@base-ui/react", "class-variance-authority"],
    internalDeps: ["utils", "styles", "toggle"],
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
    internalDeps: ["utils", "styles"],
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
