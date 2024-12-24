import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { AuthProvider } from "./AuthProvider";
import { Router } from "@/router/Route";
import { Toaster } from "react-hot-toast";

export const BaseProviders = (): React.ReactNode => {
  return (
    <StrictMode>
      <MantineProvider>
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Router />
        </AuthProvider>
      </MantineProvider>
    </StrictMode>
  );
};
