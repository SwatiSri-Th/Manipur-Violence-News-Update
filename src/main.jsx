import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import YoutubePage from "./Component/YoutubePage.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import NdtvPage from "./Component/NdtvPage.jsx";
import GooglePage from "./Component/GooglePage.jsx";
import TwitterPage from "./Component/TwitterPage.jsx";
import TimesOfIndiaPage from "./Component/TimesOfIndiaPage.jsx";
import AdminPage from "./assets/Admin/AdminPage.jsx";
import AdminYoutubePage from "./assets/Admin/AdminYoutubePage.jsx";
import AdminTwitterPage from "./assets/Admin/AdminTwitterPage.jsx";
import Login from "./assets/Admin/Login.jsx";
import YoutubeDisplay from "./Component/YoutubeDisplay.jsx";
import AdminYoutubeDisplay from "./assets/Admin/AdminYoutubeDisplay.jsx";
import AdminNdtvPage from "./assets/Admin/AdminNdtvPage.jsx";
import AdminTimesOfIndiaPage from "./assets/Admin/AdminTimesOfIndiaPage.jsx";
import AdminGooglePage from "./assets/Admin/AdminGooglePage.jsx";
import CategoryPage from "./assets/Admin/CategoryPage.jsx";
import ModeratorList from "./assets/Admin/ModeratorList.jsx";
import ExpressPage from "./Component/ExpressPage.jsx";
import AdminExpressPage from "./assets/Admin/AdminExpressPage.jsx";
// import AdminRegister from "./assets/Admin/AdminRegister.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import AdminRegister from "./assets/Admin/AdminRegister.jsx";
import District from "./Component/District.jsx";
const login = window.localStorage.getItem("token");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="/youtube" element={<YoutubePage />} />
      <Route path="/youtube/:id" element={<YoutubeDisplay />} />
      <Route path="/district/:id" element={<District />} />
      <Route path="/ndtv" element={<NdtvPage />} />
      <Route path="/tofIndia" element={<TimesOfIndiaPage />} />
      <Route path="/google" element={<GooglePage />} />
      <Route path="/twitter" element={<TwitterPage />} />
      <Route path="/express" element={<ExpressPage />} />

      <Route path="/admin" element={<Login />} />

      {login ? (
        <Route path="/admin">
          <Route index element={<Login />} />
          <Route path="dashboard" element={<AdminPage />} />
          <Route path="youtube" element={<AdminYoutubePage />} />
          <Route path="youtube/:id" element={<AdminYoutubeDisplay />} />
          <Route path="ndtv" element={<AdminNdtvPage />} />
          <Route path="express" element={<AdminExpressPage />} />
          <Route path="tofIndia" element={<AdminTimesOfIndiaPage />} />
          <Route path="google" element={<AdminGooglePage />} />
          <Route path="twitter" element={<AdminTwitterPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="register" element={<AdminRegister />} />
          <Route path="moderator" element={<ModeratorList />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/admin" />} />
      )}
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MantineProvider>
    <ToastContainer autoClose={1000} />
    <RouterProvider router={router} />
  </MantineProvider>
  // </React.StrictMode>
);
