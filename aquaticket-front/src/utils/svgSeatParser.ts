// aquaticket-front/src/utils/svgSeatParser.ts
import type { SeatAvailability, SeatStatus } from "@/api/booking";

export async function parseSvgSeatmap(svgContent: string): Promise<SeatAvailability[]> {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
  const seats: SeatAvailability[] = [];

  const zoneGroups = svgDoc.querySelectorAll("g[id^='zone-']");

  let globalSeatIdCounter = 1; // Unique ID for each seat, since SVG IDs might not be sequential or suitable

  zoneGroups.forEach((zoneGroup) => {
    const zoneId = zoneGroup.id;
    // const zoneType = zoneGroup.getAttribute("data-zone-type") || "unknown"; // Not directly used by SeatAvailability

    const rectElements = zoneGroup.querySelectorAll("rect");

    // Collect unique y coordinates within this zone to determine rows
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
        seatId: globalSeatIdCounter++, // Use a generated unique ID
        zone: zoneId,
        row: rowLabel,
        number: seatNo, // Use data-seat-no as number
        price: 50000, // Dummy price
        status: "AVAILABLE", // Default status
      });
    });
  });

  return seats;
}
