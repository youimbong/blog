# LOG.md — 작업 타임라인

> 모든 세션의 작업 기록. 역순 (최신이 위).
> 새 세션 시작 시 최근 로그부터 읽어 맥락을 파악하세요.

---

## 세션 #8 — 2026-02-15

### 메타

```
시작: 사용자 요청 "완료된 파일은 완료 폴더로 이동"
종료: 완료 태스크 파일 이동 및 경로 동기화 완료
Agent: 싱글 Agent
```

### 수행 작업

- 완료 태스크 파일 이동:
  - `prd/tasks/T-001-build-verify.md` ~ `prd/tasks/T-011-deploy-verify.md`
  - 이동 위치: `prd/complete/`
- `prd/tasks/`는 비워 두고 신규/진행 태스크용으로 유지
- `prd/MEMORY.md` 업데이트:
  - 활성 태스크 큐의 파일 경로를 `tasks/...` → `complete/...`로 변경
  - PRD 파일 맵에 `tasks`(진행), `complete`(완료 아카이브) 구조 반영

### 검증 결과

- `prd/complete/`에 완료 태스크 11개 존재 확인
- `prd/tasks/` 비어 있음 확인
- `MEMORY.md`의 태스크 경로가 실제 파일 위치와 일치

### 미해결

- [ ] Giscus repo_id / category_id 입력 (사용자 수동)

---

## 세션 #7 — 2026-02-15

### 메타

```
시작: 사용자 제공 GA 스니펫 적용 요청
종료: GA4 측정 ID 설정 반영 완료
Agent: 싱글 Agent
```

### 수행 작업

- 사용자 제공 코드에서 측정 ID 확인: `G-XJE8G3V4VX`
- 기존 구현 확인:
  - `_includes/head.html`에 `site.google_analytics` 조건부 `gtag` 스크립트가 이미 구현되어 있음
- 설정 반영:
  - `_config.yml`의 `google_analytics` 값을 `"G-XJE8G3V4VX"`로 업데이트
- 문서 갱신:
  - `prd/MEMORY.md` BLOCKER를 `Giscus 미입력`만 남도록 수정

### 미해결

- [ ] Giscus repo_id / category_id 입력 (사용자 수동)

---

## 세션 #6 — 2026-02-15

### 메타

```
시작: 사용자 요청 "배포 되었어 다시 체크"
종료: 배포 정상 확인, T-011 완료 처리
Agent: 싱글 Agent
```

### 수행 작업

- 배포 URL 검증:
  - `https://youimbong.github.io/blog/` → `HTTP/2 200`
  - `https://youimbong.github.io/blog/feed.xml` → `HTTP/2 200`
  - `https://youimbong.github.io/blog/sitemap.xml` → `HTTP/2 200`
- 포스트 페이지 렌더 확인:
  - `markdown-guide` 페이지에서 `toc.js`, `reading-progress.js`, `lightbox.js`, `code-copy.js` 스크립트 태그 확인
  - TOC 사이드바 마크업 렌더 확인
- 문서/태스크 상태 갱신:
  - `prd/tasks/T-011-deploy-verify.md` 상태 `DONE`
  - `prd/MEMORY.md` BLOCKER 갱신 (배포 이슈 제거)

### 미해결

- [ ] Giscus repo_id / category_id 입력 (사용자 수동)
- [ ] GA4 측정 ID 입력 (사용자 수동)

---

## 세션 #5 — 2026-02-15

### 메타

```
시작: 사용자 요청 "나머지 계속 진행"
종료: 배포 상태 확인 완료, 신규 배포 태스크(T-011) 추가
Agent: 싱글 Agent
```

### 수행 작업

- 현재 설정값 확인:
  - `_config.yml`의 `comments.giscus.repo_id`, `comments.giscus.category_id`, `google_analytics`가 모두 빈 값임을 확인
- 외부 상태 점검:
  - `https://youimbong.github.io/`, `https://youimbong.github.io/blog/`, `feed.xml`, `sitemap.xml` 응답 확인
  - 결과: 전부 `HTTP/2 404`
  - 반면 `https://github.com/youimbong/blog`는 `HTTP/2 200`
- 문서 갱신:
  - `prd/MEMORY.md` BLOCKER 업데이트
  - 배포 확인 태스크 `prd/tasks/T-011-deploy-verify.md` 생성
  - 큐에 `T-011` 추가 (`BLOCKED`)

### 미해결

- [ ] `T-011` GitHub Pages 배포 설정/복구 (GitHub 저장소 설정 확인 필요)
- [ ] Giscus repo_id / category_id 입력 (사용자 수동)
- [ ] GA4 측정 ID 입력 (사용자 수동)

---

## 세션 #4 — 2026-02-15

### 메타

```
시작: 사용자 환경 업데이트 (rbenv + bundler 설치)
종료: T-001 완료, 전체 태스크 DONE
Agent: 싱글 Agent
```

### 수행 작업

- `bundle` 경로 문제 해결:
  - `~/.rbenv/shims/bundle` 직접 사용
  - 샌드박스 권한 이슈를 피하기 위해 `HOME`, `BUNDLE_USER_HOME`, `GEM_HOME`, `GEM_PATH`를 프로젝트 로컬 경로로 지정
- 의존성 설치 + 빌드:
  - `bundle install --path vendor/bundle`
  - `bundle exec jekyll build`
  - 결과: 빌드 성공 (`done in 0.652 seconds`)
- 산출물 체크:
  - `_site/feed.xml`, `_site/sitemap.xml` 생성 확인
  - `_site` 내 `categories`, `tags`, `archive`, `search`, `404.html` 생성 확인
  - 포스트 페이지에 `toc.js`, `reading-progress.js`, `lightbox.js`, `code-copy.js` 로드 확인
  - `math: true` 포스트에서 KaTeX CDN 로드 확인
  - 시리즈 네비/TOC 사이드바/읽기 진행률 마크업 렌더 확인
- 태스크 상태 반영:
  - `prd/tasks/T-001-build-verify.md` → `DONE`
  - `prd/MEMORY.md` 업데이트 (Phase 2 완료, BLOCKER 없음)

### 검증 결과

- Jekyll 빌드: 성공
- 피드/사이트맵: 정상 생성
- 주요 기능 연결: 정적 결과물 기준 정상 반영

### 미해결

- [ ] Giscus repo_id / category_id 입력 (사용자 수동)
- [ ] Git 커밋 + 배포

---

## 세션 #3 — 2026-02-15

### 메타

```
시작: 사용자 요청 "중단없이 모든 task"
종료: T-003 ~ T-010 완료, T-001은 환경 블로커 유지
Agent: 싱글 Agent
```

### 수행 작업

- T-003 코드 복사 버튼
  - `assets/js/code-copy.js` 생성 (Clipboard API + `execCommand` fallback)
  - `_sass/_code.scss`에 버튼 스타일 추가
  - `_layouts/default.html`에 스크립트 로드 추가
- T-004 OG 이미지/파비콘
  - `assets/images/` 생성
  - `favicon.ico`, `apple-touch-icon.png`, `og-image.png` 기본 이미지 생성
  - `_includes/head.html`에 favicon/apple-touch-icon 링크 추가
  - `_config.yml`에 `og_image` 기본값 추가
- T-005 시리즈 기능
  - `_includes/series-nav.html`, `_sass/_series.scss` 생성
  - `_layouts/post.html`에 series include 추가
  - 샘플 포스트 2개에 `series`, `series_order` 적용
- T-006 읽기 진행률 바
  - `_includes/reading-progress.html`, `_sass/_reading-progress.scss`, `assets/js/reading-progress.js` 생성
  - `_layouts/post.html`에 include/script 연결
- T-007 TOC 사이드바(>1100px)
  - `_layouts/post.html`를 `post-layout` 구조로 개편
  - `_sass/_toc.scss`, `_sass/_responsive.scss`, `_sass/_post.scss` 수정
  - `assets/js/toc.js`에 TOC 없는 페이지 사이드바 숨김 처리 추가
- T-008 이미지 라이트박스
  - `assets/js/lightbox.js`, `_sass/_lightbox.scss` 생성
  - `_layouts/post.html`에 스크립트 로드 추가
- T-009 KaTeX
  - `_includes/head.html`에 `page.math` 조건부 CDN 로드 추가
  - 샘플 포스트(`2026-02-14-code-examples.md`)에 `math: true` 및 수식 예시 추가
- T-010 Google Analytics
  - `_config.yml`에 `google_analytics` 키 추가
  - `_includes/head.html`에 조건부 GA4 스크립트 추가
- 공통
  - `assets/css/main.scss`에 신규 partial import 3개 추가
  - `prd/tasks/T-003` ~ `T-010` 상태를 `DONE`으로 업데이트
  - `prd/MEMORY.md` 태스크 큐 상태 갱신

### 검증 결과

- 정적 연결 확인:
  - 레이아웃 스크립트 로드 경로, SCSS import, config/head 조건식 모두 연결됨
  - 샘플 포스트 front matter(시리즈/수식) 반영됨
  - 이미지 자산 파일 존재 확인 (`assets/images/*`)
- 로컬 Jekyll 빌드/브라우저 수동 검증:
  - 미수행 (`bundle`, `jekyll` 실행 환경 부재 + gem 설치 네트워크 제한)

### 미해결

- [ ] `T-001` 빌드 검증 (Bundler/Jekyll 설치 필요)
- [ ] Giscus repo_id / category_id 입력 (사용자 수동)
- [ ] Git 커밋 + 배포

---

## 세션 #2 — 2026-02-15

### 메타

```
시작: MEMORY.md 기반 재진입
종료: T-002 완료, T-001 환경 이슈로 보류
Agent: 싱글 Agent
```

### 수행 작업

- `prd/MEMORY.md`, `prd/LOG.md`, `prd/tasks/T-001-build-verify.md` 확인 후 우선순위 파악
- `T-001` 착수 시도:
  - `ruby -v` 확인 성공 (Ruby 3.2.3)
  - `bundle -v` 실패 (`bundle: command not found`)
  - `gem install bundler` 시도했으나 샌드박스 권한/네트워크(DNS) 제한으로 설치 실패
- `T-002` 수행:
  - `_posts/2026-02-15-markdown-guide.md` 생성
  - `_posts/2026-02-14-code-examples.md` 생성
  - 요구사항 요소 포함 검증 (h2/h3, 코드블록, 표, 인용문, kbd, 내부/외부 링크, 본문 길이)

### 검증 결과

- `_posts` 포스트 수: 3개 (welcome + 신규 2개)
- `2026-02-15-markdown-guide.md` 단어 수: 683 (`wc -w`)
- 코드 블록 언어 확인:
  - 가이드: Python/JavaScript/bash
  - 코드 예제: Python/JavaScript/HTML/CSS/YAML/bash

### 미해결

- [ ] `T-001` 빌드 검증 (Bundler 설치 필요)
- [ ] Giscus repo_id / category_id 입력 (사용자 수동)
- [ ] Git 커밋 + 배포

---

## 세션 #1 — 2026-02-15

### 메타

```
시작: Phase 0 (minima 기본 블로그)
종료: Phase 1 완료 (전체 구조 구축)
Agent: 싱글 Agent
소요: 12단계 순차 실행
```

### 수행 작업

**Step 1: 기반 설정**
- `_config.yml`: `theme: minima` 제거, jekyll-paginate/jekyll-sitemap 추가, Giscus 설정 블록 추가, sass compressed 설정
- `Gemfile`: jekyll-sitemap 추가
- `_data/navigation.yml`: 6개 메뉴 (Home, Categories, Tags, Archive, Search, About)
- `_sass/_variables.scss`: CSS custom properties — 라이트/다크 전체 컬러, 코드 컬러, 레이아웃, 간격, 타이포, 트랜지션
- `_sass/_reset.scss`: box-sizing, margin 초기화
- `_sass/_typography.scss`: Pretendard CDN + JetBrains Mono Google Fonts + 타입 스케일
- `_sass/_base.scss`: body, blockquote, table, code, pre, scrollbar 등 기본 요소

**Step 2: 코어 레이아웃**
- `_layouts/default.html`: html(data-theme) > head > header > main > footer > theme-toggle.js
- `_includes/head.html`: meta, SEO, feed, CSS 링크, FOUC 방지 인라인 스크립트
- `_includes/header.html`: sticky 헤더, navigation.yml 루프, 모바일 햄버거, 테마 토글
- `_includes/footer.html`: 저작권 + powered by
- `_sass/_layout.scss`, `_sass/_header.scss`, `_sass/_footer.scss`

**Step 3: 테마 토글**
- `_includes/theme-toggle.html`: sun/moon SVG 버튼
- `assets/js/theme-toggle.js`: 토글 로직 + localStorage + Giscus 동기화 + 모바일 네비 토글
- `_sass/_theme-toggle.scss`

**Step 4: 홈 + 페이지네이션**
- `index.md` 삭제 → `index.html` 생성 (paginate 호환)
- `_layouts/home.html`: paginator.posts 루프
- `_includes/post-card.html`, `_includes/post-meta.html`, `_includes/reading-time.html`, `_includes/pagination.html`
- `_sass/_post-card.scss`, `_sass/_pagination.scss`

**Step 5: 포스트 레이아웃**
- `_layouts/post.html`: 헤더 + TOC + 본문 + 태그 + 이전/다음 + 댓글 + toc.js 로드
- `_includes/toc.html`: TOC 컨테이너 + 접기 토글
- `assets/js/toc.js`: h2/h3 스캔 → 리스트 빌드, IntersectionObserver 스크롤 스파이, smooth scroll
- `_sass/_post.scss`, `_sass/_toc.scss`

**Step 6-7: 코드 하이라이팅 + 댓글**
- `_sass/_code.scss`: Rouge 토큰별 컬러 매핑 (CSS custom properties 사용, 라이트/다크 자동)
- `_includes/comments.html`: Giscus 스크립트 (repo_id 비어있으면 미렌더링)
- `_sass/_comments.scss`

**Step 8-9: 카테고리/태그/아카이브/검색**
- `categories.html`: site.categories 루프, 카테고리 그룹 + 포스트 목록
- `tags.html`: 태그 클라우드 + 태그별 포스트 목록
- `archive.html`: 연도별 그룹 (group_by_exp)
- `search.html` + `search.json` + `assets/js/search.js`: 클라이언트 검색 (substring, 스코어링, 디바운스, 하이라이팅)
- `_sass/_categories-tags.scss`, `_sass/_archive.scss`, `_sass/_search.scss`

**Step 10-12: 페이지/404/유틸리티/반응형/마무리**
- `_layouts/page.html`: 일반 페이지
- `about.md`: 내용 보강
- `404.html`: 리디자인 (큰 에러코드 + CTA 버튼)
- `_sass/_404.scss`, `_sass/_utilities.scss`, `_sass/_responsive.scss`
- `assets/css/main.scss`: 20개 SCSS partial 전체 import
- `CLAUDE.md`: 새 구조 반영

### 검증 결과

- 파일 교차 참조 검증: 모든 include/import/asset 경로 정상 (Agent 검증 완료)
- 로컬 빌드: 미수행 (Ruby 환경 없음)

### 미해결

- [ ] 로컬 빌드 검증
- [ ] Giscus repo_id / category_id 입력 (사용자 수동)
- [ ] Git 커밋 + 배포

---

<!-- 새 세션 로그는 이 위에 추가 -->
