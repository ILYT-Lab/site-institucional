#!/bin/sh
# usage: shot.sh <demo> <name> <w> <h> <scale>
C="/c/Program Files/Google/Chrome/Application/chrome.exe"
D=/d/ILYT/Site/demos
"$C" --headless=new --disable-gpu --hide-scrollbars --no-first-run --user-data-dir="$TEMP/ilyt-shot" \
  --window-size=$3,$4 --force-device-scale-factor=$5 --virtual-time-budget=4000 \
  --screenshot="D:/ILYT/Site/demos/_shots/$2.png" "file:///D:/ILYT/Site/demos/$1" 2>/dev/null
ls -la $D/_shots/$2.png
