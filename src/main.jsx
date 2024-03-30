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
import { CookiesProvider } from "react-cookie";
import MyInfo from "./pages/MyInfo.jsx";

import "./index.css";

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
      {
        path: "/reservation/:accomodation_id/:accomodation_name/:room_info",
        element: <Reservation />,
      },
      { path: "/reservationcomplete", element: <ReservationComplete /> },
      { path: "/myinfo", element: <MyInfo /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);
