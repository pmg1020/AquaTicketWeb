/* /c:/aquaticket/aquaticket-front/src/components/maps/SvgSeatMap.tsx */

import React from "react";
import clsx from "clsx";
import { ReactComponent as BaseMap } from "../../assets/seatmap_with_guidance.svg";

interface SvgSeatMapProps {
  onZoneSelect: (zoneId: string) => void;
  hoverType?: "standing" | "seat" | null;
  isMiniMap?: boolean;
}

const SvgSeatMap: React.FC<SvgSeatMapProps> = ({ onZoneSelect, hoverType, isMiniMap = false }) => {
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    // 가장 가까운 구역 g 찾기
    const target = e.target as SVGElement | null;
    if (!target) return;

    const zoneGroup = target.closest("g");
    if (!zoneGroup) return;

    const zoneId = zoneGroup.getAttribute("id");
    const zoneType = zoneGroup.getAttribute("data-zone-type");

    if (!zoneId || !zoneType) return;
    if (zoneType === "disabled") return;

    onZoneSelect(zoneId);
  };

  return (
    <div
      className="svg-seatmap-container"
      style={isMiniMap ? {
        width: '100%', // 240px → 100%
        height: 'auto',
        padding: 0,
        position: 'static'
      } : undefined}
    >
      <BaseMap
        onClick={handleClick}
        className={clsx(
          "svg-seatmap",
          hoverType && `hover-${hoverType}`,
          isMiniMap && 'minimap-svg'
        )}
        style={isMiniMap ? {
          width: '100%',
          height: 'auto'
        } : undefined}
      />
    </div>
  );
};

export default SvgSeatMap;