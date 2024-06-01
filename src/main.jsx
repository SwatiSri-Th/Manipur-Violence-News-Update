import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import YoutubePage from "./Component/YoutubePage.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NdtvPage from "./Component/NdtvPage.jsx";
import GooglePage from "./Component/GooglePage.jsx";
import TimesOfIndiaPage from "./Component/TimesOfIndiaPage.jsx";
import AdminPage from "./assets/Admin/AdminPage.jsx";
import AdminYoutubePage from "./assets/Admin/AdminYoutubePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="/youtube" element={<YoutubePage />} />
      <Route path="/ndtv" element={<NdtvPage />} />
      <Route path="/tofIndia" element={<TimesOfIndiaPage />} />
      <Route path="/google" element={<GooglePage />} />
      {/* <Route path="/admin" element={<AdminPage />} /> */}

      <Route path="/admin">
        <Route index element={<AdminPage />} />
        <Route path="/adminyoutube" element={<AdminYoutubePage />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
