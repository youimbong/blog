# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitHub Pages 기반 커스텀 Jekyll 블로그. `main` 브랜치 push 시 자동 배포.
배포 URL: `https://youimbong.github.io/blog/`

## Development Commands

```bash
# Install dependencies
bundle install

# Local dev server (http://localhost:4000/blog/)
bundle exec jekyll serve

# Build only
bundle exec jekyll build
```

## Architecture

- **Jekyll 3.x** static site generator (GitHub Pages native build)
- 커스텀 레이아웃/테마 (minima 제거), CSS custom properties 기반 라이트/다크 모드
- Kramdown markdown (GFM), Rouge syntax highlighting
- Pretendard 폰트 (본문), JetBrains Mono (코드)
- jekyll-paginate v1: `index.html`에서만 동작 (`.md` 불가)
- 커스텀 플러그인 불가 → 카테고리/태그/검색/TOC/읽기시간 모두 Liquid + JS로 구현

## Key Files

- `_config.yml` - 사이트 설정 (Giscus 댓글 설정 포함)
- `_data/navigation.yml` - 네비게이션 메뉴 데이터
- `_posts/` - 블로그 포스트 (`YYYY-MM-DD-title.md`)
- `_layouts/` - default, home, post, page 레이아웃
- `_includes/` - head, header, footer, post-card, post-meta, reading-time, toc, pagination, comments, theme-toggle
- `_sass/` - 20개 SCSS 파일 (variables, reset, typography 등)
- `assets/css/main.scss` - Sass 엔트리포인트
- `assets/js/` - theme-toggle.js, toc.js, search.js
- `index.html` - 홈 (페이지네이션, `.html` 필수)
- `categories.html`, `tags.html`, `archive.html`, `search.html` - 기능 페이지
- `search.json` - Liquid 기반 검색 인덱스

## Post Front Matter

```yaml
---
layout: post
title: "제목"
date: YYYY-MM-DD
categories: [카테고리]
tags: [태그1, 태그2]
---
```

## Conventions

- Post filenames: `YYYY-MM-DD-slug.md` (영문 slug 권장)
- Permalink pattern: `/:categories/:year/:month/:day/:title/`
- baseurl is `/blog` - all internal links must use `| relative_url` filter
- Sass: `@import`만 사용 (`@use`/`@forward` 불가 - GitHub Pages 제약)
- 다크 모드: `[data-theme="dark"]` selector + CSS custom properties
- Giscus 댓글: `_config.yml`의 `comments.giscus` 섹션에 repo_id, category_id 필요
