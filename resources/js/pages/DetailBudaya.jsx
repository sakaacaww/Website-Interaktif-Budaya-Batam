
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

// ==========================================
// MEMBUAT URL FOTO DARI LARAVEL STORAGE
// ==========================================

function storageUrl(path) {
    if (!path) return null;

    if (
        path.startsWith("http://") ||
        path.startsWith("https://")
    ) {
        return path;
    }

    return `/storage/${path.replace(/^\/+/, "")}`;
}

// ==========================================
// MENGUBAH LINK YOUTUBE/VIMEO MENJADI EMBED
// ==========================================

function getVideoEmbedUrl(url) {
    if (!url) return null;

    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname.replace(/^www\./, "");
        let videoId = "";

        // YOUTUBE
        if (hostname === "youtu.be") {
            videoId = parsedUrl.pathname
                .split("/")
                .filter(Boolean)[0];
        } else if (
            hostname === "youtube.com" ||
            hostname === "m.youtube.com" ||
            hostname === "youtube-nocookie.com"
        ) {
            const parts = parsedUrl.pathname
                .split("/")
                .filter(Boolean);

            if (parsedUrl.searchParams.get("v")) {
                videoId = parsedUrl.searchParams.get("v");
            } else if (
                ["shorts", "embed", "live"].includes(parts[0])
            ) {
                videoId = parts[1];
            }
        }

        if (videoId) {
            if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
                return null;
            }

            return `https://www.youtube-nocookie.com/embed/${videoId}`;
        }

        // VIMEO
        if (hostname === "vimeo.com") {
            const vimeoId = parsedUrl.pathname
                .split("/")
                .filter(Boolean)
                .pop();

            if (/^\d+$/.test(vimeoId || "")) {
                return `https://player.vimeo.com/video/${vimeoId}`;
            }
        }

        return null;
    } catch {
        return null;
    }
}

// ==========================================
// MEMERIKSA VIDEO FILE LANGSUNG
// ==========================================

function isDirectVideo(url) {
    if (!url) return false;

    return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

// ==========================================
// HALAMAN DETAIL BUDAYA
// ==========================================

export default function DetailBudaya() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("detail");

    const [budaya, setBudaya] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [tabAktif, setTabAktif] = useState("informasi");
    const [fotoAktif, setFotoAktif] = useState(null);

    // ==========================================
    // MENGAMBIL DATA DETAIL DARI DATABASE
    // ==========================================

    useEffect(() => {
        const controller = new AbortController();

        async function ambilDetailBudaya() {
            if (!id) {
                setError("Tempat budaya tidak ditemukan.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await fetch(`/api/budayas/${id}`, {
                    headers: {
                        Accept: "application/json",
                    },
                    signal: controller.signal,
                });

                const hasil = await response.json();

                if (!response.ok) {
                    throw new Error(
                        hasil.message ||
                        "Gagal mengambil detail tempat budaya."
                    );
                }

                const item = hasil.data;

                setBudaya({
                    id: item.id,
                    name: item.nama_tempat,
                    category: item.kategori,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    image: storageUrl(item.foto),
                    video: item.video || "",
                    description: item.deskripsi || "",
                    photos: item.foto
                        ? [storageUrl(item.foto)]
                        : [],
                });
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        ambilDetailBudaya();

        return () => controller.abort();
    }, [id]);

    // ==========================================
    // NAVIGASI
    // ==========================================

    const kembaliKePeta = () => {
        window.location.href = "/peta";
    };

    const lihatLokasi = () => {
        window.location.href = `/peta?lokasi=${budaya.id}`;
    };

    const lihatRute = () => {
        window.location.href = `/peta?rute=${budaya.id}`;
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="detail-budaya-page">
                <Navbar />

                <div className="detail-not-found">
                    <p>Memuat detail tempat budaya...</p>
                </div>
            </div>
        );
    }

    // ==========================================
    // DATA TIDAK DITEMUKAN
    // ==========================================

    if (error || !budaya) {
        return (
            <div className="detail-budaya-page">
                <Navbar />

                <div className="detail-not-found">
                    <h2>Tempat budaya tidak ditemukan</h2>

                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={kembaliKePeta}
                    >
                        ← Kembali ke Peta
                    </button>
                </div>
            </div>
        );
    }

    const videoEmbedUrl = getVideoEmbedUrl(budaya.video);
    const videoLangsung = isDirectVideo(budaya.video);

    // ==========================================
    // TAMPILAN UTAMA
    // ==========================================

    return (
        <div className="detail-budaya-page">
            <Navbar />

            <main className="detail-budaya-container">

                {/* TOMBOL KEMBALI */}
                <button
                    type="button"
                    className="detail-back"
                    onClick={kembaliKePeta}
                >
                    ← Kembali ke Peta
                </button>

                <section className="detail-budaya-card">

                    {/* FOTO UTAMA */}
                    <div className="detail-budaya-photo">
                        {budaya.image ? (
                            <img
                                src={budaya.image}
                                alt={budaya.name}
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    height: "100%",
                                    minHeight: "200px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "#e2e8f0",
                                    color: "#64748b",
                                }}
                            >
                                Foto belum tersedia
                            </div>
                        )}
                    </div>

                    {/* INFORMASI TEMPAT */}
                    <div className="detail-budaya-heading">
                        <span className="detail-category">
                            {budaya.category}
                        </span>

                        <h1>{budaya.name}</h1>

                        <p className="detail-address">
                            📍 Kota Batam, Kepulauan Riau
                        </p>
                    </div>

                    {/* TAB INFORMASI DAN MEDIA */}
                    <div className="detail-tabs">
                        <button
                            type="button"
                            className={
                                tabAktif === "informasi" ? "active" : ""
                            }
                            onClick={() => setTabAktif("informasi")}
                        >
                            Informasi
                        </button>

                        <button
                            type="button"
                            className={
                                tabAktif === "media" ? "active" : ""
                            }
                            onClick={() => setTabAktif("media")}
                        >
                            Foto/Video
                        </button>
                    </div>

                    {/* ISI TAB */}
                    <div className="detail-tab-content">

                        {tabAktif === "informasi" ? (
                            <section>
                                <h2>Deskripsi</h2>

                                <p>
                                    {budaya.description ||
                                        "Belum ada deskripsi tempat budaya."}
                                </p>

                                <h2 className="detail-location-title">
                                    Lokasi
                                </h2>

                                <p>
                                    Kota Batam, Kepulauan Riau
                                </p>

                                <p className="detail-coordinate">
                                    Koordinat: {budaya.latitude},{" "}
                                    {budaya.longitude}
                                </p>
                            </section>
                        ) : (

                            /* ==================================
                               TAB FOTO DAN VIDEO
                            ================================== */

                            <section className="budaya-media">

                                <div className="budaya-media-grid">

                                    {/* KOLOM FOTO */}
                                    <div className="budaya-media-column">
                                        <h2>Galeri Foto</h2>

                                        <p>
                                            Dokumentasi foto {budaya.name}.
                                        </p>

                                        <div className="budaya-galeri">
                                            {budaya.photos.length > 0 ? (
                                                budaya.photos.map(
                                                    (foto, index) => (
                                                        <button
                                                            type="button"
                                                            className="budaya-foto-item"
                                                            key={index}
                                                            onClick={() =>
                                                                setFotoAktif(foto)
                                                            }
                                                            aria-label={`Lihat foto ${index + 1}`}
                                                        >
                                                            <img
                                                                src={foto}
                                                                alt={`${budaya.name} ${index + 1}`}
                                                            />
                                                        </button>
                                                    )
                                                )
                                            ) : (
                                                <p>
                                                    Belum ada foto yang diunggah.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* KOLOM VIDEO */}
                                    <div className="budaya-media-column">
                                        <h2>Video</h2>

                                        {budaya.video ? (
                                            videoEmbedUrl ? (
                                                <div className="budaya-video-wrapper">
                                                    <iframe
                                                        src={videoEmbedUrl}
                                                        title={`Video ${budaya.name}`}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            ) : videoLangsung ? (
                                                <video
                                                    controls
                                                    playsInline
                                                    className="budaya-video-player"
                                                >
                                                    <source src={budaya.video} />
                                                    Browser tidak mendukung pemutar video.
                                                </video>
                                            ) : (
                                                <p>
                                                    Link video tidak dikenali.
                                                    Periksa kembali link yang dimasukkan.
                                                </p>
                                            )
                                        ) : (
                                            <p>
                                                Belum ada video untuk tempat budaya ini.
                                            </p>
                                        )}
                                    </div>

                                </div>

                                {/* FOTO UKURAN BESAR */}
                                {fotoAktif && (
                                    <div
                                        className="budaya-lightbox"
                                        onClick={() => setFotoAktif(null)}
                                    >
                                        <button
                                            type="button"
                                            className="budaya-lightbox-close"
                                            onClick={() => setFotoAktif(null)}
                                            aria-label="Tutup foto"
                                        >
                                            ✕
                                        </button>

                                        <img
                                            src={fotoAktif}
                                            alt={`Foto ${budaya.name}`}
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                        />
                                    </div>
                                )}

                            </section>
                        )}
                    </div>

                    {/* TOMBOL NAVIGASI */}
                    <div className="detail-actions">
                        <button
                            type="button"
                            className="detail-map-button"
                            onClick={lihatLokasi}
                        >
                            📍 Lihat Lokasi
                        </button>

                        <button
                            type="button"
                            className="detail-route-button"
                            onClick={lihatRute}
                        >
                            ➤ Lihat Rute
                        </button>
                    </div>

                </section>
            </main>
        </div>
    );
}
