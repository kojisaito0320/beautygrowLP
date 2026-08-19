import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getPartner } from "@/content/partners";
import { cookieName, verifySession } from "@/lib/auth";
import { getReferralEntries } from "@/lib/referrals-data";
import ReferralsExplorer from "@/components/board/ReferralsExplorer";
import { login } from "./actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ partner: string }>;
}): Promise<Metadata> {
  const { partner } = await params;
  const config = getPartner(partner);
  if (!config?.referrals) return {};
  return { title: config.referrals.pageTitle };
}

export default async function ReferralsPage({
  params,
  searchParams,
}: {
  params: Promise<{ partner: string }>;
  searchParams: Promise<{ e?: string }>;
}) {
  const { partner } = await params;
  const config = getPartner(partner);
  if (!config?.referrals) notFound();
  const ref = config.referrals;

  const store = await cookies();
  const authed = verifySession(store.get(cookieName(partner))?.value, partner);

  if (!authed) {
    const { e } = await searchParams;
    const loginForPartner = login.bind(null, partner);
    return (
      <div className="gate">
        <div className="gate-card">
          <h1>ご紹介一覧（関係者限り）</h1>
          <p>このページには候補者様の個人情報が含まれます。担当者からお伝えしているパスワードを入力してください。</p>
          <form action={loginForPartner}>
            <input
              type="password"
              name="password"
              placeholder="パスワード"
              autoFocus
              required
              aria-label="パスワード"
            />
            <button type="submit">開く</button>
          </form>
          {e && <p className="err">パスワードが違います。もう一度お試しください。</p>}
          <p className="gate-note">認証は30日間記憶されます。URL・パスワードの転送はご遠慮ください。<br /><a className="back" href={`/${partner}`}>← 求人情報ボードへ戻る</a></p>
        </div>
      </div>
    );
  }

  const rows = getReferralEntries(ref.variant);

  return (
    <div className={ref.variant === "wc" ? "ref-wc" : "ref-miraizm"}>
      <div className="wrap">
        <p className="eyebrow">{ref.eyebrow}</p>
        <h1>ご紹介一覧（全履歴）</h1>
        <p className="lead">{ref.lead}</p>
        <a className="back" href={`/${partner}`}>← 求人情報ボードへ戻る</a>
        <p className="confidential">このページには候補者様の個人情報が含まれます。URL・パスワードの転送、画面の共有・印刷配布はご遠慮ください。</p>

        <div className="stats">
          {ref.stats.map((s) => (
            <div className={s.gold ? "stat gold" : "stat"} key={s.label}>
              <b>{s.value}</b>
              {s.unit}
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <ReferralsExplorer rows={rows} variant={ref.variant} />

        <p className="note">
          {ref.tableNoteLines.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>

        <footer>
          <p>{ref.footerNote}</p>
        </footer>
      </div>
    </div>
  );
}
