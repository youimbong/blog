#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ -x "${HOME}/.rbenv/shims/bundle" ]]; then
  BUNDLE_CMD="${HOME}/.rbenv/shims/bundle"
else
  BUNDLE_CMD="bundle"
fi

export BUNDLE_USER_HOME="${ROOT_DIR}/.bundle_home"
export GEM_HOME="${ROOT_DIR}/.gem"
export GEM_PATH="${ROOT_DIR}/.gem"

echo "[build] bundle install"
"$BUNDLE_CMD" install

echo "[build] jekyll build"
"$BUNDLE_CMD" exec jekyll build "$@"

echo "[build] link/output checks"
"${ROOT_DIR}/bin/check-links.sh"

echo "[build] done"
