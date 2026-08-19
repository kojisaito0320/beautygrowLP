# -*- coding: utf-8 -*-
"""Fetch all source tabs for the WC / Miraizm share update into local JSON."""
import json
import os
import sys
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).parent
SKILL_DIR = Path(r"c:\Users\ksait\cockpits\personal-cockpit\.claude\skills\gsheet")
sys.path.insert(0, str(SKILL_DIR))
import read_sheet as rs  # noqa: E402

MASTER = "1A2-YsaWxVui3vX-O3r0F5EB-9IpKd7yuKsF8LlnLehA"
WC = "156dNaRaCNijiDR_XrztY8Wry2ehbD8H-w64RDQcRbu8"
MIRAI = "1ktLN4cNbRnr1IeuC8-yHU4W77J8M9prlWzp0wvhiqzw"

creds_path = rs.load_env("GOOGLE_SERVICE_ACCOUNT_JSON")
root = SKILL_DIR.parents[2]
full = root / creds_path if not os.path.isabs(creds_path) else Path(creds_path)
creds = json.loads(full.read_text(encoding="utf-8"))
tok = rs.get_access_token(creds)


def get(sid, rng):
    u = (f"https://sheets.googleapis.com/v4/spreadsheets/{sid}/values/"
         f"{urllib.parse.quote(rng)}")
    req = urllib.request.Request(u, headers={"Authorization": f"Bearer {tok}"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode()).get("values", [])


out = {}
out["kyoka"] = get(MASTER, "⑤強化エリア!A1:J200")
out["follow"] = get(MASTER, "④採用者フォロー!A1:O500")
out["dashboard"] = get(MASTER, "ダッシュボード!A1:L60")
out["wc_summary"] = get(WC, "★更新サマリ!A1:L200")
out["wc_referrals"] = get(WC, "ご紹介者様!A1:AC120")
out["wc_boshu"] = get(WC, "各業態の募集,概要!A1:AE300")
out["mirai_summary"] = get(MIRAI, "★更新サマリ!A1:L200")
out["mirai_referrals"] = get(MIRAI, "ご紹介者様!A1:AG120")

for k, v in out.items():
    print(f"{k}: {len(v)} rows x {max((len(r) for r in v), default=0)} cols")
(HERE / "update_data.json").write_text(
    json.dumps(out, ensure_ascii=False), encoding="utf-8")
print("saved -> update_data.json")
