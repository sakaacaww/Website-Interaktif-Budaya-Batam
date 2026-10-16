
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const dataBudaya = {
    1: {
        id: 1,
        name: "Rumah Limas Potong",
        category: "Bangunan Bersejarah",
        position: [1.150510, 104.132119],
        image: "/images/rumah-limas-potong.jpg",
        photos: ["/images/rumah-limas-potong.jpg"],
        description:
            "Rumah Limas Potong merupakan rumah tradisional Melayu yang menjadi bagian dari warisan budaya di Kota Batam.",
        address: "Batu Besar, Kecamatan Nongsa, Kota Batam"
    },

    2: {
        id: 2,
        name: "Desa Wisata",
        category: "Wisata Budaya",
        position: [1.156321, 104.084210],
        image: "/images/Budaya.batam.jpg",
        photos: ["/images/Budaya.batam.jpg"],
        description:
            "Informasi mengenai potensi wisata, tradisi, dan kebudayaan lokal di Kota Batam.",
        address: "Kota Batam, Kepulauan Riau"
    },

    3: {
        id: 3,
        name: "Museum Kota Batam",
        category: "Museum",
        position: [1.10, 104.04],
        image: "/images/museum-batam.jpg",
        photos: ["/images/museum-batam.jpg"],
        description:
            "Informasi mengenai museum dan sejarah budaya Kota Batam.",
        address: "Kota Batam, Kepulauan Riau"
    }
};

export default function DetailBudaya() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("detail") || "1";
    const budaya = dataBudaya[id];

    const [tabAktif, setTabAktif] = useState("informasi");
    const [fotoAktif, setFotoAktif] = useState(null);

    if (!budaya) {
        return (
            <div className="detail-budaya-page">
                <Navbar />

                <div className="detail-not-found">
                    <h2>Tempat budaya tidak ditemukan</h2>

                    <button
                        type="button"
                        onClick={() => {
                            window.location.href = "/peta";
                        }}
                    >
                        ← Kembali ke Peta
                    </button>
                </div>
            </div>
        );
    }

    const [latitude, longitude] = budaya.position;

    // Kembali ke halaman peta dan membawa ID tujuan rute
    const lihatRute = () => {
        window.location.href = `/peta?rute=${budaya.id}`;
    };

    // Kembali ke halaman peta dan menyorot lokasi budaya
    const lihatLokasi = () => {
        window.location.href = `/peta?lokasi=${budaya.id}`;
    };

    return (
        <div className="detail-budaya-page">
            <Navbar />

            <main className="detail-budaya-container">
                <button
                    type="button"
                    className="detail-back"
                    onClick={() => {
                        window.location.href = "/peta";
                    }}
                >
                    ← Kembali ke Peta
                </button>

                <section className="detail-budaya-card">
                    {/* FOTO UTAMA */}
                    <div className="detail-budaya-photo">
                        <img
                            src={budaya.image}
                            alt={budaya.name}
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    </div>

                    {/* INFORMASI TEMPAT */}
                    <div className="detail-budaya-heading">
                        <span className="detail-category">
                            {budaya.category}
                        </span>

                        <h1>{budaya.name}</h1>

                        <p className="detail-address">
                            📍 {budaya.address}
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

                                <p>{budaya.description}</p>

                                <h2 className="detail-location-title">
                                    Lokasi
                                </h2>

                                <p>{budaya.address}</p>

                                <p className="detail-coordinate">
                                    Koordinat: {latitude}, {longitude}
                                </p>
                            </section>
                        ) : (
                            <section className="budaya-media">
                                <h2>Galeri Foto</h2>

                                <p>
                                    Dokumentasi foto {budaya.name}.
                                </p>

                                <div className="budaya-galeri">
                                    {budaya.photos.map((foto, index) => (
                                        <button
                                            type="button"
                                            className="budaya-foto-item"
                                            key={foto}
                                            onClick={() => setFotoAktif(foto)}
                                            aria-label={`Lihat foto ${index + 1}`}
                                        >
                                            <img
                                                src={foto}
                                                alt={`${budaya.name} ${index + 1}`}
                                                onError={(e) => {
                                                    e.currentTarget.style.display =
                                                        "none";
                                                }}
                                            />
                                        </button>
                                    ))}
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
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
                            onClick={() => {
                            window.location.href = `/peta?rute=${budaya.id}`;
                            }}
                        >
                            ➤ Lihat Rute
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}