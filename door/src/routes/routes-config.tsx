import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Door from "../components/door";
import App from "../App";
import ProtectedRoute from "./protected-router";
const routesConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/door",
    element: (
      <ProtectedRoute>
        <Door />
      </ProtectedRoute>
    ),
  },
]);
export default routesConfig;
