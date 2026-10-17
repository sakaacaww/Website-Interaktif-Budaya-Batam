
import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import "./style.css";

function App() {
    const path = window.location.pathname;

    if (path === "/admin/login") {
        return <AdminLogin />;
    }

    if (path === "/admin/dashboard") {
        return <AdminDashboard />;
    }

    return <Home />;
}

createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
