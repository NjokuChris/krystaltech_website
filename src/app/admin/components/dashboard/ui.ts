/**
 * Shared CMS design tokens.
 * Mirrors the public site's design system so the admin + auth screens
 * feel like the same product:
 *   sand  #F3F1EA  page background
 *   ink   #11142B  text / primary surface
 *   amber #FFB627  accent
 * Import these class strings instead of re-typing Tailwind everywhere.
 */

export const COLORS = {
  sand: "#F3F1EA",
  ink: "#11142B",
  amber: "#FFB627",
} as const;

export const ui = {
  // Page-level
  heading: "text-3xl font-light tracking-tight text-[#11142B]",
  subheading: "text-sm text-[#11142B]/60",

  // Surfaces
  card: "rounded-2xl border border-[#11142B]/10 bg-white shadow-sm shadow-[#11142B]/5",

  // Forms
  label: "mb-1.5 block text-sm font-medium text-[#11142B]/80",
  input:
    "w-full rounded-xl border border-[#11142B]/15 bg-white px-3.5 py-2.5 text-sm text-[#11142B] " +
    "placeholder:text-[#11142B]/35 transition focus:border-[#11142B]/30 focus:outline-none " +
    "focus:ring-2 focus:ring-[#FFB627]/40",
  errorText: "mt-1 text-sm text-red-500",
  errorBox: "rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700",

  // Buttons
  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-[#11142B] px-5 py-2.5 text-sm " +
    "font-semibold text-white shadow-md shadow-[#11142B]/10 transition hover:shadow-[#11142B]/25 " +
    "hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0",
  btnSecondary:
    "inline-flex items-center justify-center gap-2 rounded-full border border-[#11142B]/20 px-5 py-2.5 " +
    "text-sm font-semibold text-[#11142B] transition hover:bg-[#11142B]/5 disabled:opacity-60",
  // Small pill actions used inside table rows
  chip:
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50",
} as const;

/** Status badge classes by state. */
export function badge(kind: "on" | "off"): string {
  return kind === "on"
    ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700"
    : "inline-flex items-center gap-1.5 rounded-full bg-[#11142B]/8 px-2.5 py-1 text-xs font-semibold text-[#11142B]/55";
}
