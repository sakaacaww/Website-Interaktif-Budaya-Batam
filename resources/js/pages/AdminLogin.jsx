
import React, { useState } from "react";
import "../style.css";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "same-origin",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setError(data.message || "Login gagal. Periksa email dan password.");
                return;
            }

            window.location.href =
                data.redirect || "/admin/dashboard";
        } catch (err) {
            setError("Tidak dapat terhubung ke server Laravel.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <h1 className="admin-login-title">
                    Batam Culture
                </h1>

                <p className="admin-login-subtitle">
                    Login Administrator
                </p>

                <form
                    className="admin-login-form"
                    onSubmit={handleLogin}
                >
                    <label htmlFor="email">
                        Email Admin
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Masukkan email admin"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Masukkan password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <p role="alert" style={{ color: "#dc2626" }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >
                        {loading ? "Memproses..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
