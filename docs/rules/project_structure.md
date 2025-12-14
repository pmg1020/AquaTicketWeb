# 프로젝트 구조 상세 명세

이 문서는 `aquaticket-front`와 `aquaticket-back` 프로젝트의 폴더 구조와 각 파일의 상세한 역할을 설명하여, 새로운 개발자도 프로젝트의 전체적인 흐름을 이해할 수 있도록 돕습니다.

## 1. `aquaticket-front` (프론트엔드)

React, TypeScript, Vite 기반의 프론트엔드 애플리케이션으로, 사용자 인터페이스와 경험을 담당합니다.

### 1.1. `src` 주요 파일 및 폴더

-   **`main.tsx`**: React 애플리케이션의 최상위 진입점입니다. `BrowserRouter`로 `App` 컴포넌트를 감싸 렌더링하여 전체 앱에 라우팅 기능을 제공합니다.
-   **`App.tsx`**: 애플리케이션의 메인 레이아웃과 라우팅 구조를 정의하는 핵심 컴포넌트입니다. `react-router-dom`을 사용하여 각 URL 경로에 맞는 페이지 컴포넌트를 연결하고, 전역 헤더 및 토스트 알림을 관리합니다.
-   **`index.css`, `App.css`**: 애플리케이션 전반에 적용되는 기본 및 전역 스타일을 정의합니다.

### 1.2. `src/api` - 백엔드 통신

백엔드 API 서버와 통신하는 모든 로직을 관리합니다.

-   **`axiosInstance.ts`**: `axios`의 공통 설정을 관리하는 인스턴스입니다. 요청 시 `Authorization` 헤더에 JWT 토큰을 자동으로 추가하고, API 응답이 401(Unauthorized)일 경우, 자동으로 로그인 페이지로 리다이렉트하는 인터셉터(interceptor)를 설정하여 인증 처리를 자동화합니다.
-   **`http.ts`**: `/api`를 기본 URL로 사용하는 간단한 `axios` 인스턴스입니다. 주로 KOPIS API 프록시처럼 인증이 필요 없는 요청에 사용됩니다.
-   **`auth.ts`**: 회원가입, 로그인, 로그아웃, 사용자 정보 조회(`fetchMe`) 등 인증 관련 API 함수들을 제공합니다. 또한 로컬 스토리지에서 JWT 토큰을 관리하는 헬퍼 함수(`getToken`, `setToken`)를 포함합니다.
-   **`booking.ts`**: 예매와 관련된 모든 API 함수를 제공합니다. (예: 특정 회차의 좌석 가용성 조회 `fetchAvailability`, 좌석 임시 확보 `createHold`, 예매 확정 `confirmBooking`, 내 예매 내역 조회 `fetchMyBookings`).
-   **`kopis.ts`**: 백엔드를 통해 KOPIS(공연예술 통합전산망) API를 호출하는 함수들을 제공합니다. 공연 목록(`fetchPerformances`) 및 상세 정보(`fetchPerformanceDetail`)를 가져오는 역할을 합니다.
-   **`showtime.ts`**: KOPIS ID와 공연 날짜/시간을 보내 우리 시스템의 `showtimeId`를 확보하는 `ensureShowtime` 함수를 제공합니다.

### 1.3. `src/pages` - 화면 단위 컴포넌트

각 URL 경로에 해당하는 메인 페이지 컴포넌트들입니다.

-   **`PerformanceList.tsx`**: 메인 페이지로, 전체 공연 목록을 보여줍니다.
-   **`PerformanceDetail.tsx`**: 특정 공연의 상세 정보를 보여주는 페이지입니다. API에서 가져온 가격 정보들을 새로운 규칙(가장 높은 가격→스탠딩석, 두 번째로 높은 가격→지정석)에 따라 2개 등급으로 단순화하여 화면에 표시합니다. 예매하기 버튼 클릭 시, **단순화된 가격 정보와 함께 공연 상세 정보(`performanceInfo`)를 `localStorage`에 저장하여** 새 창으로 열리는 예매 페이지에 전달합니다.
-   **`LoginPage.tsx`**: 이메일/비밀번호 또는 카카오 소셜 로그인을 제공하는 페이지입니다.
-   **`LoginCallback.tsx`**: OAuth2 소셜 로그인 성공 후, 리다이렉트되어 토큰을 받아 처리하는 페이지입니다.
-   **`RegisterPage.tsx`**: 회원가입 폼을 제공하고, 가입을 처리하는 페이지입니다.
-   **`MyPage.tsx`**: 사용자의 예매 내역, 쿠폰, 개인 정보 등을 확인할 수 있는 마이페이지의 컨테이너 역할을 합니다.
-   **`SeatSelection.tsx`**: 예매 프로세스의 핵심 페이지입니다. 페이지 초기화 시 `localStorage`에서 단순화된 가격 정보와 **공연 정보(`performanceInfo`)**가 나타날 때까지 주기적으로(polling) 확인하여 안정적으로 읽어옵니다. **`any` 타입 사용을 제거하고 명확한 타입을 지정하여 코드 품질을 개선했습니다.**
-   **`BookPricePage.tsx`**: 좌석 선택 후 가격을 요약하여 보여주는 페이지입니다. `useBookingStore`에서 선택된 좌석 정보와 총 가격을 가져와 표시합니다.
-   **`BookPaymentPage.tsx`**: 좌석 선택 후, 가격 확인, 할인 적용 및 최종 결제를 진행하는 페이지입니다. `useBookingStore`에서 가져온 `totalPrice`를 기반으로 결제 금액을 계산하고 표시합니다.

### 1.4. `src/components` - 재사용 UI 조각

여러 페이지에서 재사용되는 UI 컴포넌트들입니다.

-   **`Header.tsx`**: 모든 페이지 상단에 표시되는 헤더입니다. 로고, 검색창, 로그인/로그아웃 버튼, 장르별 네비게이션 링크를 포함합니다.
-   **`GenreNav.tsx`**: 장르별 공연 목록으로 이동할 수 있는 네비게이션 바 컴포넌트입니다.
-   **`maps/`**: 좌석 선택 페이지(`SeatSelection.tsx`)에서 사용되는 지도 관련 컴포넌트들입니다.
    -   `SvgSeatMap.tsx`: 전체 공연장의 좌석 배치도 SVG를 보여주며, 사용자가 특정 '구역(zone)'을 선택할 수 있게 합니다.
    -   `SeatMap.tsx`: 특정 '구역'이 선택되었을 때, 해당 구역의 상세 좌석들을 보여주는 컴포넌트입니다.
-   **`modals/CaptchaModal.tsx`**: 예매 시작 전 표시되는 보안문자 입력 모달입니다.
-   **`mypage/`**: 마이페이지를 구성하는 여러 섹션 컴포넌트들입니다. (`BookingList`, `UserInfo` 등)

### 1.5. `src/routes` 와 `src/stores`

-   **`routes/RequireAuth.tsx`**: 로그인이 필요한 페이지를 감싸는 컴포넌트입니다. 로그인하지 않은 사용자가 접근하면 로그인 페이지로 보냅니다.
-   **`stores/useBookingStore.ts`**: `Zustand`를 사용한 전역 상태 관리 스토어입니다. 예매 과정(좌석 선택 → 결제)에서 선택된 좌석, 공연 정보, 가격 등의 상태를 여러 페이지에 걸쳐 공유하기 위해 사용됩니다. API로부터 가져온 `KopisPriceItem` 형태의 가격 정보(`priceInfo`)와 **공연 상세 정보(`performanceInfo`)**를 저장하고 관리하는 상태 및 액션이 포함되어 있습니다.

### 1.6. `src/utils` - 유틸리티 함수

-   **`svgSeatParser.ts`**: SVG 좌석 배치도 파일 내용을 파싱하여 좌석 데이터를 생성하는 유틸리티 함수입니다. 단순화된 `priceInfo`를 인수로 받아, SVG 좌석의 `data-zone-type` 속성('seat' 또는 'standing')에 따라 '지정석' 또는 '스탠딩석' 가격을 올바르게 할당합니다.

---

## 2. `aquaticket-back` (백엔드)

Java, Spring Boot 기반의 백엔드 애플리케이션으로, API를 제공하고 비즈니스 로직과 데이터베이스를 관리합니다.

### 2.1. `src/main/resources` - 설정 및 스키마

-   **`application.properties`**: 데이터베이스 접속 정보(URL, ID, PW), JWT 토큰 비밀 키 및 만료 시간, KOPIS API 키, 카카오 OAuth 클라이언트 ID/Secret 등 애플리케이션의 모든 핵심 설정값을 담고 있습니다.
-   **`schema.sql`**: 애플리케이션 실행 시 자동으로 생성될 데이터베이스 테이블 구조(DDL)를 정의합니다. (예: `venues`, `performances`, `seats`, `reservations` 테이블 등)

### 2.2. `src/main/java/com/aquaticket/aquaticketback` - 주요 패키지

#### `config` - Spring Security 및 앱 설정

-   **`SecurityConfig.java`**: Spring Security의 핵심 설정 파일입니다. URL 경로별 접근 권한(permit, authenticated), CORS 설정, JWT 필터 및 OAuth2 로그인 핸들러를 등록합니다.
-   **`JwtAuthFilter.java`**: 모든 요청에 대해 `Authorization` 헤더를 검사하여 유효한 JWT 토큰이 있으면, 토큰을 파싱하여 사용자 정보를 `SecurityContextHolder`에 저장함으로써 인증을 처리하는 필터입니다.
-   **`JwtTokenProvider.java`**: JWT 토큰을 생성(`createToken`)하고 검증(`validateToken`)하는 유틸리티 클래스입니다.
-   **`oauth/OAuth2SuccessHandler.java`**: 카카오 등 소셜 로그인 성공 후 호출되는 핸들러입니다. 로그인한 사용자를 위한 JWT 토큰을 생성하여 프론트엔드로 리다이렉트 시킵니다.

#### `controller` - API 엔드포인트

HTTP 요청을 직접 받아 처리하는 클래스들입니다.

-   **`AuthController.java`**: `/api/auth` 경로의 요청을 처리합니다. 이메일/비밀번호를 사용한 자체 회원가입(`register`) 및 로그인(`login`), 그리고 토큰 기반의 사용자 정보 조회(`me`) API를 제공합니다.
-   **`KopisProxyController.java`**: `/api/kopis` 경로의 요청을 처리합니다. 프론트엔드 대신 KOPIS API 서버와 통신하여 공연 목록, 상세 정보, 가격 등을 받아와 프론트엔드에 JSON 형식으로 전달하는 프록시 역할을 합니다.
-   **`booking/BookingController.java`**: `/api/booking` 경로의 예매 관련 요청을 처리합니다. 좌석 현황 조회(`getSeatAvailability`), 예매 생성(`confirmBooking`), 내 예매 내역 조회(`getMyBookings`) 등의 API를 제공합니다. `confirmBooking` 엔드포인트는 이제 실제 예매 데이터를 받아 데이터베이스에 저장합니다.

#### `domain` 및 `repository` - 데이터베이스 모델링 및 접근

-   **`domain/User.java`**: `users` 테이블과 매핑되는 JPA 엔티티입니다. 사용자 정보를 나타냅니다.
-   **`repository/UserRepository.java`**: `User` 엔티티에 대한 데이터베이스 CRUD(Create, Read, Update, Delete) 작업을 위한 Spring Data JPA 인터페이스입니다.
-   **`booking/domain/*.java`**: 예매 기능과 관련된 엔티티들입니다. (`Performance`, `Showtime`, `Seat`, `Reservation` 등)
-   **`booking/repository/*.java`**: 예매 관련 엔티티들의 데이터베이스 접근을 담당하는 JPA 인터페이스들입니다.

#### `service` - 비즈니스 로직

-   **`MemberService.java`**: 회원 정보 조회, 수정, 비밀번호 변경 등 회원 관련 비즈니스 로직을 처리합니다.
-   **`booking/BookingService.java`**: 예매 기능의 핵심 비즈니스 로직을 담당합니다. 특정 공연 회차의 좌석 가용성(예매 가능/완료/잠금 상태)을 계산하고, `ensureShowtime`을 통해 필요한 공연/회차 정보를 동적으로 생성하며, 사용자의 예매 내역을 조회하는 등의 복잡한 로직을 수행합니다. 또한, `confirmBooking` 메서드를 통해 실제 예매를 생성하고, 좌석을 예약 처리하며, 총 가격을 계산하여 데이터베이스에 저장하는 역할을 담당합니다.
-   **`booking/ShowCreationServiceImpl.java`**: KOPIS API에서 가져온 정보를 바탕으로 데이터베이스에 새로운 공연(`Performance`), 장소(`Venue`), 회차(`Showtime`) 데이터를 생성하는 역할을 합니다.