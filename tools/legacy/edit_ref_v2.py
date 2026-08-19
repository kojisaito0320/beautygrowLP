# -*- coding: utf-8 -*-
"""Rebuild public referral tables (year-month dates, comments, reps) and
restructure password pages (simple status + 近況・補足 column)."""
import io
import re

CHIP = {"matsuge": "まつげ", "celeste": "セレスト", "color": "カラー"}


def row(name, rep, chip, store, date, after):
    return (f'      <tr><td>{name}</td><td>{rep}</td>'
            f'<td><span class="chip {chip}">{CHIP[chip]}</span></td>'
            f'<td>{store}</td><td class="num">{date}</td><td>{after}</td></tr>')


WC_ROWS = [
    row("高橋様", "中本様", "matsuge", "宮下公園", "2025年4月",
        "退職（2026年2月・約11ヶ月在籍・勤怠面の課題のため）"),
    row("松原様", "荒木様", "matsuge", "恵比寿", "2025年5月",
        "約16ヶ月・在籍中（アルバイト週3・独立準備のため2026年4月以降シフトインなし）"),
    row("浅井様", "工藤様", "celeste", "成増", "2025年6月",
        "約15ヶ月・在籍中（業務委託・2025年新人賞受賞、売上80万円突破）"),
    row("シュレスタ様", "矢澤様", "celeste", "町田", "2025年12月",
        "約9ヶ月・在籍中（パート・美髪マイスター取得、毎月約100時間勤務）"),
    row("境野様", "齋藤様", "celeste", "心斎橋", "2026年5月",
        "約3ヶ月・在籍中（業務委託・月70時間勤務）"),
    row("小原様", "荒木様", "matsuge", "池袋東口", "−",
        "内定（10月に内定者懇談会予定）"),
    row("深町様", "山下様", "matsuge", "池袋", "2026年7月",
        "約2ヶ月・在籍中（アルバイト・基礎研修・MTG参加）"),
    row("梅澤様", "山下様", "celeste", "成増", "2026年10月 予定",
        "内定（業務委託）"),
    row("奥山様", "齋藤様", "celeste", "なんば", "2026年7月",
        "約2ヶ月・在籍中（アルバイト・基礎研修・MTG参加）"),
    row("中村様", "矢澤様", "celeste", "なんば", "2026年7月",
        "約2ヶ月・在籍中（アルバイト・基礎研修・MTG参加）"),
    row("松野様", "山下様", "celeste", "高円寺", "−",
        "内定（2027年7月入社予定）"),
]
MIRAI_ROWS = [
    row("小原様", "−", "celeste", "竹ノ塚", "2025年1月",
        "退職（2025年6月・約5ヶ月在籍・パート）"),
    row("江黒様", "飯田様", "celeste", "町田", "2025年4月",
        "約17ヶ月・在籍中（アルバイト・売上約60万円）"),
    row("桑江様", "保志場様", "color", "那覇", "2025年5月",
        "約15ヶ月・在籍中（アルバイト・ご家族都合の転居予定に伴い小倉店勤務を提案中）"),
    row("川口様", "二階堂様", "celeste", "江古田", "2025年6月",
        "約14ヶ月・在籍中（8月から業務委託へ・月120時間勤務／約60万円売上）"),
    row("谷崎様", "西川様", "celeste", "町田", "2026年4月",
        "約5ヶ月・在籍中（正社員・本社採用業務兼務、売上100万円突破で上位10％）"),
    row("上地様", "ヤヤ様", "matsuge", "沖縄", "2025年11月",
        "退職（2026年4月・約5ヶ月在籍・エクステ志向のため）"),
    row("鈴木様", "小口様", "celeste", "川口", "2026年2月",
        "退職（約6ヶ月在籍・勤務姿勢のミスマッチ）"),
    row("眞木様", "二階堂様", "celeste", "大泉学園", "2026年3月",
        "退職（2026年7月・約5ヶ月在籍・シフト勤務が確保されず）"),
    row("富永様", "井上様", "matsuge", "栄", "2026年9月 予定",
        "内定（正社員・9月より東京研修）"),
]


def rebuild_tbody(path, rows, extra=()):
    s = io.open(path, encoding="utf-8").read()
    m = re.search(r'(<table id="ref-table" class="sortable">.*?<tbody>\n)(.*?)(\n\s*</tbody>)',
                  s, re.S)
    assert m, path + ": tbody"
    s = s[:m.start(2)] + "\n".join(rows) + s[m.end(2):]
    for a, b in extra:
        assert a in s, f"{path}: {a[:60]}"
        s = s.replace(a, b)
    io.open(path, "w", encoding="utf-8").write(s)
    print(path, "OK")


rebuild_tbody("workcanvas-lp/index.html", WC_ROWS, [
    ("最長在籍（2025/5入社・在籍中）", "最長在籍（2025年5月入社・在籍中）"),
])
rebuild_tbody("miraizm-lp/index.html", MIRAI_ROWS, [
    ('<div class="stat"><b>10</b>名<span>ミライズム様ご紹介の成約</span></div>',
     '<div class="stat"><b>9</b>名<span>ミライズム様ご紹介の成約</span></div>'),
    ('<div class="stat gold"><b>10</b>名<span>成約（採用・入社決定）</span></div>',
     '<div class="stat gold"><b>9</b>名<span>成約（採用・入社決定）</span></div>'),
    ("最長在籍は江黒様（2025/4入社・継続中）です。",
     "最長在籍は江黒様（2025年4月入社・継続中）です。"),
    ("""        <li><b>NEW</b>：桑江様 2025/5入社・在籍中／上地様 2026/4退職（記録の訂正）</li>
        <li>谷崎様 4/1正社員入社・在籍中／富永様 9/1入社予定（内定）</li>
        <li>川口様は8月から業務委託へ／鈴木様・眞木様・古賀様は退職</li>""",
     """        <li><b>NEW</b>：小原様の記録を追加（2025年1月入社→6月退職）。金子様は記録整理のため除外（成約9名に）</li>
        <li>在籍中: 江黒様・桑江様・川口様・谷崎様（詳細は下表の「その後」参照）</li>
        <li>富永様 2026年9月入社予定（内定）／鈴木様・眞木様・上地様は退職</li>"""),
])

# ===== password pages =====
WC_STATUS = {
    "高橋 芽衣": ("採用→退職", "2026年2月退職・勤怠面の課題のため"),
    "松原 望美": ("採用", "在籍中・独立準備のため2026年4月以降シフトインなし"),
    "浅井 利江": ("採用", "在籍中・2025年新人賞受賞、売上80万円突破。懇親会にも積極参加"),
    "シュレスタさつき": ("採用", "在籍中・美髪マイスター取得、町田でパート・毎月約100時間勤務"),
    "境野 紘子": ("採用", "2026年5月入社・在籍中。月70時間勤務（約30万円売上）"),
    "奥山 考香": ("採用", "2026年7月入社・在籍中。なんば店2ヶ月目、基礎研修・MTGに参加"),
    "中村 梨亜": ("採用", "2026年7月入社・在籍中。なんば店2ヶ月目、基礎研修・MTGに参加"),
    "深町 萌香": ("採用", "2026年7月入社・在籍中。池袋店2ヶ月目、基礎研修・MTGに参加"),
    "梅澤 遼": ("内定", "2026年10月入社予定（業務委託）"),
    "小原 優希": ("内定", "10月に内定者懇談会参加予定"),
    "松野 麻優": ("内定", "入社は2027年7月予定"),
}
WC_DATES = {"高橋 芽衣": "2025年4月", "松原 望美": "2025年5月",
            "浅井 利江": "2025年6月", "シュレスタさつき": "2025年12月",
            "境野 紘子": "2026年5月", "奥山 考香": "2026年7月",
            "中村 梨亜": "2026年7月", "深町 萌香": "2026年7月",
            "梅澤 遼": "2026年10月予定"}

s = io.open("workcanvas-lp/src/referrals-src.html", encoding="utf-8").read()
s = s.replace("<th>入社日</th><th>ご紹介料</th></tr>",
              "<th>入社日</th><th>ご紹介料</th><th>近況・補足</th></tr>")
lines = s.split("\n")
for i, ln in enumerate(lines):
    if "<tr><td class=" not in ln:
        continue
    name = next((n for n in WC_STATUS if n in ln), None)
    if name:
        st, comment = WC_STATUS[name]
        ln = re.sub(r'<span class="st [a-z]+">[^<]*</span>',
                    f'<span class="st ok">{st}</span>', ln, count=1)
        if name in WC_DATES:
            ln = re.sub(r'(</td><td class="num">)[^<]*(</td><td>[^<]*</td></tr>)$',
                        r'\g<1>' + WC_DATES[name] + r'\g<2>', ln)
        ln = ln.replace("</tr>", f"<td>{comment}</td></tr>", 1)
    else:
        ln = ln.replace("</tr>", "<td></td></tr>", 1)
    lines[i] = ln
io.open("workcanvas-lp/src/referrals-src.html", "w", encoding="utf-8").write("\n".join(lines))
print("WC src OK")

MIRAI_STATUS = {
    "金子 めぐみ": ("−", ""),
    "小原 律子": ("採用→退職", "2025年1月入社→2025年6月退職（パート）"),
    "江黒 美穂": ("採用", "在籍中・町田店で活躍中、売上約60万円"),
    "桑江 結夢": ("採用", "在籍中・ご家族都合の転居予定に伴い小倉店勤務を提案中"),
    "川口 志織": ("採用", "在籍中・8月から本人希望で業務委託へ。月120時間勤務（約60万円売上）"),
    "谷崎 雄太": ("採用", "2026年4月正社員入社・在籍中。本社採用業務兼務、売上100万円突破で上位10％"),
    "上地 真歩": ("採用→退職", "2026年4月退職・エクステ志向のため"),
    "鈴木 大介": ("採用→退職", "退職（約6ヶ月在籍）・勤務姿勢のミスマッチ"),
    "眞木 園江": ("採用→退職", "2026年7月退職・シフト勤務が確保されず"),
    "古賀 高博": ("採用→退職", "2025年9月退職・勤務開始直後より連絡が取れず"),
    "富永 奈央": ("内定", "2026年9月入社予定・9月より東京研修、栄店勤務予定"),
}
s = io.open("miraizm-lp/src/referrals-src.html", encoding="utf-8").read()
lines = s.split("\n")
for i, ln in enumerate(lines):
    if "<tr><td class=" not in ln:
        continue
    name = next((n for n in MIRAI_STATUS if n in ln), None)
    if not name:
        continue
    st, comment = MIRAI_STATUS[name]
    if st == "−":
        ln = re.sub(r'<span class="st [a-z]+">[^<]*</span>', "−", ln, count=1)
    else:
        ln = re.sub(r'<span class="st [a-z]+">[^<]*</span>',
                    f'<span class="st ok">{st}</span>', ln, count=1)
    ln = re.sub(r'(<td>[^<]*</td>)(</tr>)$', f"<td>{comment}</td>\\g<2>", ln)
    lines[i] = ln
io.open("miraizm-lp/src/referrals-src.html", "w", encoding="utf-8").write("\n".join(lines))
print("Mirai src OK")
