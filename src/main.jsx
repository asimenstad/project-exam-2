import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ProvideAuth } from "./hooks/useAuth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProvideAuth>
          <App />
        </ProvideAuth>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
