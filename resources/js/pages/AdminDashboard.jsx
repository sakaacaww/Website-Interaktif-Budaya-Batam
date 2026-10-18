
import React, { useState } from "react";
import AdminTempatForm from "./AdminTempatForm";
import "../style.css";

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

const statistik = [
    { judul: "Total Tempat", jumlah: "12", icon: "📍", warna: "blue" },
    { judul: "Rumah Ibadah", jumlah: "4", icon: "🕌", warna: "green" },
    { judul: "Seni & Pertunjukan", jumlah: "3", icon: "🎭", warna: "purple" },
    { judul: "Museum", jumlah: "2", icon: "🏛️", warna: "orange" },
    { judul: "Bangunan Bersejarah", jumlah: "3", icon: "🏰", warna: "pink" },
];

export default function AdminDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [tempatList, setTempatList] = useState(dataTempat);

    // Tampilkan form tambah tempat
    if (showForm) {
        return (
            <AdminTempatForm
                onCancel={() => setShowForm(false)}
                onSaved={(tempatBaru) => {
                    setTempatList((prev) => [
                        {
                            id: tempatBaru.id,
                            nama: tempatBaru.nama_tempat,
                            kategori: tempatBaru.kategori,
                            lokasi: tempatBaru.lokasi,
                        },
                        ...prev,
                    ]);

                    setShowForm(false);
                }}
            />
        );
    }

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <div className="brand-icon">B</div>
                    <div>
                        <h2>Batam Culture</h2>
                        <p>Admin Panel</p>
                    </div>
                </div>

                <p className="sidebar-label">MENU UTAMA</p>

                <nav className="admin-nav">
                    <a href="/admin/dashboard" className="active">
                        <span>▦</span> Dashboard
                    </a>

                    <a href="/admin/tempat">
                        <span>⌖</span> Data Tempat
                    </a>

                    <a href="/admin/kategori">
                        <span>▤</span> Kategori
                    </a>
                </nav>

                <div className="sidebar-bottom">
                    <div className="admin-profile">
                        <div className="profile-avatar">
                            {window.adminUser?.name
                                ?.charAt(0)
                                .toUpperCase() || "A"}
                        </div>

                        <div>
                            <strong>
                                {window.adminUser?.name || "Admin"}
                            </strong>
                            <small>
                                {window.adminUser?.email || "Administrator"}
                            </small>
                        </div>
                    </div>

                    <form action="/admin/logout" method="POST">
                        <input
                            type="hidden"
                            name="_token"
                            value={
                                document.querySelector(
                                    'meta[name="csrf-token"]'
                                )?.content || ""
                            }
                        />

                        <button className="logout-button" type="submit">
                            ↪ Keluar
                        </button>
                    </form>
                </div>
            </aside>

            <main className="admin-main">
                <header className="dashboard-header">
                    <div>
                        <p className="breadcrumb">
                            Batam Culture / Admin
                        </p>
                        <h1>Dashboard</h1>
                        <p className="dashboard-description">
                            Kelola informasi seni dan budaya Kota Batam.
                        </p>
                    </div>

                    <div className="header-badge">
                        <span className="online-dot"></span>
                        Administrator
                    </div>
                </header>

                <section className="stats-grid">
                    {statistik.map((item) => (
                        <article
                            className="stat-card"
                            key={item.judul}
                        >
                            <div className={`stat-icon ${item.warna}`}>
                                {item.icon}
                            </div>

                            <div>
                                <p>{item.judul}</p>
                                <h2>{item.jumlah}</h2>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="content-card">
                    <div className="content-heading">
                        <div>
                            <h2>Data Tempat Budaya</h2>
                            <p>
                                Daftar informasi budaya yang dikelola.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="add-button"
                            onClick={() => setShowForm(true)}
                        >
                            + Tambah Tempat
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="culture-table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Nama Tempat</th>
                                    <th>Kategori</th>
                                    <th>Lokasi</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tempatList.map((tempat, index) => (
                                    <tr key={tempat.id}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <strong>{tempat.nama}</strong>
                                        </td>

                                        <td>
                                            <span className="category-badge">
                                                {tempat.kategori}
                                            </span>
                                        </td>

                                        <td>{tempat.lokasi}</td>

                                        <td>
                                            <div className="table-actions">
                                                <a
                                                    href={`/admin/tempat/${tempat.id}/edit`}
                                                    className="edit-action"
                                                >
                                                    Edit
                                                </a>

                                                <button
                                                    type="button"
                                                    className="detail-action"
                                                    onClick={() =>
                                                        alert(
                                                            `Tempat: ${tempat.nama}\nKategori: ${tempat.kategori}\nLokasi: ${tempat.lokasi}`
                                                        )
                                                    }
                                                >
                                                    Detail
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="table-footer">
                        Menampilkan {tempatList.length} data tempat budaya
                    </div>
                </section>

                <footer className="admin-footer">
                    © 2026 Batam Culture · Panel Administrasi
                </footer>
            </main>
        </div>
    );
}
