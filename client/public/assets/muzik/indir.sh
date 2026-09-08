#!/usr/bin/env bash
# Arka plan müziği için serbest lisanslı (kamu malı / CC) kayıtları Wikimedia Commons'tan indirir.
# Çalıştır:  bash client/public/assets/muzik/indir.sh
# Bağımlılık: curl (Git Bash'te var). ffmpeg varsa parçalar ~-16 LUFS'a normalize edilir.
#
# muzik.ts her parça için önce .mp3 sonra .ogg dener; bu yüzden dosyaları OLDUĞU gibi
# (ogg/mp3) bırakmak yeterli. Bir dosya inmezse o parça oyunda sessizce atlanır.

set -u
cd "$(dirname "$0")" || exit 1

# hedef_ad | Commons dosya adı | uzanti | lisans / künye
# 2026-09-08: hepsi TAM telifsiz (kamu malı / CC0) — künye zorunlu değil.
PARCALAR=(
  "menu-1|Air.ogg|ogg|Kamu malı — Bach, Air on the G String, U.S. Air Force Strings"
  "menu-2|Wolfgang Amadeus Mozart - US ARMY - Mozart overture to the marriage of figaro.ogg|ogg|Kamu malı — Mozart, Figaro'nun Düğünü Uvertürü, U.S. Army Band"
  "menu-3|The Modena Chamber Orchestra - Vivaldi's Spring, RV 269 - I. Allegro.ogg|ogg|Kamu malı — Vivaldi, İlkbahar I. Allegro, Modena CO (Musopen)"
  "ortacag-1|The Modena Chamber Orchestra - Vivaldi's Autumn, RV 293 - III. Allegro.ogg|ogg|Kamu malı — Vivaldi, Sonbahar III. Allegro ('Av'), Modena CO (Musopen)"
  "ortacag-2|The Modena Chamber Orchestra - Vivaldi's Winter, RV 297 - III. Allegro.ogg|ogg|Kamu malı — Vivaldi, Kış III. Allegro, Modena CO (Musopen)"
  "ortacag-3|Sumer Is Icumen In (13th century English round).ogg|ogg|Kamu malı — 13. yy İngiliz round'u"
  "sanayi-1|Musopen - Morning.ogg|ogg|Kamu malı — Grieg, 'Sabah' (Peer Gynt), Musopen"
  "sanayi-2|Overture to Light Cavalry - U.S. Marine Band.ogg|ogg|Kamu malı — Suppé, Hafif Süvari Uvertürü (1866), U.S. Marine Band (~21 MB)"
  "sanayi-3|Musopen - In the Hall Of The Mountain King.ogg|ogg|Kamu malı — Grieg, 'Dağ Kralının Salonunda', Musopen"
  "sanayi-4|Offenbach - Orpheus in the Underworld - Overture, Can Can section.ogg|ogg|Kamu malı (CC0) — Offenbach, Can-Can / Cehennem Galobu, Musopen"
  "sanayi-5|Gioachino Rossini, William Tell Overture (military band version, 2000).ogg|ogg|Kamu malı — Rossini, Wilhelm Tell Uvertürü, U.S. Marine Band (~11 dk)"
  "sanayi-6|The Modena Chamber Orchestra - Vivaldi's Summer, RV 315 - III. Presto.ogg|ogg|Kamu malı — Vivaldi, Yaz III. Presto, Modena CO (Musopen)"
  "olum-1|Frederic Chopin Piano Sonata No.2 in B flat minor Op35 - III Marche Funebre.ogg|ogg|CC0 — Chopin, Cenaze Marşı, Andreas Xenopoulos (Musopen)"
)

urlencode() {
  local s="$1" o="" c
  for (( i=0; i<${#s}; i++ )); do
    c="${s:$i:1}"
    case "$c" in
      [a-zA-Z0-9._~-]) o+="$c" ;;
      " ") o+="%20" ;;
      *) printf -v h '%%%02X' "'$c"; o+="$h" ;;
    esac
  done
  printf '%s' "$o"
}

echo "== Kader Çarkı arka plan müziği indiriliyor =="
KUNYE="künye.txt"
: > "$KUNYE"
HATA=0

for satir in "${PARCALAR[@]}"; do
  IFS='|' read -r hedef kaynak ext lisans <<< "$satir"
  cikti="${hedef}.${ext}"
  url="https://commons.wikimedia.org/wiki/Special:FilePath/$(urlencode "$kaynak")"
  printf '  %-12s <- %s\n' "$cikti" "$kaynak"
  if curl -fsSL -A "kader-carki-muzik-indir/1.0" -o "$cikti" "$url"; then
    printf '%s\n    kaynak: %s\n    lisans: %s\n\n' "$cikti" "$kaynak" "$lisans" >> "$KUNYE"
  else
    echo "    ! inmedi (atlanıyor) — $url"
    rm -f "$cikti"
    HATA=$((HATA+1))
  fi
done

if command -v ffmpeg >/dev/null 2>&1; then
  echo "== ffmpeg bulundu — ~96 kbps OGG'ye küçültülüp -16 LUFS'a normalize ediliyor =="
  for f in menu-*.ogg menu-*.mp3 ortacag-*.ogg ortacag-*.mp3 sanayi-*.ogg sanayi-*.mp3 olum-*.ogg olum-*.mp3; do
    [ -e "$f" ] || continue
    base="${f%.*}"; tmp="__${base}.ogg"
    if ffmpeg -y -loglevel error -i "$f" -vn -ac 2 -ar 44100 -c:a libvorbis -q:a 2 \
              -af "loudnorm=I=-16:TP=-1.5:LRA=11" "$tmp" 2>/dev/null && [ -s "$tmp" ]; then
      rm -f "$f"; mv "$tmp" "${base}.ogg"
      echo "  ~ ${base}.ogg  ($(stat -c%s "${base}.ogg" 2>/dev/null || echo '?') B)"
    else
      rm -f "$tmp"
    fi
  done
fi

echo
echo "Bitti. Künye: $(pwd)/$KUNYE"
[ "$HATA" -gt 0 ] && echo "$HATA dosya inmedi — Commons'ta adı değişmiş olabilir; README'deki listeden elle indir."
echo "Oyunda: Ayarlar -> 🎵 Müzik -> Açık"
