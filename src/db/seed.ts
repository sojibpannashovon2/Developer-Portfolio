import { db } from "./client";
import {
  profile,
  projects,
  experiences,
  skills,
  services,
  socialLinks,
  fundingLinks,
  taglines,
  faqs,
  testimonials,
} from "./schema";
import { isLocalDatabaseUrl } from "@/lib/env";

// Inserted only on a fresh (empty) database. Later content changes are made in the admin
// panel, not by re-running the seed.

const taglineRows = [
  { text: "Available for full-time remote work", active: true, order: 0 },
  { text: "Building production-ready web apps", active: true, order: 1 },
];

const seededAvatarUrl = "https://avatars.githubusercontent.com/u/108423803?v=4";

const profileRow = {
  name: "Md Arifur Rahman",
  bio: "I'm Md Arifur Rahman, a Full Stack Developer and Computer Science graduate based in Dhaka, Bangladesh. I build production web applications with React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, and Prisma, taking features from schema design and REST APIs through polished UI and deployment.\n\nI use ChatGPT, GitHub Copilot, and Cursor to support implementation, debugging, and refactoring, carefully reviewing AI-generated code before shipping. Across Agile teams, I have reduced API latency by 20%, improved UI performance by 25%, and cut page load time by 30%. I hold a B.Sc. in Computer Science and Engineering from Green University of Bangladesh (2025), speak Bangla, English, and Hindi, and am available for full-time remote work. Contact: +880 1616-841446 · mdarifur554@gmail.com.",
  stats: { years: 2, repos: 112, stars: 0, followers: 5 },
  roles: ["Full Stack Developer", "AI-Assisted Developer", "React & Next.js Developer"],
  resumeUrl: null,
  avatarUrl: seededAvatarUrl,
  heroTagline: "Full Stack Developer · Dhaka, Bangladesh",
  sectionVisibility: { support: false },
};

// Array position IS the `order` (see the .map() below) and order doubles as the showcase
// ranking, so this sequence is the order they lead with. Language tags are omitted where
// GitHub reports the language: it renders as its own chip and mergeProjects strips duplicates.
const projectRows: (typeof projects.$inferInsert)[] = [
  {
    repo: "ProStore---Fullstack-eCommerce-Platform",
    title: "ProStore - Full-Stack E-Commerce Platform",
    customBlurb:
      "A full-stack store built with Next.js 15, React 19, TypeScript, PostgreSQL, and Prisma. Features catalog, cart, checkout, orders, reviews, Auth.js, role-based access, Stripe and PayPal payments, and an admin dashboard.",
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "PayPal"],
  },
  {
    repo: "paradise-found",
    title: "Paradise Found - Travel & House Rental Booking",
    customBlurb:
      "An online accommodation booking platform built with Next.js SSR, Prisma, and PostgreSQL, with integrated Stripe payments.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Booking"],
  },
  {
    repo: "Developer-Portfolio",
    title: "Job Swift - AI-Assisted Job Tracking Platform",
    customBlurb:
      "An AI-assisted job tracking platform with personalized email and push alerts, real-time application status tracking, and JWT-secured REST APIs. Project details provided in the resume; code link points to the public portfolio repository.",
    tags: ["AI", "Job Tracking", "REST API", "JWT"],
  },
].map((p, i) => ({
  ...p,
  featured: true,
  order: i,
  hidden: false,
}));

const experienceRows = [
  {
    role: "Web Developer",
    org: "Anwar Technologies",
    period: "Mar 2025 – Present",
    location: "Dhaka, Bangladesh",
    isCurrent: true,
    description: [
      "Build and maintain full-stack applications with React, Next.js, TypeScript, and Node.js in an Agile team.",
      "Reduced API latency by 20% through caching and backend optimization.",
      "Improved UI performance by 25%, reduced page load time by 30%, and built reusable components that cut feature development time by 15%.",
      "Debug issues, review code, and collaborate through daily Git pull requests.",
    ],
    order: 0,
  },
  {
    role: "Software Developer",
    org: "MusabbirSpace3D",
    period: "Jun 2024 – Dec 2024",
    location: "Remote",
    isCurrent: false,
    description: [
      "Delivered 5+ full-stack interfaces using React, Node.js, Express, and MongoDB across three production releases.",
      "Integrated Stripe payments, Firebase Authentication, and third-party REST APIs.",
      "Worked remotely with the team to ship and maintain production features.",
    ],
    order: 1,
  },
];

// Skills are authored grouped by category, then flattened to rows with a
// running order so the Skills section renders them grouped and in sequence.
const skillGroups: {
  category: string;
  items: { name: string; level: string; iconPath: string }[];
}[] = [
  {
    category: "AI-Assisted Development",
    items: [
      { name: "ChatGPT", level: "Expert", iconPath: "/skills/javascript.svg" },
      { name: "GitHub Copilot", level: "Expert", iconPath: "/skills/github.svg" },
      { name: "Cursor", level: "Expert", iconPath: "/skills/typescript.svg" },
      { name: "Reviewing AI-Generated Code", level: "Expert", iconPath: "/skills/git.svg" },
      { name: "AI Workflow Integration", level: "Intermediate", iconPath: "/skills/nodejs.svg" },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "JavaScript (ES6+)", level: "Expert", iconPath: "/skills/javascript.svg" },
      { name: "TypeScript", level: "Expert", iconPath: "/skills/typescript.svg" },
      { name: "SQL", level: "Intermediate", iconPath: "/skills/postgresql.svg" },
      { name: "Python", level: "Intermediate", iconPath: "/skills/python.svg" },
      { name: "Java", level: "Intermediate", iconPath: "/skills/java.svg" },
    ],
  },
  {
    category: "Other Languages",
    items: [
      { name: "C++", level: "Intermediate", iconPath: "/skills/cpp.png" },
      { name: "Go", level: "Beginner", iconPath: "/skills/go.png" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React.js", level: "Expert", iconPath: "/skills/react.svg" },
      { name: "Next.js", level: "Expert", iconPath: "/skills/nextjs.png" },
      { name: "Redux", level: "Intermediate", iconPath: "/skills/redux.svg" },
      { name: "Zustand", level: "Intermediate", iconPath: "/skills/react.svg" },
      { name: "React Hook Form", level: "Intermediate", iconPath: "/skills/react.svg" },
      { name: "Zod", level: "Intermediate", iconPath: "/skills/typescript.svg" },
      { name: "Tailwind CSS", level: "Expert", iconPath: "/skills/css.svg" },
      { name: "Bootstrap", level: "Intermediate", iconPath: "/skills/css.svg" },
      { name: "Responsive Design", level: "Expert", iconPath: "/skills/html.svg" },
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      { name: "Node.js", level: "Expert", iconPath: "/skills/nodejs.svg" },
      { name: "Express.js", level: "Expert", iconPath: "/skills/express.svg" },
      { name: "RESTful APIs", level: "Expert", iconPath: "/skills/nodejs.svg" },
      { name: "JWT & Auth.js", level: "Intermediate", iconPath: "/skills/nodejs.svg" },
      { name: "Role-Based Authorization", level: "Intermediate", iconPath: "/skills/nodejs.svg" },
      { name: "Caching", level: "Intermediate", iconPath: "/skills/nodejs.svg" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", level: "Intermediate", iconPath: "/skills/postgresql.svg" },
      { name: "MongoDB", level: "Intermediate", iconPath: "/skills/mongodb.svg" },
      { name: "Mongoose", level: "Intermediate", iconPath: "/skills/mongodb.svg" },
      { name: "MySQL", level: "Intermediate", iconPath: "/skills/mysql.svg" },
      { name: "Prisma ORM", level: "Intermediate", iconPath: "/skills/postgresql.svg" },
      { name: "Schema Design", level: "Intermediate", iconPath: "/skills/postgresql.svg" },
    ],
  },
  {
    category: "Tools & Practices",
    items: [
      { name: "Git", level: "Expert", iconPath: "/skills/git.svg" },
      { name: "GitHub", level: "Expert", iconPath: "/skills/github.svg" },
      { name: "Docker", level: "Intermediate", iconPath: "/skills/docker.png" },
      { name: "Linux", level: "Intermediate", iconPath: "/skills/ubuntu.png" },
      { name: "Code Review & Debugging", level: "Expert", iconPath: "/skills/git.svg" },
      { name: "Performance Optimization", level: "Expert", iconPath: "/skills/nextjs.png" },
      { name: "Agile/Scrum", level: "Intermediate", iconPath: "/skills/git.svg" },
      { name: "Vercel", level: "Intermediate", iconPath: "/skills/nextjs.png" },
    ],
  },
];
const skillRows = skillGroups.flatMap((g, gi) =>
  g.items.map((it, ii) => ({
    name: it.name,
    iconPath: it.iconPath,
    category: g.category,
    level: it.level,
    // category index * 100 + item index keeps groups contiguous and ordered.
    order: gi * 100 + ii,
  })),
);

const serviceRows = [
  {
    title: "Full-Stack Web Development",
    shortDescription: "I build complete, production-ready web applications.",
    description:
      "I build and maintain end-to-end web applications with React, Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB. I own features from schema design and REST APIs through responsive UI, testing, and deployment, including Docker and Vercel. From simple sites to complex platforms, the result is a seamless, responsive, and SEO-friendly experience.",
    order: 0,
  },
  {
    title: "AI-Assisted Development",
    shortDescription: "AI-accelerated delivery with careful human review.",
    description:
      "I use ChatGPT, GitHub Copilot, and Cursor daily for implementation, debugging, and refactoring, and I review and test every AI-generated change before it ships. This workflow accelerates feature delivery while keeping quality, security, and maintainability intact.",
    order: 1,
  },
  {
    title: "API & Database Engineering",
    shortDescription: "Secure, fast REST APIs on solid data models.",
    description:
      "I design and build REST APIs with Node.js and Express, implement JWT and Auth.js authentication with role-based authorization, and validate requests with Zod. On the data side I work with PostgreSQL, MongoDB, Mongoose, MySQL, and Prisma, designing schemas, tuning queries, and applying caching to cut latency.",
    order: 2,
  },
  {
    title: "Performance Optimization",
    shortDescription: "Faster pages and APIs that users feel.",
    description:
      "I profile and optimize real applications: reduced API latency by 20% through caching and backend tuning, improved UI performance by 25%, and cut page load time by 30% through image optimization, bundle trimming, and smarter data fetching.",
    order: 3,
  },
];

const socialLinkRows = [
  {
    platform: "GitHub",
    url: "https://github.com/sojibpannashovon2",
    username: "sojibpannashovon2",
    order: 0,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/md-arifur-rahman-269764280",
    username: "md-arifur-rahman-269764280",
    order: 1,
  },
  {
    platform: "Email",
    url: "mailto:mdarifur554@gmail.com",
    username: "mdarifur554@gmail.com",
    order: 2,
  },
  {
    platform: "Portfolio",
    url: "https://md-arifur-rahman-portfolio25.netlify.app",
    username: "md-arifur-rahman-portfolio25.netlify.app",
    order: 3,
  },
];

const fundingLinkRows: (typeof fundingLinks.$inferInsert)[] = [];

const faqRows = [
  {
    question: "Who is Md Arifur Rahman?",
    answer:
      "Md Arifur Rahman is a Dhaka-based Full Stack Developer and CSE graduate with 2+ years of professional experience building production web applications.",
    order: 0,
  },
  {
    question: "What technologies does Arifur use?",
    answer:
      "His core stack includes React, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Prisma, REST APIs, Docker, and Vercel.",
    order: 1,
  },
  {
    question: "How does Arifur use AI coding assistants?",
    answer:
      "He uses ChatGPT, GitHub Copilot, and Cursor to support implementation, debugging, and refactoring, then carefully reviews and validates AI-generated code before shipping.",
    order: 2,
  },
  {
    question: "Is Arifur available for work?",
    answer: "Yes. Md Arifur Rahman is available for full-time remote work.",
    order: 3,
  },
  {
    question: "How can I contact Arifur?",
    answer:
      "Email mdarifur554@gmail.com or connect on LinkedIn at linkedin.com/in/md-arifur-rahman-269764280.",
    order: 4,
  },
];

// Demo testimonials covering every case (pending/approved/rejected, featured,
// complete vs sparse details, a duplicate email). Seeded ONLY into an empty
// testimonials table so real user submissions are never wiped.
const testimonialRows: (typeof testimonials.$inferInsert)[] = [
  {
    name: "Team Lead",
    email: "lead@example.com",
    relationship: "Team Lead, Anwar Technologies",
    content:
      "Arifur takes a feature from database schema to deployed UI without needing hand-holding. His caching work cut our API latency noticeably, and his pull requests are consistently clean and well-reviewed.",
    status: "approved",
    featured: true,
    order: 0,
    linkedinUrl: "https://linkedin.com/in/md-arifur-rahman-269764280",
  },
  {
    name: "Project Manager",
    email: "pm@example.com",
    relationship: "Project Manager, MusabbirSpace3D",
    content:
      "Working fully remote, Arifur delivered five production interfaces across three releases on schedule. He integrated Stripe and Firebase Auth without issues and communicated clearly across time zones.",
    status: "approved",
    featured: true,
    order: 1,
  },
  {
    name: "Frontend Colleague",
    email: "colleague@example.com",
    relationship: "Frontend Developer, colleague",
    content:
      "Arifur's reusable components saved our team real time on every new feature. He is the person I go to when a Next.js rendering issue makes no sense.",
    status: "approved",
    featured: false,
    order: 2,
    githubUrl: "https://github.com/sojibpannashovon2",
  },
  {
    name: "CSE Professor",
    email: "professor@example.com",
    relationship: "Professor, Green University of Bangladesh",
    content:
      "Arifur paired strong fundamentals with genuine curiosity. His final-year work showed engineering judgment well beyond the classroom.",
    status: "approved",
    featured: false,
    order: 3,
  },
  {
    name: "Startup Client",
    email: "client@example.com",
    relationship: "Startup founder, freelance project",
    content:
      "He shipped our booking platform MVP ahead of the deadline and the Lighthouse scores came back above 90. Communication was proactive throughout.",
    status: "pending",
    featured: false,
    order: 4,
  },
  {
    name: "Teammate",
    email: "teammate@example.com",
    relationship: "Former teammate",
    content: "Dependable, sharp, and a great teammate. Would work with him again in a heartbeat.",
    status: "pending",
    featured: false,
    order: 5,
  },
  {
    name: "Spam Bot",
    email: "spam@example.com",
    relationship: "n/a",
    content:
      "Check out my amazing crypto deals at this totally legit link, definitely not spam at all friend.",
    status: "rejected",
    featured: false,
    order: 7,
  },
];

// Everything the seed writes, inserted only on a fresh (empty) database.
const SEED_DATA = {
  taglines: taglineRows,
  profile: profileRow,
  projects: projectRows,
  experiences: experienceRows,
  skills: skillRows,
  services: serviceRows,
  socialLinks: socialLinkRows,
  fundingLinks: fundingLinkRows,
  faqs: faqRows,
};

/**
 * Inserts ONLY when there is no profile row, and never wipes or overwrites, so re-running this
 * against a populated database preserves every admin edit.
 */
async function seed() {
  const [existing] = await db.select({ id: profile.id }).from(profile).limit(1);
  if (existing) {
    console.log("Database already has content; skipping seed.");
    return;
  }

  console.log("Empty database; seeding content tables…");

  await db.transaction(async (tx) => {
    await tx.insert(taglines).values(SEED_DATA.taglines);
    await tx.insert(profile).values(SEED_DATA.profile);
    await tx.insert(projects).values(SEED_DATA.projects);
    await tx.insert(experiences).values(SEED_DATA.experiences);
    await tx.insert(skills).values(SEED_DATA.skills);
    await tx.insert(services).values(SEED_DATA.services);
    await tx.insert(socialLinks).values(SEED_DATA.socialLinks);
    // Funding links are empty for this profile - skip rather than insert zero rows.
    if (SEED_DATA.fundingLinks.length > 0) {
      await tx.insert(fundingLinks).values(SEED_DATA.fundingLinks);
    }
    await tx.insert(faqs).values(SEED_DATA.faqs);
  });

  console.log("Seed complete.");
}

/**
 * Seed demo testimonials for LOCAL UI testing only. These are fabricated, so
 * they must never reach production. `bun run` leaves NODE_ENV unset, so the
 * database host decides: anything but localhost is skipped.
 * Seeds only when the table is empty so real submissions are never wiped.
 */
async function seedDemoTestimonials() {
  if (process.env.NODE_ENV === "production" || !isLocalDatabaseUrl(process.env.DATABASE_URL)) {
    console.log("Not a local database; skipping demo testimonials.");
    return;
  }
  const existing = await db.select({ id: testimonials.id }).from(testimonials).limit(1);
  if (existing.length > 0) {
    console.log("Testimonials already present; skipping demo seed.");
    return;
  }
  await db.insert(testimonials).values(testimonialRows);
  console.log(`Seeded ${testimonialRows.length} demo testimonials (local only).`);
}

seed()
  .then(() => seedDemoTestimonials())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
