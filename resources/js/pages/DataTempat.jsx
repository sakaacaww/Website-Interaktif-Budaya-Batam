
import React, { useState } from "react";
import "../style.css";

const FORM_AWAL = {
    nama: "",
    kategori: "Rumah Ibadah",
    koordinat: "",
    deskripsi: "",
    foto: null,
    video: null,
};

export default function DataTempat() {
    const [data, setData] = useState([
        {
            id: 1,
            nama: "Masjid Tua",
            kategori: "Rumah Ibadah",
            latitude: "1.150510",
            longitude: "104.132119",
            deskripsi: "",
            foto: null,
            video: null,
        },
        {
            id: 2,
            nama: "Sanggar Tari",
            kategori: "Seni & Pertunjukan",
            latitude: "1.156321",
            longitude: "104.084210",
            deskripsi: "",
            foto: null,
            video: null,
        },
    ]);

    const [cari, setCari] = useState("");
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ ...FORM_AWAL });

    // PENCARIAN DATA
    const dataFilter = data.filter((item) =>
        `${item.nama} ${item.kategori} ${item.latitude} ${item.longitude}`
            .toLowerCase()
            .includes(cari.toLowerCase())
    );

    // BUKA FORM TAMBAH
    function bukaTambah() {
        setEditId(null);
        setForm({ ...FORM_AWAL });
        setModal(true);
    }

    // BUKA FORM EDIT
    function bukaEdit(item) {
        setEditId(item.id);

        setForm({
            nama: item.nama,
            kategori: item.kategori,
            koordinat: `${item.latitude ?? ""}, ${item.longitude ?? ""}`,
            deskripsi: item.deskripsi || "",
            foto: null,
            video: null,
        });

        setModal(true);
    }

    // TUTUP FORM
    function tutupForm() {
        setModal(false);
        setEditId(null);
        setForm({ ...FORM_AWAL });
    }

    // SIMPAN DATA
    function simpanData(e) {
        e.preventDefault();

        if (!form.nama.trim() || !form.koordinat.trim()) {
            alert("Nama tempat dan titik koordinat wajib diisi.");
            return;
        }

        // Format input: latitude, longitude
        const bagianKoordinat = form.koordinat
            .split(",")
            .map((nilai) => nilai.trim());

        if (
            bagianKoordinat.length !== 2 ||
            bagianKoordinat.some((nilai) => nilai === "")
        ) {
            alert(
                "Format koordinat tidak valid. Contoh: 1.150510, 104.132119"
            );
            return;
        }

        const latitude = Number(bagianKoordinat[0]);
        const longitude = Number(bagianKoordinat[1]);

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
        ) {
            alert(
                "Koordinat tidak valid. Periksa kembali latitude dan longitude."
            );
            return;
        }

        const dataForm = {
            nama: form.nama.trim(),
            kategori: form.kategori,
            latitude: String(latitude),
            longitude: String(longitude),
            deskripsi: form.deskripsi,
        };

        if (editId !== null) {
            setData((lama) =>
                lama.map((item) =>
                    item.id === editId
                        ? {
                              ...item,
                              ...dataForm,
                              foto: form.foto || item.foto || null,
                              video: form.video || item.video || null,
                          }
                        : item
                )
            );
        } else {
            setData((lama) => [
                ...lama,
                {
                    id: Date.now(),
                    ...dataForm,
                    foto: form.foto,
                    video: form.video,
                },
            ]);
        }

        tutupForm();
    }

    // HAPUS DATA DARI TABEL
    function hapusData(id) {
        if (window.confirm("Yakin ingin menghapus data tempat ini?")) {
            setData((lama) => lama.filter((item) => item.id !== id));
        }
    }

    // HAPUS DATA DARI FORM
    function hapusDariForm() {
        if (editId !== null) {
            if (window.confirm("Yakin ingin menghapus data tempat ini?")) {
                setData((lama) =>
                    lama.filter((item) => item.id !== editId)
                );

                tutupForm();
            }
        } else {
            setForm({ ...FORM_AWAL });
        }
    }

    return (
        <div className="dt-page">
            <h1 className="dt-page-title">Kelola Data Tempat</h1>

            <div className="dt-layout">
                {/* SIDEBAR */}
                <aside className="dt-sidebar">
                    <div className="dt-brand">
                        Batam
                        <br />
                        Culture
                    </div>

                    <nav className="dt-nav">
                        <a href="/admin/dashboard">
                            <span>⌂</span>
                            Dashboard
                        </a>

                        <a href="/admin/tempat" className="active">
                            <span>◫</span>
                            Data Tempat
                        </a>

                        <a href="/admin/kategori">
                            <span>▤</span>
                            Kategori
                        </a>
                    </nav>

                    <form
                        className="dt-logout-form"
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

                        <button type="submit" className="dt-logout">
                            Logout
                        </button>
                    </form>
                </aside>

                {/* KONTEN DATA TEMPAT */}
                <main className="dt-content">
                    <header className="dt-header">
                        <h2>Data Tempat Budaya</h2>

                        <button
                            type="button"
                            className="dt-add-button"
                            onClick={bukaTambah}
                        >
                            <span>+</span>
                            Tambah Data
                        </button>
                    </header>

                    {/* PENCARIAN */}
                    <div className="dt-search">
                        <span>⌕</span>

                        <input
                            type="search"
                            placeholder="Cari nama, kategori, atau koordinat"
                            value={cari}
                            onChange={(e) => setCari(e.target.value)}
                        />
                    </div>

                    {/* TABEL DATA */}
                    <div className="dt-table-wrapper">
                        <table className="dt-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Tempat</th>
                                    <th>Kategori</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataFilter.length > 0 ? (
                                    dataFilter.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.kategori}</td>
                                            <td>{item.latitude}</td>
                                            <td>{item.longitude}</td>
                                            <td>
                                                <div className="dt-actions">
                                                    <button
                                                        type="button"
                                                        className="dt-edit"
                                                        title="Edit data"
                                                        onClick={() =>
                                                            bukaEdit(item)
                                                        }
                                                    >
                                                        ✎
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="dt-delete"
                                                        title="Hapus data"
                                                        onClick={() =>
                                                            hapusData(item.id)
                                                        }
                                                    >
                                                        ♜
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="dt-empty">
                                            {cari
                                                ? "Data tidak ditemukan."
                                                : "Belum ada data tempat budaya."}
                                        </td>
                                    </tr>
                                )}

                                {Array.from({
                                    length: Math.max(
                                        0,
                                        5 - dataFilter.length
                                    ),
                                }).map((_, index) => (
                                    <tr
                                        key={`kosong-${index}`}
                                        className="dt-empty-row"
                                        aria-hidden="true"
                                    >
                                        <td>&nbsp;</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* FORM TAMBAH / EDIT */}
            {modal && (
                <div
                    className="dt-form-overlay"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            tutupForm();
                        }
                    }}
                >
                    <div className="dt-form-panel">
                        <h1 className="dt-form-title">
                            Form Tambah/Edit Data
                        </h1>

                        <form
                            className="dt-form-card"
                            onSubmit={simpanData}
                        >
                            <h2>Tambah/edit data tempat budaya</h2>

                            <div className="dt-form-fields">
                                {/* NAMA TEMPAT */}
                                <div className="dt-form-row">
                                    <label htmlFor="dt-nama">
                                        Nama Tempat
                                    </label>

                                    <span className="dt-colon">:</span>

                                    <input
                                        id="dt-nama"
                                        type="text"
                                        value={form.nama}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                nama: e.target.value,
                                            })
                                        }
                                        placeholder="Masukkan nama tempat"
                                        required
                                    />
                                </div>

                                {/* KATEGORI */}
                                <div className="dt-form-row">
                                    <label htmlFor="dt-kategori">
                                        Kategori
                                    </label>

                                    <span className="dt-colon">:</span>

                                    <select
                                        id="dt-kategori"
                                        value={form.kategori}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                kategori: e.target.value,
                                            })
                                        }
                                    >
                                        <option>Rumah Ibadah</option>
                                        <option>Seni & Pertunjukan</option>
                                        <option>Museum</option>
                                        <option>Bangunan Bersejarah</option>
                                    </select>
                                </div>

                                {/* TITIK KOORDINAT GABUNGAN */}
                                <div className="dt-form-row">
                                    <label htmlFor="dt-koordinat">
                                        Titik Koordinat
                                    </label>

                                    <span className="dt-colon">:</span>

                                    <input
                                        id="dt-koordinat"
                                        type="text"
                                        value={form.koordinat}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                koordinat: e.target.value,
                                            })
                                        }
                                        placeholder="Contoh: 1.150510, 104.132119"
                                        required
                                    />
                                </div>

                                {/* DESKRIPSI */}
                                <div className="dt-form-row dt-description-row">
                                    <label htmlFor="dt-deskripsi">
                                        Deskripsi
                                    </label>

                                    <span className="dt-colon">:</span>

                                    <textarea
                                        id="dt-deskripsi"
                                        value={form.deskripsi}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                deskripsi: e.target.value,
                                            })
                                        }
                                        placeholder="Deskripsikan tempat budaya"
                                    />
                                </div>

                                {/* FOTO */}
                                <div className="dt-form-row dt-file-row">
                                    <label htmlFor="dt-foto">Foto</label>

                                    <span className="dt-colon">:</span>

                                    <label
                                        className="dt-file-button"
                                        htmlFor="dt-foto"
                                    >
                                        <span>▧</span>

                                        <input
                                            id="dt-foto"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    foto:
                                                        e.target.files?.[0] ||
                                                        null,
                                                })
                                            }
                                        />
                                    </label>

                                    <span className="dt-file-name">
                                        {form.foto?.name || ""}
                                    </span>
                                </div>

                                {/* VIDEO */}
                                <div className="dt-form-row dt-file-row">
                                    <label htmlFor="dt-video">Video</label>

                                    <span className="dt-colon">:</span>

                                    <label
                                        className="dt-file-button"
                                        htmlFor="dt-video"
                                    >
                                        <span>▤</span>

                                        <input
                                            id="dt-video"
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    video:
                                                        e.target.files?.[0] ||
                                                        null,
                                                })
                                            }
                                        />
                                    </label>

                                    <span className="dt-file-name">
                                        {form.video?.name || ""}
                                    </span>
                                </div>
                            </div>

                            {/* TOMBOL */}
                            <div className="dt-form-actions">
                                <button
                                    type="submit"
                                    className="dt-form-save"
                                >
                                    Simpan
                                </button>

                                <button
                                    type="button"
                                    className="dt-form-delete"
                                    onClick={hapusDariForm}
                                >
                                    Hapus
                                </button>
                            </div>

                            <button
                                type="button"
                                className="dt-form-close"
                                onClick={tutupForm}
                                aria-label="Tutup form"
                            >
                                ×
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
