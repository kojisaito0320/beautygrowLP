# -*- coding: utf-8 -*-
"""Add ご担当 column to the public referral tables and apply approved
intermediate wording for 高橋様/桑江様. Also update password pages."""
import io
import re

WC_TANTO = {"高橋様": "中本様", "松原様": "荒木様", "浅井様": "工藤様",
            "シュレスタ様": "矢澤様", "境野様": "齋藤様", "小原様": "荒木様",
            "深町様": "山下様", "梅澤様": "山下様", "奥山様": "齋藤様",
            "中村様": "矢澤様", "松野様": "山下様"}
MIRAI_TANTO = {"小原様": "−", "江黒様": "飯田様", "桑江様": "保志場様",
               "川口様": "二階堂様", "谷崎様": "西川様", "上地様": "ヤヤ様",
               "鈴木様": "小口様", "眞木様": "二階堂様", "富永様": "井上様",
               "金子様": "−"}
HEAD_OLD = ("<thead><tr><th>ご成約者</th><th>業態</th><th>店舗</th>"
            "<th>入社日</th><th>その後</th></tr></thead>")
HEAD_NEW = ("<thead><tr><th>ご成約者</th><th>ご担当</th><th>業態</th><th>店舗</th>"
            "<th>入社日</th><th>その後</th></tr></thead>")


def edit_lp(path, tanto, extra_subs):
    s = io.open(path, encoding="utf-8").read()
    assert HEAD_OLD in s, path + ": table head"
    s = s.replace(HEAD_OLD, HEAD_NEW)
    lines = s.split("\n")
    done = set()
    for i, ln in enumerate(lines):
        m = re.search(r"<tr><td>([^<]+様)</td>", ln)
        if m and m.group(1) in tanto and m.group(1) not in done:
            rep = tanto[m.group(1)]
            lines[i] = ln.replace(f"<tr><td>{m.group(1)}</td>",
                                  f"<tr><td>{m.group(1)}</td><td>{rep}</td>", 1)
            done.add(m.group(1))
    miss = [k for k in tanto if k not in done]
    assert not miss, f"{path} missing rows: {miss}"
    s = "\n".join(lines)
    for a, b in extra_subs:
        assert a in s, f"{path}: {a[:50]}"
        s = s.replace(a, b)
    io.open(path, "w", encoding="utf-8").write(s)
    print(path, "OK")


edit_lp("workcanvas-lp/index.html", WC_TANTO, [
    ("<td>退職（2026/02/14・約11ヶ月在籍）</td>",
     "<td>退職（2026/02/14・約11ヶ月在籍・勤怠面の課題のため）</td>"),
])
edit_lp("miraizm-lp/index.html", MIRAI_TANTO, [
    ("<td>約15ヶ月・在籍中（アルバイト）</td>",
     "<td>約15ヶ月・在籍中（アルバイト・ご家族都合の転居予定に伴い小倉店勤務を提案中）</td>"),
])


def st_sub(path, jobs):
    s = io.open(path, encoding="utf-8").read()
    lines = s.split("\n")
    done = set()
    for i, ln in enumerate(lines):
        for name, newtext in jobs:
            if name in ln and name not in done:
                new, n = re.subn(r'<span class="st [a-z]+">[^<]*</span>',
                                 f'<span class="st ok">{newtext}</span>',
                                 ln, count=1)
                if n:
                    lines[i] = new
                    done.add(name)
    miss = [j[0] for j in jobs if j[0] not in done]
    assert not miss, f"{path} missing: {miss}"
    io.open(path, "w", encoding="utf-8").write("\n".join(lines))
    print(path, "OK")


st_sub("workcanvas-lp/src/referrals-src.html", [
    ("高橋 芽衣", "採用→退職（2026/02/14・勤怠面の課題のため）"),
])
st_sub("miraizm-lp/src/referrals-src.html", [
    ("桑江 結夢", "採用（在籍中・ご家族都合の転居予定に伴い小倉店勤務を提案中）"),
])
