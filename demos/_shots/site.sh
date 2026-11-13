#!/bin/sh
# usage: site.sh <out> <w> <h> "<query>"   → screenshot of http://localhost:4321 via dist/_wrap.html
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$TEMP/ilyt-shot2" \
  --window-size=$2,$3 --virtual-time-budget=${VT:-9000} --screenshot="C:/Users/fabri/AppData/Local/Temp/claude/1526ffc9894d3343/9d01c111-53ba-4348-95b4-e06ea7c690f8/scratchpad/$1.png" "http://localhost:4321/_wrap.html?$4" 2>/dev/null
