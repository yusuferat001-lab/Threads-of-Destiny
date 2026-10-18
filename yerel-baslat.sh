#!/usr/bin/env bash
# Kader Çarkı — yerelde tek komutla başlat (Mac/Linux). PostgreSQL gerekmez.
cd "$(dirname "$0")" || exit 1

if ! command -v node >/dev/null 2>&1; then
  echo "HATA: Node.js kurulu değil. https://nodejs.org adresinden LTS sürümünü kurup tekrar dene."
  exit 1
fi
SURUM=$(node -p "process.versions.node.split('.')[0]")
if [ "$SURUM" -lt 20 ]; then
  echo "HATA: Node.js $SURUM çok eski (en az 20 gerekli). https://nodejs.org adresinden güncelle."
  exit 1
fi

[ -d server/node_modules ] || { echo "İlk kurulum: sunucu paketleri indiriliyor..."; (cd server && npm install) || exit 1; }
[ -d client/node_modules ] || { echo "İlk kurulum: istemci paketleri indiriliyor..."; (cd client && npm install) || exit 1; }

trap 'kill 0' EXIT INT TERM
(cd server && npm run dev:bellek) &
(cd client && npm run dev) &

sleep 6
URL="http://localhost:5180"
echo "Oyun açılıyor: $URL   (durdurmak için bu pencerede Ctrl+C)"
if command -v open >/dev/null 2>&1; then open "$URL"; elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"; fi
wait
