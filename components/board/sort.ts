// Faithful port of the legacy table-sort comparator:
// - empty values always sink to the bottom regardless of direction
// - values starting with a digit compare numerically (first number wins)
// - otherwise localeCompare with the "ja" locale
export function legacyCompare(avRaw: string, bvRaw: string, asc: boolean): number {
  const av = avRaw.trim();
  const bv = bvRaw.trim();
  if (!av && !bv) return 0;
  if (!av) return 1;
  if (!bv) return -1;
  const an = parseFloat(av.replace(/[^0-9.]/g, ""));
  const bn = parseFloat(bv.replace(/[^0-9.]/g, ""));
  const bothNum = !isNaN(an) && !isNaN(bn) && /^[0-9]/.test(av) && /^[0-9]/.test(bv);
  const r = bothNum ? an - bn : av.localeCompare(bv, "ja");
  return asc ? r : -r;
}

export interface SortState {
  col: number;
  dir: "asc" | "desc";
}

/** Legacy toggle: clicking a new column starts asc; clicking again flips. */
export function nextSort(current: SortState | null, col: number): SortState {
  const asc = !(current && current.col === col && current.dir === "asc");
  return { col, dir: asc ? "asc" : "desc" };
}
