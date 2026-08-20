#!/usr/bin/env node
// Mirror the LP content into the partner spreadsheets' ★更新サマリ tab.
//
// Single source of truth (all partner-facing, already sanitized):
//   content/data/updates.json            per-cycle change notes (shared with the LPs)
//   content/data/stores.json             store list (⑤強化エリア is reconciled via `npm run audit`)
//   content/data/private/referrals.*.json 成約者 (full names — the partner supplied these candidates)
// ⑤強化エリア is deliberately NOT read here: its 備考 column contains internal
// memos that must never reach the partner sheets. stores.json notes are the
// sanitized versions.
//
// Usage:
//   npm run push-summary                    dry run: print the rows, write nothing
//   npm run push-summary -- --apply         write both partners' tabs
//   npm run push-summary -- --apply wc      write one partner only (wc | miraizm)
//
// Prereq: the service account must be an EDITOR on the partner spreadsheets.
// Run `npm run audit` first — this script mirrors stores.json as-is.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { accessToken } from "../sheets-auth.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const TAB = "★更新サマリ";
const CLEAR_RANGE = `${TAB}!A1:M400`;
const BASE_URL = "https://beautygrow-lp.vercel.app";

const PARTNERS = {
  wc: {
    sheetId: "156dNaRaCNijiDR_XrztY8Wry2ehbD8H-w64RDQcRbu8",
    addressee: "株式会社グラム（ワークキャンバス）御中",
    lpUrl: `${BASE_URL}/wc`,
    referralsFile: "content/data/private/referrals.wc.json",
  },
  miraizm: {
    sheetId: "1ktLN4cNbRnr1IeuC8-yHU4W77J8M9prlWzp0wvhiqzw",
    addressee: "ミライズム御中",
    lpUrl: `${BASE_URL}/miraizm`,
    referralsFile: "content/data/private/referrals.miraizm.json",
  },
};

const CATEGORY_LABEL = {
  celeste: "セレスト", oak: "OAK", nicotto: "nicotto", matsuge: "まつげ", color: "カラー",
};
// Statuses that count as 成約 (matches the LP's 成約 definition)
const DEAL_STATUSES = new Set(["採用", "採用→退職", "内定"]);

const readJson = (rel) => JSON.parse(readFileSync(path.join(ROOT, rel), "utf8"));
const updates = readJson("content/data/updates.json");
const stores = readJson("content/data/stores.json");

/** RichLine[] → one prose cell ("／"-joined, muted lines dropped, links inlined) */
function proseOf(lines) {
  return lines
    .filter((l) => !l.muted && (l.text || l.link))
    .map((l) => {
      let s = (l.badge ? `${l.badge}: ` : "") + l.text;
      if (l.link) {
        const label = l.link.label.replace(/^→\s*/, "");
        s += `${s ? " " : ""}${label}${l.link.sub ?? ""} → ${BASE_URL}${l.link.href}`;
      }
      return s;
    })
    .join(" ／ ");
}

function storeNote(row) {
  const parts = [];
  if (row.blankOk) parts.push("ブランク・未経験OK");
  if (row.note) parts.push(row.note);
  return parts.join("。");
}

function shopName(row) {
  return row.shop + (row.shopSub ? `（${row.shopSub}）` : "");
}

function buildRows(key) {
  const p = PARTNERS[key];
  const today = new Date();
  const ymd = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;
  const rows = [];

  rows.push([`【Beauty Grow 求人最新サマリ】${p.addressee}`]);
  rows.push(["更新日", ymd, "", "このタブはBG採用マスタからAI秘書が転記・更新します（手動編集はご遠慮ください）"]);
  rows.push([]);

  rows.push(["■ リンク"]);
  rows.push(["会社ホームページ", "https://beautygrow.co.jp"]);
  rows.push(["求人情報LP（見やすい版）", p.lpUrl]);
  rows.push(["nicotto業態紹介LP", `${BASE_URL}/nicotto`]);
  rows.push(["ご紹介一覧・全履歴（パスワード保護）", `${p.lpUrl}/referrals`]);
  rows.push([]);

  rows.push([`■ 今回の変更点（${ymd}）`]);
  rows.push(["求人内容", proseOf(updates.jobChanges)]);
  rows.push(["強化エリア", proseOf(updates.kyokaChanges)]);
  rows.push(["成約者", proseOf(updates.dealChanges[key])]);
  rows.push([]);

  rows.push(["■ 強化エリア一覧（優先度★が多いほど急募）"]);
  rows.push(["優先度", "業態", "エリア", "店舗", "募集形態", "不足人数", "備考"]);
  const starred = stores
    .filter((r) => r.stars.trim() !== "")
    .slice()
    .sort((a, b) => b.stars.length - a.stars.length);
  for (const r of starred) {
    rows.push([r.stars, r.brandLabel, r.area, shopName(r), r.employmentLabel, r.count, storeNote(r)]);
  }
  rows.push([]);

  rows.push(["■ 直近の成約者（ご紹介・採用分）"]);
  rows.push(["氏名", "ご担当", "業態", "店舗", "ステータス", "補足", "備考"]);
  const referrals = readJson(p.referralsFile).filter((r) => DEAL_STATUSES.has(r.status));
  for (const r of referrals) {
    rows.push([
      `${r.name}様`, r.referrer ?? "", CATEGORY_LABEL[r.category] ?? r.category, r.place ?? "",
      r.status, r.extra ?? "", r.note ?? "",
    ]);
  }
  rows.push([]);

  rows.push(["■ 求人中の店舗一覧（★＝強化度・最大3つ／詳細な募集要項はLP・各タブ参照）"]);
  rows.push(["業態", "エリア", "店舗", "募集形態", "強化", "人数", "顧客持ち歓迎", "ブランク・未経験", "HPBページ", "備考"]);
  for (const r of stores) {
    rows.push([
      r.brandLabel, r.area, shopName(r), r.employmentLabel, r.stars, r.count,
      r.clientOk ? "★" : "", r.blankOk ? "○" : "", r.hpbUrl ?? "", r.note ?? "",
    ]);
  }
  rows.push([]);
  rows.push(["※ 顧客（指名のお客様）をお持ちの方は、上記以外のセレスト各店でもご紹介可能です（前店と同じ価格でのメニュー導入可・指名のお客様優先での施術可）。"]);
  rows.push([`※ 詳細な給与・歩合・保証・福利厚生は「各業態の募集,概要」「給与詳細」タブ、および求人情報LP（${p.lpUrl}）をご覧ください。`]);
  return rows;
}

async function apply(key, rows) {
  const p = PARTNERS[key];
  const tok = await accessToken(ROOT, "https://www.googleapis.com/auth/spreadsheets");
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${p.sheetId}/values/`;
  const clear = await fetch(base + encodeURIComponent(CLEAR_RANGE) + ":clear", {
    method: "POST",
    headers: { Authorization: `Bearer ${tok}` },
  });
  if (!clear.ok) {
    console.error(`[${key}] clear error:`, await clear.text());
    console.error("→ サービスアカウントがこのスプシの「編集者」で共有されているか確認してください。");
    process.exit(1);
  }
  const put = await fetch(base + encodeURIComponent(`${TAB}!A1`) + "?valueInputOption=USER_ENTERED", {
    method: "PUT",
    headers: { Authorization: `Bearer ${tok}`, "content-type": "application/json" },
    body: JSON.stringify({ values: rows }),
  });
  if (!put.ok) {
    console.error(`[${key}] write error:`, await put.text());
    process.exit(1);
  }
  const res = await put.json();
  console.log(`[${key}] 書き込み完了: ${res.updatedRows}行 × 最大${res.updatedColumns}列`);
}

const args = process.argv.slice(2);
const doApply = args.includes("--apply");
const targets = Object.keys(PARTNERS).filter((k) => {
  const named = args.filter((a) => a !== "--apply");
  return named.length === 0 || named.includes(k);
});
if (targets.length === 0) {
  console.error("対象がありません。wc / miraizm を指定してください。");
  process.exit(2);
}

for (const key of targets) {
  const rows = buildRows(key);
  if (doApply) {
    await apply(key, rows);
  } else {
    console.log(`\n===== ${key}（${PARTNERS[key].addressee}） — DRY RUN（--apply で書き込み） =====`);
    for (const r of rows) console.log(r.join(" | "));
  }
}
if (!doApply) console.log("\n※ まだ書き込んでいません。内容を確認のうえ `npm run push-summary -- --apply` を実行してください。");
