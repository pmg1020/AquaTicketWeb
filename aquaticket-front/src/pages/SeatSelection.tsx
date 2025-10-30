import { useMemo, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import FloorMap from "../components/seat-maps/FloorMap";
import FirstFloorMap from "../components/seat-maps/FirstFloorMap";
import SecondFloorMap from "../components/seat-maps/SecondFloorMap";

const SEAT_PRICE = 15000;

function useQS() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function SeatSelection() {
  const qs = useQS();
  const kopisId = qs.get("k");
  const day = qs.get("d");
  const time = qs.get("t");

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const totalPrice = useMemo(() => selectedSeats.length * SEAT_PRICE, [selectedSeats]);

  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaInputRef = useRef<HTMLInputElement>(null);

  const [section, setSection] = useState<"floor" | "1f" | "2f">("floor");

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  }, []);

  useEffect(() => {
    if (!captchaVerified && captchaInputRef.current) {
      captchaInputRef.current.focus();
    }
  }, [captchaVerified]);

  const onCaptchaProceed = () => {
    if (captchaInput.toUpperCase() !== captchaText) {
      setCaptchaError(true);
      toast.error("보안문자를 정확히 입력해주세요.");
      return;
    }
    setCaptchaError(false);
    setCaptchaVerified(true);
    toast.success("보안문자 인증 성공!");
  };

  const handleSeatClick = (seatId: string) => {
    if (!captchaVerified) {
      toast.error("보안문자 인증 후 좌석을 선택할 수 있습니다.");
      return;
    }
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        if (prevSelectedSeats.length >= 4) {
          toast.error("최대 4좌석까지 선택 가능합니다.");
          return prevSelectedSeats;
        }
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  const handlePayment = () => {
    if (!captchaVerified) {
      toast.error("보안문자 인증 후 결제를 진행할 수 있습니다.");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("좌석을 선택해주세요.");
      return;
    }
    toast.success(`선택된 좌석: ${selectedSeats.join(", ")}, 총 결제 금액: ${totalPrice.toLocaleString()}원`);
  };

  return (
    <div className="seat-selection-page p-8 bg-gray-100 min-h-screen relative">
      {/* Captcha Modal */}
      {!captchaVerified && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.45)] backdrop-blur-[6px] flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="relative bg-white border border-[#f3f4f6] rounded-xl p-[36px] text-center shadow-[0_8px_30px_rgba(0,0,0,0.2)] w-[380px] transition-transform duration-300 scale-100">
            <h3 className="font-bold text-lg mb-2">인증예매</h3>
            <p className="text-gray-600 text-sm mb-6">
              부정예매 방지를 위해 보안문자를 입력해주세요.
            </p>
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="inline-block bg-[#f9fafb] rounded-md px-[14px] py-[10px] my-[18px]">
                <span className="text-4xl font-extrabold tracking-widest">{captchaText}</span>
              </div>
              <input
                ref={captchaInputRef}
                type="text"
                value={captchaInput.toUpperCase()}
                onChange={(e) => {
                  setCaptchaInput(e.target.value);
                  setCaptchaError(false);
                }}
                placeholder="보안문자 입력"
                maxLength={6}
                className={`w-full border border-[#e5e7eb] rounded-md px-[12px] py-[10px] text-[15px] transition-all duration-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]
                ${captchaError ? "border-red-500 focus:ring-red-500" : "focus:border-[#2dd36f] focus:ring-transparent"}
                focus:outline-none`}
              />
              {captchaError && <p className="text-red-500 text-sm mt-1">정확히 입력해주세요</p>}
            </div>
            <button
              onClick={onCaptchaProceed}
              className="w-full py-[12px] bg-[#2dd36f] text-white font-semibold rounded-md hover:bg-[#22c55e] transition duration-200 mt-[18px]"
            >
              입력완료
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="page-wrapper flex justify-center">
        <div
          className={`seat-container max-w-[1500px] mx-auto pt-[40px] px-4 font-pretendard grid grid-cols-[5fr_1.3fr] gap-[60px] items-start ${
            !captchaVerified ? "filter blur-sm pointer-events-none" : ""
          }`}
        >
          <h1 className="page-title text-center text-[22px] font-bold mt-[24px] mb-[16px] col-span-full">좌석 선택</h1>

          <div className="mb-6 text-center text-lg col-span-full">
            <p><strong>공연:</strong> {kopisId}</p>
            <p><strong>날짜:</strong> {day}</p>
            <p><strong>시간:</strong> {time}</p>
          </div>

          {/* Seat Map */}
          <div className="seat-map bg-white rounded-xl border border-[#e5e7eb] p-[40px] h-[640px] min-w-[1000px] shadow flex flex-col items-center justify-start">
            <div className="stage bg-[#f9fafb] border border-[#ddd] rounded-lg text-center font-bold text-[#111827] w-[280px] p-[12px_0] mb-[30px] text-[18px] tracking-[1px]">
              STAGE
            </div>

            <div className="section-tabs flex space-x-2 bg-gray-200 p-1 rounded-md z-10 mb-4">
              {["floor", "1f", "2f"].map((lvl) => (
                <button
                  key={lvl}
                  className={`px-3 py-1 rounded-sm text-sm font-medium ${
                    section === lvl ? "bg-white shadow" : "text-gray-600"
                  }`}
                  onClick={() => setSection(lvl as "floor" | "1f" | "2f")}
                >
                  {lvl.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="seat-map-content flex-grow flex items-center justify-center">
              {section === "floor" && (
                <FloorMap selectedSeats={selectedSeats} handleSeatClick={handleSeatClick} disabled={!captchaVerified} />
              )}
              {section === "1f" && (
                <FirstFloorMap selectedSeats={selectedSeats} handleSeatClick={handleSeatClick} disabled={!captchaVerified} />
              )}
              {section === "2f" && (
                <SecondFloorMap selectedSeats={selectedSeats} handleSeatClick={handleSeatClick} disabled={!captchaVerified} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar bg-white rounded-xl p-[24px] shadow border border-[#f3f4f6] flex flex-col gap-[20px] sticky top-[100px]">
            <div className="seat-legend">
              <h4 className="font-bold text-base text-[#111827] mb-3">좌석 색상 안내</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-[#d4b48c] mr-2"></span>VIP석</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-[#b4b9ff] mr-2"></span>일반석</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-[#f7c4d4] mr-2"></span>시야제한석</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-[#2dd36f] mr-2"></span>선택석</div>
                <div className="flex items-center"><span className="w-4 h-4 rounded-full bg-[#e5e7eb] mr-2"></span>예매 완료</div>
              </div>
            </div>

            <div className="price-panel">
              <h4 className="font-bold text-base text-[#111827] mb-3">좌석 등급별 가격</h4>
              <div className="space-y-2">
                <div className="flex justify-between"><span>VIP석</span><span>{SEAT_PRICE.toLocaleString()}원</span></div>
                <div className="flex justify-between"><span>일반석</span><span>{(SEAT_PRICE * 0.8).toLocaleString()}원</span></div>
              </div>
            </div>

            <div className="summary-box">
              <h2 className="text-xl font-semibold mb-3">예매 정보</h2>
              <div className="flex justify-between mb-2">
                <span>선택 좌석:</span>
                <span className="font-bold text-blue-700">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "선택된 좌석 없음"}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span>총 결제 금액:</span>
                <span className="text-2xl font-bold text-red-600">{totalPrice.toLocaleString()}원</span>
              </div>
              <button
                onClick={handlePayment}
                disabled={!captchaVerified}
                className={`w-full py-[14px] bg-gradient-to-r from-[#2dd36f] to-[#22c55e] text-white font-bold rounded-lg transition-all duration-200 ${
                  !captchaVerified ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.03]"
                }`}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
