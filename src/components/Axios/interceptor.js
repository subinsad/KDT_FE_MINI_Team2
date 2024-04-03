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

