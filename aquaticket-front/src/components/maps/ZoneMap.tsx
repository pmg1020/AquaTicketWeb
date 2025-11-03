import React from "react";
import { ZONES } from "../../data/zoneData";
import "../../css/maps.css";

interface ZoneMapProps {
  onZoneSelect: (zoneId: string) => void;
}

const ZoneMap: React.FC<ZoneMapProps> = ({ onZoneSelect }) => {
  const wrapperSize = 900;
  const center = { x: wrapperSize / 2, y: wrapperSize / 2 + 40 };

  // 🎯 반원 각도 범위
  const startAngleR = (200 * Math.PI) / 180;
  const endAngleR = (340 * Math.PI) / 180;
  const startAngleS = (205 * Math.PI) / 180;
  const endAngleS = (335 * Math.PI) / 180;

  const rR = 220;
  const rS = 310;

  const getPos = (r: number, angle: number) => ({
    top: center.y - r * Math.sin(angle),
    left: center.x + r * Math.cos(angle),
  });

  return (
    <div className="zone-map-wrapper" style={{ width: wrapperSize, height: wrapperSize }}>
      {/* 🎤 STAGE (가로로 긴 직사각형) */}
      <div
        className="stage-bar"
        style={{
          top: center.y - 220,
          left: center.x - 140,
          width: 280,
          height: 40,
          backgroundColor: "#222",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "6px",
          fontWeight: "bold",
          fontSize: "14px",
          position: "absolute",
        }}
      >
        STAGE
      </div>

      {/* 🟫 FLOOR (A/B/C/D) */}
      {[
        { id: "floor-a", name: "A", x: -120, y: -160 },
        { id: "floor-b", name: "B", x: 40, y: -160 },
        { id: "floor-c", name: "C", x: -120, y: -90 },
        { id: "floor-d", name: "D", x: 40, y: -90 },
      ].map((f) => (
        <div
          key={f.id}
          className="zone floor-zone"
          style={{
            top: center.y + f.y,
            left: center.x + f.x,
            width: 80,
            height: 60,
            backgroundColor: "#c7b299",
          }}
          onClick={() => onZoneSelect(f.id)}
        >
          <div className="zone-name">{f.name}</div>
        </div>
      ))}

      {/* 💺 1층 R석 */}
      {ZONES.filter((z) => z.grade === "R").map((zone, i, list) => {
        const angle = startAngleR + ((endAngleR - startAngleR) / (list.length - 1)) * i;
        const { top, left } = getPos(rR, angle);
        return (
          <div
            key={zone.id}
            className="zone r-zone"
            style={{ top, left, backgroundColor: zone.color }}
            onClick={() => onZoneSelect(zone.id)}
          >
            <div className="zone-name">{zone.name}</div>
          </div>
        );
      })}

      {/* 💺 2층 S석 */}
      {ZONES.filter((z) => z.grade === "S").map((zone, i, list) => {
        const angle = startAngleS + ((endAngleS - startAngleS) / (list.length - 1)) * i;
        const { top, left } = getPos(rS, angle);
        return (
          <div
            key={zone.id}
            className="zone s-zone"
            style={{ top, left, backgroundColor: zone.color }}
            onClick={() => onZoneSelect(zone.id)}
          >
            <div className="zone-name">{zone.name}</div>
          </div>
        );
      })}

      {/* ♿ 휠체어석 */}
      <div
        className="zone wheelchair"
        style={{
          top: center.y - 30,
          left: center.x - 300,
          backgroundColor: "#bfdbfe",
        }}
      >
        <div className="zone-name">♿</div>
      </div>
      <div
        className="zone wheelchair"
        style={{
          top: center.y - 30,
          left: center.x + 260,
          backgroundColor: "#bfdbfe",
        }}
      >
        <div className="zone-name">♿</div>
      </div>
    </div>
  );
};

export default ZoneMap;
