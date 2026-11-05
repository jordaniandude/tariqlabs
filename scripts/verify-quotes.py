#!/usr/bin/env python3
"""Check that every Arabic quote in /tmp/tx/out-NN.json really appears in the transcript.

Usage: python3 -I scripts/verify-quotes.py /tmp/tx/out-02.json /tmp/tx/02-XXXX.clean.txt
Normalises Arabic spelling (hamzas, ta marbuta, ya, diacritics) and compares
word sequences near the quote's timestamp, since captions are auto-generated.
"""
import json, re, sys, difflib

def norm(s):
    s = re.sub(r"[ً-ْـ]", "", s)
    s = re.sub(r"[أإآ]", "ا", s).replace("ة", "ه").replace("ى", "ي")
    s = re.sub(r"[^\w\s]", " ", s)
    return s.split()

def secs(t):
    p = [int(x) for x in t.split(":")]
    while len(p) < 3:
        p.insert(0, 0)
    return p[0] * 3600 + p[1] * 60 + p[2]

data = json.load(open(sys.argv[1], encoding="utf8"))
lines = []
for l in open(sys.argv[2], encoding="utf8"):
    m = re.match(r"\[(\d+(?::\d+){1,2})\] (.*)", l)
    if m:
        lines.append((secs(m.group(1)), norm(m.group(2))))

bad = 0
for q in data["quotes"]:
    t = secs(q["t"])
    window = [w for ts, ws in lines if t - 90 <= ts <= t + 90 for w in ws]
    qw = norm(q["ar"])
    sm = difflib.SequenceMatcher(None, window, qw, autojunk=False)
    matched = sum(b.size for b in sm.get_matching_blocks())
    ratio = matched / max(len(qw), 1)
    status = "OK " if ratio >= 0.8 else "BAD"
    bad += status == "BAD"
    print(f"{status} {q['t']:>8}  {ratio:.0%}  {q['ar'][:70]}")
sys.exit(1 if bad else 0)
