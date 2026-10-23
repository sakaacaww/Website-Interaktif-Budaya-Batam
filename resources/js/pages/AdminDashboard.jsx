
import React from "react";
import "../style.css";

export default function AdminDashboard() {
    const statistik = [
        { nama: "Total Tempat", jumlah: 2, icon: "📍" },
        { nama: "Rumah Ibadah", jumlah: 1, icon: "🕌" },
        { nama: "Seni & Pertunjukan", jumlah: 1, icon: "🎭" },
        { nama: "Museum", jumlah: 0, icon: "🏛️" },
        { nama: "Bangunan Bersejarah", jumlah: 0, icon: "🏠" },
    ];

    const dataTempat = [
        {
            id: 1,
            nama: "Masjid Tua",
            kategori: "Rumah Ibadah",
            lokasi: "Kampung Tua",
        },
        {
            id: 2,
            nama: "Sanggar Tari",
            kategori: "Seni & Pertunjukan",
            lokasi: "Batam Center",
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
                                            <td>{tempat.nama}</td>
                                            <td>{tempat.kategori}</td>
                                            <td>{tempat.lokasi}</td>
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
                                                                "Hubungkan tombol ini dengan fitur hapus pada halaman Data Tempat."
                                                            )
                                                        }
                                                    >
                                                        ♜
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Baris kosong seperti wireframe */}
                                    {Array.from({
                                        length: Math.max(
                                            0,
                                            5 - dataTempat.length
                                        ),
                                    }).map((_, index) => (
                                        <tr key={`kosong-${index}`}>
                                            <td>&nbsp;</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
