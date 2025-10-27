// src/pages/CaptchaPopup.tsx
import "altcha";
import "altcha/dist/altcha.css";
import { useEffect, useRef } from "react";

export default function CaptchaPopup() {
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleVerified = (ev: CustomEvent<{ payload: { kopisId: string, day: string, time: string } }>) => {
      const { payload } = ev.detail;
      // Send payload to parent window
      if (window.opener) {
        window.opener.postMessage({ type: "captcha-verified", payload }, window.location.origin);
        window.close();
      }
    };

    const widget = widgetRef.current;
    widget?.addEventListener("verified", handleVerified);

    return () => {
      widget?.removeEventListener("verified", handleVerified);
    };
  }, []);

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh', background: '#f0f0f0' }}>
      <div style={{ padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2>보안 문자 인증</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>로봇이 아님을 증명해주세요.</p>
        <altcha-widget
          ref={widgetRef}
          challengeurl="https://eu.altcha.org/api/v1/challenge"
        ></altcha-widget>
      </div>
    </div>
  );
}
