# SPEC.md — 아키텍처 + 디자인 시스템 + 기능 명세

> 프로젝트의 기술적 진실의 원천(source of truth).
> Agent가 코드를 작성하거나 수정할 때 이 문서를 참조하세요.

---

## 1. 제약사항

```yaml
platform: GitHub Pages
jekyll: 3.x (4.x 불가)
sass: "@import만 (@use/@forward 불가)"
paginate: "jekyll-paginate v1 — index.html에서만 동작"
plugins_allowed: [jekyll-feed, jekyll-seo-tag, jekyll-paginate, jekyll-sitemap]
custom_plugins: 불가
workaround: "카테고리/태그/검색/TOC/읽기시간 → Liquid + vanilla JS"
```

## 2. 파일 구조

```
blog/
├── _config.yml              # 사이트 설정 + Giscus 설정
├── Gemfile                   # github-pages 의존성
├── _data/navigation.yml      # 네비게이션 메뉴
│
├── _layouts/
│   ├── default.html          # 골격: head + header + main + footer
│   ├── home.html             # 홈: paginator.posts 루프
│   ├── post.html             # 포스트: TOC + 본문 + 이전/다음 + 댓글
│   └── page.html             # 일반 페이지
│
├── _includes/
│   ├── head.html             # <head> (메타, CSS, SEO, FOUC 방지)
│   ├── header.html           # sticky 헤더 + 네비 + 모바일 햄버거
│   ├── footer.html           # 푸터
│   ├── post-card.html        # 포스트 카드 컴포넌트
│   ├── post-meta.html        # 날짜 + 카테고리 + 읽기시간
│   ├── reading-time.html     # Liquid 읽기시간 계산
│   ├── pagination.html       # 페이지네이션 UI
│   ├── toc.html              # TOC 컨테이너 + 접기 토글
│   ├── comments.html         # Giscus 스크립트 (조건부 렌더링)
│   └── theme-toggle.html     # 다크/라이트 토글 버튼 SVG
│
├── _sass/                    # 20개 SCSS partial
│   ├── _variables.scss       # CSS custom properties (라이트/다크/코드)
│   ├── _reset.scss           # CSS 리셋
│   ├── _typography.scss      # Pretendard + JetBrains Mono
│   ├── _base.scss            # HTML 기본 요소
│   ├── _layout.scss          # .container, .page-title
│   ├── _header.scss          # 헤더/네비/모바일 메뉴
│   ├── _footer.scss          # 푸터
│   ├── _theme-toggle.scss    # 토글 버튼
│   ├── _post-card.scss       # 포스트 카드 + .tag
│   ├── _pagination.scss      # 페이지네이션
│   ├── _post.scss            # 포스트 본문 + 이전/다음 네비
│   ├── _toc.scss             # 목차 + 스크롤 스파이
│   ├── _code.scss            # Rouge 코드 하이라이팅
│   ├── _comments.scss        # 댓글 영역
│   ├── _categories-tags.scss # 카테고리/태그 페이지
│   ├── _archive.scss         # 아카이브 페이지
│   ├── _search.scss          # 검색 페이지
│   ├── _404.scss             # 404 에러 페이지
│   ├── _utilities.scss       # 유틸리티 클래스
│   └── _responsive.scss      # 미디어쿼리 (768px, 480px)
│
├── assets/
│   ├── css/main.scss         # Sass 엔트리 (20개 @import)
│   └── js/
│       ├── theme-toggle.js   # 다크모드 + Giscus 동기화 + 모바일 네비
│       ├── toc.js            # TOC 생성 + IntersectionObserver
│       └── search.js         # 클라이언트 검색
│
├── _posts/*.md               # 블로그 포스트
├── index.html                # 홈 (페이지네이션)
├── categories.html           # 카테고리 목록
├── tags.html                 # 태그 클라우드 + 목록
├── archive.html              # 연도별 아카이브
├── search.html               # 검색 UI
├── search.json               # Liquid 검색 인덱스
├── about.md                  # 소개
└── 404.html                  # 에러 페이지
```

## 3. 디자인 시스템

### 컬러

```
라이트 모드:
  bg:         #FDF6EC (크림)
  bg-card:    #FFFFFF
  text:       #3D2C1E (따뜻한 브라운)
  accent:     #C46243 (테라코타)
  border:     #E0D3C3

다크 모드:
  bg:         #1A1512
  bg-card:    #2A2420
  text:       #E8DFD1
  accent:     #E07A5F (코랄)
  border:     #3D342C
```

### 타이포

```
본문: Pretendard Variable (CDN)
코드: JetBrains Mono (Google Fonts)
스케일: xs(0.75rem) sm(0.875rem) base(1rem) lg(1.125rem) xl(1.25rem) 2xl(1.5rem) 3xl(2rem)
줄간격: tight(1.3) base(1.7) loose(1.9)
```

### 레이아웃

```
max-width: 780px
border-radius: sm(8px) base(12px) lg(16px)
spacing: xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) — px
breakpoints: 768px(모바일), 480px(소형)
header: sticky, 64px 높이
```

### 트랜지션

```
fast: 0.15s ease (호버)
base: 0.25s ease (테마 전환)
slow: 0.4s ease (레이아웃)
```

## 4. 데이터 흐름

```
[_posts/*.md]
  │
  ├─→ paginator.posts ─→ home.html ─→ index.html (홈)
  ├─→ site.categories  ─→ categories.html
  ├─→ site.tags        ─→ tags.html
  ├─→ site.posts       ─→ archive.html
  ├─→ site.posts       ─→ search.json (빌드 시 생성)
  └─→ post.content     ─→ post.html
       ├── Liquid: reading-time
       ├── JS: TOC (h2/h3 스캔)
       └── Giscus: 댓글 iframe
```

## 5. 기능 명세

### 테마 전환

```
파일: theme-toggle.html, theme-toggle.js, _variables.scss, _theme-toggle.scss
흐름: localStorage → data-theme 속성 → CSS custom properties
FOUC 방지: head.html 인라인 스크립트에서 즉시 data-theme 설정
Giscus 동기화: postMessage로 iframe 테마 변경
```

### 페이지네이션

```
파일: index.html, home.html, pagination.html, _pagination.scss
설정: paginate=5, paginate_path="/page/:num/"
제약: index.html이어야 함 (.md 불가)
```

### 검색

```
파일: search.html, search.json, search.js, _search.scss
인덱스: 제목 + URL + 날짜 + 카테고리 + 태그 + 내용(300자)
방식: substring 매칭 (한국어 지원)
스코어: 제목(10) > 태그(5) > 카테고리(3) > 내용(1)
UX: 200ms 디바운스, <mark> 하이라이팅, XSS 방지
```

### TOC

```
파일: toc.html, toc.js, _toc.scss
동작: h2/h3 스캔 → 리스트 생성, 2개 미만이면 숨김
스크롤 스파이: IntersectionObserver (rootMargin: -80px 0px -70% 0px)
UX: 접기/펼치기 토글, 부드러운 스크롤(80px offset)
```

### 읽기시간

```
파일: reading-time.html
계산: content | number_of_words / 200 (최소 1분)
출력: "N분 읽기"
```

### 댓글

```
파일: comments.html, _comments.scss
서비스: Giscus (GitHub Discussions)
조건: repo_id가 비어있으면 미렌더링
동기화: 테마 전환 시 postMessage
설정 위치: _config.yml → comments.giscus
사용자 필요 작업: Discussions 활성화 + giscus.app에서 ID 획득
```

### 이전/다음 네비게이션

```
파일: post.html, _post.scss
방식: page.previous / page.next (Jekyll 내장)
레이아웃: 2컬럼 그리드 (모바일 1컬럼)
```

### 모바일 반응형

```
파일: _responsive.scss, _header.scss
768px 이하: 햄버거 메뉴, 축소된 타이포/여백
480px 이하: 추가 축소
```

## 6. 새 기능 추가 패턴

```
1. _includes/[기능].html 생성
2. _sass/_[기능].scss 생성
3. assets/css/main.scss에 @import "[기능]" 추가
4. (JS 필요 시) assets/js/[기능].js 생성
5. 사용할 레이아웃에서 {% include [기능].html %} + <script> 추가
6. (설정 필요 시) _config.yml에 항목 추가
7. prd/MEMORY.md의 태스크 큐 업데이트
```
