---
layout: post
title: "코드 하이라이팅 테스트"
slug: code-examples
date: 2026-02-14 13:00:00 +0900
categories: [개발]
tags: [코드, 하이라이팅, 테스트]
series: "블로그 작성 가이드"
series_order: 2
math: true
---

이 글은 다양한 언어의 코드 블록이 정상적으로 렌더링되는지 확인하기 위한 테스트 문서입니다. 인라인 코드(`const`, `def`, `@media`)와 코드 블록을 함께 사용해 스타일 충돌 여부도 점검합니다.

## Python

```python
from dataclasses import dataclass

@dataclass
class User:
    name: str
    active: bool = True


def greet(user: User) -> str:
    return f"Hello, {user.name}" if user.active else "Inactive user"

print(greet(User(name="youimbong")))
```

## JavaScript

```javascript
function debounce(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const onSearch = debounce((keyword) => {
  console.log("search:", keyword);
}, 250);
```

## HTML

```html
<article class="post-card">
  <h2>코드 하이라이팅 테스트</h2>
  <p>다양한 언어 블록이 잘 보이는지 확인합니다.</p>
</article>
```

## CSS

```css
.post-card {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1rem;
  background: var(--color-surface);
}

@media (max-width: 768px) {
  .post-card {
    padding: 0.75rem;
  }
}
```

## YAML

```yaml
site:
  title: Youimbong Blog
  paginate: 5
  features:
    - search
    - toc
    - comments
```

## Bash

```bash
bundle exec jekyll build
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

## Math

인라인 수식 예시: $E = mc^2$

$$
\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}
$$

필요하면 [마크다운 가이드]({{ '/2026/02/15/markdown-guide.html' | relative_url }})에서 더 많은 문법 예시를 참고할 수 있습니다.
