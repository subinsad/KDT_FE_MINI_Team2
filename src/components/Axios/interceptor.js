import { useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUser } from '../../store/user';
import { useNavigate } from 'react-router-dom';

const AuthInterceptor = () => {
  const [, , removeCookie] = useCookies(["secretKey", "memberId"]); // useCookies 훅
  const navigate = useNavigate();
  const { logout } = useUser();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && error.response.status === 401) {
          try {
            logout(); // 로그아웃 처리
            removeCookie("secretKey", { path: "/" }); // secretKey 쿠키 삭제
            removeCookie("memberId", { path: "/" }); // memberId 쿠키 삭제
            navigate("/signin"); // 로그인 페이지로 리디렉션
          } catch (err) {
            console.error(err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // 정리: 컴포넌트가 언마운트될 때 인터셉터를 제거합니다.
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, logout, removeCookie]);

  // 이 컴포넌트는 아무것도 렌더링하지 않으므로 null을 반환합니다.
  return null;
};

export default AuthInterceptor;



