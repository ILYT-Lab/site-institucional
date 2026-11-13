#!/bin/sh
# usage: mock.sh <out-name> "<query>"
C="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$C" --headless=new --disable-gpu --hide-scrollbars --no-first-run --allow-file-access-from-files --user-data-dir="$TEMP/ilyt-shot" \
  --window-size=1600,1000 --force-device-scale-factor=${SCALE:-1} --virtual-time-budget=6000 \
  --screenshot="D:/ILYT/Site/demos/_shots/$1.png" "file:///D:/ILYT/Site/demos/_shots/mock-app.html?$2" 2>/dev/null
ls -la /d/ILYT/Site/demos/_shots/$1.png
