import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/home";
import Category from "./pages/category";
import "./App.css";
import { Route, Routes } from "react-router-dom";


function App() {
  return (

    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="category" element={<Category/>}/>
      </Routes>
    </>
  );
}

export default App;
