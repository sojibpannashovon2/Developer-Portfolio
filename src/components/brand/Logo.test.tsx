import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders an svg with accessible name matching /md arifur rahman/i", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: /md arifur rahman/i })).toBeInTheDocument();
  });

  it("renders wordmark 'mdarifur' when withWordmark is true", () => {
    render(<Logo withWordmark />);
    expect(screen.getByText("mdarifur")).toBeInTheDocument();
  });

  it("does NOT render wordmark by default", () => {
    render(<Logo />);
    expect(screen.queryByText("mdarifur")).not.toBeInTheDocument();
  });
});
