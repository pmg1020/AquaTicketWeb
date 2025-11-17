import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface CaptchaModalProps {
  onSuccess: () => void;
}

export default function CaptchaModal({ onSuccess }: CaptchaModalProps) {
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState(false);

  // ✅ 랜덤 문자열 생성
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  const onProceed = () => {
    if (captchaInput.toUpperCase() !== captchaText) {
      setError(true);
      toast.error("보안문자를 정확히 입력해주세요.");
      setCaptchaText(generateCaptcha());
      setCaptchaInput("");
      return;
    }
    setError(false);
    toast.success("인증에 성공했습니다.");
    onSuccess();
  };

  const handleSkip = () => {
    toast("좌석 선택 후 다시 인증해주세요.", { icon: "🪪" });
    onSuccess();
  };

  return (
    <>
      {/* ✅ 멜론티켓 스타일 배경 - z-index 상승 */}
      <div
        className="fixed bg-black/30 flex items-center justify-center"
        style={{
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh'
        }}
        onClick={(e) => e.stopPropagation()}
      ></div>

      {/* ✅ 중앙 모달 - z-index 상승 */}
      <div
        className="fixed flex items-center justify-center"
        style={{
          zIndex: 10000,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh'
        }}
      >
        <div
          className="bg-white rounded-2xl px-8 py-7 text-center w-[380px] shadow-[0_4px_25px_rgba(0,0,0,0.2)] animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 타이틀 */}
          <h3 className="font-semibold text-[17px] text-green-600 mb-2">
            인증예매
          </h3>
          <p className="text-gray-700 text-sm mb-5 leading-relaxed">
            부정예매 방지를 위해 보안문자를 입력해주세요.
          </p>

          {/* 캡차 영역 */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gray-100 rounded-md px-5 py-2 select-none shadow-inner border border-gray-200">
              <p className="text-3xl font-bold tracking-widest text-gray-800">
                {captchaText}
              </p>
            </div>
            <button
              onClick={() => setCaptchaText(generateCaptcha())}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              title="새로고침"
            >
              ↻
            </button>
          </div>

          {/* 입력창 */}
          <input
            type="text"
            placeholder="보안문자 입력"
            value={captchaInput.toUpperCase()}
            onChange={(e) => {
              setCaptchaInput(e.target.value);
              setError(false);
            }}
            maxLength={6}
            className={`w-full p-2 border rounded-md text-center text-lg tracking-wide ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">
              보안문자를 정확히 입력해주세요.
            </p>
          )}

          {/* 버튼 */}
          <button
            onClick={onProceed}
            className="w-full bg-[#38b63f] hover:bg-[#2fa637] text-white font-semibold py-2.5 px-4 rounded-md mt-5 transition-colors"
          >
            입력완료
          </button>

          {/* 하단 안내 */}
          <p
            onClick={handleSkip}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700 cursor-pointer select-none"
          >
            좌석 먼저 확인하고 나중에 입력하기
          </p>
        </div>
      </div>
    </>
  );
}