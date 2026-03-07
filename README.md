# dockets

> A [shadcn/ui](https://ui.shadcn.com) wrapper with opinionated defaults, extended components, and a CLI to drop them straight into your project.

Components are not published as a package — you own the code. `leit add` copies source files directly into your project, just like shadcn.

## Usage

```bash
npx @leitware/dockets add button
```

Or install the CLI globally:

```bash
npm install -g @leitware/dockets
leit add button
```

## Commands

### `leit add <component>`

Copies a component into your project.

```bash
leit add button
leit add dialog
leit add button dialog form input   # multiple at once
```

| Flag | Default | Description |
|---|---|---|
| `-d, --dir <path>` | `components/ui` | Destination directory |
| `-y, --yes` | `false` | Overwrite existing files without prompting |

Internal dependencies are resolved automatically — adding `form` will pull in `label` and `input` if they are not already present.

### `leit list`

Lists all available components.

```bash
leit list
leit list -t primitives   # filter by tag
```

## Components

Components are grouped by tag. Run `leit list` for the full current set.

| Tag | Examples |
|---|---|
| **foundation** | utils, styles |
| **primitives** | accordion, alert, button, card, checkbox, dialog, form, input, select, table, tabs, tooltip, … |
| **extended** | breadcrumb, list, logo, receipt, theme-toggle, … |
| **leitware** | contact-footer, marketing-header, pricing-receipt, … |

## Requirements

- React >= 17
- Tailwind CSS
- TypeScript (recommended)

Each component lists its npm dependencies after install:

```
✓ components/ui/button.tsx

Install dependencies:
  npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

## Repo Structure

```
packages/
├── cli/          # @leitware/dockets — the published CLI
└── components/   # source components and templates
```

## Development

```bash
bun install
bun run build     # build both packages
bun run dev       # run CLI directly without building
bun test
```

## Release

Merging to `main` triggers the release workflow:

1. Detects version bump type from [Conventional Commits](https://www.conventionalcommits.org/)
2. Bumps version in `packages/cli/package.json`
3. Builds and tests
4. Publishes to npm (requires OIDC — see below)
5. Tags the commit and creates a GitHub Release

**npm publish uses `--provenance`**, which requires [OIDC-based npm publishing](https://docs.npmjs.com/generating-provenance-statements):

1. Log in to npmjs.com → package Settings → Publishing
2. Enable **"Allow publishing from GitHub Actions using OIDC"** and link this repo
3. The workflow already has `id-token: write` permission

| Commit type | Version bump |
|---|---|
| Any type with `!` (breaking) | major |
| `feat` | minor |
| Everything else | patch |

## License

MIT
