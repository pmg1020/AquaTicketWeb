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
import LoginCallback from "@/pages/LoginCallback";
import RegisterPage from "@/pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import BookPage from "@/pages/BookPage";
import SeatSelection from "@/pages/SeatSelection";

// ✅ 새로 추가된 페이지
import BookPricePage from "@/pages/BookPricePage";
import BookPaymentPage from "@/pages/BookPaymentPage";

const TOKEN_KEY = "accessToken";

export default function App() {
  const location = useLocation();

  // ✅ 예매 관련 페이지에서는 Header 숨김
  const isBookingRelatedPage = [
    "/book/select-seats",
    "/book/select-price",
    "/book/payment",
    "/captcha",
  ].some((path) => location.pathname.startsWith(path));

  // ✅ 로그인 세션 동기화 (탭 간 처리)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== TOKEN_KEY) return;

      const protectedPaths = ["/mypage", "/book"];
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
      {/* ✅ 전역 알림 */}
      <Toaster
        position="top-center"
        containerStyle={{ zIndex: 99999 }}
        toastOptions={{ duration: 1500 }}
      />

      {/* ✅ Header는 예매 관련 페이지에서는 숨김 */}
      {!isBookingRelatedPage && <Header />}

      <Routes>
        {/* 기본 페이지 */}
        <Route path="/" element={<Navigate to="/performances" replace />} />
        <Route path="/performances" element={<PerformanceList />} />
        <Route path="/performances/:id" element={<PerformanceDetail />} />
        <Route path="/genre/:slug" element={<CategoryList />} />

        {/* 로그인 / 회원가입 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ 예매 프로세스 */}
        <Route
          path="/book/select-seats"
          element={
            <RequireAuth>
              <SeatSelection />
            </RequireAuth>
          }
        />

        <Route
          path="/book/select-price"
          element={
            <RequireAuth>
              <BookPricePage />
            </RequireAuth>
          }
        />

        <Route
          path="/book/payment"
          element={
            <RequireAuth>
              <BookPaymentPage />
            </RequireAuth>
          }
        />

        {/* 마이페이지 */}
        <Route
          path="/mypage"
          element={
            <RequireAuth>
              <MyPage />
            </RequireAuth>
          }
        />

        {/* 기본 예매 루트 */}
        <Route
          path="/book"
          element={
            <RequireAuth>
              <BookPage />
            </RequireAuth>
          }
        />

        {/* 없는 페이지 → 공연 목록으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/performances" replace />} />
      </Routes>
    </div>
  );
}
