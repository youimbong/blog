# T-004: OG 이미지 + 파비콘

```yaml
id: T-004
status: DONE
priority: MEDIUM
parallel_group: A
depends_on: []
blocks: []
agent_type: frontend-architect
estimated_complexity: simple
```

## 목표

SNS 공유용 OG 이미지와 파비콘을 설정한다.

## 수정 대상 파일

```
생성:
  assets/images/              # 이미지 디렉토리 (사용자가 이미지 파일 제공 필요)

수정:
  _includes/head.html         # favicon + apple-touch-icon 메타 태그 추가
  _config.yml                 # og_image 기본값 설정 (선택)
```

## 상세 요구사항

### head.html에 추가할 태그

```html
<link rel="icon" type="image/x-icon" href="{{ '/assets/images/favicon.ico' | relative_url }}">
<link rel="apple-touch-icon" href="{{ '/assets/images/apple-touch-icon.png' | relative_url }}">
```

### 필요한 이미지 (사용자 제공 또는 생성)

```
assets/images/favicon.ico          — 32x32px
assets/images/apple-touch-icon.png — 180x180px
assets/images/og-image.png         — 1200x630px (선택)
```

## BLOCKER

- 사용자가 이미지 파일을 제공하거나, 생성 도구를 지정해야 함
- 이미지 없이도 head.html 메타 태그는 먼저 추가 가능 (이미지 없으면 무시됨)

## 완료 조건

- head.html에 favicon/apple-touch-icon 태그 추가
- 이미지 파일이 있으면 브라우저 탭에 파비콘 표시
