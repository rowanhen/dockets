import { Button } from "@leitware/components";

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;

const sizes = ["sm", "default", "lg"] as const;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        {title}
      </h2>
      <div className="rounded-lg border border-border bg-card p-6">
        {children}
      </div>
    </section>
  );
}

export function ButtonPage() {
  return (
    <div className="p-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Button</h1>
        <p className="text-muted-foreground">
          A versatile button component with multiple variants and sizes.
        </p>
        <code className="inline-block mt-3 text-xs bg-muted text-muted-foreground px-2 py-1 rounded font-mono">
          leit add button
        </code>
      </div>

      <Section title="Variants">
        <div className="flex flex-wrap gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex items-end gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}
            </Button>
          ))}
        </div>
      </Section>

      <Section title="Disabled">
        <div className="flex flex-wrap gap-3">
          {(["default", "outline", "secondary"] as const).map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      </Section>
    </div>
  );
}
