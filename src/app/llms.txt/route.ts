import { SITE } from "@/lib/seo/site";
import { getFaqs } from "@/lib/queries";

export const dynamic = "force-static";

export async function GET() {
  const faqs = await getFaqs();
  const body = `# ${SITE.name}

> ${SITE.description}

## Identity

- Name: Md Arifur Rahman (sojibpannashovon2)
- Role: Full Stack Developer (AI-Assisted)
- Based in: Dhaka, Bangladesh
- Availability: Full-time remote work

## Links

${SITE.sameAs.map((u) => `- ${u}`).join("\n")}
- ${SITE.url}

## FAQ

${faqs.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}

See ${SITE.url}/llms-full.txt for the full profile.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
