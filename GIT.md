# Blog Git Commit Rules (Prompt Form)

아래 프롬프트는 `'/home/perfect/dev/blog'` 범위 내 변경사항을 커밋하도록 강제하는 운영 규칙이다.
이 문서를 사용하는 에이전트/개발자는 반드시 순서대로 수행한다.

---

## 1) 시스템 프롬프트 (역할/범위 고정)

```text
너는 blog 저장소에서 Git 커밋을 수행하는 실무 엔지니어다.
목표는 '/home/perfect/dev/blog' 하위 변경사항을 선별하여 안전하게 커밋하는 것이다.

[절대 규칙]
1. 커밋 범위는 오직 '/home/perfect/dev/blog' 내 파일만 허용한다.
2. 커밋 전후로 범위 검증 명령을 실행하고 결과를 확인한다.
3. 커밋 메시지는 변경 의도와 영향을 명확히 설명한다.
4. 규칙 위반이 감지되면 즉시 중단하고 범위를 정리한 뒤 다시 검증한다.
```

---

## 2) 실행 프롬프트 (단계별 절차)

```text
다음 절차를 순서대로 수행하라.

1) 변경사항 확인
- git -C /home/perfect/dev/blog status --short
- git -C /home/perfect/dev/blog diff --name-only

2) 커밋 범위 필터링
- 변경 파일 목록을 확인하고 커밋 후보를 선별한다.
- 관련 없는 파일은 add 하지 않는다.

3) 스테이징
- git -C /home/perfect/dev/blog add <명시적 파일 목록>

4) 스테이징 검증 (필수)
- git -C /home/perfect/dev/blog diff --cached --name-only
- 검증 기준: 의도한 파일만 포함되어 있어야 한다.
- 의도하지 않은 파일이 있으면 커밋 중단.

5) 커밋 메시지 작성 규칙
- 제목은 명령형 현재시제로 50자 내외.
- 본문에는 다음 3가지를 포함:
  a. 무엇을 바꿨는지
  b. 왜 바꿨는지
  c. 영향 범위(레이아웃/스타일/포스트/설정 등)

6) 커밋 실행
- git -C /home/perfect/dev/blog commit -m "<제목>" -m "<본문>"

7) 커밋 결과 검증
- git -C /home/perfect/dev/blog show --name-only --oneline -1
- 마지막 커밋 파일 목록이 의도한 범위로만 구성됐는지 최종 확인.
```

---

## 3) 금지 규칙 (실수 방지)

```text
[금지]
- git add .
- git commit -a
- 범위 확인 없이 커밋
- 의도하지 않은 파일이 섞인 상태에서 커밋 강행

[예외 처리]
- 이미 다른 파일이 스테이징된 경우:
  1) git -C /home/perfect/dev/blog restore --staged <제외할 파일>
  2) git -C /home/perfect/dev/blog diff --cached --name-only 재검증
  3) 검증 통과 후에만 commit 진행
```

---

## 4) 커밋 메시지 템플릿

```text
<type>: <변경 요약>

- 변경 내용:
  - ...
- 변경 이유:
  - ...
- 영향 범위:
  - _layouts/, _includes/, _sass/, _posts/, assets/ 등
- 검증:
  - [ ] diff --cached 경로가 의도한 범위로만 구성됨
  - [ ] 마지막 커밋 파일 목록 확인 완료
```

권장 `type`:
- `feat`: 기능 추가
- `fix`: 버그 수정
- `refactor`: 동작 변경 없는 구조 개선
- `chore`: 빌드/설정/유지보수
- `style`: 스타일/디자인 변경
- `content`: 포스트/콘텐츠 추가·수정
- `docs`: 문서 변경

---

## 5) Quick Gate (지속사용용 최소 점검)

```text
[ ] diff --cached --name-only 결과가 의도한 파일로만 구성됨
[ ] 커밋 메시지에 무엇/왜/영향 범위가 포함됨
[ ] show --name-only -1로 최종 커밋 범위를 확인함
```

---

## 6) 자동 실행 프롬프트 (이 문서 제공 시 커밋까지 수행)

```text
아래 규칙 문서(GIT.md)를 입력받으면, 너는 설명만 하지 말고 실제 Git 커밋까지 완료해야 한다.

[트리거 규칙]
1. 사용자 입력이 아래 중 하나이면 즉시 "커밋 실행 요청"으로 해석한다.
   - '/home/perfect/dev/blog/GIT.md'
   - 'GIT.md' (현재 문맥에서 blog 문서를 지칭하는 경우)
2. 사용자 메시지에 추가 코멘트가 없으면(파일 경로만 전달되면) 확인 질문 없이 바로 실행한다.
3. 사용자 메시지에 별도 조건이 있으면 그 조건을 우선 적용한다.

[자동 실행 지시]
1. 작업 루트는 /home/perfect/dev/blog 로 고정한다.
2. 변경사항을 조회하고, 커밋 후보를 선별한다.
3. 대상 파일만 스테이징한다.
4. diff --cached --name-only 검증 결과가 의도한 파일만 포함할 때만 진행한다.
5. 규칙에 맞는 커밋 메시지를 작성하고 즉시 commit 실행한다.
6. show --name-only -1 로 마지막 커밋 범위를 검증한다.
7. 검증 실패 시 커밋하지 않고 실패 원인과 조치 내역을 출력한다.

[실행 원칙]
- "무엇을 할지 제안"으로 끝내지 말고, 조건 충족 시 commit까지 실제 수행한다.
- 트리거 규칙 매칭 시(특히 파일 경로만 입력된 경우) 파일 내용 출력/요약 대신 커밋 실행 절차를 먼저 수행한다.
- 의도하지 않은 파일이 섞이면 반드시 제외/언스테이지 후 재검증한다.
- 금지 명령(git add ., git commit -a)은 사용하지 않는다.
- 커밋 메시지는 기본값을 자동 생성해서 사용한다(사용자가 별도 메시지를 주지 않은 경우).

[기본 커밋 메시지 규칙 (코멘트 없을 때)]
- 제목: chore: apply blog scoped changes
- 본문:
  - 무엇: blog 범위 변경사항을 스코프 규칙에 따라 커밋함.
  - 왜: 작업 누락 없이 범위 제한 커밋을 일관되게 수행하기 위함.
  - 영향: /home/perfect/dev/blog 한정.

[최종 출력 형식]
- Commit: <성공|실패>
- Commit Hash: <hash 또는 N/A>
- Staged Files: <파일 목록>
- Scope Check: <PASS|FAIL>
- Message: <제목 1줄>
```
