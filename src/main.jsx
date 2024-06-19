import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { queryClient } from "./QueryClient/index.js";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
