import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "../css/header.css";
import { getToken, fetchMe, logout } from "@/api/auth";
import type { Me } from "@/api/auth";
import { toast } from "react-hot-toast";          // ✅ 토스트 사용

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [me, setMe] = useState<Me | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // ... (헤더 높이/스크롤 useEffect 그대로)

  // 로그인 상태 로드
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setMe(null);
      setLoadingMe(false);
      return;
    }
    (async () => {
      try {
        const data = await fetchMe();
        setMe(data);
      } catch {
        setMe(null);
      } finally {
        setLoadingMe(false);
      }
    })();
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleClickLogin = () => navigate("/login");

  const handleClickLogout = () => {
    // 1) 토큰 제거
    logout();
    setMe(null);

    // 2) 토스트 먼저 띄우고
    toast.success("로그아웃 되었습니다.");

    // 3) 라우팅 (보호 경로에 있었다면 로그인으로, 아니면 메인으로)
    if (pathname.startsWith("/mypage")) {
      navigate("/login", { replace: true });
    } else {
      navigate("/performances", { replace: true });
    }

    // 4) 토스트가 보일 수 있게 약간의 딜레이 후 1회 새로고침
    setTimeout(() => {
      window.location.reload();
    }, 700); // 0.7초 정도면 토스트가 눈에 보입니다.
  };

  return (
    <header ref={ref} className="site-header">
      <div className="hd-row hd-primary">
        <Link to="/performances" className="logo">
          <span className="logo-aqua">Aqua</span>Ticket
        </Link>

        <form className="search" onSubmit={handleSearchSubmit}>
          <input 
            placeholder="공연, 전시, 소공연 등 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        {loadingMe ? (
          <div className="login-btn" aria-busy="true">로딩…</div>
        ) : me ? (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* 아바타 + 이름 + 마이페이지 + 로그아웃 */}
            <span style={{ fontSize: 14 }}>
              <strong>{me.name}</strong> 님
            </span>
            <Link to="/mypage" className="login-btn" style={{ textDecoration: "none" }}>
              마이페이지
            </Link>
            <button className="login-btn" onClick={handleClickLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={handleClickLogin}>
            로그인
          </button>
        )}
      </div>

      <nav className="hd-row hd-subnav">
        <NavLink to="/genre/all">전체</NavLink>
        <NavLink to="/genre/concert">콘서트</NavLink>
        <NavLink to="/genre/musical">뮤지컬/연극</NavLink>
        <NavLink to="/genre/classic">클래식/오페라</NavLink>
      </nav>
    </header>
  );
}
