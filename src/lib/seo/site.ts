import { requirePublicEnv } from "@/lib/env";

export const SITE = {
  // Canonical origin is env-driven so local development and production deploys share one source.
  url: requirePublicEnv("NEXT_PUBLIC_SITE_URL"),
  name: "Md Arifur Rahman",
  title: "Md Arifur Rahman - Full Stack Developer",
  description:
    "Md Arifur Rahman is a Dhaka-based Full Stack Developer with 2+ years of experience building production applications with React, Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB.",
  handle: "@sojibpannashovon2",
  sameAs: [
    "https://github.com/sojibpannashovon2",
    "https://www.linkedin.com/in/md-arifur-rahman-269764280",
    "https://md-arifur-rahman-portfolio25.netlify.app",
  ],
} as const;
