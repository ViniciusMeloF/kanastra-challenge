import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("should be able renders with default title and description", () => {
    render(<EmptyState />);

    expect(screen.getByAltText(/emptyState.title/i)).toBeInTheDocument();
    expect(screen.getByText(/emptyState.title/i)).toBeInTheDocument();
    expect(screen.getByText(/emptyState.description/i)).toBeInTheDocument();
  });

  it("should be able renders with provided title and description", () => {
    render(
      <EmptyState title="Custom Title" description="Custom Description" />
    );

    expect(screen.getByAltText(/Custom Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Description/i)).toBeInTheDocument();
  });
});
