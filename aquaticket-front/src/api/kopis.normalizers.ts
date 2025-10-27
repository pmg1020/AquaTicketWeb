// src/api/kopis.normalizers.ts
import type { KopisDetailRaw, KopisDetail } from "./kopis.types";

/**
 * KopisDetailRaw → KopisDetail 변환
 * - styurl(단일/배열) + styurls(배열) → 항상 string[]로 합침
 */
export function normalizeDetail(raw: KopisDetailRaw): KopisDetail {
  let urls: string[] = [];

  // 단일 string
  if (typeof raw.styurl === "string") {
    urls.push(raw.styurl);
  }
  // 배열인 경우
  else if (Array.isArray(raw.styurl)) {
    urls.push(...raw.styurl);
  }

  // styurls 배열 합치기
  if (Array.isArray(raw.styurls)) {
    urls.push(...raw.styurls);
  }

  // 중복 제거 + 빈 값 제거
  urls = Array.from(new Set(urls.filter(Boolean)));

  return {
    ...raw,
    styurls: urls,
  };
}
