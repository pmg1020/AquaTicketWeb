// src/api/kopis.types.ts

/** 공연 목록 아이템 */
export interface KopisListItem {
  mt20id: string;       // 공연 ID
  prfnm: string;        // 공연명
  prfpdfrom: string;    // 시작일
  prfpdto: string;      // 종료일
  fcltynm: string;      // 공연장
  poster: string;       // 포스터
  genrenm: string;      // 장르
  prfstate: string;     // 상태 (공연중 등)
  area?: string;
}

/** 상세(원본 Raw) */
export interface KopisDetailRaw extends KopisListItem {
  mt10id?: string;
  prfcast?: string;
  prfcrew?: string;
  prfruntime?: string;
  prfage?: string;
  dtguidance?: string;
  pcseguidance?: string;

  /** 소개 이미지 - 응답에 따라 단일 string 또는 string[] */
  styurl?: string | string[];
  /** 일부 응답은 처음부터 배열 */
  styurls?: string[];
}

/** 상세(정규화 버전) */
export type KopisDetail = Omit<KopisDetailRaw, "styurl" | "styurls"> & {
  styurls: string[]; // 항상 배열 보장
};

/** 좌석/가격 아이템 */
export interface KopisPriceItem {
  grade: string;   // 예: R석, VIP석, 전석
  price: string;   // 예: 70,000원
  seat?: string;   // 예: 지정석, 자유석
}
