
import React, { useState } from "react";
import "../style.css";

export default function AdminTempatForm({ onCancel, onSaved }) {
    const [form, setForm] = useState({
        nama_tempat: "",
        kategori: "",
        lokasi: "",
        deskripsi: "",
        latitude: "",
        longitude: "",
        foto: null,
        video: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState("");

    function handleChange(e) {
        const { name, value, files } = e.target;

        if (name === "foto") {
            const file = files?.[0] || null;

            setForm((prev) => ({ ...prev, foto: file }));
            setPreview(file ? URL.createObjectURL(file) : "");
            return;
        }

        if (name === "video") {
            setForm((prev) => ({
                ...prev,
                video: files?.[0] || null,
            }));
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                if (value !== null && value !== "") {
                    data.append(key, value);
                }
            });

            const csrf = document.querySelector(
                'meta[name="csrf-token"]'
            )?.content;

            const response = await fetch("/admin/budaya", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    ...(csrf ? { "X-CSRF-TOKEN": csrf } : {}),
                },
                credentials: "same-origin",
                body: data,
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                if (response.status === 422 && result.errors) {
                    const messages = Object.values(result.errors).flat();
                    throw new Error(messages.join(" "));
                }

                throw new Error(
                    result.message || "Data gagal disimpan."
                );
            }

            alert("Tempat budaya berhasil ditambahkan!");
            onSaved?.(result.data);
        } catch (err) {
            setError(err.message || "Tidak dapat terhubung ke server.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="culture-form-page">
            <div className="culture-form-header">
                <div>
                    <p className="culture-form-breadcrumb">
                        Batam Culture / Data Tempat / Tambah
                    </p>

                    <h1>Tambah Tempat Budaya</h1>

                    <p>
                        Lengkapi informasi tempat budaya di Kota Batam.
                    </p>
                </div>
            </div>

            <form className="culture-form-card" onSubmit={handleSubmit}>
                <div className="culture-form-title">
                    <div className="culture-form-title-icon">+</div>

                    <div>
                        <h2>Form Tambah Data</h2>
                        <p>Masukkan informasi tempat budaya baru.</p>
                    </div>
                </div>

                {error && (
                    <div className="culture-form-error" role="alert">
                        {error}
                    </div>
                )}

                <div className="culture-form-grid">
                    <div className="culture-field">
                        <label htmlFor="nama_tempat">
                            Nama Tempat *
                        </label>

                        <input
                            id="nama_tempat"
                            name="nama_tempat"
                            value={form.nama_tempat}
                            onChange={handleChange}
                            placeholder="Contoh: Museum Batam"
                            required
                        />
                    </div>

                    <div className="culture-field">
                        <label htmlFor="kategori">Kategori *</label>

                        <select
                            id="kategori"
                            name="kategori"
                            value={form.kategori}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih kategori</option>
                            <option value="Rumah Ibadah">
                                Rumah Ibadah
                            </option>
                            <option value="Seni & Pertunjukan">
                                Seni & Pertunjukan
                            </option>
                            <option value="Museum">Museum</option>
                            <option value="Bangunan Bersejarah">
                                Bangunan Bersejarah
                            </option>
                            <option value="Adat & Tradisi">
                                Adat & Tradisi
                            </option>
                            <option value="Kuliner Tradisional">
                                Kuliner Tradisional
                            </option>
                        </select>
                    </div>

                    <div className="culture-field full">
                        <label htmlFor="lokasi">Lokasi *</label>

                        <input
                            id="lokasi"
                            name="lokasi"
                            value={form.lokasi}
                            onChange={handleChange}
                            placeholder="Contoh: Nongsa, Batam"
                            required
                        />
                    </div>

                    
{/* KOORDINAT */}
<div className="culture-field full">
    <label htmlFor="koordinat">Koordinat</label>

    <input
        id="koordinat"
        name="koordinat"
        type="text"
        value={
            form.latitude && form.longitude
                ? `${form.latitude}, ${form.longitude}`
                : form.latitude || form.longitude
        }
        onChange={(e) => {
            const value = e.target.value;
            const parts = value.split(",");

            setForm((prev) => ({
                ...prev,
                latitude: parts[0]?.trim() || "",
                longitude: parts[1]?.trim() || "",
            }));
        }}
        placeholder="Contoh: 1.130100, 104.053000"
    />

    <small className="culture-coordinate-help">
        Masukkan latitude dan longitude dipisahkan dengan koma.
    </small>
</div>

                    <div className="culture-field full">
                        <label htmlFor="deskripsi">Deskripsi *</label>

                        <textarea
                            id="deskripsi"
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            placeholder="Ceritakan sejarah dan informasi tempat budaya..."
                            rows={5}
                            required
                        />
                    </div>

                    <div className="culture-field full">
                        <label htmlFor="foto">Foto Tempat</label>

                        <label className="culture-upload" htmlFor="foto">
                            <span className="culture-upload-icon">▧</span>

                            <span>
                                <strong>Pilih foto tempat</strong>
                                <small>
                                    JPG, PNG, atau WebP · Maks. 5 MB
                                </small>
                            </span>

                            <input
                                id="foto"
                                name="foto"
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                            />
                        </label>

                        {preview && (
                            <img
                                className="culture-photo-preview"
                                src={preview}
                                alt="Pratinjau foto tempat"
                            />
                        )}
                    </div>

                    <div className="culture-field full">
                        <label htmlFor="video">Video Tempat</label>

                        <label className="culture-upload" htmlFor="video">
                            <span className="culture-upload-icon">▷</span>

                            <span>
                                <strong>Pilih video tempat</strong>
                                <small>
                                    MP4, WebM, atau MOV · Maks. 20 MB
                                </small>
                            </span>

                            <input
                                id="video"
                                name="video"
                                type="file"
                                accept="video/mp4,video/webm,video/quicktime"
                                onChange={handleChange}
                            />
                        </label>

                        {form.video && (
                            <p className="culture-file-name">
                                Video: {form.video.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="culture-form-actions">
                    <button
                        type="button"
                        className="culture-cancel-button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Batal
                    </button>

                    <button
                        type="submit"
                        className="culture-save-button"
                        disabled={loading}
                    >
                        {loading ? "Menyimpan..." : "Simpan Tempat"}
                    </button>
                </div>
            </form>
        </div>
    );
}
