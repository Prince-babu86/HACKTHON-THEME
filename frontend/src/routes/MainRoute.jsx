import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import Home from "../pages/Home";
import LoginPage from "../pages/auth/Login";
import SignUpPage from "../pages/auth/Signup";
import Settings from "../pages/Settings";
import NotificationsPage from "../pages/Notifications";
import ContactPage from "../pages/Contacts";
import AiChat from "../pages/AiChat";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/chats" element={< AiChat/>} />
      </Routes>
    </>
  );
};

export default MainRoute;
