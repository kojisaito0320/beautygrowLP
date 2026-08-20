// Content shared by all board LPs that changes on each update cycle.
// The per-cycle text itself lives in content/data/updates.json — the single
// source read by both the LPs and tools/sheets-sync/push-summary.mjs
// (which mirrors it into the partner spreadsheets' ★更新サマリ tabs).
import type { HeroStat, RichLine } from "@/lib/schema";
import UPDATES from "@/content/data/updates.json";

export const LAST_UPDATED = UPDATES.lastUpdated;

export const FOOTER_UPDATED = UPDATES.footerUpdated;

export const SHARED_HERO_STATS: HeroStat[] = [
  { value: "39", unit: "店舗", label: "求人中の店舗（うち5店はオープン準備中）" },
  { value: "15", unit: "店舗", label: "最優先（★★★）", gold: true },
];

/** サマリ「求人内容の変更点」 */
export const JOB_CHANGES: RichLine[] = UPDATES.jobChanges;

/** サマリ「強化エリアの変更点（★★★）」 */
export const KYOKA_CHANGES: RichLine[] = UPDATES.kyokaChanges;

/** サマリ「成約者の変更点」（パートナー別） */
export const DEAL_CHANGES: Record<"wc" | "miraizm", RichLine[]> = UPDATES.dealChanges;
