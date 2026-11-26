import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "../Faq";

// Stub FaqJsonLd — it emits a <script> tag which is opaque in jsdom
vi.mock("@/lib/seo/jsonld", () => ({
  FaqJsonLd: () => null,
}));

const faqs = [
  {
    question: "Who is Md Arifur Rahman?",
    answer:
      "Md Arifur Rahman is a Full Stack Developer from Dhaka, Bangladesh who builds reliable products.",
  },
  { question: "What does Arifur build?", answer: "Full-stack web applications." },
  { question: "What is Arifur's tech stack?", answer: "TypeScript, React, Next.js, Node.js." },
  {
    question: "Is Arifur available for work?",
    answer: "Yes, available for full-time remote work.",
  },
  { question: "How can I contact Arifur?", answer: "Email is the fastest way." },
];

describe("Faq", () => {
  it("renders the FAQ section with id='faq'", () => {
    const { container } = render(<Faq faqs={faqs} />);
    expect(container.querySelector("#faq")).toBeTruthy();
  });

  it("renders the section heading", () => {
    render(<Faq faqs={faqs} />);
    expect(screen.getByText(/Frequently asked/i)).toBeTruthy();
  });

  it("renders all FAQ questions", () => {
    render(<Faq faqs={faqs} />);
    expect(screen.getByText("Who is Md Arifur Rahman?")).toBeTruthy();
    expect(screen.getByText("What does Arifur build?")).toBeTruthy();
    expect(screen.getByText("What is Arifur's tech stack?")).toBeTruthy();
    expect(screen.getByText("Is Arifur available for work?")).toBeTruthy();
    expect(screen.getByText("How can I contact Arifur?")).toBeTruthy();
  });

  it("returns nothing when there are no FAQs", () => {
    const { container } = render(<Faq faqs={[]} />);
    expect(container.querySelector("#faq")).toBeNull();
  });

  it("answers are hidden by default (hidden attribute)", () => {
    const { container } = render(<Faq faqs={faqs} />);
    const regions = container.querySelectorAll("[role='region']");
    regions.forEach((region) => {
      expect(region.hasAttribute("hidden")).toBe(true);
    });
  });

  it("toggles an answer open when its button is clicked", async () => {
    render(<Faq faqs={faqs} />);
    const button = screen.getByRole("button", { name: /Who is Md Arifur Rahman/i });
    expect(button.getAttribute("aria-expanded")).toBe("false");

    await userEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");

    // The answer text is now visible (hidden attribute removed)
    expect(screen.getByText(/Full Stack Developer from Dhaka/)).toBeTruthy();
  });

  it("collapses the answer when the button is clicked again", async () => {
    render(<Faq faqs={faqs} />);
    const button = screen.getByRole("button", { name: /Who is Md Arifur Rahman/i });

    await userEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");

    await userEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("each button has aria-controls referencing its answer region", () => {
    const { container } = render(<Faq faqs={faqs} />);
    const buttons = container.querySelectorAll("button[aria-expanded]");
    buttons.forEach((btn) => {
      const controlsId = btn.getAttribute("aria-controls");
      expect(controlsId).toBeTruthy();
      expect(container.querySelector(`#${controlsId}`)).toBeTruthy();
    });
  });
});
