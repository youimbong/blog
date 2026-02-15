# T-006: 읽기 진행률 바

```yaml
id: T-006
status: DONE
priority: LOW
parallel_group: B
depends_on: []
blocks: []
agent_type: frontend-architect
estimated_complexity: simple
```

## 목표

포스트 페이지에서 스크롤 위치에 따른 읽기 진행률 바를 헤더 하단에 표시한다.

## 수정 대상 파일

```
생성:
  _includes/reading-progress.html  # 진행률 바 HTML
  _sass/_reading-progress.scss     # 스타일

수정:
  _layouts/post.html               # include 추가
  assets/css/main.scss             # @import 추가
```

## 상세 요구사항

### HTML

```html
<div class="reading-progress" id="reading-progress">
  <div class="reading-progress-bar" id="reading-progress-bar"></div>
</div>
```

### JS (인라인 또는 별도 파일)

```
1. post-content 요소의 높이 계산
2. scroll 이벤트 → 진행률 % 계산
3. progress-bar의 width를 % 값으로 설정
4. requestAnimationFrame으로 성능 최적화
5. 포스트 페이지에서만 동작
```

### 스타일

```
- 위치: 헤더 바로 아래 (position: fixed, top: var(--header-height))
- 높이: 3px
- 색상: var(--color-accent)
- 배경: transparent
- z-index: 99
- 트랜지션: width에 부드러운 전환 없음 (실시간 반응)
```

## 영향 범위

- `post.html`만 수정 → 포스트 페이지에서만 동작
- 헤더와 겹치지 않도록 z-index 주의 (헤더 100, 진행률 99)

## 완료 조건

- 포스트 스크롤 시 진행률 바 표시
- 0% → 100% 부드러운 진행
- 다른 페이지에서는 미표시
- 라이트/다크 모드 정상
