
import React from "react";
import { createRoot } from "react-dom/client";

import Home from "./pages/Home.jsx";
import Peta from "./pages/Peta.jsx";
import Tentang from "./pages/Tentang.jsx";
import DetailBudaya from "./pages/DetailBudaya.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import DataTempat from "./pages/DataTempat.jsx";
import Kategori from "./pages/Kategori.jsx";

import "./style.css";

function App() {
    const halaman =
        window.location.pathname.replace(/\/+$/, "") || "/";

    const params = new URLSearchParams(window.location.search);

    if (halaman === "/admin/login") {
        return <AdminLogin />;
    }

    if (halaman === "/admin/dashboard") {
        return <AdminDashboard />;
    }

    if (halaman === "/admin/tempat") {
        return <DataTempat />;
    }

    if (halaman === "/peta" && params.has("detail")) {
        return <DetailBudaya />;
    }

    if (halaman === "/peta") {
        return <Peta />;
    }

    if (halaman === "/tentang") {
        return <Tentang />;
    }

    if (halaman === "/admin/kategori") {
    return <Kategori />;
}
    return <Home />;
}

const rootElement = document.getElementById("app");

if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
