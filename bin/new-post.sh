#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: bin/new-post.sh \"Post Title\" [category] [tags(comma-separated)] [slug]"
  exit 1
fi

title="$1"
category="${2:-미분류}"
tags="${3:-}"
input_slug="${4:-}"

slugify() {
  local value="$1"
  value="$(printf '%s' "$value" | tr '[:upper:]' '[:lower:]')"
  value="$(printf '%s' "$value" | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g')"
  printf '%s' "$value"
}

if [[ -n "$input_slug" ]]; then
  slug="$(slugify "$input_slug")"
else
  slug="$(slugify "$title")"
fi

if [[ -z "$slug" ]]; then
  slug="post"
fi

post_day="$(TZ=Asia/Seoul date +%Y-%m-%d)"
post_date="$(TZ=Asia/Seoul date '+%Y-%m-%d %H:00:00 +0900')"

filename="_posts/${post_day}-${slug}.md"
counter=2
while [[ -e "$filename" ]]; do
  filename="_posts/${post_day}-${slug}-${counter}.md"
  counter=$((counter + 1))
done

if [[ -n "$tags" ]]; then
  tags_line="tags: [${tags}]"
else
  tags_line="tags: []"
fi

cat > "$filename" <<EOF
---
layout: post
title: "$title"
slug: $slug
date: $post_date
categories: [$category]
$tags_line
---

EOF

echo "Created: $filename"
