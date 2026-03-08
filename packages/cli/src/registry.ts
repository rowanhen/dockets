export interface ComponentEntry {
  name: string;
  description: string;
  /** Files relative to templates dir → installed relative to base path */
  files: {
    src: string;
    /** Where to install relative to the project root. e.g. "src/components/ui/button.tsx" */
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
    files: [{ src: "lib/utils.ts", dest: "src/lib/utils.ts" }],
    deps: ["clsx", "tailwind-merge"],
    tags: ["foundation"],
  },

  styles: {
    name: "styles",
    description: "Dockets CSS tokens: --border-width, spacing scale, receipt aesthetic vars. Import in root layout.",
    files: [{ src: "styles/dockets.css", dest: "src/styles/dockets.css" }],
    deps: [],
    tags: ["foundation"],
  },

  // ─── Primitives (ui/) ─────────────────────────────────────────────────
  accordion: {
    name: "accordion",
    description: "Collapsible content sections",
    files: [
      { src: "ui/accordion.tsx", dest: "src/components/ui/accordion.tsx" },
      { src: "ui-opinionated/accordion.tsx", dest: "src/components/ui-opinionated/accordion.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  alert: {
    name: "alert",
    description: "Alert box with icon slot and default/destructive variants",
    files: [
      { src: "ui/alert.tsx", dest: "src/components/ui/alert.tsx" },
      { src: "ui-opinionated/alert.tsx", dest: "src/components/ui-opinionated/alert.tsx" },
    ],
    deps: ["class-variance-authority", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "alert-dialog": {
    name: "alert-dialog",
    description: "Confirmation dialog with cancel/action buttons",
    files: [
      { src: "ui/alert-dialog.tsx", dest: "src/components/ui/alert-dialog.tsx" },
      { src: "ui-opinionated/alert-dialog.tsx", dest: "src/components/ui-opinionated/alert-dialog.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "aspect-ratio": {
    name: "aspect-ratio",
    description: "CSS aspect-ratio wrapper with common ratio presets",
    files: [
      { src: "ui/aspect-ratio.tsx", dest: "src/components/ui/aspect-ratio.tsx" },
      { src: "ui-opinionated/aspect-ratio.tsx", dest: "src/components/ui-opinionated/aspect-ratio.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  avatar: {
    name: "avatar",
    description: "Image with fallback initials, brutalist square style",
    files: [
      { src: "ui/avatar.tsx", dest: "src/components/ui/avatar.tsx" },
      { src: "ui-opinionated/avatar.tsx", dest: "src/components/ui-opinionated/avatar.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  badge: {
    name: "badge",
    description: "Inline status label with multiple variants",
    files: [
      { src: "ui/badge.tsx", dest: "src/components/ui/badge.tsx" },
      { src: "ui-opinionated/badge.tsx", dest: "src/components/ui-opinionated/badge.tsx" },
    ],
    deps: ["@base-ui/react", "class-variance-authority"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "block-loader": {
    name: "block-loader",
    description: "Animated Unicode spinner with multiple modes",
    files: [
      { src: "ui/block-loader.tsx", dest: "src/components/ui/block-loader.tsx" },
      { src: "ui-opinionated/block-loader.tsx", dest: "src/components/ui-opinionated/block-loader.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  button: {
    name: "button",
    description: "Versatile button with multiple variants and sizes",
    files: [
      { src: "ui/button.tsx", dest: "src/components/ui/button.tsx" },
      { src: "ui-opinionated/button.tsx", dest: "src/components/ui-opinionated/button.tsx" },
    ],
    deps: ["class-variance-authority"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  calendar: {
    name: "calendar",
    description: "Month grid date picker, pure React + Tailwind",
    files: [
      { src: "ui/calendar.tsx", dest: "src/components/ui/calendar.tsx" },
      { src: "ui-opinionated/calendar.tsx", dest: "src/components/ui-opinionated/calendar.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  card: {
    name: "card",
    description: "General-purpose card with header, content, and footer",
    files: [
      { src: "ui/card.tsx", dest: "src/components/ui/card.tsx" },
      { src: "ui-opinionated/card.tsx", dest: "src/components/ui-opinionated/card.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  carousel: {
    name: "carousel",
    description: "Horizontal/vertical scroll carousel with prev/next controls",
    files: [
      { src: "ui/carousel.tsx", dest: "src/components/ui/carousel.tsx" },
      { src: "ui-opinionated/carousel.tsx", dest: "src/components/ui-opinionated/carousel.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  checkbox: {
    name: "checkbox",
    description: "Checkbox input primitive",
    files: [
      { src: "ui/checkbox.tsx", dest: "src/components/ui/checkbox.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  "code-block": {
    name: "code-block",
    description: "Monospace code display with line numbers",
    files: [
      { src: "ui/code-block.tsx", dest: "src/components/ui/code-block.tsx" },
      { src: "ui-opinionated/code-block.tsx", dest: "src/components/ui-opinionated/code-block.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  collapsible: {
    name: "collapsible",
    description: "Expand/collapse panel with animated content",
    files: [
      { src: "ui/collapsible.tsx", dest: "src/components/ui/collapsible.tsx" },
      { src: "ui-opinionated/collapsible.tsx", dest: "src/components/ui-opinionated/collapsible.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  combobox: {
    name: "combobox",
    description: "Searchable select with chips, multi-select, and filtering",
    files: [
      { src: "ui/combobox.tsx", dest: "src/components/ui/combobox.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "button", "input-group"],
    tags: ["primitive"],
  },
  command: {
    name: "command",
    description: "Command palette / search with groups and keyboard navigation",
    files: [
      { src: "ui/command.tsx", dest: "src/components/ui/command.tsx" },
      { src: "ui-opinionated/command.tsx", dest: "src/components/ui-opinionated/command.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "context-menu": {
    name: "context-menu",
    description: "Right-click context menu with items, checkboxes, and submenus",
    files: [
      { src: "ui/context-menu.tsx", dest: "src/components/ui/context-menu.tsx" },
      { src: "ui-opinionated/context-menu.tsx", dest: "src/components/ui-opinionated/context-menu.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  dialog: {
    name: "dialog",
    description: "Modal dialog with overlay",
    files: [
      { src: "ui/dialog.tsx", dest: "src/components/ui/dialog.tsx" },
      { src: "ui-opinionated/dialog.tsx", dest: "src/components/ui-opinionated/dialog.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "button", "styles"],
    tags: ["primitive", "extended"],
  },
  drawer: {
    name: "drawer",
    description: "Side/top/bottom sliding panel overlay",
    files: [
      { src: "ui/drawer.tsx", dest: "src/components/ui/drawer.tsx" },
      { src: "ui-opinionated/drawer.tsx", dest: "src/components/ui-opinionated/drawer.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "dropdown-menu": {
    name: "dropdown-menu",
    description: "Context menu with items, checkboxes, and radio groups",
    files: [
      { src: "ui/dropdown-menu.tsx", dest: "src/components/ui/dropdown-menu.tsx" },
      { src: "ui-opinionated/dropdown-menu.tsx", dest: "src/components/ui-opinionated/dropdown-menu.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  field: {
    name: "field",
    description: "Field context with label, control, description, error, and fieldset primitives",
    files: [
      { src: "ui/field.tsx", dest: "src/components/ui/field.tsx" },
      { src: "ui-opinionated/form.tsx", dest: "src/components/ui-opinionated/form.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  "hover-card": {
    name: "hover-card",
    description: "Hover-triggered preview popover (Base UI PreviewCard)",
    files: [
      { src: "ui/hover-card.tsx", dest: "src/components/ui/hover-card.tsx" },
      { src: "ui-opinionated/hover-card.tsx", dest: "src/components/ui-opinionated/hover-card.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  input: {
    name: "input",
    description: "Text input field",
    files: [{ src: "ui/input.tsx", dest: "src/components/ui/input.tsx" }],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  "input-group": {
    name: "input-group",
    description: "Grouped input with addons, buttons, and textarea",
    files: [
      { src: "ui/input-group.tsx", dest: "src/components/ui/input-group.tsx" },
    ],
    deps: ["class-variance-authority"],
    internalDeps: ["utils", "button", "input", "textarea", "styles"],
    tags: ["primitive"],
  },
  "input-otp": {
    name: "input-otp",
    description: "OTP/PIN code input with separate digit boxes",
    files: [
      { src: "ui/input-otp.tsx", dest: "src/components/ui/input-otp.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  layout: {
    name: "layout",
    description: "Layout primitives: Container, Section, Stack, Row, Spacer, Divider, Grid, BentoGrid, BentoCell — with built-in no-border-stacking patterns",
    files: [
      { src: "ui/layout.tsx", dest: "src/components/ui/layout.tsx" },
      { src: "ui-opinionated/layout-primitives.tsx", dest: "src/components/ui-opinionated/layout-primitives.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended", "layout"],
  },
  "list-item": {
    name: "list-item",
    description: "Keyboard-navigable list item",
    files: [
      { src: "ui/list-item.tsx", dest: "src/components/ui/list-item.tsx" },
      { src: "ui-opinionated/list-item.tsx", dest: "src/components/ui-opinionated/list-item.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  menubar: {
    name: "menubar",
    description: "Horizontal menu bar with dropdown menus",
    files: [
      { src: "ui/menubar.tsx", dest: "src/components/ui/menubar.tsx" },
      { src: "ui-opinionated/menubar.tsx", dest: "src/components/ui-opinionated/menubar.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "navigation-menu": {
    name: "navigation-menu",
    description: "Accessible nav menu with link and trigger variants",
    files: [
      { src: "ui/navigation-menu.tsx", dest: "src/components/ui/navigation-menu.tsx" },
      { src: "ui-opinionated/navigation-menu.tsx", dest: "src/components/ui-opinionated/navigation-menu.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  pagination: {
    name: "pagination",
    description: "Page navigation with prev/next/numbers and ellipsis",
    files: [
      { src: "ui/pagination.tsx", dest: "src/components/ui/pagination.tsx" },
      { src: "ui-opinionated/pagination.tsx", dest: "src/components/ui-opinionated/pagination.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  popover: {
    name: "popover",
    description: "Click-triggered positioned popover (Base UI)",
    files: [
      { src: "ui/popover.tsx", dest: "src/components/ui/popover.tsx" },
      { src: "ui-opinionated/popover.tsx", dest: "src/components/ui-opinionated/popover.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  progress: {
    name: "progress",
    description: "Progress bar with optional label and percentage display",
    files: [
      { src: "ui/progress.tsx", dest: "src/components/ui/progress.tsx" },
      { src: "ui-opinionated/progress.tsx", dest: "src/components/ui-opinionated/progress.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "radio-group": {
    name: "radio-group",
    description: "Radio button group primitive",
    files: [
      { src: "ui/radio-group.tsx", dest: "src/components/ui/radio-group.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  resizable: {
    name: "resizable",
    description: "Draggable resizable panel group, pure pointer-event implementation",
    files: [
      { src: "ui/resizable.tsx", dest: "src/components/ui/resizable.tsx" },
      { src: "ui-opinionated/resizable.tsx", dest: "src/components/ui-opinionated/resizable.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "scroll-area": {
    name: "scroll-area",
    description: "Custom scrollbar area using CSS scrollbar-width: thin",
    files: [
      { src: "ui/scroll-area.tsx", dest: "src/components/ui/scroll-area.tsx" },
      { src: "ui-opinionated/scroll-area.tsx", dest: "src/components/ui-opinionated/scroll-area.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  select: {
    name: "select",
    description: "Dropdown select with groups and scroll arrows",
    files: [
      { src: "ui/select.tsx", dest: "src/components/ui/select.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  separator: {
    name: "separator",
    description: "Horizontal or vertical divider line",
    files: [
      { src: "ui/separator.tsx", dest: "src/components/ui/separator.tsx" },
      { src: "ui-opinionated/separator.tsx", dest: "src/components/ui-opinionated/separator.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },
  sheet: {
    name: "sheet",
    description: "Side panel overlay (top/bottom/left/right variants)",
    files: [
      { src: "ui/sheet.tsx", dest: "src/components/ui/sheet.tsx" },
      { src: "ui-opinionated/sheet.tsx", dest: "src/components/ui-opinionated/sheet.tsx" },
    ],
    deps: ["@base-ui/react", "lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  sidebar: {
    name: "sidebar",
    description: "App sidebar layout with collapsible rail and nav items",
    files: [
      { src: "ui/sidebar.tsx", dest: "src/components/ui/sidebar.tsx" },
      { src: "ui-opinionated/sidebar.tsx", dest: "src/components/ui-opinionated/sidebar.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  skeleton: {
    name: "skeleton",
    description: "Loading placeholder with pulse animation and text variant",
    files: [
      { src: "ui/skeleton.tsx", dest: "src/components/ui/skeleton.tsx" },
      { src: "ui-opinionated/skeleton.tsx", dest: "src/components/ui-opinionated/skeleton.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  slider: {
    name: "slider",
    description: "Range slider primitive",
    files: [
      { src: "ui/slider.tsx", dest: "src/components/ui/slider.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  switch: {
    name: "switch",
    description: "Toggle switch primitive",
    files: [
      { src: "ui/switch.tsx", dest: "src/components/ui/switch.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  table: {
    name: "table",
    description: "Receipt-style data table with no-border-stacking pattern",
    files: [
      { src: "ui/table.tsx", dest: "src/components/ui/table.tsx" },
      { src: "ui-opinionated/table.tsx", dest: "src/components/ui-opinionated/table.tsx" },
    ],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  tabs: {
    name: "tabs",
    description: "Tabbed content panels with default and line variants",
    files: [
      { src: "ui/tabs.tsx", dest: "src/components/ui/tabs.tsx" },
      { src: "ui-opinionated/tabs.tsx", dest: "src/components/ui-opinionated/tabs.tsx" },
    ],
    deps: ["@base-ui/react", "class-variance-authority"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  textarea: {
    name: "textarea",
    description: "Multi-line text input",
    files: [{ src: "ui/textarea.tsx", dest: "src/components/ui/textarea.tsx" }],
    deps: [],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  toast: {
    name: "toast",
    description: "Toast notification system with provider, toaster, and useToast hook",
    files: [
      { src: "ui/toast.tsx", dest: "src/components/ui/toast.tsx" },
      { src: "ui-opinionated/toast.tsx", dest: "src/components/ui-opinionated/toast.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  toggle: {
    name: "toggle",
    description: "Pressable toggle button with default and outline variants",
    files: [
      { src: "ui/toggle.tsx", dest: "src/components/ui/toggle.tsx" },
    ],
    deps: ["@base-ui/react", "class-variance-authority"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive"],
  },
  "toggle-group": {
    name: "toggle-group",
    description: "Group of toggle buttons with newspaper-grid border pattern",
    files: [
      { src: "ui/toggle-group.tsx", dest: "src/components/ui/toggle-group.tsx" },
    ],
    deps: ["@base-ui/react", "class-variance-authority"],
    internalDeps: ["utils", "styles", "toggle"],
    tags: ["primitive"],
  },
  tooltip: {
    name: "tooltip",
    description: "Hoverable tooltip with positioning",
    files: [
      { src: "ui/tooltip.tsx", dest: "src/components/ui/tooltip.tsx" },
      { src: "ui-opinionated/tooltip.tsx", dest: "src/components/ui-opinionated/tooltip.tsx" },
    ],
    deps: ["@base-ui/react"],
    internalDeps: ["utils", "styles"],
    tags: ["primitive", "extended"],
  },
  "tree-view": {
    name: "tree-view",
    description: "Collapsible file/folder tree with ASCII connectors",
    files: [
      { src: "ui/tree-view.tsx", dest: "src/components/ui/tree-view.tsx" },
      { src: "ui-opinionated/tree-view.tsx", dest: "src/components/ui-opinionated/tree-view.tsx" },
    ],
    deps: [],
    internalDeps: ["utils"],
    tags: ["primitive", "extended"],
  },

  // ─── Extended-only components ─────────────────────────────────────────
  breadcrumb: {
    name: "breadcrumb",
    description: "Navigation breadcrumb trail",
    files: [{ src: "ui-opinionated/breadcrumb.tsx", dest: "src/components/ui-opinionated/breadcrumb.tsx" }],
    deps: [],
    tags: ["extended"],
  },
  "form-input": {
    name: "form-input",
    description: "Labelled input with description, error, and validation",
    files: [{ src: "ui-opinionated/form-input.tsx", dest: "src/components/ui-opinionated/form-input.tsx" }],
    deps: [],
    internalDeps: ["field", "input"],
    tags: ["extended"],
  },
  "form-textarea": {
    name: "form-textarea",
    description: "Labelled textarea with description, error, and validation",
    files: [{ src: "ui-opinionated/form-textarea.tsx", dest: "src/components/ui-opinionated/form-textarea.tsx" }],
    deps: [],
    internalDeps: ["field", "textarea"],
    tags: ["extended"],
  },
  "form-select": {
    name: "form-select",
    description: "Data-driven select with label, description, error, and groups support",
    files: [{ src: "ui-opinionated/form-select.tsx", dest: "src/components/ui-opinionated/form-select.tsx" }],
    deps: [],
    internalDeps: ["field", "select"],
    tags: ["extended"],
  },
  "form-input-group": {
    name: "form-input-group",
    description: "Labelled input group with field chrome for compound composition",
    files: [{ src: "ui-opinionated/form-input-group.tsx", dest: "src/components/ui-opinionated/form-input-group.tsx" }],
    deps: [],
    internalDeps: ["field", "input-group"],
    tags: ["extended"],
  },
  "form-input-otp": {
    name: "form-input-otp",
    description: "Labelled OTP input with description and error support",
    files: [{ src: "ui-opinionated/form-input-otp.tsx", dest: "src/components/ui-opinionated/form-input-otp.tsx" }],
    deps: [],
    internalDeps: ["field", "input-otp"],
    tags: ["extended"],
  },
  "form-checkbox": {
    name: "form-checkbox",
    description: "Checkbox with label, description, and error in horizontal layout",
    files: [{ src: "ui-opinionated/form-checkbox.tsx", dest: "src/components/ui-opinionated/form-checkbox.tsx" }],
    deps: [],
    internalDeps: ["field", "checkbox"],
    tags: ["extended"],
  },
  "form-radio-group": {
    name: "form-radio-group",
    description: "Data-driven radio group with label, description, and error support",
    files: [{ src: "ui-opinionated/form-radio-group.tsx", dest: "src/components/ui-opinionated/form-radio-group.tsx" }],
    deps: [],
    internalDeps: ["field", "radio-group"],
    tags: ["extended"],
  },
  "form-switch": {
    name: "form-switch",
    description: "Switch with label, description, and error in horizontal layout",
    files: [{ src: "ui-opinionated/form-switch.tsx", dest: "src/components/ui-opinionated/form-switch.tsx" }],
    deps: [],
    internalDeps: ["field", "switch"],
    tags: ["extended"],
  },
  "form-slider": {
    name: "form-slider",
    description: "Labelled slider with value display, description, and error",
    files: [{ src: "ui-opinionated/form-slider.tsx", dest: "src/components/ui-opinionated/form-slider.tsx" }],
    deps: [],
    internalDeps: ["field", "slider", "utils"],
    tags: ["extended"],
  },
  "form-combobox": {
    name: "form-combobox",
    description: "Data-driven combobox with label, description, and error support",
    files: [{ src: "ui-opinionated/form-combobox.tsx", dest: "src/components/ui-opinionated/form-combobox.tsx" }],
    deps: ["lucide-react"],
    internalDeps: ["field", "combobox"],
    tags: ["extended"],
  },
  "form-toggle": {
    name: "form-toggle",
    description: "Toggle button with label and description wrapper",
    files: [{ src: "ui-opinionated/form-toggle.tsx", dest: "src/components/ui-opinionated/form-toggle.tsx" }],
    deps: [],
    internalDeps: ["toggle", "utils"],
    tags: ["extended"],
  },
  "form-toggle-group": {
    name: "form-toggle-group",
    description: "Toggle group with label and description wrapper",
    files: [{ src: "ui-opinionated/form-toggle-group.tsx", dest: "src/components/ui-opinionated/form-toggle-group.tsx" }],
    deps: [],
    internalDeps: ["toggle-group", "utils"],
    tags: ["extended"],
  },
  layouts: {
    name: "layouts",
    description:
      "Bento grid layouts: BentoSplit, BentoLeader, BentoQuad, BentoTriple, HeroPrimary, HeroSecondary, CellGrid, CellRow, StatCell",
    files: [{ src: "ui-opinionated/layouts.tsx", dest: "src/components/ui-opinionated/layouts.tsx" }],
    deps: [],
    internalDeps: ["utils"],
    tags: ["extended"],
  },
  list: {
    name: "list",
    description:
      "Configurable list with arrow, check, check-bordered, and bullet variants",
    files: [
      { src: "ui-opinionated/list.tsx", dest: "src/components/ui-opinionated/list.tsx" },
      { src: "ui-opinionated/list-items.tsx", dest: "src/components/ui-opinionated/list-items.tsx" },
    ],
    deps: ["lucide-react"],
    internalDeps: ["utils", "list-item"],
    tags: ["extended"],
  },
  logo: {
    name: "logo",
    description: "Leitware SVG logo component",
    files: [{ src: "ui-opinionated/logo.tsx", dest: "src/components/ui-opinionated/logo.tsx" }],
    deps: [],
    tags: ["extended"],
  },
  receipt: {
    name: "receipt",
    description:
      "Receipt primitives: Divider, SectionLabel, Row, DataTable, Glyph, Ledger",
    files: [{ src: "ui-opinionated/receipt.tsx", dest: "src/components/ui-opinionated/receipt.tsx" }],
    deps: [],
    internalDeps: ["utils"],
    tags: ["extended"],
  },
  "theme-toggle": {
    name: "theme-toggle",
    description: "Light / dark / deep theme switcher button",
    files: [
      { src: "ui-opinionated/theme-toggle.tsx", dest: "src/components/ui-opinionated/theme-toggle.tsx" },
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
      { src: "ui-opinionated/contact-footer.tsx", dest: "src/components/ui-opinionated/contact-footer.tsx" },
    ],
    deps: ["convex", "lucide-react"],
    internalDeps: ["button", "block-loader", "form-input"],
    tags: ["extended", "leitware"],
  },
  "marketing-header": {
    name: "marketing-header",
    description: "Sticky marketing nav header with CTA (requires @/lib/constants)",
    files: [
      { src: "ui-opinionated/marketing-header.tsx", dest: "src/components/ui-opinionated/marketing-header.tsx" },
    ],
    deps: [],
    internalDeps: ["logo", "theme-toggle", "button"],
    tags: ["extended", "leitware"],
  },
  "marketing-footer": {
    name: "marketing-footer",
    description: "Simple marketing footer with CTA (requires @/lib/constants)",
    files: [
      { src: "ui-opinionated/marketing-footer.tsx", dest: "src/components/ui-opinionated/marketing-footer.tsx" },
    ],
    deps: [],
    tags: ["extended", "leitware"],
  },
  "simple-header": {
    name: "simple-header",
    description:
      "App header with auth (requires convex, @tanstack/react-router)",
    files: [
      { src: "ui-opinionated/simple-header.tsx", dest: "src/components/ui-opinionated/simple-header.tsx" },
    ],
    deps: ["convex", "@tanstack/react-router"],
    internalDeps: ["logo", "theme-toggle"],
    tags: ["extended", "leitware"],
  },
  "simple-footer": {
    name: "simple-footer",
    description: "App footer with legal links (requires @tanstack/react-router)",
    files: [
      { src: "ui-opinionated/simple-footer.tsx", dest: "src/components/ui-opinionated/simple-footer.tsx" },
    ],
    deps: ["@tanstack/react-router"],
    tags: ["extended", "leitware"],
  },
  "pricing-receipt": {
    name: "pricing-receipt",
    description: "Receipt-styled pricing card",
    files: [
      { src: "ui-opinionated/pricing-receipt.tsx", dest: "src/components/ui-opinionated/pricing-receipt.tsx" },
    ],
    deps: [],
    internalDeps: ["contact-footer"],
    tags: ["extended", "leitware"],
  },
  "pricing-tabs": {
    name: "pricing-tabs",
    description: "Tabbed pricing section with catch-up/keep-up plans",
    files: [
      { src: "ui-opinionated/pricing-tabs.tsx", dest: "src/components/ui-opinionated/pricing-tabs.tsx" },
    ],
    deps: [],
    internalDeps: ["button", "pricing-receipt"],
    tags: ["extended", "leitware"],
  },

  // ─── Tooling ───────────────────────────────────────────────────────────
  "biome-ui-restricted": {
    name: "biome-ui-restricted",
    description: "Biome lint rule that prevents direct imports from components/ui/ — enforces using the opinionated wrapper layer",
    files: [
      { src: "rules/biome-ui-restricted.json", dest: "src/lib/rules/biome-ui-restricted.json" },
    ],
    deps: [],
    tags: ["foundation"],
  },
};
