// generateSeatSvg.mjs
// 간단한 데모용: 구역당 50좌석(5 x 10)짜리 SVG 자동 생성

import fs from "node:fs";

// ===== 설정 영역 =====

// 좌석 배치 (5행 x 10열 = 50석)
const ROWS = 5;
const COLS = 10;

// 좌석 크기 & 간격
const SEAT_SIZE = 18;      // 좌석 사각형 한 변 길이
const SEAT_GAP = 4;        // 좌석 사이 간격(px)

// 구역 라벨 높이
const LABEL_HEIGHT = 24;

// 좌우/상하 여백
const MARGIN_X = 40;
const MARGIN_Y = 40;

// 구역 간 간격
const ZONE_SPACING_X = 80;

// 구역 정의 (원하는 대로 추가/수정 가능)
const ZONES = [
  // 🟢 Standing zones
  { id: "zone-standing-a", label: "STANDING A", type: "standing" },
  { id: "zone-standing-b", label: "STANDING B", type: "standing" },
  { id: "zone-standing-c", label: "STANDING C", type: "standing" },
  { id: "zone-standing-d", label: "STANDING D", type: "standing" },

  // 🔵 Reserved seat zones (30 ~ 43)
  { id: "zone-30", label: "ZONE 30", type: "seat" },
  { id: "zone-31", label: "ZONE 31", type: "seat" },
  { id: "zone-32", label: "ZONE 32", type: "seat" },
  { id: "zone-33", label: "ZONE 33", type: "seat" },
  { id: "zone-34", label: "ZONE 34", type: "seat" },
  { id: "zone-35", label: "ZONE 35", type: "seat" },
  { id: "zone-36", label: "ZONE 36", type: "seat" },
  { id: "zone-37", label: "ZONE 37", type: "seat" },
  { id: "zone-38", label: "ZONE 38", type: "seat" },
  { id: "zone-39", label: "ZONE 39", type: "seat" },
  { id: "zone-40", label: "ZONE 40", type: "seat" },
  { id: "zone-41", label: "ZONE 41", type: "seat" },
  { id: "zone-42", label: "ZONE 42", type: "seat" },
  { id: "zone-43", label: "ZONE 43", type: "seat" },
];


// ===== 내부 계산 =====

const zoneWidth = COLS * SEAT_SIZE + (COLS - 1) * SEAT_GAP;
const zoneHeight = LABEL_HEIGHT + ROWS * SEAT_SIZE + (ROWS - 1) * SEAT_GAP;

const svgWidth =
  MARGIN_X * 2 + ZONES.length * zoneWidth + (ZONES.length - 1) * ZONE_SPACING_X;
const svgHeight = MARGIN_Y * 2 + zoneHeight;

// ===== 유틸 함수 =====

function generateZoneGroup(zoneIndex, zone) {
  const baseX =
    MARGIN_X + zoneIndex * (zoneWidth + ZONE_SPACING_X);
  const baseY = MARGIN_Y + LABEL_HEIGHT; // 라벨 아래부터 좌석 시작

  const parts = [];

  // 구역 라벨
  const labelX = baseX + zoneWidth / 2;
  const labelY = baseY - 8;

  parts.push(
    `  <g id="${zone.id}" data-zone-type="${zone.type}">`,
    `    <text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="14" fill="#333">${zone.label}</text>`
  );

  // 좌석 rect들
  let seatNumber = 1;
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const x = baseX + col * (SEAT_SIZE + SEAT_GAP);
      const y = baseY + row * (SEAT_SIZE + SEAT_GAP);

      const seatId = `${zone.id}-s${seatNumber}`;

      parts.push(
        `    <rect`,
        `      id="${seatId}"`,
        `      x="${x}" y="${y}"`,
        `      width="${SEAT_SIZE}" height="${SEAT_SIZE}"`,
        `      rx="3" ry="3"`,
        `      fill="#FFFFFF"`,
        `      stroke="#CCCCCC"`,
        `      data-zone-id="${zone.id}"`,
        `      data-zone-type="${zone.type}"`,
        `      data-seat-no="${seatNumber}"`,
        `    />`
      );

      seatNumber += 1;
    }
  }

  parts.push("  </g>");

  return parts.join("\n");
}

function generateSvg() {
  const header = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg`,
    `  xmlns="http://www.w3.org/2000/svg"`,
    `  version="1.1"`,
    `  width="${svgWidth}"`,
    `  height="${svgHeight}"`,
    `  viewBox="0 0 ${svgWidth} ${svgHeight}"`,
    `>`,
    `  <desc>Simple demo seatmap: 50 seats per zone (5x10)</desc>`,
  ].join("\n");

  const body = ZONES.map((zone, idx) =>
    generateZoneGroup(idx, zone)
  ).join("\n\n");

  const footer = `</svg>`;

  return [header, body, footer].join("\n\n");
}

// ===== 실행 =====

const svg = generateSvg();

// 원하는 경로로 변경 가능
const OUTPUT_PATH = "./src/assets/seatmap_demo.svg";

fs.writeFileSync(OUTPUT_PATH, svg, "utf8");

console.log(`✅ SVG 생성 완료: ${OUTPUT_PATH}`);
