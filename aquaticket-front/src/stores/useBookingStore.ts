import { create } from 'zustand';
import type { SeatAvailability } from '@/api/booking';

interface BookingState {
  showtimeId: number | null;
  selectedSeats: SeatAvailability[];
  totalPrice: number;
  setShowtimeId: (showtimeId: number) => void;
  setSelectedSeats: (seats: SeatAvailability[]) => void;
  clearBooking: () => void;
}

const useBookingStore = create<BookingState>((set) => ({
  showtimeId: null,
  selectedSeats: [],
  totalPrice: 0,
  setShowtimeId: (showtimeId) => set({ showtimeId }),
  setSelectedSeats: (seats) => {
    const totalPrice = seats.reduce((acc, seat) => acc + seat.price, 0);
    set({ selectedSeats: seats, totalPrice });
  },
  clearBooking: () => set({ showtimeId: null, selectedSeats: [], totalPrice: 0 }),
}));

export default useBookingStore;
