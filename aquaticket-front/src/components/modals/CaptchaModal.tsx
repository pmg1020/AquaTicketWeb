import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface CaptchaModalProps {
  onSuccess: () => void; // 인증 성공 또는 나중에 입력 선택 시 호출
}

export default function CaptchaModal({ onSuccess }: CaptchaModalProps) {
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState(false);

  // ✅ 랜덤 문자 생성 함수
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // ✅ 최초 1회 캡차 생성
  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  const onProceed = () => {
    if (captchaInput.toUpperCase() !== captchaText) {
      setError(true);
      toast.error("보안문자를 정확히 입력해주세요.");

      // 실패 시 새 캡차 생성
      setCaptchaText(generateCaptcha());
      setCaptchaInput("");
      return;
    }

    setError(false);
    toast.success("인증에 성공했습니다.");
    onSuccess();
  };

  // ✅ “좌석 먼저 확인하기” 클릭 시
  const handleSkip = () => {
    toast("좌석 선택 후 다시 인증해주세요.", { icon: "🪪" });
    onSuccess(); // 모달 닫기
  };

  return (
    <>
      {/* ✅ 밝은 회색+흐림 배경 (멜론식) */}
      <div
        className="absolute inset-0 z-40 bg-[#d9d9d9]/70 backdrop-blur-[2px] transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      ></div>

      {/* ✅ 중앙 모달 */}
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <div
          className="bg-white rounded-lg p-7 text-center w-96 shadow-[0_4px_20px_rgba(0,0,0,0.15)] animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-semibold text-lg mb-2 text-green-600">인증예매</h3>
          <p className="text-gray-600 text-sm mb-4">
            부정예매 방지를 위해 보안문자를 입력해주세요.
          </p>

          {/* 보안문자 + 새로고침 버튼 */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="bg-gray-100 rounded-md px-4 py-2 select-none">
              <p className="text-3xl font-bold tracking-widest">{captchaText}</p>
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
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 transition-colors"
          >
            입력완료
          </button>

          {/* ✅ 좌석 먼저 확인하기 */}
          <p
            onClick={handleSkip}
            className="mt-3 text-xs text-gray-400 hover:text-gray-600 cursor-pointer select-none"
          >
            좌석 먼저 확인하고 나중에 입력하기
          </p>
        </div>
      </div>
    </>
  );
}
