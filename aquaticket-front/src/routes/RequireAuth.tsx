// src/routes/RequireAuth.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, type ReactNode } from "react";
import { fetchMe } from "@/api/auth";
import { isAxiosError } from "axios";

type Props = { children: ReactNode };

const TOKEN_KEY = "accessToken";

export default function RequireAuth({ children }: Props) {
  const token = localStorage.getItem(TOKEN_KEY);
  const loc = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        await fetchMe();
        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 401) {
          if (isMounted) {
            setIsAuthenticated(false);
          }
        }
      }
    };
    verifyToken();
    return () => {
      isMounted = false;
    };
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!isAuthenticated) {
    const next = encodeURIComponent(`${loc.pathname}${loc.search}${loc.hash}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  return <>{children}</>;
}
