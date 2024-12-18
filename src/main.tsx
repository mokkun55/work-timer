import "normalize.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router/Route";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(
  // TODO ここにプロバイダーもたせる or Provider.tsxみたいな所に集約
  <StrictMode>
    <MantineProvider>
      <Router />
    </MantineProvider>
  </StrictMode>
);
