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
    <main style={{ padding: 24, display: "grid", placeItems: "center" }}>
      <div style={{ width: 420, padding: 24, border: "1px solid #eee", borderRadius: 12 }}>
        <h2 style={{ marginBottom: 12 }}>보안문자 인증</h2>
        <p style={{ color: "#666", marginBottom: 12 }}>
          부정예매 방지를 위해 화면의 문자를 입력해주세요.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 2 }}>{captchaText}</div>
          <input
            value={captchaInput.toUpperCase()}
            onChange={(e) => {
              setCaptchaInput(e.target.value);
              setError(false);
            }}
            placeholder="보안문자 입력"
            maxLength={6}
            style={{ height: 44, flex: 1, border: `1px solid ${error ? '#ef4444' : '#ddd'}`, borderRadius: 8, padding: "0 12px" }}
          />
        </div>
        {error && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>정확히 입력해주세요</p>}
        <button
          onClick={onProceed}
          style={{ width: "100%", height: 46, marginTop: 16, borderRadius: 10, background: "#5955f3", color: "#fff", border: 0, fontWeight: 700 }}
        >
          계속
        </button>
      </div>
    </main>
  );
}
