import { PARTNERS } from "@/content/partners";

const card: React.CSSProperties = {
  display: "block",
  background: "#fff",
  border: "1px solid #e6e1d8",
  borderRadius: 10,
  padding: "16px 20px",
  textDecoration: "none",
  color: "#26231f",
  marginBottom: 12,
};

export default function HomePage() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "56px 20px" }}>
      <h1 style={{ fontSize: 22, letterSpacing: ".04em" }}>Beauty Grow 採用LP</h1>
      <p style={{ fontSize: 13, color: "#6d675e", margin: "8px 0 28px" }}>
        紹介会社様向けLPの一覧です（内部用インデックス・検索エンジン非掲載）。
      </p>
      <a href="/nicotto" style={card}>
        <b>nicotto 業態紹介</b>
        <span style={{ display: "block", fontSize: 12.5, color: "#6d675e" }}>/nicotto ─ 新業態のコンセプト・募集要項・給与テーブル</span>
      </a>
      {Object.values(PARTNERS).map((p) => (
        <a href={`/${p.slug}`} style={card} key={p.slug}>
          <b>求人情報ボード（{p.partnerName}様向け）</b>
          <span style={{ display: "block", fontSize: 12.5, color: "#6d675e" }}>
            /{p.slug}
            {p.referrals && ` ─ ご紹介一覧（パスワード保護）: /${p.slug}/referrals`}
          </span>
        </a>
      ))}
    </main>
  );
}
