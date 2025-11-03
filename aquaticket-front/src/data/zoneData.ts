// src/data/zoneData.ts
export interface Zone {
  id: string;
  name: string;
  grade: "R" | "S" | "Floor";
  color: string;
}

// 기본 데이터만 정의 (좌표 없음)
export const ZONES: Zone[] = [
  { id: "zone-floor", name: "Floor", grade: "Floor", color: "#c7b299" },

  // R 구역 (1~17)
  ...Array.from({ length: 17 }, (_, i): Zone => ({
    id: `zone-${i + 1}`,
    name: `${i + 1}구역`,
    grade: "R" as const, // ✅ 타입 명시
    color: "#a5b4fc",
  })),

  // S 구역 (18~37)
  ...Array.from({ length: 20 }, (_, i): Zone => ({
    id: `zone-${i + 18}`,
    name: `${i + 18}구역`,
    grade: "S" as const, // ✅ 타입 명시
    color: "#f9a8d4",
  })),
];
