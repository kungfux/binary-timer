import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import routes from "./routes.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={routes.base}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
