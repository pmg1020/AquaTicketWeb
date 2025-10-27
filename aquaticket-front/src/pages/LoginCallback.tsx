// src/pages/LoginCallback.tsx
import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from "@/api/auth";

function getParam(name: string, search: string, hash: string) {
  const q = new URLSearchParams(search).get(name);
  if (q) return q;
  const h = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash).get(name);
  return h;
}

function sanitizeNext(raw?: string | null) {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    if (decoded.startsWith("/") && !decoded.startsWith("//")) return decoded;
  } catch {
    // invalid URI or unexpected format — safely ignore
  }
  return null;
}


const LOGIN_BROADCAST_KEY = "auth:loggedIn";

export default function LoginCallback() {
  const navigate = useNavigate();
  const { search, hash } = useLocation();

  const { token, next, oauthError, oauthErrorDesc } = useMemo(() => {
    const token = getParam("token", search, hash);
    const next = getParam("next", search, hash);
    const oauthError = getParam("error", search, hash);
    const oauthErrorDesc = getParam("error_description", search, hash);
    return { token, next, oauthError, oauthErrorDesc };
  }, [search, hash]);

  useEffect(() => {
    if (oauthError) {
      console.error("OAuth2 Error:", oauthError, oauthErrorDesc);
      window.history.replaceState({}, "", "/login");
      navigate("/login", { replace: true, state: { error: oauthError, message: oauthErrorDesc } });
      return;
    }

    if (token) {
      if (token.split(".").length !== 3) {
        console.warn("Unexpected token format");
      }
      setToken(token);
      localStorage.setItem(LOGIN_BROADCAST_KEY, Date.now().toString());
      window.history.replaceState({}, "", "/login/callback");

      const go = sanitizeNext(next) ?? "/performances";
      // ✅ 같은 탭에서도 헤더/전역 상태가 깔끔히 갱신되도록 하드 리로드
      window.location.replace(go);
    } else {
      window.history.replaceState({}, "", "/login");
      navigate("/login", { replace: true });
    }
  }, [token, next, oauthError, oauthErrorDesc, navigate]);

  return <div style={{ padding: 24 }}>로그인 처리 중…</div>;
}
