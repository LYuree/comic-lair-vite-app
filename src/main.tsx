import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import customTheme from "./utils/theme.ts";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={customTheme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </BrowserRouter>
);
