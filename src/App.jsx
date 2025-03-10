import { useState } from "react";

import Home from "./pages/home";
import Category from "./pages/category";
import Profile from "./pages/profile";
import AboutUs from "./pages/aboutUs";
import Login from "./pages/Login";
import Blog from "./pages/blog";
import CreatePost from "./pages/create";
import Admin from "./pages/admin";
import OTP from "./pages/Verify";
import VerificationSuccess from "./pages/verification-success";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminBlog from "./pages/adminBlog";
import { Toaster } from "react-hot-toast";


import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="category/:category" element={<Category />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="blog/:id" element={<Blog />} />
        <Route path="/admin/blog/:id" element={<AdminBlog />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="admin" element={<Admin />} />
        <Route path="verify" element={<OTP />} />
        <Route path="verification-success" element={<VerificationSuccess />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Routes>
      <Toaster position="bottom-right"/>
    </>
  );
}

export default App;
