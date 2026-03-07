export interface ComponentEntry {
  name: string;
  description: string;
  files: string[];
  deps: string[];
}

export const registry: Record<string, ComponentEntry> = {
  button: {
    name: "button",
    description: "Versatile button with multiple variants and sizes",
    files: ["button.tsx"],
    deps: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
  utils: {
    name: "utils",
    description: "cn() utility for merging Tailwind classes",
    files: ["utils.ts"],
    deps: ["clsx", "tailwind-merge"],
  },
};
