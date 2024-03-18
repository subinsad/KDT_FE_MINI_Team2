
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import * as React from 'react';
import { Reset } from 'styled-reset';

function App() {
  return (
    <>
    <Reset />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
