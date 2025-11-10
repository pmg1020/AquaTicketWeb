import React from "react";
import { ReactComponent as BaseMap } from "../../assets/base.svg";

interface SvgSeatMapProps {
  onZoneSelect: (zoneId: string) => void;
}

const SvgSeatMap: React.FC<SvgSeatMapProps> = ({ onZoneSelect }) => {
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement;
    const id = target.getAttribute("id");

    // 🚫 휠체어 구역 클릭 막기
    if (id?.startsWith("wheelchair")) return;

    if (id) {
      console.log("🟦 클릭:", id);
      onZoneSelect(id);
    }
  };

  return (
    <div className="svg-seatmap-container">
      <BaseMap onClick={handleClick} className="svg-seatmap" />
    </div>
  );
};

export default SvgSeatMap;
