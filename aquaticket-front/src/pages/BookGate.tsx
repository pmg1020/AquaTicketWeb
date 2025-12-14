import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function useQS() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function BookGate() {
  const qs = useQS();
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState(false);

  // Generate random 6-character alphanumeric string
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  }, []);

  const onProceed = async () => {
    if (captchaInput.toUpperCase() !== captchaText) {
      setError(true);
      toast.error("보안문자를 정확히 입력해주세요.");
      return;
    }
    setError(false);    const kopisId = qs.get("k");
    const day = qs.get("d"); // YYYY-MM-DD
    const time = qs.get("t"); // HH:mm
    if (!kopisId || !day || !time) {
      toast.error("잘못된 접근입니다.");
      return;
    }

    // 캡챠 성공 메시지를 부모 창으로 전달
    if (window.opener) {
      window.opener.postMessage({
        type: 'captcha-verified',
        payload: { kopisId, day, time }
      }, window.location.origin);
    }
    window.close(); // 팝업 창 닫기
  };

  return (
    <main className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-7 text-center shadow-xl w-96">
        <h3 className="font-semibold text-lg mb-2">인증예매</h3>
        <p className="text-gray-600 text-sm mb-4">부정예매 방지를 위해 보안문자를 입력해주세요.</p>
        
        {/* Captcha text styled like an image box */}
        <div className="bg-white rounded-md p-2 my-3">
          <p className="text-3xl font-bold tracking-widest select-none">{captchaText}</p>
        </div>

        <input
          type="text"
          placeholder="보안문자 입력"
          value={captchaInput.toUpperCase()}
          onChange={(e) => {
            setCaptchaInput(e.target.value);
            setError(false);
          }}
          maxLength={6}
          className={`w-full p-2 border rounded-md text-center ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">정확히 입력해주세요</p>}

        <button
          onClick={onProceed}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mt-4 transition-colors"
        >
          입력완료
        </button>
      </div>
    </main>
  );
}
