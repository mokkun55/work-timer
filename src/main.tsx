import "normalize.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router/Route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
