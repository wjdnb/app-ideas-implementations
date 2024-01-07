import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import BorderRadiusPreviewer from "./pages/BorderRadiusPreviewer";
import Bin2Dec from "./pages/Bin2Dec";
import Calculator from "./pages/Calculator";
import CountdownTimer from "./pages/CountdownTimer";
import JSON2CSV from "./pages/JSON2CSV";
import DynamicCSSVar from "./pages/DynamicCSSVar";
import "normalize.css";
import "./tailwind.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "border-radius-previewer", element: <BorderRadiusPreviewer /> },
      { path: "bin-to-dec", element: <Bin2Dec /> },
      { path: "calculator", element: <Calculator /> },
      { path: "countdown-timer", element: <CountdownTimer /> },
      { path: "json-to-csv", element: <JSON2CSV /> },
      { path: "dynamic-css-var", element: <DynamicCSSVar /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
