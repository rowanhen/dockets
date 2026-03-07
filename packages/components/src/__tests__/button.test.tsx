import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../button/index.js";

describe("Button", () => {
  it("renders with text content", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Button disabled>Submit</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("forwards additional props to the button element", () => {
    render(<Button type="submit" aria-label="save">Save</Button>);
    const btn = screen.getByRole("button", { name: "save" });
    expect(btn).toHaveAttribute("type", "submit");
  });

  it("renders a child element when asChild is set", () => {
    render(
      <Button asChild>
        <a href="/home">Home</a>
      </Button>
    );
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it("applies destructive variant classes", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    expect(container.firstChild).toHaveClass("bg-destructive");
  });
});
