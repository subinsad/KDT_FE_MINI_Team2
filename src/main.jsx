import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Main from './pages/MainPage';
import DetailPage from './pages/DetailPage.jsx';
import ListPage from './pages/ListPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import Reservation from './pages/Reservation.jsx';
import ReservationComplete from './pages/ReservationComplete.jsx';
import { CookiesProvider, useCookies } from 'react-cookie';
import MyInfo from './pages/MyInfo.jsx';
import { ChakraProvider } from '@chakra-ui/react';

import './index.css';
import Notice from './pages/Notice';
import NoticeDetail from './pages/NoticeDetail';

import { Navigate, Outlet } from 'react-router-dom';
import Register from './pages/Register';
import NoticeEdit from './pages/NoticeEdit.jsx';
import Cart from './pages/Cart.jsx';
import AdminPage from './pages/AdminPage';
import RoomRegister from './pages/RoomRegister';

const ProtectedRoute = () => {
    const [cookies] = useCookies(['secretKey', 'memberId']);

    // 쿠키에서 memberId를 가져옵니다.
    const { memberId } = cookies;

    // secretKey와 memberId가 모두 존재하는 경우에만 Outlet을 반환하여 보호된 경로로 이동합니다.
    return cookies.secretKey && memberId ? (
        <Outlet />
    ) : (
        <Navigate to="/signin" />
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Main /> },
            {
                path: '/detail/:id/:startDate?/:endDate?/:personal?',
                element: <DetailPage />,
            },
            {
                path: '/list/:startDate?/:endDate?/:location/:type/:personal?/:page',
                element: <ListPage />,
            },
            { path: '/signin', element: <SignInPage /> },
            { path: '/signup', element: <SignUpPage /> },
            {
                path: '/reservation/:id/:roomid/:startDate?/:endDate?/:personal',
                element: <Reservation />,
            },
            {
                path: '/reservationcomplete/:id/:roomid/:startDate?/:endDate?/:personal',
                element: <ReservationComplete />,
            },
            {
                path: '/myinfo',
                element: <ProtectedRoute />,
                children: [
                    { path: '/myinfo/:memberId', element: <MyInfo /> }, // MyInfo 페이지를 ProtectedRoute의 자식으로 설정
                ],
            },
            { path: '/notice', element: <Notice /> },
            { path: '/notice/:id', element: <NoticeDetail /> },
            { path: '/register', element: <Register /> },
            { path: '/edit', element: <NoticeEdit /> },
            { path: '/cart', element: <Cart /> },
            { path: 'admin/roomregister/:id', element: <RoomRegister /> },
            { path: '/admin', element: <AdminPage /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CookiesProvider>
            <ChakraProvider>
                <RouterProvider router={router} />
            </ChakraProvider>
        </CookiesProvider>
    </React.StrictMode>
);
