# T-009: KaTeX 수학 수식 지원

```yaml
id: T-009
status: DONE
priority: LOW
parallel_group: C
depends_on: []
blocks: []
agent_type: frontend-architect
estimated_complexity: simple
```

## 목표

포스트에서 수학 수식을 렌더링할 수 있도록 KaTeX를 조건부 로드한다.

## 수정 대상 파일

```
수정:
  _includes/head.html      # KaTeX CDN 조건부 로드
  _config.yml              # math 기본 설정 (선택)
```

## 상세 요구사항

### 활성화 방식

```yaml
# 포스트 front matter에서 활성화:
---
layout: post
title: "수학 포스트"
math: true
---
```

### head.html에 추가

```html
{% if page.math %}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ]
  });">
</script>
{% endif %}
```

### 사용법

```markdown
인라인: $E = mc^2$
블록:
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

## 영향 범위

- `head.html` 수정 → `math: true`인 포스트에만 영향
- CDN 로드이므로 빌드에 영향 없음
- 다른 기능과 충돌 없음

## 완료 조건

- `math: true` 포스트에서 수식 렌더링
- `math` 미설정 포스트에서 KaTeX 미로드
- 인라인/블록 수식 모두 정상
