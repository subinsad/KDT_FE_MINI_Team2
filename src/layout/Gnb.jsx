import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
export default function Gnb() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("secretKey");

  const handleLogout = () => {
    localStorage.removeItem("secretKey");
    navigate("/signin");
  };
  return (
    <header className="py-5 sticky top-0 bg-white border-b-2 border-gray-200 border-solid z-50">
      <div className="flex items-center justify-between gap-9 max-w-mw mx-auto">
        <Link to="/">
          <h1 className="text-primary text-3xl font-bold">FE-MINI-2</h1>
        </Link>
        <nav>
          <Link to="/list">ListPage</Link>
          <Link to="/detail">DetailPage</Link>
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
