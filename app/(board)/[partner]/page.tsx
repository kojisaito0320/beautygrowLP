import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPartner, partnerSlugs } from "@/content/partners";
import { FOOTER_UPDATED, JOB_CHANGES, KYOKA_CHANGES, LAST_UPDATED } from "@/content/partners/shared";
import storesJson from "@/content/data/stores.json";
import type { HeroStat, RichLine, StoreRow } from "@/lib/schema";
import StoreExplorer from "@/components/board/StoreExplorer";
import PublicRefTable from "@/components/board/PublicRefTable";
import {
  CompanySection,
  InterviewSection,
  PhotosSection,
  SalaryGrowthSection,
  YoukenSection,
} from "@/components/board/sections";

const stores = storesJson as StoreRow[];

export const dynamicParams = false;

export function generateStaticParams() {
  return partnerSlugs().map((partner) => ({ partner }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ partner: string }>;
}): Promise<Metadata> {
  const { partner } = await params;
  const config = getPartner(partner);
  if (!config) return {};
  return {
    title: config.meta.title,
    description:
      "Beauty Grow（CELESTE・OAK・SPEEDY・Colors Labo・Natural ViVi）の最新募集状況。強化エリア・募集要項・店舗写真・ご紹介実績をまとめた紹介会社様向け情報ボード。",
    openGraph: {
      title: "Beauty Grow 求人情報ボード",
      description: config.meta.ogDescription,
      type: "website",
      url: config.meta.ogUrl,
      siteName: "Beauty Grow",
    },
  };
}

function Stat({ stat }: { stat: HeroStat }) {
  return (
    <div className={stat.gold ? "stat gold" : "stat"}>
      <b>{stat.value}</b>
      {stat.unit}
      <span>{stat.label}</span>
    </div>
  );
}

function Line({ line }: { line: RichLine }) {
  if (line.link) {
    return (
      <li>
        <a href={line.link.href} target="_blank" rel="noopener">
          <b>{line.link.label}</b>
          {line.link.sub}
        </a>
      </li>
    );
  }
  return (
    <li className={line.muted ? "note" : undefined}>
      {line.badge && (
        <>
          <b>{line.badge}</b>：
        </>
      )}
      {line.text}
    </li>
  );
}

export default async function BoardPage({
  params,
}: {
  params: Promise<{ partner: string }>;
}) {
  const { partner } = await params;
  const config = getPartner(partner);
  if (!config) notFound();

  return (
    <>
      <nav className="nav" aria-label="ページ内メニュー">
        <div className="nav-inner">
          <span className="nav-brand">Beauty Grow</span>
          <a href="#summary">サマリ</a>
          <a href="#stores">求人中店舗</a>
          <a href="#youken">募集要項</a>
          <a href="#salary-growth">給与の推移</a>
          <a href="#referrals">ご紹介実績</a>
          <a href="#photos">店舗写真</a>
          <a href="#interview">インタビュー</a>
          <a href="#company">会社概要</a>
          <a className="nav-nicotto" href="/nicotto" target="_blank" rel="noopener">nicotto業態紹介 ↗</a>
        </div>
      </nav>

      <header className="hero">
        <p className="hero-eyebrow">{config.hero.eyebrow}</p>
        <h1>
          Beauty Grow 求人情報ボード
          <span className="thin">{config.hero.addressee}</span>
        </h1>
        <p className="hero-lead">直営約70店舗（美容室 CELESTE・OAK・nicotto／ヘアカラー専門 SPEEDY・Colors Labo／アイラッシュ Natural ViVi ほか）の最新募集状況をまとめています。★は強化度（最大3つ）で、★★★が最優先の急募店舗です。</p>
        <div className="hero-stats">
          {config.hero.stats.map((s) => (
            <Stat stat={s} key={s.label} />
          ))}
        </div>
        <p className="updated">{LAST_UPDATED}</p>
      </header>

      <a className="nicotto-banner" href="/nicotto" target="_blank" rel="noopener"><b>NEW</b>新業態「nicotto（ニコット）」の業態紹介ページを公開しました｜コンセプト・募集要項・給与テーブルはこちら →</a>

      <section id="summary">
        <div className="sec-head"><h2>サマリ</h2><span className="en">SUMMARY</span></div>
        <div className="sum-grid">
          <div className="sum-card">
            <h3>ホームページ</h3>
            <ul>
              <li><a href="https://beautygrow.co.jp" target="_blank" rel="noopener">株式会社Beauty Grow 公式サイト</a></li>
              <li className="note">会社の想い・ブランド紹介はこちらから</li>
            </ul>
          </div>
          <div className="sum-card">
            <h3>求人内容の変更点</h3>
            <ul>
              {JOB_CHANGES.map((line, i) => (
                <Line line={line} key={i} />
              ))}
            </ul>
          </div>
          <div className="sum-card">
            <h3>強化エリアの変更点（★★★）</h3>
            <ul>
              {KYOKA_CHANGES.map((line, i) => (
                <Line line={line} key={i} />
              ))}
            </ul>
          </div>
          <div className="sum-card">
            <h3>成約者の変更点</h3>
            <ul>
              {config.summary.dealChanges.map((line, i) => (
                <Line line={line} key={i} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="stores">
        <div className="sec-head"><h2>求人中の店舗一覧</h2><span className="en">OPEN POSITIONS</span></div>
        <StoreExplorer stores={stores} />
        <p className="note" style={{ marginTop: 12 }}>※ 絞り込みボタンは<b>複数選択できます</b>（もう一度押すと解除・「すべて」でリセット）。エリア担当が複数の方は担当エリアをまとめて選択してください。<br />※ 列の見出しをクリックすると並び替えできます（もう一度クリックで昇順⇄降順）。<br />※ 上記以外のセレスト各店も、指名のお客様を50名以上お連れいただける方は全店舗でご紹介可能です（前店と同じ価格でのメニュー導入可・指名のお客様優先の施術可）。<br />※ カラー専門店は、土日祝・遅番に出勤できる方なら週1〜2日でも歓迎です（早番はブランクのない方であれば週1〜2日でも可）。</p>
      </section>

      <YoukenSection />

      <SalaryGrowthSection note={config.salaryGrowthNote} />

      <section id="referrals">
        <div className="sec-head"><h2>ご紹介実績・その後</h2><span className="en">REFERRALS</span></div>
        <div className="ref-stats">
          {config.referralSummary.stats.map((s) => (
            <Stat stat={s} key={s.label} />
          ))}
        </div>
        <PublicRefTable rows={config.referralSummary.rows} />
        <p className="privacy">{config.referralSummary.privacyNote}</p>
        {config.referrals && (
          <p style={{ marginTop: 14 }}>
            <a className="link-card" style={{ display: "inline-block" }} href={`/${config.slug}/referrals`}>
              <b>ご紹介一覧（全履歴）を開く</b>
              <span>パスワード保護ページ｜ご紹介者様ごとの全38名・ステータス・ご紹介料</span>
              <span className="arrow">パスワードを入力して閲覧 →</span>
            </a>
          </p>
        )}
      </section>

      <PhotosSection />

      <InterviewSection />

      <CompanySection />

      <footer>
        <div className="foot-inner">
          <p>{config.footerNote}</p>
          <p style={{ marginTop: 6 }}>{FOOTER_UPDATED}</p>
        </div>
      </footer>
    </>
  );
}
