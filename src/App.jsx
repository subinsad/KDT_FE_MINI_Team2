import { Outlet, useLocation } from "react-router-dom";
import * as React from "react";
import { Reset } from "styled-reset";
import Gnb from "./layout/Gnb";
import Footer from "./layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useUser } from "./store/user";
// import setupTestAuthInterceptor from "./components/Axios/interceptor";

// setupTestAuthInterceptor();

function App() {
  const [cookies] = useCookies(["secretKey", "memberId"]); // 'secretKey'와 'memberId'는 쿠키에 저장된 로그인 정보의 키입니다.

  const { setLoginUser, setMemberId } = useUser(); // zustand 저장소에서 로그인 상태를 설정하는 함수와 멤버 아이디를 설정하는 함수를 가져옵니다.

  // 컴포넌트 마운트 시 쿠키에서 로그인 정보를 읽어와 zustand 상태를 업데이트합니다.
  useEffect(() => {
    const user = cookies["secretKey"];
    const memberId = cookies["memberId"];

    if (user) {
      setLoginUser(user); // 쿠키에 저장된 사용자 정보로 로그인 상태를 업데이트합니다.
      if (memberId) {
        setMemberId(memberId);
      }
    }
  }, [cookies, setLoginUser, setMemberId]);

  return (
    <>
      <Reset />
      <Gnb />
      <Outlet />
      <ScrollToTop />
      <CustomFooter />
    </>
  );
}

//푸터제거
function CustomFooter() {
  const location = useLocation();

  if (location.pathname === "/signin" || location.pathname === "/signup") {
    return null;
  }
  return <Footer />;
}

export default App;
