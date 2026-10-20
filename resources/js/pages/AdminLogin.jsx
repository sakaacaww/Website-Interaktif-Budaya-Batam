
import { useState } from "react";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const token = document.querySelector(
                'meta[name="csrf-token"]'
            )?.content;

            const response = await fetch("/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": token || "",
                },
                credentials: "same-origin",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login gagal. Periksa akun kamu.");
                return;
            }

            window.location.href = data.redirect;
        } catch {
            setError("Tidak dapat terhubung ke server. Coba lagi.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="admin-login-page">
            <div className="admin-login-decoration decoration-one"></div>
            <div className="admin-login-decoration decoration-two"></div>

            <section className="admin-login-card">
                <div className="admin-login-brand">
                    <div className="admin-login-logo">BC</div>
                    <span>BATAM CULTURE</span>
                </div>

                <div className="admin-login-heading">
                    <span className="admin-login-label">ADMINISTRATOR</span>
                    <h1>Selamat Datang!</h1>
                    <p>
                        Silakan masuk untuk mengelola informasi
                        seni dan budaya Kota Batam.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="admin-login-field">
                        <label htmlFor="admin-email">
                            Email Administrator
                        </label>
                        <input
                            id="admin-email"
                            type="email"
                            autoComplete="username"
                            placeholder="Masukkan email admin"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="admin-login-field">
                        <label htmlFor="admin-password">Password</label>
                        <input
                            id="admin-password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p className="admin-login-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >
                        {loading ? "Memproses..." : "Masuk ke Dashboard"}
                        <span>→</span>
                    </button>
                </form>

                <div className="admin-login-divider">
                    <span></span>
                    <span>BATAM CULTURE</span>
                    <span></span>
                </div>

                <p className="admin-login-footer">
                    © {new Date().getFullYear()} Batam Culture
                    <br />
                    Sebaran dan Informasi Seni &amp; Budaya Kota Batam
                </p>
            </section>
        </main>
    );
}

export default AdminLogin;
