import { BRAND } from "@/lib/brand";

// These ramps drive the picker swatches while globals.css applies the actual tokens;
// globals.theme.test.ts asserts they match, so a mismatch cannot show one colour and apply
// another. Sapphire takes its ramp from brand.ts rather than repeating it here.
export const DEFAULT_PALETTE = "sapphire";

export type PaletteId = "sapphire" | "oceanic" | "graphite" | "forest" | "crimson";

export const PALETTES: ReadonlyArray<{
  id: PaletteId;
  label: string;
  ramp: readonly [string, string, string];
}> = [
  // Default palette (sapphire). Lives in brand.ts/globals.css :root rather than here.
  { id: "sapphire", label: "Sapphire", ramp: [BRAND.deep, BRAND.mid, BRAND.bright] },
  { id: "oceanic", label: "Oceanic", ramp: ["#1e3a8a", "#2563eb", "#60a5fa"] },
  { id: "graphite", label: "Graphite", ramp: ["#1f2937", "#475569", "#94a3b8"] },
  { id: "forest", label: "Forest", ramp: ["#064e3b", "#059669", "#6ee7b7"] },
  { id: "crimson", label: "Crimson", ramp: ["#7f1d1d", "#dc2626", "#f87171"] },
];

export const PALETTE_IDS = PALETTES.map((p) => p.id);

export function isPaletteId(value: unknown): value is PaletteId {
  return typeof value === "string" && (PALETTE_IDS as string[]).includes(value);
}

// Also hardcoded in the pre-paint script in layout.tsx - keep the two in sync.
export const PALETTE_STORAGE_KEY = "palette";
