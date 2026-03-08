# Dockets

A copy-paste component library for React, built on [Base UI](https://base-ui.com) and Tailwind CSS. Components are installed directly into your project via a CLI -- no runtime dependency, full ownership of the code.

## Quick start

```bash
npx @leitware/dockets add button
```

This copies the component files into your project and tells you which npm dependencies to install.

Or install the CLI globally:

```bash
npm install -g @leitware/dockets
leit add button
```

## Commands

### `leit add <components...>`

Add one or more components to your project.

```bash
# Single component
leit add dialog

# Multiple components
leit add button card badge

# Overwrite existing files
leit add button -y

# Custom output directory
leit add button -d ./src

# Custom import alias (default: @/)
leit add button --alias '~/'
```

| Flag | Default | Description |
|---|---|---|
| `-d, --dest <path>` | `.` | Project root (files install relative to this) |
| `-y, --yes` | `false` | Overwrite existing files without prompting |
| `-a, --alias <prefix>` | `@/` | Import alias prefix |

Dependencies are resolved automatically. Running `leit add dialog` installs `dialog`, its dependency `button`, `button`'s dependency `utils`, and so on.

### `leit list`

List all available components.

```bash
leit list
leit list -t primitive    # filter by tag
leit list -t extended
leit list -t foundation
leit list -t leitware
```

## Architecture

Components are organized into two layers:

```
your-project/
├── components/
│   ├── ui/                  # Primitives — low-level styled building blocks
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   └── ui-opinionated/      # Opinionated wrappers — what you import in your app
│       ├── button.tsx
│       ├── dialog.tsx
│       └── ...
├── lib/
│   └── utils.ts             # cn() utility
└── styles/
    └── dockets.css           # Design tokens
```

### `components/ui/` -- Primitives

Low-level components that wrap Base UI primitives with dockets styling. These export individual sub-components for maximum flexibility (e.g. `DialogTrigger`, `DialogContent`, `DialogTitle`). **You should not import from this directory directly in your app code** -- use the opinionated wrappers instead.

### `components/ui-opinionated/` -- Opinionated wrappers

Higher-level components that compose the primitives into convenient, props-driven APIs. **These are what you import in your application code.**

```tsx
import { Dialog } from '@/components/ui-opinionated/dialog'

// Simple props-driven API
<Dialog
  trigger={<button>Open</button>}
  title="Confirm action"
  description="Are you sure?"
  footer={<button>OK</button>}
/>

// Or fall back to full composition when you need more control
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui-opinionated/dialog'

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Custom layout</DialogTitle>
    {/* ... */}
  </DialogContent>
</Dialog>
```

Every opinionated wrapper re-exports the underlying primitives, so you always have an escape hatch without changing your import path.

## Components

### Primitives (ui-only, no opinionated wrapper)

These components don't have a standalone opinionated wrapper -- they're accessed through form wrappers:

| Primitive | Use via |
|-----------|---------|
| `checkbox` | `form-checkbox` |
| `combobox` | `form-combobox` |
| `input` | `form-input` |
| `input-group` | `form-input-group` |
| `input-otp` | `form-input-otp` |
| `radio-group` | `form-radio-group` |
| `select` | `form-select` |
| `slider` | `form-slider` |
| `switch` | `form-switch` |
| `textarea` | `form-textarea` |
| `toggle` | `form-toggle` |
| `toggle-group` | `form-toggle-group` |

### Components with opinionated wrappers

These install both a `ui/` primitive and a `ui-opinionated/` wrapper:

Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Block Loader, Button, Calendar, Card, Carousel, Code Block, Collapsible, Command, Context Menu, Dialog, Drawer, Dropdown Menu, Field/Form, Hover Card, Layout, List Item, Menubar, Navigation Menu, Pagination, Popover, Progress, Resizable, Scroll Area, Separator, Sheet, Sidebar, Skeleton, Table, Tabs, Toast, Tooltip, Tree View.

### Form components

All form components provide a consistent API with `label`, `description`, `error`, and `required` props, built on the Field context system:

```tsx
import { FormInput } from '@/components/ui-opinionated/form-input'

<FormInput
  label="Email"
  description="We'll never share your email."
  error={errors.email}
  required
/>
```

### Extended-only components

Standalone components without a corresponding `ui/` primitive:

`breadcrumb`, `layouts`, `list`, `logo`, `receipt`, `theme-toggle`

### Leitware components

Brand-specific components that may require external dependencies like Convex or TanStack Router:

`contact-footer`, `marketing-header`, `marketing-footer`, `simple-header`, `simple-footer`, `pricing-receipt`, `pricing-tabs`

## Enforcing the import boundary

Dockets ships an installable [Biome](https://biomejs.dev) lint rule that prevents your app code from importing directly from `components/ui/`, ensuring everyone uses the opinionated wrappers.

### Install the rule

```bash
leit add biome-ui-restricted
```

This copies `biome-ui-restricted.json` into `lib/rules/`. Then extend it from your project's `biome.json`:

```jsonc
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "extends": ["./lib/rules/biome-ui-restricted.json"]
}
```

### What it does

The rule uses a single wildcard pattern to block all `@/components/ui/*` imports:

```
error: Do not import directly from 'components/ui/'.
       Import from 'components/ui-opinionated/' instead.
       Only ui-opinionated wrappers should reference ui/ primitives.
```

Files inside `components/ui-opinionated/` are automatically exempted via a Biome override, since the opinionated wrappers need to import from the primitives -- that's their job.

> Requires Biome >= 2.2.0 for wildcard pattern support.

## Design tokens

Install the foundation styles:

```bash
leit add styles
```

Then import `dockets.css` in your root layout:

```css
@import '@/styles/dockets.css';
```

Key tokens:

| Token | Default | Description |
|-------|---------|-------------|
| `--border-width` | `1px` | Unified border thickness |
| `--radius` | `0px` | Border radius (0 = sharp/brutalist) |
| `--space-layout-sm` | | Small layout spacing |
| `--space-layout-md` | | Medium layout spacing |
| `--space-layout-lg` | | Large layout spacing |

Utilities: `focus-ring` (dashed keyboard focus outline), `scrollbar-none` (hide scrollbars).

## Requirements

- React >= 17
- Tailwind CSS
- TypeScript (recommended)

Each component lists its npm dependencies after install:

```
✓ components/ui/button.tsx
✓ components/ui-opinionated/button.tsx

Install dependencies:
  npm install class-variance-authority clsx tailwind-merge
```

## Repo structure

```
packages/
├── cli/              # @leitware/dockets — the published CLI
│   ├── src/          # CLI source (registry, commands)
│   └── templates/    # Component source files
│       ├── ui/               # Primitive components
│       ├── ui-opinionated/   # Opinionated wrappers
│       ├── rules/            # Biome lint rules
│       ├── lib/              # Utilities
│       └── styles/           # CSS tokens
└── showcase/         # Example/documentation site
```

## Development

```bash
bun install
bun test
bun run build         # build the CLI
bun run --cwd packages/cli dev   # run CLI without building
```

## Release

Merging to `main` triggers the release workflow:

1. Detects version bump type from [Conventional Commits](https://www.conventionalcommits.org/)
2. Bumps version in `packages/cli/package.json`
3. Builds and tests
4. Publishes to npm with `--provenance` (requires OIDC)
5. Tags the commit and creates a GitHub Release

| Commit type | Version bump |
|---|---|
| Any type with `!` (breaking) | major |
| `feat` | minor |
| Everything else | patch |

## License

MIT
