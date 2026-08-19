# -*- coding: utf-8 -*-
"""Propagate ⑤強化エリア update (nicotto★★ added; 渋谷/恵比寿/池袋/久屋大通 dropped)
into both shared summary tabs."""
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).parent
SKILL_DIR = Path(r"c:\Users\ksait\cockpits\personal-cockpit\.claude\skills\gsheet")
sys.path.insert(0, str(SKILL_DIR))
import read_sheet as rs  # noqa: E402

WC = "156dNaRaCNijiDR_XrztY8Wry2ehbD8H-w64RDQcRbu8"
MIRAI = "1ktLN4cNbRnr1IeuC8-yHU4W77J8M9prlWzp0wvhiqzw"


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

B11 = ("更新: NEW nicotto 3店舗（三軒茶屋・門前仲町・八王子）を★★で追加"
       "（各3名募集・2026年下旬新装オープン）。まつげは渋谷・恵比寿・池袋、"
       "セレストは久屋大通が充足により強化リストから外れました"
       "（★★★はまつげ：沖縄／カラー：仙川／セレスト：葛西・住吉・門前仲町・"
       "ときわ台・大泉学園・高円寺・成増・川口・福間・小倉／OAK：福間・九大学研都市 の計14店舗）")

tok = token()
for name, sid in [("WC", WC), ("MIRAI", MIRAI)]:
    base = f"https://sheets.googleapis.com/v4/spreadsheets/{sid}"
    rows = json.loads((HERE / f"summary_{name}.json").read_text(
        encoding="utf-8"))
    # locate blocks
    kyoka_hdr = next(i for i, r in enumerate(rows)
                     if r and r[0].startswith("■ 強化エリア一覧"))
    data_start = kyoka_hdr + 3  # header row + column header row -> 1-based data
    # find end: first row at/after data_start-1 (0-based) that's blank
    end0 = data_start - 1
    while end0 < len(rows) and any(c.strip() for c in rows[end0]):
        end0 += 1
    old_len = end0 - (data_start - 1)
    pad = max(0, old_len - len(KYOKA))
    block = KYOKA + [[""] * 7 for _ in range(pad)]
    updates = [
        {"range": f"★更新サマリ!A{data_start}:G{data_start + len(block) - 1}",
         "values": block},
        {"range": "★更新サマリ!B11", "values": [[B11]]},
    ]
    # store list: nicotto rows + star removals
    for i, r in enumerate(rows):
        c = (r + [""] * 9)[:9]
        shop = c[2]
        if shop.startswith("nicotto ") and "西日暮里" not in shop:
            new_i = c[8].replace("2026年10月", "2026年下旬")
            updates.append({"range": f"★更新サマリ!E{i+1}:F{i+1}",
                            "values": [["★★", "3"]]})
            if new_i != c[8]:
                updates.append({"range": f"★更新サマリ!I{i+1}",
                                "values": [[new_i]]})
        elif shop in ("Eye Doll 渋谷店（渋谷エリア）",
                      "Natural ViVi 恵比寿店", "Natural ViVi 池袋店",
                      "セレスト久屋大通店") and c[4].startswith("★"):
            updates.append({"range": f"★更新サマリ!E{i+1}",
                            "values": [[""]]})
    api(tok, "POST", f"{base}/values:batchUpdate",
        {"valueInputOption": "USER_ENTERED", "data": updates})
    print(f"{name}: 強化エリア一覧 {len(KYOKA)}行書き換え（旧{old_len}行）＋"
          f"店舗一覧の★更新 {len(updates)-2}件")
