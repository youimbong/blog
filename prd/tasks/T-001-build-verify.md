# T-001: 빌드 검증 + 에러 수정

```yaml
id: T-001
status: DONE
priority: HIGH
parallel_group: null  # 독립 실행
depends_on: []
blocks: []
agent_type: quality-engineer
estimated_complexity: moderate
```

## 목표

Jekyll 빌드를 실행하고, 발생하는 모든 에러를 수정한다.

## 사전 조건

- Ruby + Bundler 설치 필요

## 실행 절차

```bash
bundle install
bundle exec jekyll serve
```

## 검증 체크리스트

- [ ] 빌드 성공 (에러 없음)
- [ ] 홈 페이지 렌더링 (포스트 카드)
- [ ] 페이지네이션 동작
- [ ] 포스트 상세 (TOC, 읽기시간)
- [ ] 다크/라이트 모드 전환
- [ ] 모바일 반응형
- [ ] 카테고리/태그/아카이브 페이지
- [ ] 검색 (한국어)
- [ ] 404 페이지
- [ ] 코드 하이라이팅 (라이트/다크)
- [ ] RSS 피드 (`/blog/feed.xml`)
- [ ] 사이트맵 (`/blog/sitemap.xml`)

## 예상 에러 및 해결

```
SCSS 에러 → _sass/ 파일명과 main.scss @import 대조
Liquid 에러 → {% raw %}{% endraw %} 이스케이프
페이지네이션 → index.html 존재 + paginate 설정 확인
폰트 로드 실패 → CDN URL 유효성 확인
```

## 산출물

- 에러 수정 커밋
- 체크리스트 완료 보고

## 완료 조건

빌드 성공 + 체크리스트 전항목 통과
