# -*- coding: utf-8 -*-
"""Update the WC / Miraizm shared spreadsheets (summary tab + referral tab)."""
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

SKILL_DIR = Path(r"c:\Users\ksait\cockpits\personal-cockpit\.claude\skills\gsheet")
sys.path.insert(0, str(SKILL_DIR))
import read_sheet as rs  # noqa: E402

WC = "156dNaRaCNijiDR_XrztY8Wry2ehbD8H-w64RDQcRbu8"
MIRAI = "1ktLN4cNbRnr1IeuC8-yHU4W77J8M9prlWzp0wvhiqzw"
WC_SUM_ID = 602706462
MIRAI_SUM_ID = 1698127734


def token():
    creds_path = rs.load_env("GOOGLE_SERVICE_ACCOUNT_JSON")
    root = SKILL_DIR.parents[2]
    full = (root / creds_path if not os.path.isabs(creds_path)
            else Path(creds_path))
    creds = json.loads(full.read_text(encoding="utf-8"))
    import base64
    import time
    now = int(time.time())
    hdr = base64.urlsafe_b64encode(
        json.dumps({"alg": "RS256", "typ": "JWT"}).encode()).rstrip(b"=")
    claim = {"iss": creds["client_email"],
             "scope": "https://www.googleapis.com/auth/spreadsheets",
             "aud": "https://oauth2.googleapis.com/token",
             "exp": now + 3600, "iat": now}
    payload = base64.urlsafe_b64encode(json.dumps(claim).encode()).rstrip(b"=")
    si = hdr + b"." + payload
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import padding
    key = serialization.load_pem_private_key(
        creds["private_key"].encode(), password=None)
    sig = key.sign(si, padding.PKCS1v15(), hashes.SHA256())
    jwt = si + b"." + base64.urlsafe_b64encode(sig).rstrip(b"=")
    data = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": jwt.decode()}).encode()
    req = urllib.request.Request("https://oauth2.googleapis.com/token",
                                 data=data, method="POST")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())["access_token"]


def api(tok, method, url, body=None):
    req = urllib.request.Request(
        url, data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": f"Bearer {tok}",
                 "Content-Type": "application/json"}, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        raise SystemExit(f"API error {e.code}: {e.read().decode()[:400]}")


tok = token()

# ============ WC ============
base = f"https://sheets.googleapis.com/v4/spreadsheets/{WC}"
# guard: check the 成約 table still ends at row 62 (梅澤様)
chk = api(tok, "GET", f"{base}/values/"
          + urllib.parse.quote("★更新サマリ!A62"))
assert chk.get("values", [[""]])[0][0].startswith("梅澤"), f"layout moved: {chk}"

# 1) insert 3 rows after row 62 for new hires
api(tok, "POST", f"{base}:batchUpdate", {"requests": [
    {"insertDimension": {"range": {"sheetId": WC_SUM_ID, "dimension": "ROWS",
                                   "startIndex": 62, "endIndex": 65},
                         "inheritFromBefore": True}}]})

# 2) values
api(tok, "POST", f"{base}/values:batchUpdate", {
    "valueInputOption": "USER_ENTERED",
    "data": [
        {"range": "★更新サマリ!B2", "values": [["2026/08/18"]]},
        {"range": "★更新サマリ!A8",
         "values": [["■ 今回の変更点（2026/08/18）"]]},
        {"range": "★更新サマリ!B9",
         "values": [["変更なし。2026/8/7時点の募集内容を継続掲載しています。"]]},
        {"range": "★更新サマリ!B10",
         "values": [["変更なし（まつげ：渋谷・沖縄 ／ カラー：仙川 ／ セレスト：葛西・住吉・門前仲町・ときわ台・大泉学園・高円寺・成増・川口・久屋大通・福間・小倉 ／ OAK：福間・九大学研都市）"]]},
        {"range": "★更新サマリ!B11",
         "values": [["NEW: 松野麻優様（セレスト・高円寺）採用確定・入社時期調整中、奥山考香様・中村梨亜様（セレスト・なんば）採用・入社日調整中 → 成約は計11名になりました"]]},
        {"range": "★更新サマリ!A63:F65", "values": [
            ["奥山考香様", "セレスト", "なんば", "−", "−", "採用・入社日調整中"],
            ["中村梨亜様", "セレスト", "なんば", "−", "−", "アルバイト採用・入社日調整中"],
            ["松野麻優様", "セレスト", "高円寺", "−", "−", "採用確定・転職時期調整中"],
        ]},
        {"range": "ご紹介者様!F15", "values": [["辞退"]]},
        {"range": "ご紹介者様!F17", "values": [["不採用（転職活動終了）"]]},
        {"range": "ご紹介者様!F19", "values": [["辞退"]]},
        {"range": "ご紹介者様!F21", "values": [["採用（入社日調整中）"]]},
        {"range": "ご紹介者様!F22", "values": [["不採用（転職時期未定）"]]},
        {"range": "ご紹介者様!F25", "values": [["採用（入社日調整中）"]]},
        {"range": "ご紹介者様!F31", "values": [["不採用"]]},
        {"range": "ご紹介者様!F32", "values": [["採用（入社時期調整中）"]]},
        {"range": "ご紹介者様!F33", "values": [["不採用（他サロン検討のまま終了）"]]},
        {"range": "ご紹介者様!F39", "values": [["不採用（連絡つかず）"]]},
    ]})
print("WC sheet updated")

# ============ Miraizm ============
base = f"https://sheets.googleapis.com/v4/spreadsheets/{MIRAI}"
chk = api(tok, "GET", f"{base}/values/"
          + urllib.parse.quote("★更新サマリ!A63"))
assert chk.get("values", [[""]])[0][0].startswith("富永"), f"layout moved: {chk}"

api(tok, "POST", f"{base}:batchUpdate", {"requests": [
    {"insertDimension": {"range": {"sheetId": MIRAI_SUM_ID, "dimension": "ROWS",
                                   "startIndex": 63, "endIndex": 64},
                         "inheritFromBefore": True}}]})

api(tok, "POST", f"{base}/values:batchUpdate", {
    "valueInputOption": "USER_ENTERED",
    "data": [
        {"range": "★更新サマリ!B2", "values": [["2026/08/18"]]},
        {"range": "★更新サマリ!A8",
         "values": [["■ 今回の変更点（2026/08/18）"]]},
        {"range": "★更新サマリ!B9",
         "values": [["変更なし。2026/8/7時点の募集内容を継続掲載しています。"]]},
        {"range": "★更新サマリ!B10",
         "values": [["変更なし（まつげ：渋谷・沖縄 ／ カラー：仙川 ／ セレスト：葛西・住吉・門前仲町・ときわ台・大泉学園・高円寺・成増・川口・久屋大通・福間・小倉 ／ OAK：福間・九大学研都市）"]]},
        {"range": "★更新サマリ!B11",
         "values": [["NEW: 金子めぐみ様（セレスト・小岩・2024年末入社）を過去データの整理により成約者一覧へ追加 → 成約は計10名になりました"]]},
        {"range": "★更新サマリ!A64:F64", "values": [
            ["金子めぐみ様", "セレスト", "小岩", "2024年末頃", "−",
             "パート（過去データ整備で判明）"]]},
        {"range": "ご紹介者様!F2", "values": [["採用"]]},
        {"range": "ご紹介者様!F3", "values": [["辞退（他社決定）"]]},
        {"range": "ご紹介者様!F7", "values": [["お断り"]]},
        {"range": "ご紹介者様!F9", "values": [["不採用（面接後中断）"]]},
        {"range": "ご紹介者様!F34", "values": [["不採用"]]},
    ]})
print("Miraizm sheet updated")
