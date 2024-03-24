import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage.jsx";
import ListPage from "./pages/ListPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Reservation from "./pages/Reservation.jsx";
import ReservationComplete from "./pages/ReservationComplete.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/detail", element: <DetailPage /> },
      { path: "/list", element: <ListPage /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/reservation", element: <Reservation /> },
      { path: "/reservationcomplete", element: <ReservationComplete /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
