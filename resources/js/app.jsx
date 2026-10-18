
import React from "react";
import { createRoot } from "react-dom/client";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Home from "./pages/Home.jsx";
import Peta from "./pages/Peta.jsx";
import Tentang from "./pages/Tentang.jsx";
import DetailBudaya from "./pages/DetailBudaya.jsx";

import "./style.css";

const halaman = window.location.pathname;
const params = new URLSearchParams(window.location.search);

createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        {halaman === "/peta" && params.has("detail") ? (
            <DetailBudaya />
        ) : halaman === "/peta" ? (
            <Peta />
        ) : halaman === "/tentang" ? (
            <Tentang />
        ) : (
            <Home />
        )}
    </React.StrictMode>
);
