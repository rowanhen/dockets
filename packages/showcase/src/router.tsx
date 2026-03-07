import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { IndexPage } from "./routes/index";
import { ButtonPage } from "./routes/components/button";

const rootRoute = createRootRoute({
  component: () => (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-56 shrink-0 border-r border-border flex flex-col">
        <div className="px-4 py-5 border-b border-border">
          <Link to="/" className="font-semibold tracking-tight text-foreground">
            leitware/ui
          </Link>
        </div>
        <nav className="flex flex-col gap-0.5 p-3 flex-1">
          <p className="text-xs font-medium text-muted-foreground px-2 py-1.5 mt-1 uppercase tracking-wider">
            Components
          </p>
          <Link
            to="/components/button"
            className="text-sm px-2 py-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors [&.active]:bg-accent [&.active]:text-foreground"
          >
            Button
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});

const buttonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/components/button",
  component: ButtonPage,
});

const routeTree = rootRoute.addChildren([indexRoute, buttonRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
