import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DesignSystemPage } from "./routes/design-system";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DesignSystemPage />
  </StrictMode>
);
