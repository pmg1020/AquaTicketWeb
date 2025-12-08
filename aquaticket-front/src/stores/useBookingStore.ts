import { create } from 'zustand';
import type { SeatAvailability } from '@/api/booking';

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
  name: string;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
}

interface BookingState {
  showtimeId: number | null;
  selectedSeats: SeatAvailability[];
  totalPrice: number;
  performanceInfo: PerformanceInfo | null;
  selectedCoupon: Coupon | null;
  setShowtimeId: (showtimeId: number) => void;
  setSelectedSeats: (seats: SeatAvailability[]) => void;
  setPerformanceInfo: (info: PerformanceInfo) => void;
  setSelectedCoupon: (coupon: Coupon | null) => void;
  clearBooking: () => void;
}

const useBookingStore = create<BookingState>((set) => ({
  showtimeId: null,
  selectedSeats: [],
  totalPrice: 0,
  performanceInfo: null,
  selectedCoupon: null,
  setShowtimeId: (showtimeId) => set({ showtimeId }),
  setSelectedSeats: (seats) => {
    const totalPrice = seats.reduce((acc, seat) => acc + seat.price, 0);
    set({ selectedSeats: seats, totalPrice });
  },
  setPerformanceInfo: (info) => set({ performanceInfo: info }),
  setSelectedCoupon: (coupon) => set({ selectedCoupon: coupon }),
  clearBooking: () => set({
    showtimeId: null,
    selectedSeats: [],
    totalPrice: 0,
    performanceInfo: null,
    selectedCoupon: null
  }),
}));

export default useBookingStore;
