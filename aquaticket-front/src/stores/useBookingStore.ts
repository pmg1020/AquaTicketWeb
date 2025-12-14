import { create } from 'zustand';
import type { SeatAvailability } from '@/api/booking';
import type { KopisPriceItem } from "@/api/kopis.types";

// 공연 정보 타입
export interface PerformanceInfo {
  title: string;
  date: string;
  venue: string;
  posterUrl?: string;
}

// 쿠폰 타입
export interface Coupon {
  id: number;
  name:string;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
}

interface BookingState {
  showtimeId: number | null;
  selectedSeats: SeatAvailability[];
  totalPrice: number;
  performanceInfo: PerformanceInfo | null;
  selectedCoupon: Coupon | null;
  priceInfo: KopisPriceItem[]; // ✅ 가격 정보 추가
  isCaptchaVerified: boolean; // 캡챠 확인 상태
  setShowtimeId: (showtimeId: number) => void;
  setSelectedSeats: (seats: SeatAvailability[]) => void;
  setPerformanceInfo: (info: PerformanceInfo) => void;
  setSelectedCoupon: (coupon: Coupon | null) => void;
  setPriceInfo: (prices: KopisPriceItem[]) => void; // ✅ 가격 정보 설정 함수 추가
  setCaptchaVerified: (isVerified: boolean) => void; // 캡챠 상태 설정 함수
  clearBooking: () => void;
}

const useBookingStore = create<BookingState>((set) => ({
  showtimeId: null,
  selectedSeats: [],
  totalPrice: 0,
  performanceInfo: null,
  selectedCoupon: null,
  priceInfo: [], // ✅ 초기값
  isCaptchaVerified: false, // 캡챠 확인 상태 초기값
  setShowtimeId: (showtimeId) => set({ showtimeId }),
  setSelectedSeats: (seats) => {
    const totalPrice = seats.reduce((acc, seat) => acc + seat.price, 0);
    set({ selectedSeats: seats, totalPrice });
  },
  setPerformanceInfo: (info) => set({ performanceInfo: info }),
  setSelectedCoupon: (coupon) => set({ selectedCoupon: coupon }),
  setPriceInfo: (prices) => set({ priceInfo: prices }), // ✅ 설정 함수 구현
  setCaptchaVerified: (isVerified) => set({ isCaptchaVerified: isVerified }), // 캡챠 상태 설정
  clearBooking: () => set({
    showtimeId: null,
    selectedSeats: [],
    totalPrice: 0,
    performanceInfo: null,
    selectedCoupon: null,
    priceInfo: [], // ✅ 초기화
    isCaptchaVerified: false, // 캡챠 상태 초기화
  }),
}));

export default useBookingStore;
