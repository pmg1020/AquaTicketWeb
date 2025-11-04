import React, { useState } from "react";
import ZoneMap from "../components/maps/ZoneMap";
import SeatMap from "../components/maps/SeatMap";
import CaptchaModal from "../components/modals/CaptchaModal"; // Import the modal
import "../css/maps.css";

const SeatSelection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isCaptchaVerified, setCaptchaVerified] = useState(false); // Add captcha state

  return (
    <div className="seat-selection-page">
      {/* Render CaptchaModal if not verified */}
      {!isCaptchaVerified && (
        <CaptchaModal onSuccess={() => setCaptchaVerified(true)} />
      )}

      {/* Blur the background if captcha is not verified */}
      <div className={!isCaptchaVerified ? "filter blur-sm pointer-events-none" : ""}>
        {!selectedZone ? (
          <ZoneMap onZoneSelect={(zoneId) => setSelectedZone(zoneId)} />
        ) : (
          <SeatMap zoneId={selectedZone} onBack={() => setSelectedZone(null)} />
        )}
      </div>
    </div>
  );
};

export default SeatSelection;