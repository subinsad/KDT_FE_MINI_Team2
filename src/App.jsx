import { Outlet } from "react-router-dom";
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
      <Footer />
    </>
  );
}

export default App;
