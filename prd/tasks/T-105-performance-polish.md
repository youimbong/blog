# T-105: 성능 최적화 + 체감 품질 개선

```yaml
id: T-105
status: DONE
priority: MEDIUM
parallel_group: F
depends_on: [T-101]
blocks: []
agent_type: performance-engineer
estimated_complexity: moderate
```

## 목표

LCP/CLS/JS 로딩을 개선해 초기 체감 속도를 높인다.

## 수정 대상 파일

```
수정:
  _includes/head.html
  _layouts/default.html
  _sass/_layout.scss
  assets/js/*.js (로드 전략 점검)
```

## 상세 요구사항

- 이미지 lazy loading 점검/적용
- 비필수 JS defer/지연 로드
- critical 영역 스타일 우선 로드
- 불필요한 리렌더/레이아웃 점프 최소화

## 완료 조건

- 주요 페이지 Lighthouse 지표 개선 (기존 대비)
- 레이아웃 점프(눈에 띄는 CLS) 체감 감소
- 기능 회귀 없음
