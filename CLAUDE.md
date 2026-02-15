# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitHub Pages 기반 Jekyll 블로그. `main` 브랜치 push 시 자동 배포.
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

- **Jekyll** static site generator with **minima** theme
- GitHub Pages native build (no GitHub Actions needed)
- Kramdown markdown with GFM support, Rouge syntax highlighting

## Key Files

- `_config.yml` - Site configuration (title, URL, theme, plugins)
- `_posts/` - Blog posts in `YYYY-MM-DD-title.md` format
- `index.md` - Home page (uses `home` layout from minima)
- `about.md` - About page
- `Gemfile` - Ruby dependencies (`github-pages` gem)

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
- baseurl is `/blog` - all internal links must account for this
