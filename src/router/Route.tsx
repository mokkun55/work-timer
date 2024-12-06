import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../pages/Home/index";
import { Root } from "@/pages/Root";
import { useEffect } from "react";
import { initializeAuthListener } from "@/features/auth/store/useAuthStore";

export const Router = () => {
  useEffect(() => {
    initializeAuthListener();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
