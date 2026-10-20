
import React from "react";

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <div className="admin-brand-logo">BC</div>
                    <span>Batam Culture</span>
                </div>

                <div className="admin-profile">
                    <div className="admin-avatar">A</div>
                    <div>
                        <strong>Administrator</strong>
                        <p>Pengelola Website</p>
                    </div>
                </div>

                <nav className="admin-menu">
                    <a href="/admin/dashboard" className="active">
                        <span>▦</span> Dashboard
                    </a>
                    <a href="/admin/dashboard">
                        <span>📍</span> Data Budaya
                    </a>
                    <a href="/admin/dashboard">
                        <span>🖼️</span> Galeri Budaya
                    </a>
                    <a href="/admin/dashboard">
                        <span>📄</span> Artikel Budaya
                    </a>
                </nav>

                <a href="/" className="admin-logout">
                    ← Kembali ke Website
                </a>
            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <div>
                        <h1>Dashboard Admin</h1>
                        <p>Selamat datang di panel pengelolaan Batam Culture.</p>
                    </div>

                    <a href="/" className="admin-view-site">
                        Lihat Website ↗
                    </a>
                </header>

                <section className="admin-welcome">
                    <div>
                        <span className="admin-welcome-label">
                            PANEL ADMINISTRATOR
                        </span>
                        <h2>Jelajahi dan Kelola Budaya Batam</h2>
                        <p>
                            Kelola informasi seni, tradisi, sejarah,
                            dan kuliner khas Kota Batam.
                        </p>
                    </div>

                    <div className="admin-welcome-icon">🏝️</div>
                </section>

                <section className="admin-stat-grid">
                    <div className="admin-stat-card">
                        <div className="admin-stat-icon blue">📍</div>
                        <p>Total Tempat Budaya</p>
                        <h3>—</h3>
                        <span>Data belum dihubungkan</span>
                    </div>

                    <div className="admin-stat-card">
                        <div className="admin-stat-icon cyan">🖼️</div>
                        <p>Total Foto Budaya</p>
                        <h3>—</h3>
                        <span>Data belum dihubungkan</span>
                    </div>

                    <div className="admin-stat-card">
                        <div className="admin-stat-icon orange">📄</div>
                        <p>Total Artikel</p>
                        <h3>—</h3>
                        <span>Data belum dihubungkan</span>
                    </div>
                </section>

                <section className="admin-content-card">
                    <div className="admin-content-heading">
                        <div>
                            <h2>Pengelolaan Website</h2>
                            <p>Ringkasan fitur administrator.</p>
                        </div>
                        <span className="admin-status">Panel Admin</span>
                    </div>

                    <div className="admin-feature-grid">
                        <div className="admin-feature-item">
                            <span>📍</span>
                            <div>
                                <strong>Data Budaya</strong>
                                <p>Informasi lokasi dan kategori budaya.</p>
                            </div>
                        </div>

                        <div className="admin-feature-item">
                            <span>🖼️</span>
                            <div>
                                <strong>Galeri Budaya</strong>
                                <p>Dokumentasi foto budaya Batam.</p>
                            </div>
                        </div>

                        <div className="admin-feature-item">
                            <span>📄</span>
                            <div>
                                <strong>Artikel Budaya</strong>
                                <p>Informasi dan sejarah kebudayaan.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="admin-dashboard-footer">
                    © {new Date().getFullYear()} Batam Culture
                    <span>Administrator Panel</span>
                </footer>
            </main>
        </div>
    );
}

export default AdminDashboard;
