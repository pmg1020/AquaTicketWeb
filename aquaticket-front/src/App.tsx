// src/App.tsx
import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import RequireAuth from "@/routes/RequireAuth";
import PerformanceList from "@/pages/PerformanceList";
import PerformanceDetail from "@/pages/PerformanceDetail";
import CategoryList from "@/pages/CategoryList";
import LoginPage from "@/pages/LoginPage";
import MyPage from "@/pages/MyPage";
import LoginCallback from "@/pages/LoginCallback"; // ✅ 추가
import RegisterPage from "@/pages/RegisterPage"; // ✅ 추가
import { Toaster } from "react-hot-toast";
import BookPage from "@/pages/BookPage";

import SeatSelection from "@/pages/SeatSelection";


const TOKEN_KEY = "accessToken";

export default function App() {
  const location = useLocation();
  const isBookPage = location.pathname.startsWith("/book");

  // 여러 탭 동기화 (다른 탭에서만 리로드/리다이렉트)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== TOKEN_KEY) return;

      const protectedPaths = ["/mypage"];
      const onProtected = protectedPaths.some((p) =>
        window.location.pathname.startsWith(p)
      );

      if (onProtected) {
        window.location.href = "/login";
      } else {
        window.location.reload();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "visible",
        transform: "none",
        filter: "none",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      {/* 전역 토스트 */}
      <Toaster position="top-center" containerStyle={{ zIndex: 99999 }} toastOptions={{ duration: 1500 }} />

      {!isBookPage && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/performances" replace />} />
        <Route path="/performances" element={<PerformanceList />} />
        <Route path="/performances/:id" element={<PerformanceDetail />} />
        <Route path="/genre/:slug" element={<CategoryList />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/callback" element={<LoginCallback />} /> {/* ✅ 추가 */}
        <Route path="/register" element={<RegisterPage />} /> {/* ✅ 추가 */}

        <Route
          path="/book/select-seats"
          element={
            <RequireAuth>
              <SeatSelection />
            </RequireAuth>
          }
        />

        <Route
          path="/mypage"
          element={
            <RequireAuth>
              <MyPage />
            </RequireAuth>
          }
        />

        <Route
          path="/book"
          element={
            <RequireAuth>
              <BookPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/performances" replace />} />
      </Routes>
    </div>
  );
}
