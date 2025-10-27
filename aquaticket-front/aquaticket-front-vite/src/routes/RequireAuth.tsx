// src/routes/RequireAuth.tsx
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type Props = { children: ReactNode };

const TOKEN_KEY = "accessToken";

export default function RequireAuth({ children }: Props) {
  const token = localStorage.getItem(TOKEN_KEY);
  const loc = useLocation();

  if (!token) {
    const next = encodeURIComponent(`${loc.pathname}${loc.search}${loc.hash}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return <>{children}</>;
}
