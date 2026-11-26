import { describe, expect, it, vi } from "vitest";

// The route fetches FAQs from the DB; mock it so the test needs no database.
vi.mock("@/lib/queries", () => ({
  getFaqs: async () => [
    { id: 1, question: "Who is Md Arifur Rahman?", answer: "A full stack developer.", order: 0 },
  ],
}));

import { GET } from "../llms.txt/route";

describe("llms.txt", () => {
  it("serves plain text with the entity-first identity and FAQ", async () => {
    const res = await GET();
    expect(res.headers.get("Content-Type")).toMatch(/text\/plain/);
    const text = await res.text();
    expect(text).toContain("Md Arifur Rahman");
    expect(text).toContain("## FAQ");
    expect(text).toContain("llms-full.txt");
  });

  it("contains the identity section", async () => {
    const res = await GET();
    const text = await res.text();
    expect(text).toContain("## Identity");
    expect(text).toContain("sojibpannashovon2");
    expect(text).toContain("Full-time remote work");
  });

  it("contains GitHub link", async () => {
    const res = await GET();
    const text = await res.text();
    expect(text).toContain("github.com/sojibpannashovon2");
  });

  it("contains at least one FAQ question", async () => {
    const res = await GET();
    const text = await res.text();
    expect(text).toContain("Who is Md Arifur Rahman?");
  });
});
