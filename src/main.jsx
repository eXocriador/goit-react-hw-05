import React from "react";
import ReactDOM from "react-dom/client"; // Ensure React 18+ is installed
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "modern-normalize/modern-normalize.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
