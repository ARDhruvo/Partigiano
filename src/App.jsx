import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/home";
import Category from "./pages/category";
import Login from "./pages/Login";

import "./App.css";

function App() {
  return (
    <>
      <Home />
      <Category />
    </>
  );
}

export default App;
