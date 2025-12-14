// src/api/booking.ts
import api from "@/api/axiosInstance";

/** 좌석 상태 */
export type SeatStatus = "AVAILABLE" | "LOCKED" | "TAKEN";

/** 좌석 가용성 DTO (백엔드 SeatAvailabilityDto와 매핑) */
export interface SeatAvailability {
  seatId: number;
  row: string;      // 예: "A", "B"
  number: string;   // 예: "12" (문자열로 둠)
  price: number;
  status: SeatStatus;
  zone: string;     // ✅ 구역명(예: "1층 A", "R석")
}

/** 좌석 가용성 조회 */
export async function fetchAvailability(showtimeId: number): Promise<SeatAvailability[]> {
  const res = await api.get<SeatAvailability[]>(
    `/api/booking/showtimes/${showtimeId}/availability`
  );
  return res.data;
}

/* ---------- 홀드/확정 ---------- */
export interface HoldRequest {
  showtimeId: number;
  seatIds: number[];
}
export interface HoldResponse {
  holdId: string;
  expiresAt: string; // ISO 문자열
}

export async function createHold(payload: HoldRequest): Promise<HoldResponse> {
  const res = await api.post<HoldResponse>("/api/booking/hold", payload);
  return res.data;
}

export async function releaseHold(holdId: string): Promise<void> {
  await api.delete(`/api/booking/hold/${encodeURIComponent(holdId)}`);
}

export interface ConfirmRequest {
  showtimeId: number;
  seatIds: number[];
}
export interface ConfirmResponse {
  reservationId: number;
}

export async function confirmBooking(payload: ConfirmRequest): Promise<ConfirmResponse> {
  const res = await api.post<ConfirmResponse>("/api/booking/confirm", payload);
  return res.data;
}

// src/api/booking.ts
export async function ensureShowtime(kopisId: string, startAt: string): Promise<number> {
  const res = await api.post<{ showtimeId: number }>(
    "/api/booking/showtimes/ensure", // ✅ bookings (복수)
    { kopisId, startAt }
  );
  return res.data.showtimeId;
}

export type Booking = {
  bookingId: number;
  posterUrl: string;
  performanceTitle: string;
  viewingDate: string;
  bookingDate: string;
  bookingNumber: string;
  totalPrice: number;
  status: string;
};

export async function fetchMyBookings(): Promise<Booking[]> {
  const res = await api.get<Booking[]>("/api/booking/me");
  return res.data;
}

export async function cancelBooking(bookingId: number): Promise<void> {
  await api.post(`/api/booking/${bookingId}/cancel`);
}
