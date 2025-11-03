// 좌석 데이터 정의
export type SeatStatus = "available" | "unavailable";

export interface Seat {
  id: string;
  label: string;
  price: number;
  status: SeatStatus;
}

export interface SeatArea {
  id: string;
  name: string;
  colorClass: string;
  seats: Seat[];
}

export const SEAT_AREAS: SeatArea[] = [
  {
    id: "floor",
    name: "FLOOR",
    colorClass: "floor-seat",
    seats: Array.from({ length: 5 * 15 }, (_, i) => {
      const row = Math.floor(i / 15) + 1;
      const num = (i % 15) + 1;
      return {
        id: `floor-${row}-${num}`,
        label: `FLOOR ${row}열 ${num}번`,
        price: 15000,
        status: Math.random() < 0.2 ? "unavailable" : "available",
      };
    }),
  },
  {
    id: "first",
    name: "1층",
    colorClass: "first-seat",
    seats: Array.from({ length: 3 * 15 }, (_, i) => {
      const row = Math.floor(i / 15) + 6;
      const num = (i % 15) + 1;
      return {
        id: `1f-${row}-${num}`,
        label: `1층 ${row}열 ${num}번`,
        price: 12000,
        status: Math.random() < 0.2 ? "unavailable" : "available",
      };
    }),
  },
  {
    id: "second",
    name: "2층",
    colorClass: "second-seat",
    seats: Array.from({ length: 2 * 15 }, (_, i) => {
      const row = Math.floor(i / 15) + 9;
      const num = (i % 15) + 1;
      return {
        id: `2f-${row}-${num}`,
        label: `2층 ${row}열 ${num}번`,
        price: 10000,
        status: Math.random() < 0.2 ? "unavailable" : "available",
      };
    }),
  },
];
