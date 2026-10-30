
import React, { useEffect, useState } from "react";
import "../style.css";

const FORM_AWAL = {
    nama: "",
    kategori: "Rumah Ibadah",
    koordinat: "",
    deskripsi: "",
    foto: null,
    video: "",
};

export default function DataTempat() {
    const [data, setData] = useState([]);
    const [cari, setCari] = useState("");
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ ...FORM_AWAL });
    const [loading, setLoading] = useState(true);
    const [menyimpan, setMenyimpan] = useState(false);
    const [error, setError] = useState("");

    // NORMALISASI DATA DARI LARAVEL
    function normalisasiData(item) {
        return {
            ...item,
            nama: item.nama_tempat,
            latitude: String(item.latitude ?? ""),
            longitude: String(item.longitude ?? ""),
        };
    }

    // MENGAMBIL DATA DARI DATABASE
    async function ambilData() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/budayas", {
                headers: {
                    Accept: "application/json",
                },
            });

            const hasil = await response.json();

            if (!response.ok) {
                throw new Error(
                    hasil.message || "Gagal mengambil data tempat budaya."
                );
            }

            setData((hasil.data || []).map(normalisasiData));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        ambilData();
    }, []);

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
            koordinat: `${item.latitude}, ${item.longitude}`,
            deskripsi: item.deskripsi || "",
            foto: null,
            video: item.video || "",
        });

        setModal(true);
    }

    // TUTUP FORM
    function tutupForm() {
        setModal(false);
        setEditId(null);
        setForm({ ...FORM_AWAL });
    }

    // SIMPAN DATA KE DATABASE
    async function simpanData(e) {
        e.preventDefault();

        if (!form.nama.trim() || !form.koordinat.trim()) {
            alert("Nama tempat dan titik koordinat wajib diisi.");
            return;
        }

        // MEMISAHKAN KOORDINAT
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
            alert("Koordinat tidak valid. Periksa kembali koordinat.");
            return;
        }

        // VALIDASI LINK VIDEO
        if (form.video.trim()) {
            try {
                new URL(form.video.trim());
            } catch {
                alert("Link video tidak valid. Masukkan URL YouTube yang benar.");
                return;
            }
        }

        // MENYIAPKAN DATA
        const dataForm = new FormData();

        dataForm.append("nama_tempat", form.nama.trim());
        dataForm.append("kategori", form.kategori);
        dataForm.append("koordinat", `${latitude}, ${longitude}`);
        dataForm.append("deskripsi", form.deskripsi || "");
        dataForm.append("video", form.video.trim());

        if (form.foto instanceof File) {
            dataForm.append("foto", form.foto);
        }

        const sedangEdit = editId !== null;

        const url = sedangEdit
            ? `/api/budayas/${editId}`
            : "/api/budayas";

        // METHOD SPOOFING UNTUK UPDATE
        if (sedangEdit) {
            dataForm.append("_method", "PUT");
        }

        try {
            setMenyimpan(true);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: dataForm,
            });

            const hasil = await response.json();

            if (!response.ok) {
                const pesan = hasil.errors
                    ? Object.values(hasil.errors).flat().join("\n")
                    : hasil.message;

                throw new Error(pesan || "Gagal menyimpan data.");
            }

            const dataBaru = normalisasiData(hasil.data);

            if (sedangEdit) {
                setData((lama) =>
                    lama.map((item) =>
                        item.id === editId ? dataBaru : item
                    )
                );
            } else {
                setData((lama) => [dataBaru, ...lama]);
            }

            alert(hasil.message || "Data berhasil disimpan.");
            tutupForm();

        } catch (err) {
            alert(err.message);
        } finally {
            setMenyimpan(false);
        }
    }

    // HAPUS DATA
    async function hapusData(id) {
        if (!window.confirm("Yakin ingin menghapus data tempat ini?")) {
            return;
        }

        try {
            const response = await fetch(`/api/budayas/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            });

            const hasil = await response.json();

            if (!response.ok) {
                throw new Error(hasil.message || "Gagal menghapus data.");
            }

            setData((lama) =>
                lama.filter((item) => item.id !== id)
            );

            alert(hasil.message || "Data berhasil dihapus.");

        } catch (err) {
            alert(err.message);
        }
    }

    // HAPUS DATA DARI FORM
    async function hapusDariForm() {
        if (editId === null) {
            setForm({ ...FORM_AWAL });
            return;
        }

        if (!window.confirm("Yakin ingin menghapus data tempat ini?")) {
            return;
        }

        try {
            const response = await fetch(`/api/budayas/${editId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            });

            const hasil = await response.json();

            if (!response.ok) {
                throw new Error(hasil.message || "Gagal menghapus data.");
            }

            setData((lama) =>
                lama.filter((item) => item.id !== editId)
            );

            alert(hasil.message || "Data berhasil dihapus.");
            tutupForm();

        } catch (err) {
            alert(err.message);
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
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="dt-empty">
                                            Memuat data tempat budaya...
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="6" className="dt-empty">
                                            {error}
                                        </td>
                                    </tr>
                                ) : dataFilter.length > 0 ? (
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

                                {!loading &&
                                    !error &&
                                    Array.from({
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

                                {/* TITIK KOORDINAT */}
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

                                {/* LINK VIDEO YOUTUBE */}
                                <div className="dt-form-row">
                                    <label htmlFor="dt-video">
                                        Link Video
                                    </label>

                                    <span className="dt-colon">:</span>

                                    <input
                                        id="dt-video"
                                        type="url"
                                        value={form.video}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                video: e.target.value,
                                            })
                                        }
                                        placeholder="Masukkan link video YouTube"
                                    />
                                </div>
                            </div>

                            {/* TOMBOL */}
                            <div className="dt-form-actions">
                                <button
                                    type="submit"
                                    className="dt-form-save"
                                    disabled={menyimpan}
                                >
                                    {menyimpan ? "Menyimpan..." : "Simpan"}
                                </button>

                                <button
                                    type="button"
                                    className="dt-form-delete"
                                    onClick={hapusDariForm}
                                    disabled={menyimpan}
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
