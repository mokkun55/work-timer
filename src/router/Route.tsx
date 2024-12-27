import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../pages/Home/index";
import { Root } from "@/pages/Root";
import { Dev } from "@/pages/Dev";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dev" element={<Dev />} />
      </Routes>
    </BrowserRouter>
  );
};
