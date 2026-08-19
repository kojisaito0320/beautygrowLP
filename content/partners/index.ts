// Registry of partner LPs.
// To add a new LP: create content/partners/<slug>.ts and register it here —
// the page /<slug> (and /<slug>/referrals if configured) appears automatically.
import type { PartnerConfig } from "@/lib/schema";
import { wc } from "./wc";
import { miraizm } from "./miraizm";

export const PARTNERS: Record<string, PartnerConfig> = {
  wc,
  miraizm,
};

export function getPartner(slug: string): PartnerConfig | undefined {
  return PARTNERS[slug];
}

export function partnerSlugs(): string[] {
  return Object.keys(PARTNERS);
}
