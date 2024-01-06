import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import BorderRadiusPreviewer from "./BorderRadiusPreviewer";
import Bin2Dec from "./Bin2Dec";
import Calculator from "./Calculator";
import CountdownTimer from "./CountdownTimer";
import JSON2CSV from "./JSON2CSV";
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
