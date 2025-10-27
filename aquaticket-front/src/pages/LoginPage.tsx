import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginByEmail } from "@/api/auth";
import { toast } from "react-hot-toast";
import "@/css/login.css";


export default function LoginPage() {
    const nav = useNavigate();
    const [emailOpen, setEmailOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const canSubmit = email.trim() && pw.length >= 6 && !loading;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        try {
            setLoading(true);
            setErr(null);
            await loginByEmail({ email: email.trim(), password: pw });
            toast.success("로그인 되었습니다");
            nav("/performances", { replace: true });
        } catch {
            setErr("이메일 또는 비밀번호를 다시 확인해주세요.");
            toast.error("로그인 실패");
        } finally {
            setLoading(false);
        }
    };

    const handleKakaoLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
    };

    return (
        <main className="login-page">
            <section className="login-card">
                <h1 className="brand">
                    <span className="brand-aqua">Aqua</span>Ticket
                </h1>

                {/* ✅ 카카오 로그인 (공식 버튼 이미지 사용) */}
                <button
                    type="button"
                    className="kakao-btn"
                    onClick={handleKakaoLogin}
                    aria-label="카카오 로그인"
                >
                    <img
                        src="/kakao_login_large_wide.png"
                        alt="카카오 로그인"
                        decoding="async"
                        loading="eager"
                    />
                </button>

                {/* ✅ 이메일 로그인 토글 */}
                <button
                    type="button"
                    className={`email-toggle ${emailOpen ? "open" : ""}`}
                    onClick={() => setEmailOpen((v) => !v)}
                    aria-expanded={emailOpen}
                    aria-controls="email-login-panel"
                >
                    <span className="dot" />
                    <span className="label">이메일 아이디 로그인</span>
                    <span className={`chev ${emailOpen ? "open" : ""}`}>▾</span>
                </button>

                {/* ✅ 접히는 폼 */}
                <div
                    id="email-login-panel"
                    className={`email-panel ${emailOpen ? "open" : ""}`}
                >
                    <form className="email-form" onSubmit={onSubmit}>
                        <div className="form-row">
                            <label htmlFor="login-email">이메일</label>
                            <input
                                id="login-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <label htmlFor="login-pw">비밀번호</label>
                            <input
                                id="login-pw"
                                type="password"
                                placeholder="비밀번호 (6자 이상)"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                autoComplete="current-password"
                                minLength={6}
                                required
                            />
                        </div>

                        {err && <p className="error">{err}</p>}

                        <button className="submit-btn" type="submit" disabled={!canSubmit}>
                            {loading ? "로그인 중…" : "로그인"}
                        </button>

                        <div className="links">
                            <Link className="link-btn" to="/register">
                                회원가입
                            </Link>
                            <button
                                type="button"
                                className="link-btn"
                                onClick={() => toast("비밀번호 찾기 준비 중입니다")}
                            >
                                비밀번호 찾기
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
