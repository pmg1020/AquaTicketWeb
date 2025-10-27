// src/api/axiosInstance.ts
import axios, { AxiosError, AxiosHeaders } from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const TOKEN_KEY = "accessToken";
const LOGOUT_BROADCAST_KEY = "auth:loggedOut";

// 디폴트: 개발프록시(/api → 8080) 쓰면 "/" 권장.
// 환경변수로 직접 찍고 있다면 그대로 둬도 무방.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/",
  withCredentials: false,
});

// 401 처리 플래그 확장
type RequestConfig401 = InternalAxiosRequestConfig & {
  __handled401?: boolean;
  /** 이 요청에 한해 401 자동 리다이렉트 방지 */
  skip401Redirect?: boolean;
};

// 예매 플로우는 자동리다이렉트 금지(페이지에서 직접 처리)
// 필요한 엔드포인트를 여기에 추가
const NO_REDIRECT_401: RegExp[] = [
  /^\/api\/booking\/showtimes\//, // 좌석 가용성 조회, 회차 보장
  /^\/api\/bookings\/hold\b/, // 홀드
  /^\/api\/bookings\/confirm\b/, // 예매 확정
];

// 전역 스위치(디버깅 시 false로 꺼두면 401에서도 리다이렉트 안 함)
let AUTO_REDIRECT_401 = true;
export function set401AutoRedirect(enabled: boolean) {
  AUTO_REDIRECT_401 = enabled;
}

// 현재 URL을 next로 넘기기
function buildNextParam(): string {
  const { pathname, search, hash } = window.location;
  return encodeURIComponent(`${pathname}${search}${hash}`);
}

// === 요청 인터셉터: 토큰 부착 ===
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = AxiosHeaders.from(config.headers);
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

// === 응답 인터셉터: 401 공통 처리(선택적) ===
api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError) => {
    const res = err.response;
    if (!res) return Promise.reject(err);

    const status = res.status;
    const cfg = (err.config ?? {}) as RequestConfig401;
    const url = cfg.url ?? "";

    if (status === 401 && !cfg.__handled401) {
      cfg.__handled401 = true;

      const isInNoRedirectList = NO_REDIRECT_401.some((re) => re.test(url));
      const shouldRedirect =
        AUTO_REDIRECT_401 && !cfg.skip401Redirect && !isInNoRedirectList;

      if (shouldRedirect) {
        // 1) 토큰 제거
        localStorage.removeItem(TOKEN_KEY);
        // 2) 다른 탭 동기화
        localStorage.setItem(LOGOUT_BROADCAST_KEY, Date.now().toString());
        // 3) 로그인으로(next 포함)
        const next = buildNextParam();
        window.location.replace(`/login?next=${next}`);
      } else {
        // 자동 리다이렉트 금지: 페이지/호출부에서 처리
        console.warn("[401 suppressed]", url);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
