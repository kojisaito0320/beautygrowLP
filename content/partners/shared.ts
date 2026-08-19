// Content shared by all board LPs that changes on each update cycle.
// Edit here once — every partner LP picks it up.
import type { HeroStat, RichLine } from "@/lib/schema";

export const LAST_UPDATED =
  "最終更新 2026年8月18日（募集内容は2026/8/7時点・強化エリアは2026/7月末時点）";

export const FOOTER_UPDATED =
  "掲載条件は作成時点のものです。最新の条件・個別のご相談は担当（Beauty Grow 採用担当）までお問い合わせください。｜最終更新 2026年8月17日";

export const SHARED_HERO_STATS: HeroStat[] = [
  { value: "41", unit: "店舗", label: "求人中の店舗（うち5店はオープン準備中）" },
  { value: "15", unit: "店舗", label: "最優先（★★★）", gold: true },
];

/** サマリ「求人内容の変更点」 */
export const JOB_CHANGES: RichLine[] = [
  { text: "8/18更新：募集内容の変更はありません（2026/8/7時点の内容を継続掲載）" },
  {
    text: "新ブランド nicotto（三軒茶屋・門前仲町・八王子）は2026年下旬オープン予定。オープニング募集中。西日暮里にも買収予定店舗あり",
  },
  {
    text: "",
    link: {
      href: "/nicotto",
      label: "→ nicotto業態紹介ページ",
      sub: "（コンセプト・募集要項・給与テーブル）",
    },
  },
];

/** サマリ「強化エリアの変更点（★★★）」 */
export const KYOKA_CHANGES: RichLine[] = [
  { badge: "NEW", text: "nicotto 3店舗（三軒茶屋・門前仲町・八王子）を★★で追加（各3名募集）" },
  { badge: "まつげ", text: "沖縄（東京のまつげ店は募集停止。Belle渋谷店は閉店予定）" },
  { badge: "カラー", text: "仙川" },
  { badge: "セレスト", text: "葛西・住吉・門前仲町・ときわ台・大泉学園・高円寺・成増・川口・福間・小倉・久屋大通（復帰）" },
  { badge: "OAK", text: "福間・九大学研都市" },
];
