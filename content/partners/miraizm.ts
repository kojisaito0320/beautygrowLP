import type { PartnerConfig } from "@/lib/schema";
import { DEAL_CHANGES, SHARED_HERO_STATS } from "./shared";

export const miraizm: PartnerConfig = {
  slug: "miraizm",
  partnerName: "ミライズム",
  meta: {
    title: "Beauty Grow 求人｜ミライズム様向け",
    ogTitle: "Beauty Grow 求人",
    ogDescription: "全国約70店舗の最新募集状況・強化エリア・募集要項（ミライズム様向け・毎回更新）",
    ogUrl: "https://beautygrow-lp.vercel.app/miraizm",
  },
  hero: {
    heading: "Beauty Grow 求人",
    eyebrow: "FOR MIRAIZM PARTNERS",
    addressee: "ミライズム御中｜ご紹介用最新情報",
    stats: [
      ...SHARED_HERO_STATS,
      { value: "9", unit: "名", label: "ミライズム様ご紹介の成約" },
    ],
  },
  summary: {
    dealChanges: DEAL_CHANGES.miraizm,
  },
  salaryGrowthNote:
    "※ 単価は客単価。年収実例は当社在籍スタッフの実績です。詳細は共有スプレッドシートの「給与の推移」タブをご覧ください。",
  referralSummary: {
    stats: [
      { value: "38", unit: "名", label: "累計ご紹介（2024/4〜2026/8）" },
      { value: "9", unit: "名", label: "成約（採用・入社決定）", gold: true },
      { value: "16", unit: "ヶ月", label: "最長在籍（2025/4入社・継続中）" },
    ],
    rows: [
      { name: "小原様", agent: "−", brand: "celeste", brandLabel: "セレスト", shop: "竹ノ塚", joined: "2025年1月", outcome: "退職（2025年6月・約5ヶ月在籍・パート）" },
      { name: "江黒様", agent: "飯田様", brand: "celeste", brandLabel: "セレスト", shop: "町田", joined: "2025年4月", outcome: "約17ヶ月・在籍中（アルバイト・売上約60万円）" },
      { name: "桑江様", agent: "保志場様", brand: "color", brandLabel: "カラー", shop: "那覇", joined: "2025年5月", outcome: "約15ヶ月・在籍中（アルバイト・ご家族都合の転居予定に伴い小倉店勤務を提案中）" },
      { name: "川口様", agent: "二階堂様", brand: "celeste", brandLabel: "セレスト", shop: "江古田", joined: "2025年6月", outcome: "約14ヶ月・在籍中（8月から業務委託へ・月120時間勤務／約60万円売上）" },
      { name: "谷崎様", agent: "西川様", brand: "celeste", brandLabel: "セレスト", shop: "町田", joined: "2026年4月", outcome: "約5ヶ月・在籍中（正社員・本社採用業務兼務、売上100万円突破で上位10％）" },
      { name: "上地様", agent: "ヤヤ様", brand: "matsuge", brandLabel: "まつげ", shop: "沖縄", joined: "2025年11月", outcome: "退職（2026年4月・約5ヶ月在籍・エクステ志向のため）" },
      { name: "鈴木様", agent: "小口様", brand: "celeste", brandLabel: "セレスト", shop: "川口", joined: "2026年2月", outcome: "退職（約6ヶ月在籍・勤務姿勢のミスマッチ）" },
      { name: "眞木様", agent: "二階堂様", brand: "celeste", brandLabel: "セレスト", shop: "大泉学園", joined: "2026年3月", outcome: "退職（2026年7月・約5ヶ月在籍・ほぼ出勤されず）" },
      { name: "富永様", agent: "井上様", brand: "matsuge", brandLabel: "まつげ", shop: "栄", joined: "2026年9月 予定", outcome: "採用（正社員・9月より東京研修）" },
    ],
    privacyNote:
      "個人情報保護のため、本ページではご成約者を姓のみで記載しています。選考中・辞退を含む全38名のご紹介一覧は、パスワード保護ページでご覧いただけます（パスワードは担当者から別途お伝えしています）。最長在籍は江黒様（2025年4月入社・継続中）です。",
  },
  footerNote:
    "本ページはミライズム様との人材紹介取引のための共有資料です。掲載内容の転載・候補者様以外への共有はご遠慮ください。",
  referrals: {
    variant: "miraizm",
    passwordEnv: "REFERRALS_PASSWORD_MIRAIZM",
    pageTitle: "ご紹介一覧（全履歴）｜Beauty Grow × ミライズム",
    eyebrow: "CONFIDENTIAL — FOR MIRAIZM",
    lead: "ミライズム様からのご紹介の全履歴です。選考中・辞退・お断りを含むため、本ページは関係者限りでお願いいたします。最新の進捗は共有スプレッドシート「ご紹介者様」タブと同期しています。",
    stats: [
      { value: "38", unit: "名", label: "累計ご紹介（2024/4〜2026/8）" },
      { value: "10", unit: "名", label: "成約（採用・入社決定）", gold: true },
      { value: "0", unit: "名", label: "選考・調整中" },
    ],
    tableNoteLines: [
      "※ 2026/8/19時点・共有スプレッドシート「ご紹介者様」タブより転記（年の記載がない日付は前後の記録から補完しています）。ステータスの原文・補足は同タブをご確認ください。",
      "※ 列の見出しをクリックすると並び替えできます（もう一度クリックで昇順⇄降順）。絞り込みボタンは複数選択できます。",
    ],
    footerNote:
      "本ページは株式会社Beauty Growとミライズム様の人材紹介取引に関する機密資料です。候補者様の個人情報を含むため、取り扱いにご注意ください。｜最終更新 2026年8月19日",
  },
};
