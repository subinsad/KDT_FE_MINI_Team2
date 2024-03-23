import { Outlet, useLocation } from "react-router-dom";
import * as React from "react";
import { Reset } from "styled-reset";
import Gnb from "./layout/Gnb";
import Footer from "./layout/Footer";

function App() {
  return (
    <>
      <Reset />
      <Gnb />
      <Outlet />
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
