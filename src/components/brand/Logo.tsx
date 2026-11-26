import { cn } from "@/utils/cn";

export function Logo({
  className,
  withWordmark = false,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        role="img"
        aria-label="Md Arifur Rahman logo"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          {/* CSS variables rather than brand.ts constants: SVG stop-color resolves them,
              so the mark follows a runtime palette change instead of staying on the
              default. brand.ts is still the source of the default those vars hold. */}
          <linearGradient id="logo-a" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--brand-deep)" />
            <stop offset="1" stopColor="var(--brand-mid)" />
          </linearGradient>
          <radialGradient id="logo-spark" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="var(--brand-bright)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--brand-bright)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M6 24 L16 6 L26 24 M10.5 17.5 H21.5"
          fill="none"
          stroke="url(#logo-a)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="6" r="2.2" fill="var(--brand-bright)" />
      </svg>
      {withWordmark ? (
        <span className="gradient-text font-mono text-lg leading-none font-semibold tracking-tight">
          mdarifur
        </span>
      ) : null}
    </span>
  );
}
