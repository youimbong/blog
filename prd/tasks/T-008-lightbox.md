# T-008: 이미지 라이트박스

```yaml
id: T-008
status: DONE
priority: LOW
parallel_group: C
depends_on: []
blocks: []
agent_type: frontend-architect
estimated_complexity: simple
```

## 목표

포스트 내 이미지를 클릭하면 풀스크린 오버레이로 확대 표시한다.

## 수정 대상 파일

```
생성:
  assets/js/lightbox.js          # 라이트박스 로직
  _sass/_lightbox.scss           # 오버레이 스타일

수정:
  _layouts/post.html             # lightbox.js 로드 추가
  assets/css/main.scss           # @import "lightbox" 추가
```

## 상세 요구사항

### 동작

```
1. post-content 내 img 요소에 클릭 이벤트 바인딩
2. 클릭 → 풀스크린 오버레이 생성 (동적 DOM)
3. 오버레이 내 이미지 표시 (max-width/max-height: 90vw/90vh)
4. 닫기: ESC 키, 오버레이 배경 클릭, 닫기 버튼
5. 스크롤 방지: body overflow hidden
```

### 스타일

```
- 오버레이: position fixed, inset 0, 반투명 검정 배경 (rgba(0,0,0,0.85))
- 이미지: 중앙 정렬, object-fit contain
- 닫기 버튼: 우상단, 흰색 X, 큰 클릭 영역
- 트랜지션: opacity 페이드인
- z-index: 1000
```

### 제외 조건

```
- img가 링크(<a>) 내부에 있으면 라이트박스 미적용
- 아이콘/로고 등 작은 이미지 제외 (선택: width > 200px만 적용)
```

## 영향 범위

- `post.html`에 JS 로드 추가 → 포스트만 영향
- 다른 기능과 충돌 없음

## 완료 조건

- 포스트 이미지 클릭 시 라이트박스 표시
- ESC/배경 클릭/버튼으로 닫기
- 라이트/다크 모드 모두 정상
