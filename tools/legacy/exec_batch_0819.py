# -*- coding: utf-8 -*-
"""2026-08-19 batch:
1. 店舗データセット(API実体): 恵比寿/渋谷/博多→Belle, 宮下公園→ALO
2. 店舗一覧マスタ: 宮下公園→ALO, 渋谷に閉店予定メモ
3. 両共有シート: 強化エリア一覧に久屋大通復帰 / 店舗一覧から東京まつげ3行削除 /
   久屋大通★★★ / 変更点文言
"""
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

DATASET = "10E-8quKNGI080tI5mMi937Zs1rjUHXuxeh_MCVJMHzw"
MASTER_LIST = "1R7CRHtzRi25Yz21IdygdOSt2hHe3XWhztw-Y9nvjvhk"
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


tok = token()


def api(method, sid, path, body=None):
    u = f"https://sheets.googleapis.com/v4/spreadsheets/{sid}{path}"
    req = urllib.request.Request(
        u, data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": f"Bearer {tok}",
                 "Content-Type": "application/json"}, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        raise SystemExit(f"API error {e.code} {path}: {e.read().decode()[:300]}")


# ---- 1) 店舗データセット（bg-data API実体） ---- ※SAに書込権限なくスキップ
SKIP = True
if not SKIP: api("POST", DATASET, "/values:batchUpdate", {
    "valueInputOption": "USER_ENTERED",
    "data": [
        {"range": "店舗マスタ!A2", "values": [["Belle 恵比寿店"]]},
        {"range": "店舗マスタ!C2", "values": [["Belle"]]},
        {"range": "店舗マスタ!A3", "values": [["ALO 宮下公園店"]]},
        {"range": "店舗マスタ!C3", "values": [["ALO"]]},
        {"range": "店舗マスタ!A4", "values": [["Belle 渋谷店"]]},
        {"range": "店舗マスタ!C4", "values": [["Belle"]]},
        {"range": "店舗マスタ!A8", "values": [["Belle 博多店"]]},
        {"range": "店舗マスタ!C8", "values": [["Belle"]]},
    ]})
print("1) 店舗データセット: 恵比寿/渋谷/博多→Belle・宮下公園→ALO")

# ---- 2) 店舗一覧マスタ: 宮下公園→ALO・渋谷閉店予定メモ ----
api("POST", MASTER_LIST, "/values:batchUpdate", {
    "valueInputOption": "USER_ENTERED",
    "data": [{"range": "店舗情報!F4", "values": [["ALO　宮下公園店"]]}]})
api("POST", MASTER_LIST, ":batchUpdate", {"requests": [
    {"updateCells": {
        "range": {"sheetId": 1599269403, "startRowIndex": 3, "endRowIndex": 4,
                  "startColumnIndex": 5, "endColumnIndex": 6},
        "rows": [{"values": [{"note": "元表記: Natural ViVi 宮下公園店／2026-08-19 ALOへ改称"}]}],
        "fields": "note"}},
    {"updateCells": {
        "range": {"sheetId": 1599269403, "startRowIndex": 4, "endRowIndex": 5,
                  "startColumnIndex": 5, "endColumnIndex": 6},
        "rows": [{"values": [{"note": "元表記: Eye Doll（アイドール）渋谷店／2026-08-19 Belleへ改称。閉店予定（時期確定後にマスタから削除）"}]}],
        "fields": "note"}},
]})
print("2) 店舗一覧マスタ: 宮下公園→ALO・渋谷に閉店予定メモ")

# ---- 3) 両共有シート ----
KYOKA = [
    ["★★★", "まつげ", "沖縄", "フルタイム", "1", "", "2026/07/30"],
    ["★★", "まつげ", "博多", "フルタイム", "1", "", "2026/07/30"],
    ["", "まつげ", "久留米", "パート週3〜4", "1", "", "2026/07/30"],
    ["★★★", "カラー", "仙川", "正社員", "1", "", "2026/07/03"],
    ["★★", "カラー", "自由が丘", "遅番／パート・正社員 各1名", "2",
     "土日勤務できる方歓迎", "2026/07/03"],
    ["★★", "カラー", "恵比寿", "遅番／パート", "2", "土日勤務できる方歓迎",
     "2026/07/03"],
    ["★", "カラー", "学芸大学", "遅番／パートor正社員", "1",
     "土日勤務できる方歓迎", "2026/07/03"],
    ["★", "カラー", "五反田", "パート", "1", "", "2026/07/03"],
    ["★", "カラー", "祐天寺", "遅番／正社員", "1", "", "2026/07/03"],
    ["", "カラー", "那覇", "遅番／パート", "1", "週2日・15時〜ラスト(21時)",
     "2026/07/03"],
    ["", "カラー", "（共通）", "", "",
     "土日祝・遅番に出勤できる方は週1〜2日でも歓迎。早番はブランクのない方であれば週1〜2日でもOK",
     "2026/07/03"],
    ["★★★", "セレスト", "葛西", "業務委託ほか", "2", "退職に伴う補充",
     "2026/07/14"],
    ["★★★", "セレスト", "住吉", "業務委託ほか", "1", "", "2026/07/14"],
    ["★★★", "セレスト", "門前仲町", "業務委託ほか", "1",
     "1人営業店舗のため急募", "2026/07/14"],
    ["★★★", "セレスト", "ときわ台", "業務委託ほか", "1", "", "2026/07/14"],
    ["★★★", "セレスト", "大泉学園", "業務委託ほか", "1",
     "常勤で入れる方歓迎", "2026/07/14"],
    ["★★★", "セレスト", "高円寺", "業務委託ほか", "1",
     "1人営業店舗のため急募", "2026/07/14"],
    ["★★★", "セレスト", "成増", "業務委託ほか", "1",
     "顧客をお持ちの方歓迎（ときわ台と兼務できる方歓迎）", "2026/07/14"],
    ["★★★", "セレスト", "川口", "業務委託ほか", "1", "退職に伴う補充",
     "2026/07/14"],
    ["★★★", "セレスト", "福間", "業務委託ほか", "1", "", "2026/07/14"],
    ["★★★", "セレスト", "小倉", "業務委託ほか", "1", "", "2026/07/14"],
    ["★★★", "セレスト", "久屋大通", "業務委託ほか", "1", "", "2026/07/14"],
    ["★★", "セレスト", "石神井公園", "業務委託ほか", "1", "", "2026/07/14"],
    ["★", "セレスト", "石川町", "業務委託ほか", "1", "", "2026/07/14"],
    ["★", "セレスト", "京都四条烏丸", "業務委託ほか", "1",
     "指名のお客様をお持ちの方歓迎", "2026/07/14"],
    ["★", "セレスト", "江古田", "業務委託ほか", "1", "夜に入れる方歓迎",
     "2026/07/14"],
    ["★", "セレスト", "阿佐ヶ谷", "業務委託ほか", "1", "", "2026/07/14"],
    ["★", "セレスト", "千歳烏山", "業務委託ほか", "1", "席数が多いため歓迎",
     "2026/07/14"],
    ["", "セレスト", "小岩", "業務委託ほか", "1", "移転状況による",
     "2026/07/14"],
    ["", "セレスト", "（共通）", "", "",
     "上記以外の店舗も、指名のお客様を50名以上お連れいただける方は歓迎",
     "2026/07/14"],
    ["★★★", "OAK（業務委託）", "福間", "業務委託", "1", "", "2026/07/30"],
    ["★★★", "OAK（業務委託）", "九大学研都市", "業務委託", "1",
     "夜に働ける方歓迎・ブランクのない方", "2026/07/30"],
    ["", "OAK（業務委託）", "小倉", "業務委託（面貸し）", "1",
     "顧客をお持ちの方のみ", "2026/07/30"],
    ["", "OAK（業務委託）", "博多", "業務委託（面貸し）", "1",
     "顧客をお持ちの方のみ", "2026/07/30"],
    ["★★", "nicotto", "三軒茶屋", "正社員・パート・業務委託", "3",
     "新業態・2026年下旬新装オープン（オープニング募集）", "2026/08/18"],
    ["★★", "nicotto", "門前仲町", "正社員・パート・業務委託", "3",
     "新業態・2026年下旬新装オープン（オープニング募集）", "2026/08/18"],
    ["★★", "nicotto", "八王子", "正社員・パート・業務委託", "3",
     "新業態・2026年下旬新装オープン（オープニング募集）", "2026/08/18"],
]
B11 = ("更新: セレスト久屋大通が強化リストに復帰（★★★は計15店舗）。"
       "東京のまつげ店（渋谷・恵比寿・池袋）は募集停止のため求人一覧から除外し、"
       "Belle渋谷店は閉店予定です（同エリアのALO宮下公園店は営業継続・募集停止中）")

for name, sid, sum_id in [("WC", WC, WC_SUM_ID), ("MIRAI", MIRAI, MIRAI_SUM_ID)]:
    rows = api("GET", sid, "/values/"
               + urllib.parse.quote("★更新サマリ!A1:I200")).get("values", [])
    kyoka_hdr = next(i for i, r in enumerate(rows)
                     if r and r[0].startswith("■ 強化エリア一覧"))
    data_start = kyoka_hdr + 3
    end0 = data_start - 1
    while end0 < len(rows) and any(c.strip() for c in rows[end0]):
        end0 += 1
    old_len = end0 - (data_start - 1)
    pad = max(0, old_len - len(KYOKA))
    block = KYOKA + [[""] * 7 for _ in range(pad)]
    ups = [
        {"range": f"★更新サマリ!A{data_start}:G{data_start + len(block) - 1}",
         "values": block},
        {"range": "★更新サマリ!B11", "values": [[B11]]},
        {"range": "★更新サマリ!B2", "values": [["2026/08/19"]]},
    ]
    # 店舗一覧: 久屋大通に★★★、東京まつげ3行を特定
    del_rows = []
    for i, r in enumerate(rows):
        c = (r + [""] * 9)[:9]
        shop = c[2]
        if shop == "セレスト久屋大通店":
            ups.append({"range": f"★更新サマリ!E{i+1}", "values": [["★★★"]]})
        if shop in ("Belle 渋谷店（旧Eye Doll・渋谷エリア）",
                    "Belle 恵比寿店（旧Natural ViVi）",
                    "Natural ViVi 池袋店"):
            del_rows.append(i)  # 0-based
    api("POST", sid, "/values:batchUpdate",
        {"valueInputOption": "USER_ENTERED", "data": ups})
    # 行削除は下から
    reqs = [{"deleteDimension": {"range": {"sheetId": sum_id,
                                           "dimension": "ROWS",
                                           "startIndex": r0,
                                           "endIndex": r0 + 1}}}
            for r0 in sorted(del_rows, reverse=True)]
    if reqs:
        api("POST", sid, ":batchUpdate", {"requests": reqs})
    print(f"3) {name}: 強化エリア{len(KYOKA)}行(旧{old_len})・久屋大通★★★・"
          f"東京まつげ{len(del_rows)}行削除")
