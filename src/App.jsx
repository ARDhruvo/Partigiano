import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/home";
import Category from "./pages/category";
import Profile from "./pages/profile";
import AboutUs from "./pages/aboutUs";
import Login from "./pages/Login";
import Blog from "./pages/blog";
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
        <Route path="profile" element={<Profile/>}/>
        <Route path="aboutUs" element={<AboutUs/>}/>
        <Route path="blog/:id" element={<Blog/>}/>
      </Routes>
    </>
  );
}

export default App;
