#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="${ROOT_DIR}/_site"

if [[ ! -d "$SITE_DIR" ]]; then
  echo "[check] _site directory not found. Run bin/build.sh first."
  exit 1
fi

required=(
  "${SITE_DIR}/index.html"
  "${SITE_DIR}/archive/index.html"
  "${SITE_DIR}/categories/index.html"
  "${SITE_DIR}/tags/index.html"
  "${SITE_DIR}/search/index.html"
  "${SITE_DIR}/feed.xml"
  "${SITE_DIR}/sitemap.xml"
)

for file in "${required[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "[check] missing required output: ${file}"
    exit 1
  fi
done

errors=0
check_files=(
  "${SITE_DIR}/index.html"
  "${SITE_DIR}/archive/index.html"
  "${SITE_DIR}/categories/index.html"
  "${SITE_DIR}/tags/index.html"
  "${SITE_DIR}/search/index.html"
)

mapfile -t links < <(
  rg -No '(?:href|src)="(/blog/[^"#?]+)' "${check_files[@]}" \
    | sed -E 's/.*"(\/blog\/[^"#?]+)$/\1/' \
    | sort -u
)

for link in "${links[@]}"; do
  rel="${link#/blog}"
  if [[ -z "$rel" || "$rel" == "/" ]]; then
    target="${SITE_DIR}/index.html"
  else
    target="${SITE_DIR}${rel}"
  fi

  if [[ -f "$target" || -f "${target}.html" ]]; then
    continue
  fi

  if [[ -d "$target" && -f "${target}/index.html" ]]; then
    continue
  fi

  if [[ "$link" == *"%"* ]]; then
    # URL-encoded 경로(한글 slug 등)는 파일시스템 경로와 직접 비교하기 어려워 검사에서 제외.
    continue
  fi

  echo "[check] broken internal path: ${link}"
  errors=$((errors + 1))
done

if [[ "$errors" -gt 0 ]]; then
  echo "[check] failed with ${errors} broken path(s)"
  exit 1
fi

echo "[check] required outputs and primary internal links are valid"
