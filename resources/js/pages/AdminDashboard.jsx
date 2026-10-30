
import React, { useEffect, useState } from "react";
import "../style.css";

export default function AdminDashboard() {
    const [dataTempat, setDataTempat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Mengambil data dari database melalui Laravel API
    useEffect(() => {
        const ambilData = async () => {
            try {
                const response = await fetch("/api/budayas", {
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Gagal mengambil data tempat budaya");
                }

                const hasil = await response.json();

                setDataTempat(hasil.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        ambilData();
    }, []);

    // Menghitung jumlah berdasarkan kategori
    const statistik = [
        { nama: "Total Tempat", jumlah: dataTempat.length, icon: "📍" },
        {
            nama: "Rumah Ibadah",
            jumlah: dataTempat.filter(
                (item) => item.kategori === "Rumah Ibadah"
            ).length,
            icon: "🕌",
        },
        {
            nama: "Seni & Pertunjukan",
            jumlah: dataTempat.filter(
                (item) => item.kategori === "Seni & Pertunjukan"
            ).length,
            icon: "🎭",
        },
        {
            nama: "Museum",
            jumlah: dataTempat.filter(
                (item) => item.kategori === "Museum"
            ).length,
            icon: "🏛️",
        },
        {
            nama: "Bangunan Bersejarah",
            jumlah: dataTempat.filter(
                (item) => item.kategori === "Bangunan Bersejarah"
            ).length,
            icon: "🏠",
        },
    ];

    return (
        <div className="bc-admin-page">
            <h1 className="bc-admin-title">Dashboard Admin</h1>

            <div className="bc-admin-layout">

                {/* SIDEBAR */}
                <aside className="bc-admin-sidebar">
                    <div className="bc-admin-brand">
                        Batam
                        <br />
                        Culture
                    </div>

                    <nav className="bc-admin-nav">
                        <a href="/admin/dashboard" className="aktif">
                            <span className="bc-nav-icon">⌂</span>
                            <span>Dashboard</span>
                        </a>

                        <a href="/admin/tempat">
                            <span className="bc-nav-icon">◫</span>
                            <span>Data Tempat</span>
                        </a>

                        <a href="/admin/kategori">
                            <span className="bc-nav-icon">▤</span>
                            <span>Kategori</span>
                        </a>
                    </nav>

                    <form
                        className="bc-admin-logout-form"
                        action="/admin/logout"
                        method="POST"
                    >
                        <input
                            type="hidden"
                            name="_token"
                            value={
                                document.querySelector(
                                    'meta[name="csrf-token"]'
                                )?.content || ""
                            }
                        />

                        <button type="submit" className="bc-admin-logout">
                            Logout
                        </button>
                    </form>
                </aside>

                {/* ISI DASHBOARD */}
                <main className="bc-admin-content">
                    <h2 className="bc-content-heading">Dashboard</h2>

                    {/* STATISTIK */}
                    <section className="bc-statistik">
                        {statistik.map((item) => (
                            <div className="bc-stat-card" key={item.nama}>
                                <div className="bc-stat-icon">
                                    {item.icon}
                                </div>

                                <div className="bc-stat-name">
                                    {item.nama}
                                </div>

                                <div className="bc-stat-number">
                                    {item.jumlah}
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* TABEL DATA TERBARU */}
                    <section className="bc-data-section">
                        <h3>Data Terbaru</h3>

                        {loading && <p>Memuat data tempat budaya...</p>}

                        {error && (
                            <p style={{ color: "red" }}>{error}</p>
                        )}

                        {!loading && !error && (
                            <div className="bc-table-wrapper">
                                <table className="bc-data-table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama Tempat</th>
                                            <th>Kategori</th>
                                            <th>Lokasi</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {dataTempat.map((tempat, index) => (
                                            <tr key={tempat.id}>
                                                <td>{index + 1}</td>
                                                <td>{tempat.nama_tempat}</td>
                                                <td>{tempat.kategori}</td>
                                                <td>
                                                    {tempat.latitude}, {tempat.longitude}
                                                </td>
                                                <td>
                                                    <div className="bc-table-actions">
                                                        <button
                                                            type="button"
                                                            className="bc-edit-btn"
                                                            title="Edit tempat"
                                                            onClick={() =>
                                                                window.location.href =
                                                                    `/admin/tempat?edit=${tempat.id}`
                                                            }
                                                        >
                                                            ✎
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="bc-delete-btn"
                                                            title="Hapus tempat"
                                                            onClick={() =>
                                                                alert(
                                                                    "Fitur hapus akan dihubungkan setelah integrasi halaman Data Tempat."
                                                                )
                                                            }
                                                        >
                                                            ♜
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                        {dataTempat.length === 0 && (
                                            <tr>
                                                <td colSpan="5">
                                                    Belum ada data tempat budaya.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}
