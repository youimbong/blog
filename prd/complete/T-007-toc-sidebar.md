# T-007: TOC 사이드바 (데스크톱)

```yaml
id: T-007
status: DONE
priority: LOW
parallel_group: B
depends_on: []
blocks: []
agent_type: frontend-architect
estimated_complexity: moderate
```

## 목표

넓은 화면(>1100px)에서 TOC를 본문 옆 사이드바로 고정 표시한다.

## 수정 대상 파일

```
수정:
  _layouts/post.html        # TOC 위치 변경 (wrapper 구조)
  _sass/_toc.scss            # 사이드바 스타일 추가
  _sass/_responsive.scss     # 1100px 브레이크포인트 추가
  _sass/_layout.scss         # 사이드바 레이아웃 추가 (선택)
```

## 상세 요구사항

### 레이아웃 전환

```
≤ 1100px: 현재와 동일 (인라인 TOC, 본문 위)
> 1100px: 사이드바 (본문 오른쪽, position: sticky)

구조:
<div class="post-layout">
  <article class="post">...</article>
  <aside class="toc-sidebar">
    {% include toc.html %}
  </aside>
</div>
```

### 사이드바 스타일

```
- position: sticky
- top: calc(var(--header-height) + var(--space-xl))
- max-height: calc(100vh - var(--header-height) - 64px)
- overflow-y: auto
- width: 220px
- 기존 toc-wrapper 스타일 재사용
```

### 주의사항

```
- max-width 780px → 사이드바 포함 시 더 넓어야 함
  → post-layout에만 max-width: 1100px 적용
  → 일반 .container는 780px 유지
- 인라인 TOC와 사이드바 TOC가 동시에 보이지 않도록
  → 미디어쿼리로 조건부 display
- toc.js는 수정 불필요 (DOM 위치만 바뀜)
```

## 영향 범위

- `post.html` 수정 → 포스트 레이아웃 구조 변경
- `_toc.scss` 수정 → TOC 스타일
- `_responsive.scss` 수정 → 새 브레이크포인트
- 기존 780px 이하 동작에 영향 없어야 함

## 완료 조건

- 1100px 이상: 사이드바 TOC 고정
- 1100px 이하: 기존 인라인 TOC
- 스크롤 스파이 정상 동작
- 긴 TOC 시 사이드바 내 스크롤
