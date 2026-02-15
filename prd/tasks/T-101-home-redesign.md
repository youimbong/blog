# T-101: 홈 화면 IA 재설계 + 모던 레이아웃

```yaml
id: T-101
status: DONE
priority: HIGH
parallel_group: D
depends_on: []
blocks: [T-102, T-104]
agent_type: frontend-architect
estimated_complexity: moderate
```

## 목표

홈 화면을 "소개 + 추천 + 최신" 구조로 재편해 첫 방문자의 탐색 효율을 높인다.

## 수정 대상 파일

```
수정:
  _layouts/home.html
  index.html
  _sass/_layout.scss
  _sass/_post-card.scss
  _sass/_responsive.scss
```

## 상세 요구사항

- Hero 영역 추가: 블로그 설명, 핵심 CTA(최신 글 보기, 시리즈 보기)
- Featured 영역 추가: 고정 글 2~3개 노출
- Latest 영역은 카드 그리드로 재배치
- 모바일/데스크톱 모두 레이아웃 깨짐 없이 동작

## 완료 조건

- 홈 진입 시 정보 계층(Hero > Featured > Latest)이 명확
- 768px/480px 브레이크포인트에서 자연스럽게 반응형 동작
- 기존 페이지네이션 동작 유지
