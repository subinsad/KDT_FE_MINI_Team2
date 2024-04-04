import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Common/Button.jsx";
import Title from "../components/Common/Title";
import Input from "../components/Form/Input";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useUser } from "../store/user.js";
import Spinner from "../components/Common/Spinner.jsx";

export default function SignInPage() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [cookies, setCookie] = useCookies(["secretKey"]);
  const { setLoginUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 로그인 프로세스 시작, 스피너 활성화
    try {
      const response = await axios.post(
        "/public-api/v1/member/login",
        loginForm
      );
      const { secretKey } = response.data.data;
      setCookie("secretKey", secretKey, { path: "/" });
      setLoginUser({ secretKey });
      navigate("/");
    } catch (error) {
      setMessage("아이디 또는 비밀번호가 틀렸습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[520px] mx-auto mt-28">
      <div className="flex flex-col gap-16">
        <Title tag="h2" className="w-full" text="이메일로 시작하기" />

        <form onSubmit={loginHandler} className="flex flex-col w-full">
          <Input
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            type="email"
            text="이메일"
            name="email"
            placeholder="이메일 입력"
            className="mb-6"
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
            required
          />
          {message && <p className="text-red-500 mt-3">{message}</p>}
          <div className="flex flex-col items-center w-full ">
            <Button
              className="bg-gray-900 text-white mt-16 mb-4 w-full"
              text={isLoading ? <Spinner /> : "로그인"}
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
        </form>
      </div>
    </div>
  );
}
