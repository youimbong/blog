# T-106: 운영 자동화 (품질 게이트)

```yaml
id: T-106
status: DONE
priority: HIGH
parallel_group: F
depends_on: []
blocks: []
agent_type: release-engineer
estimated_complexity: simple
```

## 목표

로컬/배포 전 검증 절차를 스크립트로 표준화한다.

## 수정 대상 파일

```
수정:
  bin/build.sh
  bin/test-server.sh
  bin/check-links.sh (신규)
  README.md
  prd/TROUBLESHOOT.md
```

## 상세 요구사항

- 링크/정적 자산 점검 스크립트 추가
- 빌드 후 필수 산출물(feed/sitemap/index) 존재 확인
- 실패 시 원인 메시지 표준화

## 완료 조건

- `bin/build.sh` 한 번으로 핵심 검증까지 완료
- `bin/check-links.sh`로 내부 링크 주요 경로 검사 가능
- README에 운영 절차 문서화 완료
