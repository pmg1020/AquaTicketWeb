// src/pages/RegisterPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, type RegisterPayload } from "@/api/auth";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";
import "@/css/register.css";

export default function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState<RegisterPayload>({
    email: "",
    name: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "confirm") setConfirm(value);
    else setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const email = form.email.trim();
    const name = form.name.trim();
    const password = form.password;

    if (!email || !name || !password || !confirm) {
      return "모든 필드를 입력해주세요.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "이메일 형식이 올바르지 않습니다.";
    }
    if (password.length < 6) {
      return "비밀번호는 6자 이상이어야 합니다.";
    }
    if (password !== confirm) {
      return "비밀번호 확인이 일치하지 않습니다.";
    }
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        email: form.email.trim(),
        name: form.name.trim(),
        password: form.password,
      });

      toast.success("회원가입 완료! 로그인 해주세요.");
      nav("/login", { replace: true });
    } catch (error: unknown) {
      // 🔧 error 변수를 실제로 사용해서 ESLint(no-unused-vars) 해결
      let msg = "회원가입에 실패했습니다. 이미 가입된 이메일이거나 입력값을 확인해주세요.";
      if (isAxiosError(error)) {
        const serverMsg =
          (error.response?.data as { message?: string })?.message ??
          (typeof error.response?.data === "string" ? error.response?.data : undefined);
        if (serverMsg) msg = serverMsg;
      } else if (error instanceof Error) {
        // 네트워크/런타임 등
        msg = error.message || msg;
      }
      setErr(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <h1 className="brand">
          <span className="brand-aqua">Aqua</span>Ticket
        </h1>

        <h2 className="title">회원가입</h2>

        <form className="register-form" onSubmit={onSubmit} noValidate>
          <label>
            이메일
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              required
              inputMode="email"
            />
          </label>

          <label>
            이름
            <input
              type="text"
              name="name"
              placeholder="홍길동"
              value={form.name}
              onChange={onChange}
              autoComplete="name"
              required
            />
          </label>

          <label>
            비밀번호
            <input
              type="password"
              name="password"
              placeholder="비밀번호 (6자 이상)"
              value={form.password}
              onChange={onChange}
              autoComplete="new-password"
              required
              minLength={6}
            />
          </label>

          <label>
            비밀번호 확인
            <input
              type="password"
              name="confirm"
              placeholder="비밀번호 다시 입력"
              value={confirm}
              onChange={onChange}
              autoComplete="new-password"
              required
              minLength={6}
            />
          </label>

          {err && <p className="error">{err}</p>}

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "가입 중…" : "회원가입"}
          </button>
        </form>

        <div className="links">
          <Link className="link-btn" to="/login">
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </section>
    </main>
  );
}
