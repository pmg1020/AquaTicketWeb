import api from "@/api/axiosInstance";

/**
 * 백엔드에 (kopisId, startAt) 조합의 쇼타임을 보장(있으면 조회, 없으면 생성)하고
 * 생성/조회된 showtimeId를 반환합니다.
 * startAt 예: "2025-11-21T19:00:00"
 */
export async function ensureShowtime(
  kopisId: string,
  startAt: string
): Promise<number> {
  const res = await api.post<{ showtimeId: number }>(
    "/api/booking/showtimes/ensure",
    { kopisId, startAt }
  );
  return res.data.showtimeId;
}
