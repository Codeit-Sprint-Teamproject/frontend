# 모읽지 ( Moilkji )

<br />

## 프로젝트 설명
- 모읽지(Moilkji) 는 독서 모임과 커뮤니티 기능을 제공하는 플랫폼으로, <br />
  사용자들이 함께 책을 읽고 토론하며 성장할 수 있는 환경을 제공합니다.

<br/>

## 시연 영상 및 발표 자료
- [모읽지 시연영상](https://drive.google.com/file/d/1oYWSn3pBlRRpuW69ENBRbXOMPjz4OfL1/view?usp=sharing)
- [모읽지 발표자료](https://www.canva.com/design/DAGbYR_hu7I/-k2N5pP5ns-0fqOTecIpEA/view?utm_content=DAGbYR_hu7I&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5ba4eb3998)
<br/>

## 개발 기간
-  2024.11.14 ~ 2025.01.06 ( 4주 )

<br/>

## 개발 인원
- FE 3명
- BE 2명
- DE 1명

<br/>

## 역할 분담
- 임희원 ( 팀장, FE )
  - 메인페이지 UI 및 기능 구현
  - 모임 상세 페이지 UI 및 기능 구현 
  - 모임참여하기, 모임 찜하기, 모임 필터링/정렬기능 구현
- 우준석 (FE)
  - 로그인/회원가입 페이지 UI 및 기능 구현
  - GNB, 검색페이지 UI 및 기능 구현
  - 모임생성 UI 및 기능 구현
- 정유진 (FE)
  - 마이페이지 UI 및 기능 구현
  - 독서 리뷰 메인 무한스크롤 컴포넌트로 구현 및 좋아요 기능
  - 독서 리뷰 상세 페이지,독서 리뷰 생성 UI 개발 및 리뷰와 댓글 추가/수정/삭제
  - 커스텀 모달, 독서 달력 커스텀 스타일 구현
- 정한별 (BE)
  - 로그인, GNB, 마이페이지에 대한 및 API 구현
  - 사용자/인증 및 리뷰 API 구현
  - Swagger로 api 관리, AWS 세팅
- 한재민 (BE)
  - 모임 관련 기능 API 구현
  - 무한스크롤, 필터링 검색 기능 API 구현
  - CI/CD 세팅
- 고수영 (DE)
  - 와이어프레임 제작
  - 디자인 시스템 구성 및 컨셉
  - UI 디자인, UX 개선

<br/>

## 설치 방법

- 프로젝트를 실행을 위한 설치 방법에 대해 설명합니다.
- 아래 명령어들을 순서대로 입력하여 설치 및 실행할 수 있습니다.

<br/>

  ```
  git clone https://github.com/Codeit-Sprint-Teamproject/frontend.git
  ```
  ```
  npm install
  ```
  ```
  npm run dev
  ```

<br/>

## 라이브러리

이 프로젝트에서 사용된 주요 라이브러리는 다음과 같습니다:

- ***tanstack-query***: 비동기 처리 라이브러리
- ***react-calendar***: 캘린더 라이브러리
- ***swiper***: 슬라이더/캐러셀 라이브러리
- ***react-simple-star-rating***: 별점 라이브러리

<br />

## 사용 기술

- ***Next.js 14 - App router***
- ***TypeScript***
- ***TanStack Query***
- ***zustand***
- ***zod***
- ***react-hook-form***
- ***msw***
- ***Tailwind CSS***
- ***shadcn/ui***
- ***Github Actions***
- ***husky***
