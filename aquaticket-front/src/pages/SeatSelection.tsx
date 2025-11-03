import React, { useState } from "react";
import ZoneMap from "../components/maps/ZoneMap";
import SeatMap from "../components/maps/SeatMap";
import "../css/maps.css";

const SeatSelection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  return (
    <div className="seat-selection-page">
      {!selectedZone ? (
        <ZoneMap onZoneSelect={(zoneId) => setSelectedZone(zoneId)} />
      ) : (
        <SeatMap zoneId={selectedZone} onBack={() => setSelectedZone(null)} />
      )}
    </div>
  );
};

export default SeatSelection;
