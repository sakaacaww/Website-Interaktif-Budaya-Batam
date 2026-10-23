
import React, { useState } from "react";
import "../style.css";

const FORM_AWAL = {
    nama: "",
    deskripsi: "",
};

const KATEGORI_AWAL = [
    {
        id: 1,
        nama: "Rumah Ibadah",
        deskripsi: "Tempat ibadah berbagai agama di Batam",
    },
    {
        id: 2,
        nama: "Seni & Pertunjukan",
        deskripsi: "Seni budaya dan pertunjukan tradisional",
    },
    {
        id: 3,
        nama: "Museum",
        deskripsi: "Tempat penyimpanan koleksi budaya",
    },
    {
        id: 4,
        nama: "Bangunan Bersejarah",
        deskripsi: "Bangunan bersejarah dan cagar budaya",
    },
    {
        id: 5,
        nama: "Kuliner Tradisional",
        deskripsi: "Makanan khas dan kuliner daerah Batam",
    },
    {
        id: 6,
        nama: "Kerajinan",
        deskripsi: "Kerajinan tangan dan karya lokal",
    },
];

function Icon({ name, className = "" }) {
    const icons = {
        search: (
            <>
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 5 5" />
            </>
        ),
        edit: (
            <>
                <path d="m15 5 4 4" />
                <path d="M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15z" />
            </>
        ),
        delete: (
            <>
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="m19 6-1 14H6L5 6" />
                <path d="M10 10v6M14 10v6" />
            </>
        ),
        close: <path d="m18 6-12 12M6 6l12 12" />,
    };

    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {icons[name]}
        </svg>
    );
}

export default function Kategori() {
    const [data, setData] = useState(KATEGORI_AWAL);
    const [cari, setCari] = useState("");
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ ...FORM_AWAL });

    const dataFilter = data.filter((item) =>
        `${item.nama} ${item.deskripsi}`
            .toLowerCase()
            .includes(cari.toLowerCase())
    );

    const csrfToken =
        document.querySelector('meta[name="csrf-token"]')?.content || "";

    function bukaTambah() {
        setEditId(null);
        setForm({ ...FORM_AWAL });
        setModal(true);
    }

    function bukaEdit(item) {
        setEditId(item.id);
        setForm({
            nama: item.nama,
            deskripsi: item.deskripsi,
        });
        setModal(true);
    }

    function tutupForm() {
        setModal(false);
        setEditId(null);
        setForm({ ...FORM_AWAL });
    }

    function simpanData(e) {
        e.preventDefault();

        const nama = form.nama.trim();
        const deskripsi = form.deskripsi.trim();

        if (!nama) {
            alert("Nama kategori wajib diisi.");
            return;
        }

        const duplikat = data.some(
            (item) =>
                item.nama.toLowerCase() === nama.toLowerCase() &&
                item.id !== editId
        );

        if (duplikat) {
            alert("Nama kategori sudah tersedia.");
            return;
        }

        if (editId !== null) {
            setData((lama) =>
                lama.map((item) =>
                    item.id === editId
                        ? { ...item, nama, deskripsi }
                        : item
                )
            );
        } else {
            setData((lama) => [
                ...lama,
                {
                    id: Date.now(),
                    nama,
                    deskripsi,
                },
            ]);
        }

        tutupForm();
    }

    function hapusData(id) {
        const kategori = data.find((item) => item.id === id);

        if (
            kategori &&
            window.confirm(
                `Yakin ingin menghapus kategori "${kategori.nama}"?`
            )
        ) {
            setData((lama) =>
                lama.filter((item) => item.id !== id)
            );

            if (editId === id) {
                tutupForm();
            }
        }
    }

    function hapusDariForm() {
        if (editId === null) {
            setForm({ ...FORM_AWAL });
            return;
        }

        hapusData(editId);
        tutupForm();
    }

    return (
        <div className="bc-admin-page kt-admin-page">
            {/* JUDUL HALAMAN */}
            <h1 className="bc-admin-title">
                Kelola Data Kategori
            </h1>

            <div className="bc-admin-layout">
                {/* SIDEBAR SAMA DENGAN DASHBOARD */}
                <aside className="bc-admin-sidebar">
                    <div className="bc-admin-brand">
                        Batam
                        <br />
                        Culture
                    </div>

                    <nav className="bc-admin-nav">
                        <a href="/admin/dashboard">
                            <span className="bc-nav-icon">⌂</span>
                            <span>Dashboard</span>
                        </a>

                        <a href="/admin/tempat">
                            <span className="bc-nav-icon">◫</span>
                            <span>Data Tempat</span>
                        </a>

                        <a
                            href="/admin/kategori"
                            className="aktif"
                            aria-current="page"
                        >
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
                            value={csrfToken}
                        />

                        <button
                            type="submit"
                            className="bc-admin-logout"
                        >
                            Logout
                        </button>
                    </form>
                </aside>

                {/* KONTEN KATEGORI */}
                <main className="bc-admin-content kt-admin-content">
                    <h2 className="bc-content-heading">
                        Data Kategori
                    </h2>

                    <section className="kt-card">
                        <header className="kt-card-header">
                           

                            <button
                                type="button"
                                className="kt-add-button"
                                onClick={bukaTambah}
                            >
                                <span className="kt-plus">+</span>
                                Tambah Data
                            </button>
                        </header>

                        {/* PENCARIAN */}
                        <label className="kt-search">
                            <Icon
                                name="search"
                                className="kt-search-icon"
                            />

                            <input
                                type="search"
                                placeholder="Cari kategori"
                                value={cari}
                                onChange={(e) =>
                                    setCari(e.target.value)
                                }
                                aria-label="Cari kategori"
                            />
                        </label>

                        {/* TABEL KATEGORI */}
                        <div className="kt-table-wrapper">
                            <table className="kt-table">
                                <thead>
                                    <tr>
                                        <th className="kt-no-column">
                                            No
                                        </th>
                                        <th>Nama Kategori</th>
                                        <th>Deskripsi</th>
                                        <th className="kt-action-column">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {dataFilter.length > 0 ? (
                                        dataFilter.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>

                                                <td className="kt-category-name">
                                                    {item.nama}
                                                </td>

                                                <td className="kt-description">
                                                    {item.deskripsi || "—"}
                                                </td>

                                                <td>
                                                    <div className="kt-actions">
                                                        <button
                                                            type="button"
                                                            className="kt-edit-button"
                                                            title="Edit kategori"
                                                            aria-label={`Edit ${item.nama}`}
                                                            onClick={() =>
                                                                bukaEdit(item)
                                                            }
                                                        >
                                                            <Icon name="edit" />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="kt-delete-button"
                                                            title="Hapus kategori"
                                                            aria-label={`Hapus ${item.nama}`}
                                                            onClick={() =>
                                                                hapusData(item.id)
                                                            }
                                                        >
                                                            <Icon name="delete" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="kt-empty"
                                            >
                                                {cari
                                                    ? "Kategori tidak ditemukan."
                                                    : "Belum ada data kategori."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="kt-table-footer">
                            Menampilkan {dataFilter.length} kategori
                        </div>
                    </section>
                </main>
            </div>

            {/* MODAL TAMBAH / EDIT */}
            {modal && (
                <div
                    className="kt-modal-overlay"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            tutupForm();
                        }
                    }}
                >
                    <form
                        className="kt-modal"
                        onSubmit={simpanData}
                    >
                        <button
                            type="button"
                            className="kt-modal-close"
                            onClick={tutupForm}
                            aria-label="Tutup form"
                        >
                            <Icon name="close" />
                        </button>

                        <h2>Form Tambah/Edit Data</h2>

                        <h3>
                            {editId !== null
                                ? "Edit data kategori"
                                : "Tambah data kategori"}
                        </h3>

                        <div className="kt-form-fields">
                            <div className="kt-form-row">
                                <label htmlFor="kt-nama">
                                    Nama Kategori
                                </label>

                                <span>:</span>

                                <input
                                    id="kt-nama"
                                    type="text"
                                    placeholder="Masukkan nama kategori"
                                    value={form.nama}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nama: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="kt-form-row kt-form-description">
                                <label htmlFor="kt-deskripsi">
                                    Deskripsi
                                </label>

                                <span>:</span>

                                <textarea
                                    id="kt-deskripsi"
                                    placeholder="Masukkan deskripsi kategori"
                                    value={form.deskripsi}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            deskripsi: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="kt-modal-actions">
                            <button
                                type="submit"
                                className="kt-save-button"
                            >
                                Simpan
                            </button>

                            <button
                                type="button"
                                className="kt-clear-button"
                                onClick={hapusDariForm}
                            >
                                {editId !== null
                                    ? "Hapus"
                                    : "Bersihkan"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
