// Shared type definitions for LP content.
// Adding a new partner LP = add a PartnerConfig in content/partners/ and register it in index.ts.

export type Brand = "celeste" | "oak" | "nicotto" | "matsuge" | "color";
export type EmploymentKey = "s" | "p" | "g"; // 正社員 / パート・アルバイト / 業務委託
export type Timing = "now" | "later";

export interface StoreRow {
  brand: Brand;
  brandLabel: string;
  area: string;
  shop: string;
  /** Small grey sub-line under the shop name (e.g. former shop name) */
  shopSub?: string;
  employmentLabel: string;
  employment: EmploymentKey[];
  timing?: Timing; // defaults to "now"
  /** Master sheet ⑤ column B star: accepts stylists who bring their own clients */
  clientOk?: boolean;
  stars: string; // "★" | "★★" | "★★★" | ""
  count: string; // rendered as-is; empty string allowed
  hpbUrl?: string;
  youkenLink?: boolean;
  note?: string;
}

export interface HeroStat {
  value: string;
  unit: string;
  label: string;
  gold?: boolean;
}

export interface RichLine {
  /** Bold prefix rendered as <b>…</b>： before the text (e.g. "NEW", "まつげ") */
  badge?: string;
  text: string;
  /** Render the whole line in the muted .note style */
  muted?: boolean;
  /** Optional trailing link rendered as <a><b>text</b></a> */
  link?: { href: string; label: string; sub?: string };
}

export interface ReferralPublicRow {
  name: string; // 姓のみ（例: 浅井様）
  agent: string; // ご担当
  brand: Exclude<Brand, "nicotto" | "oak"> | "oak";
  brandLabel: string;
  shop: string;
  joined: string; // 入社日（表示文字列）
  outcome: string; // その後
}

export type ReferralsVariant = "wc" | "miraizm";

export interface PartnerConfig {
  slug: string;
  partnerName: string; // 例: 株式会社グラム（ワークキャンバス）
  meta: {
    title: string;
    ogTitle: string;
    ogDescription: string;
    ogUrl: string;
  };
  hero: {
    /** h1 の1行目（例: "Beauty Grow 求人情報ボード"） */
    heading: string;
    eyebrow: string;
    addressee: string; // h1 の .thin 行
    stats: HeroStat[];
  };
  summary: {
    dealChanges: RichLine[]; // 成約者の変更点
  };
  salaryGrowthNote: string;
  referralSummary: {
    stats: HeroStat[];
    rows: ReferralPublicRow[];
    privacyNote: string;
  };
  footerNote: string;
  referrals: {
    variant: ReferralsVariant;
    passwordEnv: string;
    /** <title> of the protected page */
    pageTitle: string;
    /** eyebrow on the protected page, e.g. "CONFIDENTIAL — FOR WORK CANVAS" */
    eyebrow: string;
    lead: string;
    stats: HeroStat[];
    /** lines of the note under the table (joined with <br>) */
    tableNoteLines: string[];
    footerNote: string;
  } | null;
}
