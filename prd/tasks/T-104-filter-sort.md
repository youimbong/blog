# T-104: 홈/아카이브 필터 + 정렬 기능

```yaml
id: T-104
status: DONE
priority: MEDIUM
parallel_group: E
depends_on: [T-101]
blocks: []
agent_type: frontend-engineer
estimated_complexity: moderate
```

## 목표

태그/카테고리/정렬 기준으로 목록을 빠르게 좁혀 탐색 효율을 높인다.

## 수정 대상 파일

```
수정:
  _layouts/home.html
  archive.html
  assets/js/filter-sort.js (신규)
  _sass/_archive.scss
  _sass/_responsive.scss
```

## 상세 요구사항

- 필터: 카테고리, 태그
- 정렬: 최신순 기본, 읽기시간순(선택)
- URL 쿼리 반영: `?category=개발&tag=api&sort=latest`
- 초기 진입 시 쿼리로 상태 복원

## 완료 조건

- 필터/정렬 UI 작동
- 쿼리스트링 공유 시 동일 결과 재현
- 모바일에서도 조작 가능
