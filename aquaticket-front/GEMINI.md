# GEMINI.md

## Project Overview

This project is a web application named "aquaticket-front-vite". It appears to be a front-end for a ticket booking system, likely for performances or events.

The application is built using the following technologies:

*   **Framework:** React with TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **HTTP Client:** Axios for making API requests
*   **Routing:** React Router DOM
*   **Linting:** ESLint

The project is structured as a single-page application (SPA). It communicates with a backend API that is expected to be running on `http://localhost:8080`.

## Building and Running

To get the application running locally, you will need Node.js and npm installed.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, and the application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the production-ready files.

4.  **Lint the code:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **Component-Based Architecture:** The application is built with React components, which can be found in the `src/components` and `src/pages` directories.
*   **API Interaction:** All API requests are managed through an Axios instance defined in `src/api/http.ts`. The base URL for all API calls is `/api`, which is proxied to the backend server.
*   **Styling:** Tailwind CSS is used for styling. The configuration is in `tailwind.config.js`.
*   **Routing:** Routes are defined in `src/App.tsx` using `react-router-dom`.
*   **Path Aliases:** The project uses the `@` alias for the `src` directory, which is configured in `vite.config.ts`.
*   **Authentication:** The application has a token-based authentication system. The `RequireAuth` component is used to protect routes that require a user to be logged in.
