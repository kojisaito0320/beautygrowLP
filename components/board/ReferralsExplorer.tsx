"use client";

import { useMemo, useState } from "react";
import type { ReferralsVariant } from "@/lib/schema";
import { legacyCompare, nextSort, type SortState } from "./sort";

// Mirrors lib/referrals-data.ts ReferralEntry (kept separate so this client
// module never imports the server-only data loader).
export interface ReferralRow {
  date: string;
  name: string;
  referrer: string;
  category: "celeste" | "matsuge" | "color" | "oak";
  place: string;
  status: string;
  tone: "ok" | "mid" | "ng" | "none";
  interview: string;
  extra: string;
  note: string;
}

const CATEGORY_LABEL: Record<ReferralRow["category"], string> = {
  celeste: "美容師",
  matsuge: "アイ",
  color: "カラー",
  oak: "オーク",
};

const HEADERS: Record<ReferralsVariant, string[]> = {
  wc: ["問合せ日", "氏名", "ご紹介者", "業態", "店舗・エリア", "ステータス", "面接日", "入社日", "近況・補足"],
  miraizm: ["問合せ日", "氏名", "ご紹介者", "業態", "店舗・エリア", "ステータス", "面接日", "雇用形態", "補足"],
};

const SORT_OPTIONS: Record<ReferralsVariant, { value: string; label: string }[]> = {
  wc: [
    { value: "0:desc", label: "問合せ日（新しい順）" },
    { value: "0:asc", label: "問合せ日（古い順）" },
    { value: "2:asc", label: "ご紹介者" },
    { value: "5:asc", label: "ステータス" },
    { value: "7:desc", label: "入社日（新しい順）" },
    { value: "8:desc", label: "ご紹介料" },
  ],
  miraizm: [
    { value: "0:desc", label: "問合せ日（新しい順）" },
    { value: "0:asc", label: "問合せ日（古い順）" },
    { value: "2:asc", label: "ご紹介者" },
    { value: "5:asc", label: "ステータス" },
    { value: "7:asc", label: "雇用形態" },
  ],
};

function refName(row: ReferralRow): string {
  const t = row.referrer.trim();
  return !t || t === "ー" ? "記載なし" : t;
}

function cellText(row: ReferralRow, col: number): string {
  switch (col) {
    case 0: return row.date;
    case 1: return row.name;
    case 2: return row.referrer;
    case 3: return CATEGORY_LABEL[row.category];
    case 4: return row.place;
    case 5: return row.status;
    case 6: return row.interview;
    case 7: return row.extra;
    default: return row.note;
  }
}

export default function ReferralsExplorer({
  rows,
  variant,
}: {
  rows: ReferralRow[];
  variant: ReferralsVariant;
}) {
  const [sort, setSort] = useState<SortState | null>(null);
  const [refSel, setRefSel] = useState<string[]>([]);
  const [stSel, setStSel] = useState<string[]>([]);

  const referrerButtons = useMemo(() => {
    const counts = new Map<string, number>();
    rows.forEach((r) => {
      const n = refName(r);
      counts.set(n, (counts.get(n) ?? 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  const order = useMemo(() => {
    const idx = rows.map((_, i) => i);
    if (sort) {
      idx.sort((a, b) =>
        legacyCompare(cellText(rows[a], sort.col), cellText(rows[b], sort.col), sort.dir === "asc")
      );
    }
    return idx;
  }, [rows, sort]);

  function visible(row: ReferralRow): boolean {
    const okR = refSel.length === 0 || refSel.includes(refName(row));
    const cls = row.tone === "ok" || row.tone === "mid" ? row.tone : "ng";
    const okS = stSel.length === 0 || stSel.includes(cls);
    return okR && okS;
  }

  function toggle(sel: string[], set: (v: string[]) => void, value: string) {
    if (value === "all") set([]);
    else set(sel.includes(value) ? sel.filter((v) => v !== value) : [...sel, value]);
  }

  function onHeaderActivate(col: number) {
    setSort((prev) => nextSort(prev, col));
  }

  return (
    <>
      <div className="filters" id="ref-filter" role="group" aria-label="ご紹介者で絞り込み">
        <span className="f-label">ご紹介者:</span>
        <button className={refSel.length === 0 ? "on" : undefined} onClick={() => toggle(refSel, setRefSel, "all")}>
          すべて
        </button>
        {referrerButtons.map(([name, count]) => (
          <button
            key={name}
            className={refSel.includes(name) ? "on" : undefined}
            onClick={() => toggle(refSel, setRefSel, name)}
          >
            {name}（{count}）
          </button>
        ))}
      </div>
      <div className="filters" id="st-filter" role="group" aria-label="ステータスで絞り込み">
        <span className="f-label">ステータス:</span>
        <button className={stSel.length === 0 ? "on" : undefined} onClick={() => toggle(stSel, setStSel, "all")}>
          すべて
        </button>
        <button className={stSel.includes("ok") ? "on" : undefined} onClick={() => toggle(stSel, setStSel, "ok")}>
          成約
        </button>
        <button className={stSel.includes("mid") ? "on" : undefined} onClick={() => toggle(stSel, setStSel, "mid")}>
          選考・調整中
        </button>
        <button className={stSel.includes("ng") ? "on" : undefined} onClick={() => toggle(stSel, setStSel, "ng")}>
          辞退・不採用等
        </button>
      </div>
      <div className="sortbar">
        <label htmlFor="sort-select">並び替え:</label>
        <select
          id="sort-select"
          defaultValue=""
          onChange={(e) => {
            if (!e.target.value) return;
            const [col, dir] = e.target.value.split(":");
            setSort({ col: parseInt(col, 10), dir: dir as "asc" | "desc" });
          }}
        >
          <option value="" hidden></option>
          {SORT_OPTIONS[variant].map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span>（PCでは表の見出しクリックでも並び替えできます）</span>
      </div>
      <div className="table-scroll">
        <table className="sortable">
          <thead>
            <tr>
              {HEADERS[variant].map((h, i) => (
                <th
                  key={h}
                  title="クリックで並び替え"
                  tabIndex={0}
                  role="button"
                  aria-sort={sort?.col === i ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                  onClick={() => onHeaderActivate(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onHeaderActivate(i);
                    }
                  }}
                >
                  {h}
                  {sort?.col === i && <span className="dir">{sort.dir === "asc" ? "▲" : "▼"}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.map((i) => {
              const row = rows[i];
              return (
                <tr key={i} style={visible(row) ? undefined : { display: "none" }}>
                  <td className="num">{row.date}</td>
                  <td>{row.name}</td>
                  <td>{row.referrer}</td>
                  <td><span className={`chip ${row.category}`}>{CATEGORY_LABEL[row.category]}</span></td>
                  <td>{row.place}</td>
                  <td>
                    {row.tone === "none" ? row.status : <span className={`st ${row.tone}`}>{row.status}</span>}
                  </td>
                  <td className={row.interview ? "num" : undefined}>{row.interview}</td>
                  <td className={variant === "wc" && row.extra ? "num" : undefined}>{row.extra}</td>
                  <td>{row.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
