// src/api/http.ts
import axios from "axios";

export const http = axios.create({
  baseURL: "/api", // ✅ 모든 요청은 /api/** 로 시작
  timeout: 15000,
});

// 에러 로깅용 인터셉터
http.interceptors.response.use(
  res => res,
  err => {
    console.error("[HTTP ERROR]", err.response?.status, err.response?.data);
    return Promise.reject(err);
  }
);
