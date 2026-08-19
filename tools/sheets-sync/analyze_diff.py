# -*- coding: utf-8 -*-
"""Compare fresh data with the 2026-08-17 snapshot; print all deltas."""
import json
from pathlib import Path

HERE = Path(__file__).parent
d = json.loads((HERE / "update_data.json").read_text(encoding="utf-8"))
snap = json.loads((HERE / "snapshots" / "2026-08-17.json").read_text(
    encoding="utf-8"))


def cell(r, i):
    return r[i].strip() if isinstance(r, list) and i < len(r) else ""


print("=== ⑤強化エリア (fresh) ===")
for r in d["kyoka"]:
    if any(c.strip() for c in r):
        print(" | ".join(c.replace("\n", " ")[:22] for c in r))

print("\n=== snapshot kyoka_rows (for comparison) ===")
print(f"count: {len(snap['kyoka_rows'])}")

print("\n=== ダッシュボード (fresh) ===")
for r in d["dashboard"]:
    if any(c.strip() for c in r):
        print(" | ".join(c.replace("\n", " ")[:24] for c in r))

print("\n=== WC ご紹介者様 (fresh) header + count ===")
ref = d["wc_referrals"]
print("header:", ref[0] if ref else [])
names = [cell(r, 0) for r in ref[1:] if cell(r, 0)]
print(f"count: {len(names)} (snapshot: {snap['referral_count']})")
print("last 5:", names[-5:])

print("\n=== ミライズム ご紹介者様 (fresh) header + count ===")
mref = d["mirai_referrals"]
print("header:", mref[0] if mref else [])
mnames = [cell(r, 0) for r in mref[1:] if cell(r, 0)]
print(f"count: {len(mnames)}")
print("last 5:", mnames[-5:])

print("\n=== WC ★更新サマリ (fresh, first 60 non-empty rows) ===")
cnt = 0
for i, r in enumerate(d["wc_summary"]):
    if any(c.strip() for c in r):
        cnt += 1
        if cnt <= 60:
            print(f"r{i+1}:", " | ".join(c.replace("\n", "␤")[:40] for c in r))

print("\n=== 募集シート: 求人中店舗数 ===")
b = d["wc_boshu"]
print("header row1:", [c[:16] for c in b[0]][:12] if b else [])
for i, r in enumerate(b[:8]):
    print(f"r{i+1}:", " | ".join(c.replace("\n", " ")[:18] for c in r[:10]))
