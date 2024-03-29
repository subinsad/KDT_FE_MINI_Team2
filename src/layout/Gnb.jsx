import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import { useUser } from "../store/user"; // Zustand 스토어 사용
import { useCookies } from "react-cookie";

export default function Gnb() {
  const navigate = useNavigate();
  const { loginUser, logout } = useUser(); // Zustand 스토어에서 상태와 함수 사용
  const isAuthenticated = Boolean(loginUser); // 로그인 상태 확인
  const [, , removeCookie] = useCookies(["secretKey"]); // useCookies 훅 사용

  const handleLogout = () => {
    logout(); // Zustand를 통해 로그아웃 처리
    removeCookie("secretKey", { path: "/" }); // 쿠키 삭제 시 path를 "/"로 설정
    navigate("/signin"); // 로그인 페이지로 리디렉션
  };

  return (
    <header className="py-5 sticky top-0 bg-white border-b-2 border-gray-200 border-solid z-50">
      <div className="max-w-mw mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-primary">
          FE-MINI-2
        </Link>
        <nav className="flex gap-4">
          {isAuthenticated ? (
            <Button onClick={handleLogout} text="로그아웃" />
          ) : (
            <Link to="/signin">
              <Button text="로그인" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
