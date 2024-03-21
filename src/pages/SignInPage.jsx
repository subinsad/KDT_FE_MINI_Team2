import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Common/Button.jsx";
import TItle from "../components/Common/Title";
import Input from "../components/Form/Input";
import { useState } from "react";

export default function SignInPage() {
  /// 로그인폼에 상태를 객체로 관리
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    error: "",
  });
  const navigate = useNavigate;

  /// 로그인함수
  const login = async (email, password) => {
    const result = await axios.post("", { email, password });
    return result.data;
  };

  /// handleSubmit
  const handleSubmit = async () => {
    try {
      const result = await login(loginForm.email, loginForm.password);
      if (result && result.accessToken) {
        console.log(result);
        // 보안상의 이유로, 액세스 토큰을 로컬 스토리지 대신 쿠키 등에 저장하는 방법을 고려하세요.
        localStorage.setItem("accessToken", result.accessToken);
        navigate("/");
      } else {
        // 로그인 실패 처리
        console.error("로그인 실패: 토큰을 받지 못했습니다.");
      }
    } catch (error) {
      // 에러 핸들링
      console.error("로그인 에러:", error);
    }
  };

  return (
    <div className="w-[520px] mx-auto pt-28">
      <div className="flex flex-col gap-16">
        <TItle tag="h2" className="w-full" text="이메일로 시작하기" />

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <Input
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            type="email"
            text="이메일"
            name="email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            placeholder="이메일 입력"
            className="mb-6 "
            required
          />
          <Input
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            type="password"
            text="비밀번호"
            name="password"
            placeholder="비밀번호 입력"
            minLength="6"
            required
          />
        </form>

        <div className="flex flex-col items-center w-full ">
          <Button
            className="bg-gray-900 text-white mb-4 w-full"
            text="로그인"
          />
          <div className="flex items-center gap-2 font-light">
            <p>계정이 없으신가요?</p>

            <Link to="/signup">
              <p className="underline text-lg font-semibold">
                이메일로 회원가입
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
