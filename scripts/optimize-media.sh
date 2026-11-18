#!/usr/bin/env bash
# Converts the raw project media into small, web-ready files inside site/assets/.
# Run:  ./scripts/optimize-media.sh   (from anywhere)
# Raw files are read from SRC; web-ready files go to assets/.
# Needs: ffmpeg + cwebp  (brew install ffmpeg webp)
#
# To add a project: add lines at the bottom using img / vid / phonevid.
set -euo pipefail
SITE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${SRC:-/Users/donaldmethus/Sites/Project/st/portfolio}"
OUT="$SITE_DIR/assets"
cd "$SRC"

# img <slug> <out-name> <source.png>      -> site/assets/<slug>/<out-name>.webp (max 1800px wide)
img() {
  mkdir -p "$OUT/$1"
  local dst="$OUT/$1/$2.webp"
  [[ -f "$dst" && "$dst" -nt "$3" ]] && return 0
  local w; w=$(sips -g pixelWidth "$3" | awk '/pixelWidth/{print $2}')
  if (( w > 1800 )); then cwebp -quiet -q 82 -resize 1800 0 "$3" -o "$dst"
  else cwebp -quiet -q 82 "$3" -o "$dst"; fi
  echo "  img  $dst"
}

# phoneimg <slug> <out-name> <source.png> -> phone screenshot, max 900px wide
phoneimg() {
  mkdir -p "$OUT/$1"
  local dst="$OUT/$1/$2.webp"
  [[ -f "$dst" && "$dst" -nt "$3" ]] && return 0
  cwebp -quiet -q 82 -resize 900 0 "$3" -o "$dst"
  echo "  img  $dst"
}

# vid <slug> <out-name> <source>          -> desktop screen recording, max 1440px wide
vid() { _video "$1" "$2" "$3" "scale='min(1440,iw)':-2"; }
# phonevid <slug> <out-name> <source>     -> portrait phone recording, max 1280px tall
phonevid() { _video "$1" "$2" "$3" "scale=-2:'min(1280,ih)'"; }

_video() {
  mkdir -p "$OUT/$1"
  local dst="$OUT/$1/$2.mp4" poster="$OUT/$1/$2-poster.webp"
  if [[ ! -f "$dst" || "$3" -nt "$dst" ]]; then
    ffmpeg -loglevel error -y -i "$3" -vf "$4,fps=30" -c:v libx264 -preset slow -crf 26 \
      -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k "$dst"
    echo "  vid  $dst ($(du -h "$dst" | cut -f1))"
  fi
  if [[ ! -f "$poster" ]]; then
    ffmpeg -loglevel error -y -ss 2 -i "$dst" -frames:v 1 -f image2pipe -vcodec png - | cwebp -quiet -q 80 -o "$poster" -- -
  fi
}

echo "AI Finance Tracker"
S="Harsh used /AI Finance Tracker"
F="$S/ai-finance-tracker-images/Simulator Screenshot - iPhone 17 - 2026-07-03 at"
img finance cover "$S/cover/finance_cover_2000x1400.png"
phonevid finance demo "$S/MicrosoftTeams-video.mp4"
phoneimg finance 01 "$F 11.26.09.png"
phoneimg finance 02 "$F 11.26.25.png"
phoneimg finance 03 "$F 11.26.19.png"
phoneimg finance 04 "$F 11.26.11.png"
phoneimg finance 05 "$F 11.26.45.png"
phoneimg finance 06 "$F 11.26.30.png"
phoneimg finance 07 "$F 11.26.15.png"
phoneimg finance 08 "$F 11.25.53.png"

echo "FoodDash"
S="Harsh used /Food app"
R="$S/restaurant-owner/screencapture-192-168-1-5-8000-dashboard"
img fooddash cover "$S/cover_1000x700.png"
phonevid fooddash customer "$S/Customer Ordering Experience.mp4"
phonevid fooddash rider "$S/Rider Delivery Experience.mp4"
phoneimg fooddash 01 "$S/frames/customer-menu.png"
phoneimg fooddash 02 "$S/frames/customer-cart.png"
phoneimg fooddash 03 "$S/frames/customer-order-tracking.png"
phoneimg fooddash 04 "$S/frames/rider-active-delivery.png"
phoneimg fooddash 05 "$S/frames/rider-on-the-way.png"
phoneimg fooddash 06 "$S/frames/rider-delivery-logs.png"
img fooddash 07 "$R-2026-06-26-17_29_12.png"
img fooddash 08 "$R-orders-2026-06-26-17_29_33.png"
img fooddash 09 "$R-orders-9-2026-06-26-17_29_58.png"
img fooddash 10 "$R-menu-items-2026-06-26-17_30_24.png"
img fooddash 11 "$R-menu-items-14-edit-2026-06-26-17_31_01.png"
img fooddash 12 "$R-earnings-2026-06-26-17_31_41.png"
img fooddash 13 "$R-restaurant-profile-2026-06-26-17_31_22.png"

echo "Multi-tenant SaaS"
S="Harsh used /Multi-tenant-saaS"
M="$S/MTS-mobile-app-SS/Simulator Screenshot - iPhone 17 - 2026-07-07 at"
A="$S/multi-tenant-saaS-admin-panel-images/screencapture-localhost-5173"
img saas cover "$S/saas_cover_v2_1000x700.png"
phonevid saas demo "$S/Simulator Screen Recording - iPhone 17 - 2026-07-07 at 11.20.38.mov"
phoneimg saas 01 "$M 11.15.12.png"
phoneimg saas 02 "$M 11.15.50.png"
phoneimg saas 03 "$M 11.15.58.png"
phoneimg saas 04 "$M 11.16.09.png"
phoneimg saas 05 "$M 11.16.20.png"
phoneimg saas 06 "$M 11.17.01.png"
phoneimg saas 07 "$M 11.17.12.png"
img saas 08 "$A-dashboard-2026-07-07-11_10_09.png"
img saas 09 "$A-tenants-2026-07-07-11_10_26.png"
img saas 10 "$A-plans-2026-07-07-11_10_33.png"

echo "ActiviKid"
S="Harsh used /activity kid"
img activikid cover "$S/activikid_cover_1000x700 (1).png"
img activikid 01 "$S/image_original"
img activikid 02 "$S/image_original (1)"
img activikid 03 "$S/image_original (2)"
img activikid 04 "$S/image_original (3)"
img activikid 05 "$S/image_original (4)"

echo "NexusCRM"
S="Harsh used /crm"
F="$S/FireShot Capture"
img nexuscrm cover "$S/nexuscrm_cover_v2_1000x750 (1).png"
vid nexuscrm demo "$(ls "$S"/Screen\ Recording*.mov | head -1)"
img nexuscrm 01 "$F 076 - - NexusCRM - [myproject99.site].png"
img nexuscrm 02 "$F 080 - - NexusCRM - [myproject99.site].png"
img nexuscrm 03 "$F 081 - - NexusCRM - [myproject99.site].png"
img nexuscrm 04 "$F 079 - - NexusCRM - [myproject99.site].png"
img nexuscrm 05 "$F 077 - - NexusCRM - [myproject99.site].png"
img nexuscrm 06 "$F 078 - - NexusCRM - [myproject99.site].png"
img nexuscrm 07 "$F 083 - - NexusCRM - [myproject99.site].png"
img nexuscrm 08 "$F 085 - - NexusCRM - [myproject99.site].png"
img nexuscrm 09 "$F 082 - - NexusCRM - [myproject99.site].png"
img nexuscrm 10 "$F 086 - - NexusCRM - [myproject99.site].png"

echo "TruckGuru"
S="Harsh used /truckguru"
F="$S/FireShot Capture"
T="Book Trucks Online in India - FTL Rates Upfront - TruckGuru_ - [truckguru.co.in].png"
img truckguru cover "$S/truckguru_cover_1000x750.png"
phoneimg truckguru 01 "$S/png/app-01.png"
phoneimg truckguru 02 "$S/png/app-02.png"
phoneimg truckguru 03 "$S/png/app-03.png"
phoneimg truckguru 04 "$S/png/app-04.png"
phoneimg truckguru 05 "$S/png/app-05.png"
phoneimg truckguru 06 "$S/png/app-06.png"
img truckguru 07 "$F 070 - $T"
img truckguru 08 "$F 075 - $T"
img truckguru 09 "$F 074 - $T"
img truckguru 10 "$F 071 - $T"
img truckguru 11 "$F 073 - $T"
img truckguru 12 "$F 072 - $T"

echo "Done. Total: $(du -sh "$OUT" | cut -f1)"
