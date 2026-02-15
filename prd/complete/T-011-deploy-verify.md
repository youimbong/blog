# T-011: GitHub Pages 배포 확인/복구

```yaml
id: T-011
status: DONE
priority: HIGH
parallel_group: null
depends_on: []
blocks: []
agent_type: release-engineer
estimated_complexity: simple
```

## 목표

GitHub Pages 배포 URL이 정상 응답(200)하도록 설정을 확인하고 복구한다.

## 현재 관찰

- 2026-02-15 기준 아래 URL 모두 `HTTP/2 404`
  - `https://youimbong.github.io/`
  - `https://youimbong.github.io/blog/`
  - `https://youimbong.github.io/blog/feed.xml`
  - `https://youimbong.github.io/blog/sitemap.xml`
- 저장소 URL은 접근 가능
  - `https://github.com/youimbong/blog` → `HTTP/2 200`

## 예상 원인

- GitHub Pages가 비활성화 상태
- Pages source 브랜치/폴더 설정 불일치
- 배포 액션 실패 또는 미실행
- 저장소 공개 범위/권한 문제

## 복구 체크리스트

- [ ] GitHub Repository > Settings > Pages 활성화
- [ ] Source를 `Deploy from a branch` + `main /(root)` 또는 Actions로 명확히 설정
- [ ] 최신 커밋 푸시 후 Pages build 성공 확인
- [ ] URL 재검증 (홈/피드/사이트맵 200)

## 완료 조건

- `https://youimbong.github.io/blog/` 응답 200
- `feed.xml`, `sitemap.xml` 응답 200
- 홈에서 최신 변경(헤드/스크립트/포스트) 확인
