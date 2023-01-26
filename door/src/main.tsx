import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Door from "./components/door";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routes/routes-config";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routesConfig}></RouterProvider>
  </React.StrictMode>
);
