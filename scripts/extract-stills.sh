#!/usr/bin/env bash
# Grab candidate stills of a guest speaking, at given timestamps, so you can pick the best frame.
# Needs: yt-dlp and ffmpeg (brew install yt-dlp ffmpeg).
# Usage: scripts/extract-stills.sh <youtube-id> <out-dir> <timestamp> [timestamp...]
# Example (use the quote timestamps from js/podcast-data.js):
#   scripts/extract-stills.sh MIYP9b9XkEA images/guests/suhaib-diab 1:07:05 1:10:16 1:31:04
# For each timestamp it saves 3 frames (name-1.jpg … name-3.jpg), 1280px wide.
set -euo pipefail
id=$1; out=$2; shift 2
mkdir -p "$out"
for t in "$@"; do
  name=${t//:/-}
  secs=$(echo "$t" | awk -F: '{s=0; for(i=1;i<=NF;i++) s=s*60+$i; print s}')
  tmp=$(mktemp -d)
  yt-dlp -q -f "bv*[height<=1080]" --download-sections "*${secs}-$((secs + 5))" \
    --force-keyframes-at-cuts -o "$tmp/clip.%(ext)s" "https://www.youtube.com/watch?v=$id"
  ffmpeg -loglevel error -y -i "$tmp"/clip.* -vf "fps=0.7,scale=1280:-2" -frames:v 3 -q:v 3 "$out/$name-%d.jpg"
  rm -rf "$tmp"
  echo "saved $out/$name-1..3.jpg"
done
