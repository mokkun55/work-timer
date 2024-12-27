import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../pages/Home/index";
import { Root } from "@/pages/Root";
import { Dev } from "@/pages/Dev";
import { Setting } from "@/pages/Setting";
import { History } from "@/pages/History";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/dev" element={<Dev />} />
      </Routes>
    </BrowserRouter>
  );
};
