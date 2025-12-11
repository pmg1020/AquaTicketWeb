// aquaticket-front/src/utils/svgSeatParser.ts
import type { SeatAvailability } from "@/api/booking";
import type { KopisPriceItem } from "@/api/kopis.types";

/**
 * KOPIS API의 가격 문자열 (예: "132,000원")을 숫자(132000)로 변환
 */
function parsePriceString(priceStr: string): number {
  if (!priceStr) return 0;
  const numericStr = priceStr.replace(/[^\d]/g, "");
  return parseInt(numericStr, 10) || 0;
}

export async function parseSvgSeatmap(
  svgContent: string,
  priceInfo: KopisPriceItem[] // ✅ API로 받은 단순화된 가격 정보
): Promise<SeatAvailability[]> {
  // ✅ 등급별 가격 미리 찾아두기
  const assignedSeatPriceItem = priceInfo.find(p => p.grade.includes("지정석") || p.grade.includes("전석"));
  const standingSeatPriceItem = priceInfo.find(p => p.grade.includes("스탠딩석"));

  const assignedPrice = assignedSeatPriceItem ? parsePriceString(assignedSeatPriceItem.price) : 0;
  const standingPrice = standingSeatPriceItem ? parsePriceString(standingSeatPriceItem.price) : 0;
  const defaultPrice = assignedPrice || standingPrice;

  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
  const seats: SeatAvailability[] = [];

  const zoneGroups = svgDoc.querySelectorAll("g[id^='zone-']");

  let globalSeatIdCounter = 1;

  zoneGroups.forEach((zoneGroup) => {
    const zoneId = zoneGroup.id;
    const zoneType = zoneGroup.getAttribute("data-zone-type") || "seat"; // 기본값 'seat'
    const rectElements = zoneGroup.querySelectorAll("rect");

    // ✅ Zone 유형에 따라 올바른 가격 할당
    const priceForZone = zoneType === 'standing' ? standingPrice : assignedPrice;

    const uniqueYCoords = new Set<number>();
    rectElements.forEach(rect => {
      const y = parseFloat(rect.getAttribute("y") || "0");
      uniqueYCoords.add(y);
    });
    const sortedYCoords = Array.from(uniqueYCoords).sort((a, b) => a - b);
    const yCoordToRowLabel = new Map<number, string>();
    sortedYCoords.forEach((y, index) => {
      yCoordToRowLabel.set(y, String.fromCharCode(65 + index)); // A, B, C...
    });

    rectElements.forEach((rect) => {
      const seatNo = rect.getAttribute("data-seat-no") || "1";
      const yCoord = parseFloat(rect.getAttribute("y") || "0");
      const rowLabel = yCoordToRowLabel.get(yCoord) || "A";

      seats.push({
        seatId: globalSeatIdCounter++,
        zone: zoneId,
        row: rowLabel,
        number: seatNo,
        price: priceForZone || defaultPrice, // ✅ Zone 가격 우선, 없으면 기본값
        status: "AVAILABLE",
      });
    });
  });

  return seats;
}
