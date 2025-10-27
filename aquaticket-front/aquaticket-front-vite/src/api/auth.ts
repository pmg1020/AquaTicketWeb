// src/api/auth.ts
import api from "@/api/axiosInstance";
import { isAxiosError } from "axios";

/** ===== Types ===== */
export type Me = {
  email: string;
  name: string;
  role: string;
};

export type UpdateMePayload = {
  nickname?: string;
  phone?: string;
};



export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  name: string;
  password: string;
};

/** ===== Token helpers ===== */
const TOKEN_KEY = "accessToken";
const LEGACY_AUTH_KEYS = ["user", "userId", "userName", "token", "kakaoAccessToken"];

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
function clearLegacyAuthArtifacts(): void {
  LEGACY_AUTH_KEYS.forEach((k) => localStorage.removeItem(k));
  sessionStorage.removeItem("kakao.state");
}

/** ===== APIs ===== */
export async function fetchMe(): Promise<Me> {
  try {
    const res = await api.get<Me>("/api/auth/me");
    return res.data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      console.error("Axios Error:", err.response?.data || err.message);
    } else {
      console.error("Unknown Error:", err);
    }
    throw err;
  }
}



export function logout(): void {
  clearToken();
  clearLegacyAuthArtifacts();
}

/** 회원가입 */
export async function registerUser(payload: RegisterPayload): Promise<void> {
  try {
    await api.post("/api/auth/register", payload);
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const st = err.response?.status;
      if (st === 409) throw new Error("이미 등록된 이메일입니다.");
      if (st === 400) throw new Error("입력값을 다시 확인해주세요.");
      throw new Error(`회원가입 실패 (${st ?? "네트워크 오류"})`);
    }
    throw err;
  }
}

/** 이메일 로그인 */
export async function loginByEmail(payload: LoginPayload): Promise<void> {
  try {
    const res = await api.post("/api/auth/login", payload);
    // 서버 응답을 폭넓게 수용: { token } 또는 { accessToken } 또는 { accessToken, tokenType, profile }
    const token: string | undefined =
      res.data?.token ?? res.data?.accessToken;

    if (!token) throw new Error("토큰이 없습니다. 로그인 실패");

    setToken(token); // ✅ 한곳에서만 저장
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const st = err.response?.status;
      if (st === 401) throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      if (st === 400) throw new Error("요청 형식이 잘못되었습니다.");
      throw new Error(`로그인 실패 (${st ?? "네트워크 오류"})`);
    }
    throw err;
  }
}
