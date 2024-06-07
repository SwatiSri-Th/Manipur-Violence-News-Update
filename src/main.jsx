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
import Login from "./assets/Admin/Login.jsx";
import YoutubeDisplay from "./Component/YoutubeDisplay.jsx";
import AdminYoutubeDisplay from "./assets/Admin/AdminYoutubeDisplay.jsx";
import AdminNdtvPage from "./assets/Admin/AdminNdtvPage.jsx";
import AdminTimesOfIndiaPage from "./assets/Admin/AdminTimesOfIndiaPage.jsx";
import AdminGooglePage from "./assets/Admin/AdminGooglePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="/youtube" element={<YoutubePage />} />
      <Route path="/youtube/:id" element={<YoutubeDisplay />} />
      <Route path="/ndtv" element={<NdtvPage />} />
      <Route path="/tofIndia" element={<TimesOfIndiaPage />} />
      <Route path="/google" element={<GooglePage />} />
      {/* <Route path="/admin" element={<AdminPage />} /> */}

      <Route path="/admin">
        <Route index element={<Login />} />
        <Route path="dashboard" element={<AdminPage />} />
        <Route path="youtube" element={<AdminYoutubePage />} />
        <Route path="youtube/:id" element={<AdminYoutubeDisplay />} />
        <Route path="ndtv" element={<AdminNdtvPage />} />
        <Route path="tofIndia" element={<AdminTimesOfIndiaPage />} />
        <Route path="google" element={<AdminGooglePage />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
