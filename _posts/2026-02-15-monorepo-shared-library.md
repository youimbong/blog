---
layout: post
title: "TurboRepo Monorepo API 연동: Shared 라이브러리 설계"
slug: monorepo-shared-library
date: 2026-02-15 15:00:00 +0900
categories: [개발]
tags: [monorepo, turborepo, typescript, shared-library, api]
series: "Monorepo 실전"
series_order: 1
---

프로젝트가 커질수록 Backend와 Frontend 사이에서 가장 자주 깨지는 것은 “API 계약”입니다.
엔드포인트 경로, 요청/응답 타입, 에러 포맷, 버전 정책이 분리되어 있으면 배포 시점마다 회귀 이슈가 반복됩니다.

이번 글에서는 TurboRepo 기반 Monorepo에서 API 계약(contract)을 공유하는 `shared` 라이브러리를 구성해, 타입 안정성과 변경 추적성을 함께 가져가는 방법을 정리합니다.

## 왜 Shared 라이브러리가 필요한가

Backend와 Frontend가 저장소를 분리해서 운영되거나, 같은 저장소여도 타입을 복사해 관리하면 아래 문제가 반복됩니다.

- Frontend 타입이 실제 API 응답과 다름
- Backend에서 필드명을 바꿨는데 Frontend는 모름
- 에러 포맷이 엔드포인트마다 제각각
- 문서(OpenAPI)와 구현이 따로 놀음

Monorepo에서는 이 문제를 구조적으로 줄일 수 있습니다. 핵심은 “API 스키마와 타입을 단일 소스(single source of truth)로 관리한다”는 원칙입니다.

간단히 말해, 계약은 `packages/shared`에서 만들고 앱(`apps/api`, `apps/web`)은 소비만 하도록 역할을 나누는 방식입니다.

## 목표 구조

이번 글의 목표 구조는 아래와 같습니다.

```bash
apps/
  api/        # backend
  web/        # frontend
packages/
  shared/     # API 계약(타입/스키마/상수)
  ui/         # (선택) 공용 UI 컴포넌트
```

`packages/shared`에는 최소한 다음 요소를 둡니다.

- API path 상수
- 요청/응답 타입
- 런타임 검증 스키마(Zod 등)
- 공통 에러 포맷

## Shared 라이브러리 설계 원칙

### 1) 타입만 공유하지 말고 검증 규칙도 함께 공유

TypeScript 타입은 빌드 타임에만 유효합니다.
실행 시점 데이터가 깨질 수 있으므로 Zod 같은 런타임 스키마를 함께 두어야 안정성이 올라갑니다.

### 2) 도메인 단위로 파일을 분리한다

예: `user`, `auth`, `organization` 단위
엔드포인트가 늘어나도 변경 추적이 쉽고 충돌이 줄어듭니다.

### 3) API path 문자열 하드코딩 금지

`/api/v1/users` 같은 경로는 상수로 관리해야 백엔드/프론트가 한 번에 안전하게 변경됩니다.

## 예시 코드

### shared: user contract

```ts
// packages/shared/src/user.contract.ts
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["admin", "member"]),
});

export const GetUserResponseSchema = z.object({
  user: UserSchema,
});

export type User = z.infer<typeof UserSchema>;
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;

export const API_PATHS = {
  userById: (id: string) => `/api/v1/users/${id}`,
} as const;
```

### backend: shared schema 재사용

```ts
// apps/api/src/routes/user.ts
import { API_PATHS, GetUserResponseSchema } from "@repo/shared/user.contract";

app.get("/api/v1/users/:id", async (req, res) => {
  const payload = {
    user: {
      id: req.params.id,
      email: "test@example.com",
      name: "Youimbong",
      role: "member",
    },
  };

  // 응답 직전 검증으로 계약 보장
  const safe = GetUserResponseSchema.parse(payload);
  res.json(safe);
});
```

### frontend: 타입/경로/검증 동시 사용

```ts
// apps/web/src/features/user/api.ts
import { API_PATHS, GetUserResponseSchema, type GetUserResponse } from "@repo/shared/user.contract";

export async function fetchUser(id: string): Promise<GetUserResponse> {
  const res = await fetch(API_PATHS.userById(id));
  const json = await res.json();
  return GetUserResponseSchema.parse(json);
}
```

이렇게 하면 백엔드와 프론트가 같은 계약을 사용하므로, 한쪽 변경이 다른 쪽에서 컴파일 단계와 런타임 단계 모두에서 빠르게 감지됩니다.

## 도입 순서 (실무 권장)

처음부터 모든 엔드포인트를 옮기기보다, 변경이 잦은 도메인부터 단계적으로 옮기는 것이 안전합니다.

1. `shared` 패키지에 도메인 1개(`user` 등) 계약 정의
2. Backend에서 해당 도메인 응답을 shared 스키마로 검증
3. Frontend에서 같은 타입/스키마를 사용하도록 API 모듈 교체
4. CI에 `shared` 변경 시 `api + web` 테스트 동시 실행 추가
5. 안정화 후 다음 도메인(`auth`, `organization`)으로 확장

## TurboRepo 운영 체크리스트

- `shared` 패키지 빌드 산출물(`dist`) 관리 방식 결정
- `exports` 필드로 공개 API를 제한
- CI에서 `shared` 변경 시 backend/frontend 테스트를 함께 실행
- 버전 태깅 기준(내부 패키지도 semver 적용할지) 합의
- 릴리스 노트에 계약 변경(필드 추가/삭제/타입 변경) 명시

## 자주 실패하는 지점

- 타입만 공유하고 런타임 검증을 생략함
- `shared`에 앱 전용 로직(React hook, DB 모델)을 섞어 결합도가 올라감
- API path를 상수로 통일하지 않아 문자열 하드코딩이 다시 생김
- 계약 변경 시 Frontend 영향 범위를 CI에서 확인하지 않음

## 마무리

Monorepo의 장점은 코드가 한곳에 모여 있다는 사실 자체가 아니라, “계약을 한곳에서 강제할 수 있다”는 점에 있습니다.
`shared` 라이브러리는 단순 타입 모음집이 아니라, 팀의 API 계약을 지키는 운영 장치입니다.

다음 글에서는 이 구조를 기반으로 `OpenAPI 자동 생성`과 `API Client 코드 생성`까지 연결해, 문서와 구현의 동기화 비용을 더 줄이는 방법을 다뤄보겠습니다.
