import "normalize.css";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import { BaseProviders } from "./providers/BaseProviders";

createRoot(document.getElementById("root")!).render(<BaseProviders />);
