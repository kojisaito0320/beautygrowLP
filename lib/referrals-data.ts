// Candidate PII lives here — this module must never be imported from client code.
import "server-only";
import wc from "@/content/data/private/referrals.wc.json";
import miraizm from "@/content/data/private/referrals.miraizm.json";
import type { ReferralsVariant } from "@/lib/schema";

export interface ReferralEntry {
  date: string;
  name: string;
  referrer: string;
  category: "celeste" | "matsuge" | "color" | "oak";
  place: string;
  status: string;
  tone: "ok" | "mid" | "ng" | "none";
  interview: string;
  /** WC: 入社日 / miraizm: 雇用形態 */
  extra: string;
  note: string;
}

const DATA: Record<ReferralsVariant, ReferralEntry[]> = {
  wc: wc as ReferralEntry[],
  miraizm: miraizm as ReferralEntry[],
};

export function getReferralEntries(variant: ReferralsVariant): ReferralEntry[] {
  return DATA[variant];
}
