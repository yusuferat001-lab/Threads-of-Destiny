#!/usr/bin/env bash
# PostToolUse hook: Edit/Write sonrası değişen server/client .ts(x) dosyası için tip kontrolü.
# Hata varsa çıktıyı Claude'a geri verir (exit 2). node_modules yoksa sessizce geçer.
f=$(jq -r '.tool_input.file_path // empty' 2>/dev/null)
[ -z "$f" ] && exit 0
root="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null)}"
[ -z "$root" ] && exit 0
case "$f" in
  "$root"/server/src/*.ts|"$root"/server/src/*/*.ts|"$root"/server/src/*/*/*.ts|"$root"/server/src/*/*/*/*.ts|"$root"/server/tests/*.ts)
    dir="$root/server"; args=(--noEmit) ;;
  "$root"/client/src/*.ts|"$root"/client/src/*.tsx|"$root"/client/src/*/*.ts|"$root"/client/src/*/*.tsx)
    dir="$root/client"; args=(--noEmit -p tsconfig.app.json) ;;
  *) exit 0 ;;
esac
[ -x "$dir/node_modules/.bin/tsc" ] || exit 0
out=$(cd "$dir" && timeout 120 node_modules/.bin/tsc "${args[@]}" 2>&1)
if [ $? -ne 0 ]; then
  echo "Tip kontrolü başarısız (${dir##*/}):" >&2
  echo "$out" | head -40 >&2
  exit 2
fi
exit 0
