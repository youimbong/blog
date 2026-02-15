# T-102: Featured/카테고리 레일 콘텐츠 섹션

```yaml
id: T-102
status: DONE
priority: HIGH
parallel_group: D
depends_on: [T-101]
blocks: []
agent_type: content-architect
estimated_complexity: moderate
```

## 목표

홈에서 주요 글(Featured)과 카테고리별 최신 글 레일을 제공해 재방문 동선을 만든다.

## 수정 대상 파일

```
수정:
  _layouts/home.html
  _includes/post-card.html
  _sass/_post-card.scss
  _config.yml (선택: featured slug 목록)
```

## 상세 요구사항

- Featured 글 선정 방식 정의
  - 1안: front matter `featured: true`
  - 2안: `_config.yml`에서 slug 배열 관리
- 카테고리 레일: 카테고리당 최신 1~2개 글 노출
- 카드 메타에 읽기시간/날짜/카테고리 표시

## 완료 조건

- Featured 섹션 정상 렌더
- 카테고리 레일이 글 데이터와 함께 렌더
- Featured 미지정 시 graceful fallback(최신글 대체)
