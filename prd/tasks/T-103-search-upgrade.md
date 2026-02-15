# T-103: 검색 UX 고도화 (가중치/키보드 탐색)

```yaml
id: T-103
status: DONE
priority: MEDIUM
parallel_group: E
depends_on: []
blocks: []
agent_type: frontend-engineer
estimated_complexity: complex
```

## 목표

검색 정확도와 사용성을 높여 원하는 글을 빠르게 찾게 한다.

## 수정 대상 파일

```
수정:
  search.html
  search.json
  assets/js/search.js
  _sass/_search.scss
```

## 상세 요구사항

- 가중치 검색 유지/개선: 제목 > 태그 > 카테고리 > 본문
- 결과 하이라이트 강화: 매칭 단어 시각 강조
- 키보드 탐색: ↑ ↓ 이동, Enter로 열기
- 최근 검색어(localStorage) 표시

## 완료 조건

- 검색 결과 순위가 의도한 가중치대로 정렬
- 키보드만으로 결과 선택 가능
- 최근 검색어 저장/삭제 정상 동작
