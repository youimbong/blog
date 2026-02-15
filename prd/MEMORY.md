# MEMORY.md — 프로젝트 메인 허브

> **이 파일은 모든 세션의 시작점입니다.**
> 새 세션을 시작할 때 반드시 이 파일부터 읽으세요.
> 작업 완료 시 반드시 이 파일의 상태를 업데이트하세요.

---

## 프로젝트 정보

- **이름**: Youimbong Blog
- **유형**: GitHub Pages + Jekyll 3.x 커스텀 블로그
- **배포 URL**: `https://youimbong.github.io/blog/`
- **저장소**: `youimbong/blog` (main 브랜치)
- **설정 파일**: `_config.yml`, `CLAUDE.md`

## 현재 상태

```
PHASE:     Phase 3 완료 (T-101~T-106 완료)
BLOCKER:   없음
GIT:       모든 변경사항 unstaged (커밋 전)
LAST_WORK: 2026-02-15 — 검색/필터/성능/운영 자동화(T-103~T-106) 구현 완료
```

## 활성 태스크 큐

| ID | 태스크 | 상태 | 병렬 그룹 | 파일 |
|----|--------|------|-----------|------|
| T-001 | 빌드 검증 + 에러 수정 | `DONE` | - | `complete/T-001-build-verify.md` |
| T-002 | 샘플 포스트 작성 | `DONE` | A | `complete/T-002-sample-posts.md` |
| T-003 | 코드 복사 버튼 | `DONE` | A | `complete/T-003-code-copy.md` |
| T-004 | OG 이미지 + 파비콘 | `DONE` | A | `complete/T-004-og-favicon.md` |
| T-005 | 시리즈(연재) 기능 | `DONE` | B | `complete/T-005-series.md` |
| T-006 | 읽기 진행률 바 | `DONE` | B | `complete/T-006-reading-progress.md` |
| T-007 | TOC 사이드바 | `DONE` | B | `complete/T-007-toc-sidebar.md` |
| T-008 | 이미지 라이트박스 | `DONE` | C | `complete/T-008-lightbox.md` |
| T-009 | KaTeX 수학 수식 | `DONE` | C | `complete/T-009-katex.md` |
| T-010 | Google Analytics | `DONE` | C | `complete/T-010-analytics.md` |
| T-011 | GitHub Pages 배포 확인/복구 | `DONE` | - | `complete/T-011-deploy-verify.md` |
| T-101 | 홈 화면 IA 재설계 + 모던 레이아웃 | `DONE` | D | `tasks/T-101-home-redesign.md` |
| T-102 | Featured/카테고리 레일 콘텐츠 섹션 | `DONE` | D | `tasks/T-102-featured-and-rails.md` |
| T-103 | 검색 UX 고도화 (가중치/키보드 탐색) | `DONE` | E | `tasks/T-103-search-upgrade.md` |
| T-104 | 홈/아카이브 필터 + 정렬 기능 | `DONE` | E | `tasks/T-104-filter-sort.md` |
| T-105 | 성능 최적화 + 체감 품질 개선 | `DONE` | F | `tasks/T-105-performance-polish.md` |
| T-106 | 운영 자동화 (품질 게이트) | `DONE` | F | `tasks/T-106-ops-quality-gates.md` |

### 상태 정의

```
READY      — 착수 가능
ACTIVE     — 현재 작업 중 (에이전트 할당됨)
DONE       — 완료
BLOCKED    — 선행 작업 또는 외부 입력 대기
CANCELLED  — 취소됨
```

### 병렬 그룹 규칙

```
병렬 그룹이 같은 태스크 = 동시에 서로 다른 Agent가 작업 가능
예: T-002, T-003, T-004는 모두 그룹 A → 3개 Agent 동시 실행 가능

의존성:
  T-001 (빌드 검증)은 독립 실행 — 결과에 따라 다른 태스크 수정 필요할 수 있음
  그룹 A, B, C는 서로 독립 — 파일 충돌 없음
  그룹 D는 홈 레이아웃 중심 태스크(T-101 선행 권장)
  그룹 E는 탐색/검색 강화 (T-104는 T-101 이후 진행 권장)
  그룹 F는 성능/운영 자동화로 병렬 진행 가능
```

## PRD 파일 맵

```
prd/
├── MEMORY.md          ← 지금 이 파일 (시작점, 상태 추적)
├── LOG.md             ← 작업 타임라인 (세션별 히스토리)
├── SPEC.md            ← 아키텍처 + 디자인 시스템 + 기능 명세
├── TROUBLESHOOT.md    ← 트러블슈팅 + 수정 시 영향 범위
├── tasks/             ← 신규/진행 태스크
│   ├── T-101-home-redesign.md
│   ├── T-102-featured-and-rails.md
│   ├── T-103-search-upgrade.md
│   ├── T-104-filter-sort.md
│   ├── T-105-performance-polish.md
│   └── T-106-ops-quality-gates.md
└── complete/          ← 완료 태스크 아카이브
    ├── T-001-build-verify.md
    ├── T-002-sample-posts.md
    ├── T-003-code-copy.md
    ├── T-004-og-favicon.md
    ├── T-005-series.md
    ├── T-006-reading-progress.md
    ├── T-007-toc-sidebar.md
    ├── T-008-lightbox.md
    ├── T-009-katex.md
    ├── T-010-analytics.md
    └── T-011-deploy-verify.md
```

## 세션 시작 프로토콜

```
1. 이 파일(MEMORY.md)을 읽는다
2. LOG.md의 마지막 세션 로그를 읽는다
3. 활성 태스크 큐에서 ACTIVE 또는 READY 태스크를 확인한다
4. 사용자 요청과 매칭되는 태스크 파일을 읽는다
5. 필요하면 SPEC.md 또는 TROUBLESHOOT.md를 참조한다
6. 작업을 수행한다
7. 작업 완료 시: 태스크 상태 업데이트 + LOG.md에 기록 + MEMORY.md 갱신
```

## 세션 종료 프로토콜

```
1. 수행한 작업을 LOG.md에 기록한다
2. 태스크 상태를 MEMORY.md에서 업데이트한다 (ACTIVE → DONE 등)
3. 새로 발견된 작업이 있으면 태스크 파일을 생성하고 큐에 추가한다
4. BLOCKER나 결정 사항이 있으면 MEMORY.md 상단에 기록한다
```

## 핵심 규칙 (모든 Agent 공통)

```
- GitHub Pages 제약: Jekyll 3.x, Sass @import만, 커스텀 플러그인 불가
- 모든 URL에 | relative_url 필터 사용 (baseurl: "/blog")
- 다크모드: [data-theme="dark"] + CSS custom properties
- SCSS 추가 시: _sass/_[이름].scss 생성 → assets/css/main.scss에 @import 추가
- JS 추가 시: assets/js/[이름].js 생성 → 사용하는 레이아웃에서 <script> 로드
- Include 추가 시: _includes/[이름].html → 레이아웃에서 {% include %} 호출
```

## 의사결정 기록

| 날짜 | 결정 | 이유 |
|------|------|------|
| 2026-02-15 | minima 테마 제거, 커스텀 레이아웃 | 디자인 자유도 확보 |
| 2026-02-15 | Giscus 댓글 선택 | GitHub 네이티브, 다크모드 동기화 가능 |
| 2026-02-15 | 클라이언트 JS 검색 | 커스텀 플러그인 불가 제약 |
| 2026-02-15 | Pretendard + JetBrains Mono | 한국어 최적 + 코드 가독성 |
| 2026-02-15 | index.md → index.html | jekyll-paginate v1이 .html에서만 동작 |
| 2026-02-15 | 포스트 파일명 규칙 유지 (`YYYY-MM-DD-slug.md`) | Jekyll `_posts` 인식 규칙 준수 |
