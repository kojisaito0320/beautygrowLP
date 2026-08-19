"use client";

import { useMemo, useState } from "react";
import type { StoreRow } from "@/lib/schema";
import { REGION } from "@/lib/regions";
import { legacyCompare, nextSort, type SortState } from "./sort";

const HEADERS = ["業態", "エリア", "店舗", "募集形態", "強化", "人数", "リンク", "備考"];

function linkText(row: StoreRow): string {
  const parts: string[] = [];
  if (row.hpbUrl) parts.push("HPB");
  if (row.youkenLink) parts.push("募集要項");
  return parts.join("・");
}

function cellText(row: StoreRow, col: number): string {
  switch (col) {
    case 0: return row.brandLabel;
    case 1: return row.area;
    case 2: return row.shop + (row.shopSub ? row.shopSub : "");
    case 3: return row.employmentLabel;
    case 4: return row.stars;
    case 5: return row.count;
    case 6: return linkText(row);
    default: return row.note ?? "";
  }
}

type FilterState = { f: string[]; b: string[]; a: string[] };

const FILTER_GROUPS: {
  key: keyof FilterState;
  label: string;
  aria: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "f", label: "雇用形態:", aria: "雇用形態で絞り込み",
    options: [
      { value: "s", label: "正社員" },
      { value: "p", label: "パート・アルバイト" },
      { value: "g", label: "業務委託" },
    ],
  },
  {
    key: "b", label: "業態:", aria: "業態で絞り込み",
    options: [
      { value: "celeste", label: "セレスト" },
      { value: "oak", label: "OAK" },
      { value: "nicotto", label: "nicotto" },
      { value: "matsuge", label: "まつげ" },
      { value: "color", label: "カラー" },
    ],
  },
  {
    key: "a", label: "エリア:", aria: "エリアで絞り込み",
    options: [
      { value: "首都圏", label: "首都圏" },
      { value: "関西", label: "関西" },
      { value: "名古屋", label: "名古屋" },
      { value: "九州", label: "九州" },
      { value: "沖縄", label: "沖縄" },
    ],
  },
];

/** Normal view: has priority stars, or is not a client-only listing */
function inNormalView(row: StoreRow): boolean {
  return row.stars.trim() !== "" || !row.clientOk;
}

export default function StoreExplorer({ stores }: { stores: StoreRow[] }) {
  const [sort, setSort] = useState<SortState | null>(null);
  const [filters, setFilters] = useState<FilterState>({ f: [], b: [], a: [] });
  const [clientView, setClientView] = useState(false);

  const counts = useMemo(
    () => ({
      normal: stores.filter(inNormalView).length,
      client: stores.filter((r) => r.clientOk).length,
    }),
    [stores]
  );

  const order = useMemo(() => {
    const idx = stores.map((_, i) => i);
    if (sort) {
      idx.sort((a, b) =>
        legacyCompare(cellText(stores[a], sort.col), cellText(stores[b], sort.col), sort.dir === "asc")
      );
    }
    return idx;
  }, [stores, sort]);

  function visible(row: StoreRow): boolean {
    const okF = filters.f.length === 0 || filters.f.some((v) => row.employment.includes(v as never));
    const okB = filters.b.length === 0 || filters.b.includes(row.brand);
    const region = REGION[row.area];
    const okA = filters.a.length === 0 || (region !== undefined && filters.a.includes(region));
    const okView = clientView ? !!row.clientOk : inNormalView(row);
    return okF && okB && okA && okView;
  }

  function toggle(key: keyof FilterState, value: string) {
    setFilters((prev) => {
      const sel = prev[key];
      const next = value === "all" ? [] : sel.includes(value) ? sel.filter((v) => v !== value) : [...sel, value];
      return { ...prev, [key]: next };
    });
  }

  function onHeaderActivate(col: number) {
    setSort((prev) => nextSort(prev, col));
  }

  return (
    <>
      <div className="kyoka-cta">
        {clientView ? (
          <p id="kyoka-desc"><b>顧客（指名のお客様）をお持ちのスタイリスト</b>を受け入れ可能な店舗の一覧です。この一覧以外のセレスト各店も、指名のお客様50名以上をお連れいただける方は全店舗でご紹介可能です。</p>
        ) : (
          <p id="kyoka-desc">ご紹介したい候補者に合わせて一覧をお選びください。</p>
        )}
        <div className="view-switch" role="group" aria-label="一覧の切り替え">
          <button type="button" className={!clientView ? "on" : undefined} onClick={() => setClientView(false)}>
            通常の募集一覧（{counts.normal}店舗）
          </button>
          <button type="button" className={clientView ? "on" : undefined} onClick={() => setClientView(true)}>
            顧客（指名のお客様）をお持ちの方向け（{counts.client}店舗）
          </button>
        </div>
      </div>
      {FILTER_GROUPS.map((group) => (
        <div className="filters" role="group" aria-label={group.aria} key={group.key}>
          <span className="f-label">{group.label}</span>
          <button
            className={filters[group.key].length === 0 ? "on" : undefined}
            onClick={() => toggle(group.key, "all")}
          >
            すべて
          </button>
          {group.options.map((opt) => (
            <button
              key={opt.value}
              className={filters[group.key].includes(opt.value) ? "on" : undefined}
              onClick={() => toggle(group.key, opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ))}
      <div className="table-scroll">
        <table id="store-table" className="sortable">
          <thead>
            <tr>
              {HEADERS.map((h, i) => (
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
              const row = stores[i];
              return (
                <tr key={i} style={visible(row) ? undefined : { display: "none" }}>
                  <td><span className={`chip ${row.brand}`}>{row.brandLabel}</span></td>
                  <td>{row.area}</td>
                  <td className="shop">
                    {row.shop}
                    {row.shopSub && (
                      <>
                        <br />
                        <small style={{ fontWeight: 400, color: "var(--sub)" }}>{row.shopSub}</small>
                      </>
                    )}
                  </td>
                  <td>{row.employmentLabel}</td>
                  <td className="stars">{row.stars}</td>
                  <td className="num">{row.count}</td>
                  <td>
                    {row.hpbUrl && (
                      <a href={row.hpbUrl} target="_blank" rel="noopener">HPB</a>
                    )}
                    {row.hpbUrl && row.youkenLink && "・"}
                    {row.youkenLink && <a href="#youken">募集要項</a>}
                  </td>
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
