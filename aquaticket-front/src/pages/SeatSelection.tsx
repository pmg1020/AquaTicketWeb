import React, { useState } from "react";
import ZoneMap from "../components/maps/ZoneMap";
import SeatMap from "../components/maps/SeatMap";
import CaptchaModal from "../components/modals/CaptchaModal";
import "../css/maps.css";

const SeatSelection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(true);

  // ✅ 보안문자 성공 or "나중에 입력하기"
  const handleCaptchaSuccess = () => {
    setCaptchaVerified(true);
    setShowCaptcha(false);
  };

  // ✅ 예매하기 클릭 시 다시 보안문자 표시
  const handleSeatComplete = () => {
    setCaptchaVerified(false);
    setShowCaptcha(true);
  };

  return (
    <div className="seat-selection-page relative">
      {/* ✅ 보안문자 모달 */}
      {showCaptcha && <CaptchaModal onSuccess={handleCaptchaSuccess} />}

      {/* ✅ 보안문자 열릴 때 배경 클릭/선택 차단 */}
      <div className={showCaptcha ? "pointer-events-none blur-sm brightness-90" : ""}>
        {!selectedZone ? (
          <ZoneMap onZoneSelect={(zoneId) => setSelectedZone(zoneId)} />
        ) : (
          <SeatMap
            zoneId={selectedZone}
            onBack={() => setSelectedZone(null)}
            onComplete={handleSeatComplete}
            isVerified={isCaptchaVerified} // ✅ 실제 사용됨
          />
        )}
      </div>
    </div>
  );
};

export default SeatSelection;
