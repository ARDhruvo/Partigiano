import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/home";
import Category from "./pages/category";
import Login from "./pages/Login";
import "./App.css";
import { Route, Routes } from "react-router-dom";


function App() {
  return (

    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="category" element={<Category/>}/>
        <Route path="category/:id" element={<Category/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
