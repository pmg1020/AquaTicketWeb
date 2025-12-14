// src/api/kopis.ts
import { http } from "./http";
import type { KopisListItem, KopisDetailRaw, KopisPriceItem } from "./kopis.types";

export type { KopisListItem, KopisDetailRaw, KopisPriceItem } from "./kopis.types";

/**
 * 주어진 Date 객체를 'YYYYMMDD' 형식의 문자열로 포맷합니다.
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
}

/* =========================
   공연 목록
   ========================= */
// 백엔드 → GET /api/kopis/pblprfr?stdate&eddate&cpage&rows
export async function fetchPerformances(
  stdate: string,
  eddate: string,
  cpage = "1",
  rows = "50",
  shprfnm?: string
): Promise<KopisListItem[]> {
  const params: any = { stdate, eddate, cpage, rows };
  if (shprfnm) {
    params.shprfnm = shprfnm;
  }
  const { data } = await http.get<KopisListItem[]>("/kopis/pblprfr", {
    params,
  });
  return Array.isArray(data) ? data : [];
}

/* =========================
   공연 상세
   ========================= */
// 백엔드 → GET /api/kopis/pblprfr/{id}
export async function fetchPerformanceDetail(id: string): Promise<KopisDetailRaw> {
  const { data } = await http.get<KopisDetailRaw>(`/kopis/pblprfr/${id}`);
  return data;
}

/* =========================
   좌석/가격
   ========================= */
// 백엔드 → GET /api/kopis/prfprice/{id}
// 응답: [{ grade, seat, price }]
export async function fetchPerformancePrices(id: string): Promise<KopisPriceItem[]> {
  const { data } = await http.get<Array<{ grade: string; seat: string; price: string }>>(
    `/kopis/prfprice/${id}`
  );

  const mapped: KopisPriceItem[] = Array.isArray(data)
    ? data
        .map((row) => ({
          grade: (row?.grade ?? "").trim(),
          price: (row?.price ?? "").trim(),
          seat: (row?.seat ?? "").trim() || undefined,
        }))
        .filter((p) => p.grade && /\d/.test(p.price))
    : [];

  return mapped;
}
