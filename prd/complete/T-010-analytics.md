# T-010: Google Analytics

```yaml
id: T-010
status: DONE
priority: LOW
parallel_group: C
depends_on: []
blocks: []
agent_type: frontend-architect
estimated_complexity: simple
```

## 목표

Google Analytics 4를 조건부로 로드한다.

## 수정 대상 파일

```
수정:
  _config.yml              # google_analytics 키 추가
  _includes/head.html      # GA 스크립트 조건부 삽입
```

## 상세 요구사항

### _config.yml

```yaml
# Google Analytics (선택 — 값 입력 시 활성화)
google_analytics: ""   # "G-XXXXXXXXXX" 형태
```

### head.html에 추가

```html
{% if site.google_analytics and site.google_analytics != "" %}
<script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ site.google_analytics }}');
</script>
{% endif %}
```

## BLOCKER

- 사용자가 GA4 측정 ID (`G-XXXXXXXXXX`)를 제공해야 활성화 가능
- ID 없이도 코드는 먼저 추가 가능 (빈 값이면 미로드)

## 영향 범위

- `head.html` 수정 → 모든 페이지 (조건부이므로 기본적으로 비활성)
- `_config.yml` 수정 → 새 키 추가만

## 완료 조건

- `google_analytics` 값이 있으면 GA 스크립트 로드
- 값이 비어있으면 스크립트 미로드
- 실제 데이터 수집은 사용자가 GA4에서 확인
