# aquaticket-front-vite Project Structure

This document outlines the file structure of the `aquaticket-front-vite` project, which is the front-end of the AquaTicket application.

## Root Directory

-   `.gitignore`: Specifies files and folders that Git should ignore.
-   `eslint.config.js`: Configuration file for ESLint, a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
-   `GEMINI.md`: Contains project overview, build instructions, and development conventions for the Gemini agent.
-   `index.html`: The main HTML file that serves as the entry point for the application.
-   `package-lock.json`: Records the exact version of each dependency used in the project.
-   `package.json`: Lists the project's dependencies and scripts.
-   `postcss.config.js`: Configuration file for PostCSS, a tool for transforming CSS with JavaScript.
-   `README.md`: General information about the project.
-   `tailwind.config.js`: Configuration file for Tailwind CSS, a utility-first CSS framework.
-   `tsconfig.app.json`: TypeScript configuration for the application code.
-   `tsconfig.json`: Root TypeScript configuration file.
-   `tsconfig.node.json`: TypeScript configuration for Node.js-specific code (like `vite.config.ts`).
-   `vite.config.ts`: Configuration file for Vite, the build tool used by the project.

## `public/`

This directory contains static assets that are not processed by the build tool.

-   `kakao_login_large_wide.png`: Image for the Kakao login button.
-   `vite.svg`: The Vite logo.

## `src/`

This directory contains the main source code of the application.

### `src/api/`

Contains all API-related code, including Axios instances and functions for making API calls.

-   `auth.ts`: Functions for authentication-related API calls (e.g., login, logout).
-   `axiosInstance.ts`: The configured Axios instance for making HTTP requests.
-   `booking.ts`: Functions for booking-related API calls.
-   `http.ts`: A generic HTTP client setup, likely used by other api modules.
-   `kopis.normalizers.ts`: Data normalizers for the KOPIS API responses.
-   `kopis.ts`: Functions for fetching data from the KOPIS (Korean Performing Arts Box Office Information System) API.
-   `kopis.types.ts`: TypeScript types for the KOPIS API data.
-   `showtime.ts`: Functions for fetching showtime-related data.

### `src/assets/`

Contains static assets that are imported into the application, such as images and fonts.

-   `react.svg`: The React logo.

### `src/components/`

Contains reusable React components used throughout the application.

-   `GenreNav.tsx`: A navigation component for different genres of performances.
-   `Header.tsx`: The main header component of the application.
-   `maps/`: Components related to displaying maps.
    -   `SeatMap.tsx`: A component for displaying the seat map of a venue.
    -   `ZoneMap.tsx`: A component for displaying the zone map of a venue.
-   `modals/`: Components for modals.
    -   `CaptchaModal.tsx`: A modal for displaying a CAPTCHA.
-   `mypage/`: Components specifically for the "My Page" section.
    -   `BookingItem.tsx`: A component to display a single booking item.
    -   `BookingList.tsx`: A component to display a list of bookings.
    -   `EventStatus.tsx`: A component to show the status of an event.
    -   `InquiryHistory.tsx`: A component to show the user's inquiry history.
    -   `MyPageContent.tsx`: The main content area for "My Page".
    -   `MyPageTab.tsx`: The tab navigation for "My Page".
    -   `TicketPoint.tsx`: A component to display user's ticket points.
    -   `UserInfo.tsx`: A component to display user information.
-   `seat-maps/`: Components for different floor maps.
    -   `FirstFloorMap.tsx`: Seat map for the first floor.
    -   `SecondFloorMap.tsx`: Seat map for the second floor.
    -   `FloorMap.tsx`: A generic floor map component.

### `src/css/`

Contains CSS files for styling specific components or pages.

-   `book.css`: Styles for the booking pages.
-   `genre-nav.css`: Styles for the genre navigation.
-   `Header.css`: Styles for the header.
-   `login.css`: Styles for the login page.
-   `maps.css`: Styles for the map components.
-   `performance-detail.css`: Styles for the performance detail page.
-   `performance-list.css`: Styles for the performance list page.
-   `register.css`: Styles for the registration page.

### `src/data/`

Contains mock or static data used in the application.

-   `seatData.ts`: Static data for seats.
-   `zoneData.ts`: Static data for zones.

### `src/pages/`

Contains the main page components of the application.

-   `BookGate.tsx`: A page that likely acts as a gate before the main booking page.
-   `BookPage.tsx`: The main booking page.
-   `CaptchaPopup.tsx`: A popup page for CAPTCHA.
-   `CategoryList.tsx`: A page to list categories of performances.
-   `LoginCallback.tsx`: A callback page for handling OAuth logins.
-   `LoginPage.tsx`: The login page.
-   `MyPage.tsx`: The user's "My Page".
-   `PerformanceDetail.tsx`: The page that shows details of a single performance.
-   `PerformanceList.tsx`: The page that lists all performances.
-   `RegisterPage.tsx`: The user registration page.
-   `SeatSelection.tsx`: The page for selecting seats.

### `src/routes/`

Contains routing-related components.

-   `RequireAuth.tsx`: A component that protects routes that require authentication.

### Other Files

-   `App.css`: Global styles for the application.
-   `App.tsx`: The main application component that sets up the routing.
-   `index.css`: The main CSS file that imports Tailwind CSS and other global styles.
-   `main.tsx`: The entry point of the React application.
-   `vite-env.d.ts`: TypeScript declarations for Vite environment variables.