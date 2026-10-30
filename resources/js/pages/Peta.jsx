
import { useState } from "react";
import Navbar from "../components/Navbar";
import Map from "../components/Map";

import {
    MapPin,
    Search,
    House,
    Theater,
    Landmark,
    MapPinned,
    X,
} from "lucide-react";

function Peta() {
    // =====================================
    // STATE
    // =====================================

    const [pencarian, setPencarian] = useState("");
    const [pencarianDikirim, setPencarianDikirim] = useState("");
    const [searchTrigger, setSearchTrigger] = useState(0);
    const [kategoriAktif, setKategoriAktif] = useState("Semua");

    // =====================================
    // FILTER KATEGORI
    // =====================================

    const filterKategori = (kategori) => {
        setKategoriAktif((sebelumnya) =>
            sebelumnya === kategori ? "Semua" : kategori
        );
    };

    // =====================================
    // FITUR PENCARIAN
    // =====================================

    const handleSearch = (e) => {
        e.preventDefault();

        const keyword = pencarian.trim();

        if (!keyword) {
            setPencarianDikirim("");
            setSearchTrigger((sebelumnya) => sebelumnya + 1);
            return;
        }

        // Simpan kata pencarian
        setPencarianDikirim(keyword);

        // Memicu pencarian ulang setiap Enter ditekan
        setSearchTrigger((sebelumnya) => sebelumnya + 1);
    };

    // =====================================
    // RESET PENCARIAN
    // =====================================

    const hapusPencarian = () => {
        setPencarian("");
        setPencarianDikirim("");
        setSearchTrigger((sebelumnya) => sebelumnya + 1);
    };

    // =====================================
    // TAMPILAN
    // =====================================

    return (
        <>
            <Navbar />

            <main className="peta-container">

                {/* HEADER */}
                <div className="peta-header">

                    <div className="peta-label">
                        <MapPin size={14} color="#0085A8" />
                        PETA SEBARAN BUDAYA
                    </div>

                    <h1>
                        Peta Interaktif Kota Batam
                    </h1>

                    <p>
                        Jelajahi lokasi seni, tradisi, sejarah,
                        dan budaya yang terdapat di Kota Batam.
                    </p>

                </div>

                {/* =================================
                    PENCARIAN TEMPAT
                ================================= */}

                <form
                    className="search-box"
                    onSubmit={handleSearch}
                >

                    <Search
                        size={18}
                        color="#0085A8"
                    />

                    <input
                        type="text"
                        placeholder="Cari nama tempat, kategori, atau lokasi..."
                        value={pencarian}
                        onChange={(e) =>
                            setPencarian(e.target.value)
                        }
                    />

                    {pencarian && (
                        <button
                            type="button"
                            onClick={hapusPencarian}
                            title="Hapus pencarian"
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <X
                                size={18}
                                color="#64748b"
                            />
                        </button>
                    )}

                    <button
                        type="submit"
                        style={{
                            display: "none",
                        }}
                    >
                        Cari
                    </button>

                </form>

                {/* =================================
                    FILTER KATEGORI
                ================================= */}

                <div className="filter-list">

                    <button
                        type="button"
                        className={
                            kategoriAktif === "Rumah Ibadah"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            filterKategori("Rumah Ibadah")
                        }
                    >
                        <House size={15} />
                        Rumah Ibadah
                    </button>

                    <button
                        type="button"
                        className={
                            kategoriAktif === "Seni & Pertunjukan"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            filterKategori("Seni & Pertunjukan")
                        }
                    >
                        <Theater size={15} />
                        Seni & Pertunjukan
                    </button>

                    <button
                        type="button"
                        className={
                            kategoriAktif === "Museum"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            filterKategori("Museum")
                        }
                    >
                        <Landmark size={15} />
                        Museum
                    </button>

                    <button
                        type="button"
                        className={
                            kategoriAktif === "Bangunan Bersejarah"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            filterKategori("Bangunan Bersejarah")
                        }
                    >
                        <Landmark size={15} />
                        Bangunan Bersejarah
                    </button>

                    <button
                        type="button"
                        className={
                            kategoriAktif === "Lainnya"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            filterKategori("Lainnya")
                        }
                    >
                        <MapPinned size={15} />
                        Lainnya
                    </button>

                </div>

                {/* =================================
                    PETA INTERAKTIF
                ================================= */}

                <div className="interactive-map">

                    <Map
                        searchTerm={pencarian}
                        focusSearchTerm={pencarianDikirim}
                        searchTrigger={searchTrigger}
                        selectedCategory={kategoriAktif}
                    />

                </div>

            </main>
        </>
    );
}

export default Peta;
