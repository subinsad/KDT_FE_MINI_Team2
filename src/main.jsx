import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Main from "./pages/MainPage";
import DetailPage from "./pages/DetailPage.jsx";
import ListPage from "./pages/ListPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Reservation from "./pages/Reservation.jsx";
import ReservationComplete from "./pages/ReservationComplete.jsx";
import { CookiesProvider, useCookies } from "react-cookie";
import MyInfo from "./pages/MyInfo.jsx";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import Notice from "./pages/Notice";
import NoticeDetail from "./pages/NoticeDetail";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [cookies] = useCookies(["secretKey"]); // 'secretKey'는 쿠키에 저장된 로그인 정보의 키입니다.

  return cookies.secretKey ? <Outlet /> : <Navigate to="/signin" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: "/detail/:id", element: <DetailPage /> },
      { path: "/list/:type?/:location?", element: <ListPage /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/reservation/:id/:roomid", element: <Reservation /> },
      {
        path: "/reservationcomplete/:id/:roomid",
        element: <ReservationComplete />,
      },
      {
        path: "/myinfo",
        element: <ProtectedRoute />,
        children: [
          { path: "", element: <MyInfo /> }, // MyInfo 페이지를 ProtectedRoute의 자식으로 설정
        ],
      },
      { path: "/notice", element: <Notice /> },
      { path: "/notice/:id", element: <NoticeDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </CookiesProvider>
  </React.StrictMode>
);
