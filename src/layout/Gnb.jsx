import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // 쿠키 사용을 위한 훅 추가
import Button from "../components/Common/Button";

export default function Gnb() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["secretKey"]); // 쿠키 사용 설정
  const isAuthenticated = Boolean(cookies.secretKey); // 쿠키로부터 인증 상태 확인

  const handleLogout = () => {
    removeCookie("secretKey"); // 쿠키에서 "secretKey" 삭제
    navigate("/signin");
  };

  return (
    <header className="py-5 sticky top-0 bg-white border-b-2 border-gray-200 border-solid z-50">
      <div className="max-w-mw mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-primary">
          FE-MINI-2
        </Link>
        <nav className="flex gap-4">
          <Link
            to="/list"
            className="text-base text-gray-600 hover:text-gray-900"
          >
            ListPage
          </Link>
          <Link
            to="/detail"
            className="text-base text-gray-600 hover:text-gray-900"
          >
            DetailPage
          </Link>
          {isAuthenticated ? (
            // 로그인 상태일 때 로그아웃 버튼 표시
            <Button onClick={handleLogout} text="로그아웃" />
          ) : (
            // 비로그인 상태일 때 로그인 페이지로의 링크 표시
            <Link to="/signin">
              <Button text="로그인" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
