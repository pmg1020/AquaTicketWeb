import React from "react";
import clsx from "clsx";
import { ReactComponent as BaseMap } from "../../assets/seatmap_with_guidance.svg";

interface SvgSeatMapProps {
  onZoneSelect: (zoneId: string) => void;
  hoverType?: "standing" | "seat" | null;
}

const SvgSeatMap: React.FC<SvgSeatMapProps> = ({ onZoneSelect, hoverType }) => {
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGElement | null;
    if (!target) return;

    // 가장 가까운 구역 g 찾기
    const zoneGroup = target.closest("g");
    if (!zoneGroup) return;

    const zoneId = zoneGroup.getAttribute("id");
    const zoneType = zoneGroup.getAttribute("data-zone-type");

    if (!zoneId || !zoneType) return;          // data-zone-type 없는건 구역 아님
    if (zoneType === "disabled") return;       // 비활성 구역 클릭 차단

    onZoneSelect(zoneId);
  };

  return (
    <div className="svg-seatmap-container">
      <BaseMap
        onClick={handleClick}
        className={clsx("svg-seatmap", hoverType && `hover-${hoverType}`)}
      />
    </div>
  );
};

export default SvgSeatMap;
