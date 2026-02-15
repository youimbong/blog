# Youimbong Blog

GitHub Pages와 Jekyll을 사용한 개인 블로그입니다.

## 로컬 개발

```bash
bundle install
bundle exec jekyll serve
```

브라우저에서 `http://localhost:4000/blog/` 접속

## 글 작성

`_posts/` 디렉토리에 `YYYY-MM-DD-제목.md` 형식으로 파일을 생성합니다.

```markdown
---
layout: post
title: "글 제목"
date: YYYY-MM-DD
categories: [카테고리]
tags: [태그1, 태그2]
---

본문 내용
```

## 배포

`main` 브랜치에 push하면 GitHub Pages에 자동 배포됩니다.

블로그 URL: https://youimbong.github.io/blog/
