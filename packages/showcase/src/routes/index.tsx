import { Link } from "@tanstack/react-router";

const components = [
  {
    name: "Button",
    path: "/components/button" as const,
    description: "Versatile button with multiple variants and sizes",
    install: "leit add button",
  },
];

export function IndexPage() {
  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Components</h1>
      <p className="text-muted-foreground mb-8">
        Reskinned shadcn/ui components. Copy any component into your project
        with{" "}
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
          leit add &lt;component&gt;
        </code>
        .
      </p>
      <div className="grid gap-3">
        {components.map((c) => (
          <Link
            key={c.name}
            to={c.path}
            className="group flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 hover:border-ring transition-colors"
          >
            <div className="flex flex-col gap-1">
              <p className="font-medium text-sm">{c.name}</p>
              <p className="text-sm text-muted-foreground">{c.description}</p>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors text-lg">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
