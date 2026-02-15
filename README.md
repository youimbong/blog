# Youimbong Blog

GitHub Pages와 Jekyll을 사용한 개인 블로그입니다.

## 로컬 개발

```bash
bin/test-server.sh
```

브라우저에서 `http://localhost:4000/blog/` 접속

빌드:

```bash
bin/build.sh
```

내부 링크/산출물 점검만 실행:

```bash
bin/check-links.sh
```

## 글 작성

`_posts/` 디렉토리에 `YYYY-MM-DD-제목.md` 형식으로 파일을 생성합니다.

자동 생성 스크립트:

```bash
bin/new-post.sh "글 제목" "카테고리" "태그1, 태그2" "slug-optional"
```

예시:

```bash
bin/new-post.sh "Monorepo API 연동" "개발" "monorepo, turborepo, api" "monorepo-api-integration"
```

```markdown
---
layout: post
title: "글 제목"
date: YYYY-MM-DD HH:MM:SS +0900
categories: [카테고리]
tags: [태그1, 태그2]
---

본문 내용
```

## 배포

`main` 브랜치에 push하면 GitHub Pages에 자동 배포됩니다.

블로그 URL: https://youimbong.github.io/blog/
