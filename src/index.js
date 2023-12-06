import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Version1 from "./components/Version1";
import Version2 from "./components/Version2";
import Version3 from "./components/Version3";
import Version4 from "./components/Version4";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/version1",
    element: <Version1 />,
  },
  {
    path: "/version2",
    element: <Version2 />,
  },
  {
    path: "/version3",
    element: <Version3 />,
  },
  {
    path: "/version4",
    element: <Version4 />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
