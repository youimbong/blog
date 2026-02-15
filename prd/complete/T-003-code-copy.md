# T-003: 코드 복사 버튼

```yaml
id: T-003
status: DONE
priority: MEDIUM
parallel_group: A
depends_on: []
blocks: []
agent_type: frontend-architect
estimated_complexity: simple
```

## 목표

코드블록에 복사 버튼을 추가하여 클릭 시 코드 내용을 클립보드에 복사한다.

## 수정 대상 파일

```
생성:
  assets/js/code-copy.js       # 복사 로직

수정:
  _sass/_code.scss             # 복사 버튼 스타일 추가
  _layouts/default.html        # code-copy.js 로드 추가
```

## 상세 요구사항

```
동작:
1. DOMContentLoaded 시 모든 .highlight > pre 블록 탐색
2. 각 블록에 "복사" 버튼 추가 (position: absolute, 우상단)
3. 클릭 시 Clipboard API (navigator.clipboard.writeText)
4. 복사 성공 → 버튼 텍스트 "복사됨!" (1.5초 후 원복)
5. Clipboard API 미지원 시 fallback (document.execCommand)

스타일:
- 버튼: 작은 크기, 반투명 배경, 코드블록 우상단
- 호버: 배경색 변경
- 다크모드: CSS custom properties 사용
```

## 영향 범위

- `default.html` 수정 → 모든 페이지에 JS 로드
- `_code.scss` 수정 → 코드블록 스타일만 영향
- 다른 기능과 충돌 없음

## 완료 조건

- 코드블록에 복사 버튼 표시
- 클릭 시 클립보드에 코드 복사
- "복사됨!" 피드백 표시
- 라이트/다크 모드 모두 정상
