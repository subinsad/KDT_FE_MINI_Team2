// import axios from 'axios';
// import { Cookies } from 'react-cookie';

// const setupTestAuthInterceptor = () => {
//   const cookies = new Cookies();

//   axios.interceptors.response.use(
//     async response => {
//       // 정상 응답을 가로채고 강제로 401 에러를 생성합니다.
//       return Promise.reject({
//         config: response.config,
//         response: {
//           ...response,
//           status: 401,
//           statusText: 'Unauthorized'
//         }
//       });
//     },
//     async error => {
//       // 여기서는 401 에러를 처리합니다.
//       if (error.response && error.response.status === 401) {
//         try {
//           const currentToken = cookies.get("secretKey");
//           // 토큰 갱신 API 호출
//           const response = await axios.post('/api/v1/member/token', {}, {
//             headers: {
//               Authorization: `Bearer ${currentToken}`,
//             },
//           });
//           // 새로운 토큰으로 쿠키 및 Authorization 헤더 업데이트
//           const { secretKey } = response.data.data;
//           console.log('Setting secretKey in cookie:', secretKey);
//           cookies.set("secretKey", secretKey, { path: "/" });
//           axios.defaults.headers.common['Authorization'] = `Bearer ${secretKey}`;

//           // 원래 요청을 새 토큰으로 재시도
//           return axios(error.config);
//         } catch (refreshError) {
//           // 토큰 갱신 실패 처리
//           return Promise.reject(refreshError);
//         }
//       }
//       // 다른 종류의 에러 처리
//       return Promise.reject(error);
//     }
//   );
// };

// export default setupTestAuthInterceptor;
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



