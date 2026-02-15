# TROUBLESHOOT.md — 트러블슈팅 + 수정 영향 범위

> 문제 발생 시 참조. 수정 전 영향 범위를 반드시 확인하세요.

---

## 빌드 에러

### 포스트 미표시

```
증상: 홈/아카이브에서 글이 0개로 표시됨
원인: _posts 파일명이 Jekyll 규칙(YYYY-MM-DD-slug.md)과 불일치
해결: 파일명을 YYYY-MM-DD-slug.md 형식으로 복구
```

### SCSS 컴파일

```
증상: "File to import not found or unreadable"
원인: _sass/ 파일명과 main.scss @import 이름 불일치
해결: 파일명 대조. @import "code" → _sass/_code.scss 존재 확인
```

```
증상: "Invalid CSS after..."
원인: SCSS 문법 에러 (세미콜론, 괄호 누락)
해결: 에러 메시지의 파일:줄번호 확인
```

### 페이지네이션

```
증상: 홈에 포스트 미표시
원인: index.md 사용 (index.html이어야 함)
확인: 루트에 index.html 존재 + front matter에 layout: home
```

### Liquid

```
증상: "Liquid Exception"
원인: 포스트 내용에 {{ 또는 {% 리터럴 포함
해결: {% raw %}...{% endraw %}로 감싸기
```

### 테마 FOUC

```
증상: 로드 시 잠깐 라이트 모드 깜빡임
확인: head.html 인라인 <script>가 CSS <link> 전에 위치하는지 확인
현재: 이미 적용됨 (CSS 로드 전 data-theme 설정)
```

## 기능 이슈

### 검색 미작동

```
1. /blog/search.json 접속 → JSON 유효성 확인
2. 브라우저 콘솔 → JS 에러 확인
3. search.js 내 baseUrl 탐지 로직 확인
```

### TOC 미표시

```
정상 동작: h2/h3가 2개 미만이면 자동 숨김
비정상: toc.js 로드 실패 → Network 탭 확인
```

### Giscus 미표시

```
정상 동작: _config.yml의 repo_id가 비어있으면 미렌더링
비정상: Discussions 미활성화 또는 Giscus 앱 미설치
```

### 다크모드 Giscus 불일치

```
원인: iframe postMessage 동기화 실패
확인: theme-toggle.js → syncGiscusTheme → iframe.contentWindow.postMessage
```

## GitHub Pages 배포

### CSS 미적용

```
1. _config.yml → baseurl: "/blog" 확인
2. head.html → CSS 경로에 | relative_url 필터 확인
3. 모든 asset 경로에 | relative_url 적용 확인
```

### 빌드 실패

```
1. Settings → Pages → Source = "Deploy from branch" (main)
2. Actions 탭에서 로그 확인
3. 로컬 bundle exec jekyll build 성공 여부 확인
4. 로컬 bin/check-links.sh 로 내부 링크/산출물 검증
```

## Phase 3 고도화 체크포인트

### 홈 개편 후 글 목록 누락

```
확인: _layouts/home.html에서 paginator.posts 루프 유지 여부
원인: Featured/필터 로직 추가 중 기본 루프 제거
해결: 기본 목록 렌더 경로를 fallback으로 보존
```

### 필터/정렬 URL 상태 불일치

```
증상: URL 쿼리와 화면 결과가 다름
확인: 초기 렌더 시 querystring 파싱/적용 순서
해결: 초기화 단계에서 쿼리→UI→리스트 순서 강제
```

### 검색 키보드 탐색 오작동

```
증상: Enter 입력 시 잘못된 항목 열림
원인: 활성 인덱스와 렌더 순서 불일치
해결: 렌더 후 활성 인덱스 범위 재검증
```

### 성능 개선 후 스크립트 회귀

```
증상: defer/지연 로드 후 TOC/검색 미동작
원인: DOMContentLoaded 타이밍 의존 코드
해결: 초기화 시점 통일 (readyState 체크 + 이벤트 바인딩)
```

---

## 수정 영향 범위 매트릭스

> 파일 수정 전 반드시 이 표를 확인하세요.

| 수정 대상 | 영향 범위 | 재시작 필요 | 주의사항 |
|-----------|-----------|------------|----------|
| `_config.yml` | **전체 사이트** | `jekyll serve` 재시작 | 다른 설정 덮어쓰지 않도록 주의 |
| `_sass/_variables.scss` | **전체 사이트 스타일** | 자동 반영 | 라이트/다크 모두 수정해야 함 |
| `_layouts/default.html` | **모든 페이지** | 자동 반영 | head/header/footer include 순서 |
| `_layouts/post.html` | 모든 포스트 | 자동 반영 | TOC/댓글/네비 include 확인 |
| `_layouts/home.html` | 홈 페이지 | 자동 반영 | paginator.posts 사용 확인 |
| `_layouts/page.html` | about, 기타 페이지 | 자동 반영 | - |
| `_includes/*.html` | 사용하는 레이아웃 | 자동 반영 | 어느 레이아웃에서 include하는지 확인 |
| `_sass/_*.scss` | 해당 컴포넌트 | 자동 반영 | main.scss에 @import 있는지 확인 |
| `assets/js/*.js` | 클라이언트 동작 | 새로고침 | 캐시 주의 |
| `_data/navigation.yml` | 네비게이션 메뉴 | 자동 반영 | url에 / 시작 확인 |
| `search.json` | 검색 기능 | 빌드 시 재생성 | Liquid 문법 확인 |
| `assets/css/main.scss` | **전체 스타일 로드** | 자동 반영 | @import 순서 중요 |

### Include 사용 위치 맵

```
default.html
  ├── head.html
  ├── header.html
  │   └── theme-toggle.html
  └── footer.html

home.html (extends default)
  ├── post-card.html
  │   └── post-meta.html
  │       └── reading-time.html
  └── pagination.html

post.html (extends default)
  ├── post-meta.html
  │   └── reading-time.html
  ├── toc.html
  └── comments.html
```
