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

HOST="${JEKYLL_HOST:-127.0.0.1}"
PORT="${JEKYLL_PORT:-4000}"

echo "[serve] pre-build"
"${ROOT_DIR}/bin/build.sh"

echo "[serve] http://${HOST}:${PORT}/blog/"
"$BUNDLE_CMD" exec jekyll serve --livereload --host "$HOST" --port "$PORT" "$@"
