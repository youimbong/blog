# T-002: 샘플 포스트 작성

```yaml
id: T-002
status: DONE
priority: MEDIUM
parallel_group: A
depends_on: []
blocks: []
agent_type: technical-writer
estimated_complexity: simple
```

## 목표

다양한 마크다운 요소를 포함한 샘플 포스트를 작성하여 블로그의 모든 렌더링 기능을 테스트한다.

## 수정 대상 파일

```
생성:
  _posts/2026-02-15-markdown-guide.md     # 마크다운 가이드 (모든 요소 포함)
  _posts/2026-02-14-code-examples.md      # 코드 하이라이팅 테스트
```

## 상세 요구사항

### 포스트 1: 마크다운 가이드

```
필수 포함 요소:
- h2 3개 이상 + h3 여러 개 (TOC 테스트)
- 코드블록 (Python, JavaScript, bash 최소 3개)
- 인라인 코드
- 표 (table)
- 인용문 (blockquote)
- 중첩 리스트 (ul + ol)
- 볼드/이탤릭/취소선
- 링크 (내부 + 외부)
- 수평선 (hr)
- 키보드 단축키 (kbd)
- 긴 본문 (500단어 이상 — 읽기시간 테스트)

front matter:
  layout: post
  title: "마크다운 작성 가이드"
  date: 2026-02-15
  categories: [가이드]
  tags: [마크다운, 블로그, 작성법]
```

### 포스트 2: 코드 예제

```
필수 포함 요소:
- 다양한 언어 코드블록 (Python, JS, HTML, CSS, YAML, bash)
- 인라인 코드 혼합
- 코드 설명 텍스트

front matter:
  layout: post
  title: "코드 하이라이팅 테스트"
  date: 2026-02-14
  categories: [개발]
  tags: [코드, 하이라이팅, 테스트]
```

## 규칙

- Liquid 문법 리터럴 포함 시 `{% raw %}{% endraw %}` 사용
- 한국어 작성
- baseurl 고려하여 내부 링크에 `{{ '/path' | relative_url }}` 사용

## 완료 조건

- 2개 포스트 생성
- 홈 페이지에 3개 포스트 표시 (기존 welcome + 2개)
- TOC가 마크다운 가이드 포스트에서 정상 렌더링
- 코드 하이라이팅이 라이트/다크 모두에서 정상
