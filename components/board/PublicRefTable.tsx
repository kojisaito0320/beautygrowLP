"use client";

import { useMemo, useState } from "react";
import type { ReferralPublicRow } from "@/lib/schema";
import { legacyCompare, nextSort, type SortState } from "./sort";

const HEADERS = ["ご成約者", "ご担当", "業態", "店舗", "入社日", "その後"];

function cellText(row: ReferralPublicRow, col: number): string {
  switch (col) {
    case 0: return row.name;
    case 1: return row.agent;
    case 2: return row.brandLabel;
    case 3: return row.shop;
    case 4: return row.joined;
    default: return row.outcome;
  }
}

export default function PublicRefTable({ rows }: { rows: ReferralPublicRow[] }) {
  const [sort, setSort] = useState<SortState | null>(null);

  const order = useMemo(() => {
    const idx = rows.map((_, i) => i);
    if (sort) {
      idx.sort((a, b) =>
        legacyCompare(cellText(rows[a], sort.col), cellText(rows[b], sort.col), sort.dir === "asc")
      );
    }
    return idx;
  }, [rows, sort]);

  return (
    <div className="table-scroll">
      <table id="ref-table" className="sortable">
        <thead>
          <tr>
            {HEADERS.map((h, i) => (
              <th
                key={h}
                title="クリックで並び替え"
                tabIndex={0}
                role="button"
                aria-sort={sort?.col === i ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                onClick={() => setSort((prev) => nextSort(prev, i))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSort((prev) => nextSort(prev, i));
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
              <tr key={i}>
                <td>{row.name}</td>
                <td>{row.agent}</td>
                <td><span className={`chip ${row.brand}`}>{row.brandLabel}</span></td>
                <td>{row.shop}</td>
                <td className="num">{row.joined}</td>
                <td>{row.outcome}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
