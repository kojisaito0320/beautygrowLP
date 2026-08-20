#!/usr/bin/env node
// Reconcile the LP store list (content/data/stores.json) against ⑤強化エリア,
// the single source of truth in the BG採用マスタ2026 spreadsheet.
//
// Reports:
//   1. LP rows with no backing row in ⑤ (stale/legacy rows)
//   2. Star (優先度) mismatches between ⑤A列 and stores.json `stars`
//   3. 顧客持ち mismatches between ⑤B列 and stores.json `clientOk`,
//      and ブランクあり未経験 mismatches between ⑤C列 and stores.json `blankOk`
//   4. ⑤ rows that look recruiting (A★ or B★ or 人数あり) but missing from the LP
//   5. Count check: hero 「N店舗」 (content/partners/shared.ts) vs actual normal-view rows
//      (selector button counts are computed from data at runtime, so they need no check)
//
// Usage: npm run audit
// Auth: Google service-account JSON via tools/sheets-auth.mjs.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { accessToken } from "./sheets-auth.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MASTER = "1A2-YsaWxVui3vX-O3r0F5EB-9IpKd7yuKsF8LlnLehA";

// ⑤の列位置はヘッダー行（優先度・顧客持ち・業態・店舗・不足人数）から自動検出する
// （2026-08-19〜20にかけて列の挿入が続いているため、列番号は固定しない）
// ⑤の(業態,店舗) → LP行の(brand, shop)。⑤の表記ゆれ・分割店舗はここで吸収する
const ALIAS = new Map([
  // ⑤は2026/08/19より沖縄を「沖縄」（那覇=安里）と「新都心」（おもろまち）に分割
  ["まつげ|沖縄", [["matsuge", "Natural ViVi 那覇店"]]],
  ["まつげ|新都心", [["matsuge", "Natural ViVi おもろまち店"]]],
  ["まつげ|博多", [["matsuge", "Belle 博多店"]]],
  ["まつげ|久留米", [["matsuge", "OAK 久留米店"]]],
  ["カラー|自由が丘", [["color", "SPEEDY 自由が丘店"]]],
  ["カラー|学芸大学", [["color", "SPEEDY 学芸大学店"]]],
  ["カラー|五反田", [["color", "Colors Labo 五反田店"]]],
  ["カラー|祐天寺", [["color", "SPEEDY 祐天寺店"]]],
  ["カラー|恵比寿", [["color", "SPEEDY 恵比寿店"]]],
  ["カラー|那覇", [["color", "SPEEDY 那覇新都心店"]]],
  ["カラー|仙川", [["color", "カラーズラボ 仙川店"]]],
  ["カラー|日吉", [["color", "カラーズラボ 日吉店"]]],
  ["カラー|高円寺", [["color", "カラーズラボ 高円寺店"]]],
  ["カラー|三軒茶屋", [["color", "カラーズラボ 三軒茶屋店"]]],
  ["カラー|八王子", [["color", "カラーズラボ 八王子店"]]],
  ["CELESTE|門仲", [["celeste", "門前仲町店"]]],
  ["CELESTE|京都四条烏丸", [["celeste", "京都烏丸店"]]],
  ["CELESTE|石神井", [["celeste", "石神井公園店"]]],
  ["CELESTE|難波", [["celeste", "なんば店"]]],
  ["OAK|小倉", [["oak", "OAK 小倉店"]]],
  ["OAK|福間", [["oak", "OAK hair calmu 福間店"]]],
  ["OAK|学研都市", [["oak", "パルフェ by OAK 九大学研都市店"]]],
  ["OAK|博多", [["oak", "OAK hair miel 博多店"]]],
  ["OAK|久留米2号店", [["oak", "OAK 久留米2号店"]]],
  ["nicotto|門前仲町", [["nicotto", "nicotto 門前仲町店"]]],
  ["nicotto|八王子", [["nicotto", "nicotto 八王子店"]]],
  ["nicotto|三軒茶屋", [["nicotto", "nicotto 三軒茶屋店"]]],
  ["nicotto|高円寺", [["nicotto", "nicotto 高円寺店"]]],
  ["nicotto|西日暮里", [["nicotto", "nicotto 西日暮里店"]]],
]);
const GYOTAI_CHIP = {
  "まつげ": "matsuge", "カラー": "color", "CELESTE": "celeste",
  "OAK": "oak", "nicotto": "nicotto",
  // 旧表記（2026-08-19以前のシート向けの保険）
  "セレスト": "celeste", "オーク（業務委託）": "oak",
};
// LP側の承認済み例外行（⑤未登録だが掲載を維持するもの）
const LP_APPROVED_EXTRA = new Set([
  // 現在なし（⑤未登録のままLP掲載を続ける行はここに "brand|店名" で追加）
]);
// ⑤側の非掲載例外（内緒メモ等）
const G5_SKIP = new Set(["OAK|久留米"]);

async function fetchG5() {
  const tok = await accessToken(ROOT, "https://www.googleapis.com/auth/spreadsheets.readonly");
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${MASTER}/values/` +
    encodeURIComponent("⑤強化エリア!A1:Z200");
  const res = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } });
  if (!res.ok) {
    console.error("sheets error:", await res.text());
    process.exit(2);
  }
  const rows = (await res.json()).values ?? [];
  if (!rows.length) {
    console.error("⑤強化エリアが空です");
    process.exit(2);
  }
  const header = rows[0].map((h) => String(h).replace(/\s/g, ""));
  const col = {};
  for (const [field, name] of [["pri", "優先度"], ["cli", "顧客持ち"], ["blk", "ブランク"], ["gyo", "業態"], ["ten", "店舗"], ["num", "不足人数"]]) {
    col[field] = header.findIndex((h) => h.includes(name));
    if (col[field] === -1) {
      console.error(`⑤のヘッダーに「${name}」列が見つかりません（列名が変わった場合はこのスクリプトを更新）`);
      process.exit(2);
    }
  }
  const cell = (raw, field) => String(raw[col[field]] ?? "").trim();
  const out = [];
  const seen = new Set();
  for (const raw of rows.slice(1)) {
    const [rawPri, cli, gyo, ten] = [cell(raw, "pri"), cell(raw, "cli"), cell(raw, "gyo"), cell(raw, "ten")];
    if (!gyo || !ten || ten.includes("共通")) continue;
    // 優先度は★のみ有効（「停止」等のマークは募集なし扱い）
    const pri = /^★+$/.test(rawPri) ? rawPri : "";
    if (seen.has(`${gyo}|${ten}`)) {
      console.log(` ! ⑤に重複行: ${gyo}/${ten}（先の行を採用）`);
      continue;
    }
    seen.add(`${gyo}|${ten}`);
    out.push({ pri, cli: Boolean(cli), blk: Boolean(cell(raw, "blk")), gyo, ten, num: cell(raw, "num") });
  }
  return out;
}

function loadLp() {
  const stores = JSON.parse(readFileSync(path.join(ROOT, "content/data/stores.json"), "utf8"));
  const rows = stores.map((r) => ({
    chip: r.brand,
    shop: r.shop,
    stars: (r.stars ?? "").trim(),
    c: Boolean(r.clientOk),
    blk: Boolean(r.blankOk),
  }));
  const shared = readFileSync(path.join(ROOT, "content/partners/shared.ts"), "utf8");
  const hero = shared.match(/value: "(\d+)", unit: "店舗", label: "求人中の店舗/);
  if (!hero) {
    console.error("shared.ts のヒーロー店舗数が読み取れません（表記が変わった場合はこのスクリプトも更新）");
    process.exit(2);
  }
  return { rows, hero: Number(hero[1]) };
}

const g5 = await fetchG5();
const { rows: lpRows, hero } = loadLp();
const lpIndex = new Map(lpRows.map((r) => [`${r.chip}|${r.shop}`, r]));
const problems = [];
const backed = new Set();

for (const g of g5) {
  const key = `${g.gyo}|${g.ten}`;
  if (G5_SKIP.has(key)) continue;
  const recruiting = Boolean(g.pri || g.cli || g.num);
  const targets = ALIAS.get(key) ?? [[GYOTAI_CHIP[g.gyo] ?? "?", `${g.ten}店`]];
  for (const [chip, shop] of targets) {
    const r = lpIndex.get(`${chip}|${shop}`);
    if (!r) {
      if (recruiting) {
        problems.push(
          `[⑤にあるがLPに無い] ${g.gyo}/${g.ten} → ${chip}/${shop}` +
            ` (優先度=${g.pri || "なし"} 顧客持ち=${g.cli ? "★" : "−"})`
        );
      }
      continue;
    }
    backed.add(`${chip}|${shop}`);
    if (!recruiting) problems.push(`[⑤では募集情報なし] ${chip}/${shop}`);
    if (r.stars !== g.pri) {
      problems.push(`[優先度の不一致] ${chip}/${shop}: LP='${r.stars || "なし"}' ⑤A列='${g.pri || "なし"}'`);
    }
    if (r.c !== g.cli) {
      problems.push(`[顧客持ちの不一致] ${chip}/${shop}: LP clientOk=${r.c} ⑤B列=${g.cli ? "★" : "空"}`);
    }
    if (r.blk !== g.blk) {
      problems.push(`[ブランク・未経験の不一致] ${chip}/${shop}: LP blankOk=${r.blk} ⑤C列=${g.blk ? "○" : "空"}`);
    }
  }
}

for (const r of lpRows) {
  const key = `${r.chip}|${r.shop}`;
  if (!backed.has(key) && !LP_APPROVED_EXTRA.has(key)) {
    problems.push(`[⑤に根拠行なし] ${r.chip}/${r.shop} (LP: ★='${r.stars || "なし"}' clientOk=${r.c})`);
  }
}

const nNormal = lpRows.filter((r) => r.stars || !r.c).length;
const nClient = lpRows.filter((r) => r.c).length;
if (hero !== nNormal) {
  problems.push(`[件数不一致] ヒーロー店舗数(shared.ts): 表記=${hero} 実際(通常ビュー)=${nNormal}`);
}

console.log(`=== stores.json: LP行=${lpRows.length} 通常=${nNormal} 顧客持ち=${nClient} ヒーロー表記=${hero} ===`);
if (problems.length) {
  for (const p of problems) console.log(" -", p);
  process.exit(1);
} else {
  console.log(" 問題なし");
}
