# -*- coding: utf-8 -*-
"""Update hero stat, kyoka summary card, and store-table stars in both LPs."""
import io

CARD_OLD = """        <li><b>まつげ</b>：渋谷・沖縄</li>
        <li><b>カラー</b>：仙川</li>
        <li><b>セレスト</b>：葛西・住吉・門前仲町・ときわ台・大泉学園・高円寺・成増・川口・久屋大通・福間・小倉</li>
        <li><b>OAK</b>：福間・九大学研都市</li>"""
CARD_NEW = """        <li><b>NEW</b>：nicotto 3店舗（三軒茶屋・門前仲町・八王子）を★★で追加（各3名募集）</li>
        <li><b>まつげ</b>：沖縄（渋谷・恵比寿・池袋は充足のため終了）</li>
        <li><b>カラー</b>：仙川</li>
        <li><b>セレスト</b>：葛西・住吉・門前仲町・ときわ台・大泉学園・高円寺・成増・川口・福間・小倉（久屋大通は終了）</li>
        <li><b>OAK</b>：福間・九大学研都市</li>"""

JOBS = [
    ("Eye Doll 渋谷店", '<td class="stars">★★★</td>', '<td class="stars"></td>'),
    ("Natural ViVi 恵比寿店", '<td class="stars">★★</td>', '<td class="stars"></td>'),
    ("Natural ViVi 池袋店", '<td class="stars">★★</td>', '<td class="stars"></td>'),
    ("久屋大通店", '<td class="stars">★★★</td>', '<td class="stars"></td>'),
    ("nicotto 三軒茶屋店", '<td class="stars"></td><td class="num"></td>',
     '<td class="stars">★★</td><td class="num">3</td>'),
    ("nicotto 門前仲町店", '<td class="stars"></td><td class="num"></td>',
     '<td class="stars">★★</td><td class="num">3</td>'),
    ("nicotto 八王子店", '<td class="stars"></td><td class="num"></td>',
     '<td class="stars">★★</td><td class="num">3</td>'),
]


def edit(path):
    s = io.open(path, encoding="utf-8").read()
    a = '<div class="stat gold"><b>19</b>店舗<span>最優先（★★★）</span></div>'
    b = '<div class="stat gold"><b>14</b>店舗<span>最優先（★★★）</span></div>'
    assert a in s, path + ": hero stat"
    s = s.replace(a, b)
    assert CARD_OLD in s, path + ": kyoka card"
    s = s.replace(CARD_OLD, CARD_NEW)
    lines = s.split("\n")
    done = set()
    for i, ln in enumerate(lines):
        for key, old, new in JOBS:
            if key in ln and key not in done and old in ln:
                lines[i] = ln.replace(old, new, 1)
                done.add(key)
    miss = [k for k, _, _ in JOBS if k not in done]
    assert not miss, f"{path} missing: {miss}"
    io.open(path, "w", encoding="utf-8").write("\n".join(lines))
    print(path, "OK")


edit("workcanvas-lp/index.html")
edit("miraizm-lp/index.html")
