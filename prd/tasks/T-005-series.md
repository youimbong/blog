# T-005: 시리즈(연재) 기능

```yaml
id: T-005
status: DONE
priority: LOW
parallel_group: B
depends_on: []
blocks: []
agent_type: frontend-architect
estimated_complexity: moderate
```

## 목표

같은 시리즈의 포스트를 묶어 시리즈 네비게이션을 포스트 상단에 표시한다.

## 수정 대상 파일

```
생성:
  _includes/series-nav.html     # 시리즈 네비게이션 컴포넌트
  _sass/_series.scss            # 시리즈 스타일

수정:
  _layouts/post.html            # series-nav include 추가
  assets/css/main.scss          # @import "series" 추가
```

## 상세 요구사항

### 사용법 (포스트 front matter)

```yaml
---
layout: post
title: "시리즈 제목 - Part 1"
series: "Jekyll 블로그 만들기"
series_order: 1
---
```

### series-nav.html 동작

```
1. page.series 값이 있으면 렌더링
2. site.posts에서 같은 series 값을 가진 포스트 필터링
3. series_order로 정렬
4. 현재 포스트 하이라이트
5. 접기/펼치기 토글 (기본: 펼침)
```

### UI

```
┌─ 시리즈: Jekyll 블로그 만들기 (3편) ─────┐
│  1. 환경 설정              ← 링크        │
│  2. 테마 커스터마이징      ← 현재 (강조)  │
│  3. 배포하기               ← 링크        │
└──────────────────────────────────────────┘
```

### 스타일

- 배경: `--color-bg-secondary`
- 현재 포스트: `--color-accent` 보더 + 볼드
- border-radius: `--border-radius`
- 포스트 헤더와 본문 사이에 위치

## 영향 범위

- `post.html` 수정 → 모든 포스트 영향 (series 없으면 미렌더링이므로 안전)
- `main.scss` 수정 → @import 추가만

## 완료 조건

- series front matter가 있는 포스트에서 시리즈 네비 표시
- series가 없는 포스트에서는 아무것도 표시되지 않음
- 현재 포스트 하이라이트
- 라이트/다크 모드 정상
