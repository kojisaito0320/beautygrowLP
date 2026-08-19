import type { PartnerConfig } from "@/lib/schema";
import { SHARED_HERO_STATS } from "./shared";

export const wc: PartnerConfig = {
  slug: "wc",
  partnerName: "株式会社グラム（ワークキャンバス）",
  meta: {
    title: "Beauty Grow 求人情報ボード｜ワークキャンバス様向け",
    ogDescription: "全国約70店舗の最新募集状況・強化エリア・募集要項（ワークキャンバス様向け・毎回更新）",
    ogUrl: "https://beautygrow-lp.vercel.app/wc",
  },
  hero: {
    eyebrow: "FOR WORK CANVAS PARTNERS",
    addressee: "株式会社グラム（ワークキャンバス）御中｜ご紹介用最新情報",
    stats: [
      ...SHARED_HERO_STATS,
      { value: "11", unit: "名", label: "ワークキャンバス様ご紹介の成約" },
    ],
  },
  summary: {
    dealChanges: [
      { badge: "NEW", text: "高橋様 2026/2退職（記録の訂正）／小原様・松野様は内定ステータスに整理" },
      { badge: "NEW", text: "深町様・奥山様・中村様 在籍中（各店2ヶ月目）／浅井様 2025年新人賞受賞" },
      { text: "境野様 5/8入社・在籍中／梅澤様 10/1入社予定（内定）" },
      { text: "詳細は「ご紹介実績」をご覧ください", muted: true },
    ],
  },
  salaryGrowthNote: "※ 単価は客単価。年収実例は当社在籍スタッフの実績です。",
  referralSummary: {
    stats: [
      { value: "38", unit: "名", label: "累計ご紹介（2025/3〜2026/8）" },
      { value: "11", unit: "名", label: "成約（採用・入社決定）", gold: true },
      { value: "16", unit: "ヶ月", label: "最長在籍（2025年5月入社・在籍中）" },
    ],
    rows: [
      { name: "高橋様", agent: "中本様", brand: "matsuge", brandLabel: "まつげ", shop: "宮下公園", joined: "2025年4月", outcome: "退職（2026年2月・約11ヶ月在籍・勤怠面の課題のため）" },
      { name: "松原様", agent: "荒木様", brand: "matsuge", brandLabel: "まつげ", shop: "恵比寿", joined: "2025年5月", outcome: "約16ヶ月・在籍中（アルバイト週3・独立準備のため2026年4月以降シフトインなし）" },
      { name: "浅井様", agent: "工藤様", brand: "celeste", brandLabel: "セレスト", shop: "成増", joined: "2025年6月", outcome: "約15ヶ月・在籍中（業務委託・2025年新人賞受賞、売上80万円突破）" },
      { name: "シュレスタ様", agent: "矢澤様", brand: "celeste", brandLabel: "セレスト", shop: "町田", joined: "2025年12月", outcome: "約9ヶ月・在籍中（パート・美髪マイスター取得、毎月約100時間勤務）" },
      { name: "境野様", agent: "齋藤様", brand: "celeste", brandLabel: "セレスト", shop: "心斎橋", joined: "2026年5月", outcome: "約3ヶ月・在籍中（業務委託・月70時間勤務）" },
      { name: "小原様", agent: "荒木様", brand: "matsuge", brandLabel: "まつげ", shop: "池袋東口", joined: "−", outcome: "内定（10月に内定者懇談会予定）" },
      { name: "深町様", agent: "山下様", brand: "matsuge", brandLabel: "まつげ", shop: "池袋", joined: "2026年7月", outcome: "約2ヶ月・在籍中（アルバイト・基礎研修・MTG参加）" },
      { name: "梅澤様", agent: "山下様", brand: "celeste", brandLabel: "セレスト", shop: "成増", joined: "2026年10月 予定", outcome: "内定（業務委託）" },
      { name: "奥山様", agent: "齋藤様", brand: "celeste", brandLabel: "セレスト", shop: "なんば", joined: "2026年7月", outcome: "約2ヶ月・在籍中（アルバイト・基礎研修・MTG参加）" },
      { name: "中村様", agent: "矢澤様", brand: "celeste", brandLabel: "セレスト", shop: "なんば", joined: "2026年7月", outcome: "約2ヶ月・在籍中（アルバイト・基礎研修・MTG参加）" },
      { name: "松野様", agent: "山下様", brand: "celeste", brandLabel: "セレスト", shop: "高円寺", joined: "−", outcome: "内定（2027年7月入社予定）" },
    ],
    privacyNote:
      "個人情報保護のため、本ページではご成約者を姓のみで記載しています。選考中・辞退を含む全38名のご紹介一覧は、パスワード保護ページでご覧いただけます（パスワードは担当者から別途お伝えしています）。",
  },
  footerNote:
    "本ページは株式会社グラム（ワークキャンバス）様との人材紹介取引のための共有資料です。掲載内容の転載・候補者様以外への共有はご遠慮ください。",
  referrals: {
    variant: "wc",
    passwordEnv: "REFERRALS_PASSWORD_WC",
    pageTitle: "ご紹介一覧（全履歴）｜Beauty Grow × ワークキャンバス",
    eyebrow: "CONFIDENTIAL — FOR WORK CANVAS",
    lead: "株式会社グラム（ワークキャンバス）様からのご紹介の全履歴です。選考中・辞退・お断りを含むため、本ページは関係者限りでお願いいたします。最新の進捗は共有スプレッドシート「ご紹介者様」タブと同期しています。",
    stats: [
      { value: "38", unit: "名", label: "累計ご紹介（2025/3〜2026/8）" },
      { value: "11", unit: "名", label: "成約（採用・入社決定）", gold: true },
      { value: "1", unit: "名", label: "選考・調整中" },
    ],
    tableNoteLines: [
      "※ 2026/8/17時点・共有スプレッドシート「ご紹介者様」タブより転記。ステータスの原文・補足は同タブをご確認ください。",
      "※ 列の見出しをクリックすると並び替えできます（もう一度クリックで昇順⇄降順）。",
    ],
    footerNote:
      "本ページは株式会社Beauty Growと株式会社グラム（ワークキャンバス）様の人材紹介取引に関する機密資料です。候補者様の個人情報を含むため、取り扱いにご注意ください。｜最終更新 2026年8月17日",
  },
};
