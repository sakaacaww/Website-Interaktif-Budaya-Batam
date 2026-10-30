
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
} from "react-leaflet";

import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ==========================================
// 1. ICON MARKER
// ==========================================

const icon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// ==========================================
// 2. DAFTAR KATEGORI
// ==========================================

const kategoriUtama = [
    "Rumah Ibadah",
    "Seni & Pertunjukan",
    "Museum",
    "Bangunan Bersejarah",
];

// ==========================================
// 3. FUNGSI FILTER DATA
// ==========================================

function filterTempat(data, query, kategori) {
    const keyword = String(query || "").trim().toLowerCase();

    return data.filter((place) => {
        const informasi = [
            place.nama_tempat,
            place.kategori,
            place.deskripsi,
            place.latitude,
            place.longitude,
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const cocokPencarian =
            !keyword || informasi.includes(keyword);

        let cocokKategori = true;

        if (kategori === "Lainnya") {
            cocokKategori = !kategoriUtama.includes(place.kategori);
        } else if (kategori !== "Semua") {
            cocokKategori = place.kategori === kategori;
        }

        return cocokPencarian && cocokKategori;
    });
}

// ==========================================
// 4. MENGATUR TAMPILAN RUTE
// ==========================================

function SesuaikanRute({ titikRute }) {
    const map = useMap();

    useEffect(() => {
        if (titikRute.length > 1) {
            map.fitBounds(titikRute, {
                padding: [40, 40],
                maxZoom: 15,
            });
        }
    }, [map, titikRute]);

    return null;
}

// ==========================================
// 5. FOKUS KE LOKASI GPS
// ==========================================

function FokusPeta({ posisi }) {
    const map = useMap();

    useEffect(() => {
        if (posisi) {
            map.flyTo(posisi, 15, {
                duration: 1,
            });
        }
    }, [map, posisi]);

    return null;
}

// ==========================================
// 6. FOKUS KE HASIL PENCARIAN
// ==========================================

function FokusHasilPencarian({
    locations,
    searchTerm,
    searchTrigger,
}) {
    const map = useMap();

    useEffect(() => {
        if (!String(searchTerm || "").trim()) return;
        if (!locations || locations.length === 0) return;

        const posisi = locations.map(
            (place) => place.position
        );

        if (posisi.length === 1) {
            map.flyTo(posisi[0], 16, {
                animate: true,
                duration: 1,
            });
        } else {
            map.flyToBounds(posisi, {
                padding: [50, 50],
                maxZoom: 15,
                duration: 1,
            });
        }
    }, [map, locations, searchTerm, searchTrigger]);

    return null;
}

// ==========================================
// 7. KOMPONEN UTAMA MAP
// ==========================================

function Map({
    searchTerm = "",
    focusSearchTerm = "",
    selectedCategory = "Semua",
    searchTrigger = 0,
}) {
    const batamBounds = [
        [0.98, 103.85],
        [1.28, 104.20],
    ];

    // Membaca parameter URL
    const params = new URLSearchParams(window.location.search);
    const idRute = params.get("rute");

    // ======================================
    // 8. STATE DATA
    // ======================================

    const [culturalLocations, setCulturalLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorData, setErrorData] = useState("");

    // ======================================
    // 9. STATE GPS DAN RUTE
    // ======================================

    const [lokasiPengguna, setLokasiPengguna] = useState(null);
    const [titikRute, setTitikRute] = useState([]);
    const [pesanRute, setPesanRute] = useState("");

    // ======================================
    // 10. MENGAMBIL DATA DARI LARAVEL API
    // ======================================

    useEffect(() => {
        const controller = new AbortController();

        async function ambilDataBudaya() {
            try {
                setLoading(true);
                setErrorData("");

                const response = await fetch("/api/budayas", {
                    headers: {
                        Accept: "application/json",
                    },
                    signal: controller.signal,
                });

                const hasil = await response.json();

                if (!response.ok) {
                    throw new Error(
                        hasil.message || "Gagal mengambil data budaya."
                    );
                }

                const data = (hasil.data || [])
                    .map((item) => {
                        const latitude = Number(item.latitude);
                        const longitude = Number(item.longitude);

                        return {
                            ...item,
                            position: [latitude, longitude],
                            image: item.foto
                                ? `/storage/${String(item.foto).replace(/^\/+/, "")}`
                                : null,
                        };
                    })
                    .filter((item) => {
                        return (
                            Number.isFinite(item.position[0]) &&
                            Number.isFinite(item.position[1]) &&
                            item.position[0] >= -90 &&
                            item.position[0] <= 90 &&
                            item.position[1] >= -180 &&
                            item.position[1] <= 180
                        );
                    });

                setCulturalLocations(data);

            } catch (error) {
                if (error.name !== "AbortError") {
                    setErrorData(error.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        ambilDataBudaya();

        return () => controller.abort();
    }, []);

    // ======================================
    // 11. MENCARI TUJUAN RUTE
    // ======================================

    const tujuan = useMemo(() => {
        return culturalLocations.find(
            (place) => String(place.id) === String(idRute)
        );
    }, [culturalLocations, idRute]);

    // ======================================
    // 12. FILTER PENCARIAN
    // ======================================

    const filteredLocations = useMemo(() => {
        return filterTempat(
            culturalLocations,
            searchTerm,
            selectedCategory
        );
    }, [culturalLocations, searchTerm, selectedCategory]);

    // ======================================
    // 13. HASIL PENCARIAN SETELAH ENTER
    // ======================================

    const focusLocations = useMemo(() => {
        if (!String(focusSearchTerm || "").trim()) {
            return [];
        }

        return filterTempat(
            culturalLocations,
            focusSearchTerm,
            selectedCategory
        );
    }, [
        culturalLocations,
        focusSearchTerm,
        selectedCategory,
    ]);

    // ======================================
    // 14. MENGHITUNG RUTE GPS KE TEMPAT
    // ======================================

    useEffect(() => {
        if (!idRute) {
            setPesanRute("");
            setTitikRute([]);
            setLokasiPengguna(null);
            return;
        }

        if (loading) return;

        if (!tujuan) {
            setPesanRute("Tempat budaya tidak ditemukan.");
            return;
        }

        if (!navigator.geolocation) {
            setPesanRute("Browser tidak mendukung fitur GPS.");
            return;
        }

        let aktif = true;
        const controller = new AbortController();

        setLokasiPengguna(null);
        setTitikRute([]);
        setPesanRute("Meminta akses lokasi GPS...");

        navigator.geolocation.getCurrentPosition(
            async (posisi) => {
                if (!aktif) return;

                const asal = [
                    posisi.coords.latitude,
                    posisi.coords.longitude,
                ];

                setLokasiPengguna(asal);
                setPesanRute("Sedang menghitung rute kendaraan...");

                try {
                    const [asalLat, asalLng] = asal;
                    const [tujuanLat, tujuanLng] = tujuan.position;

                    const url =
                        "https://router.project-osrm.org/route/v1/driving/" +
                        `${asalLng},${asalLat};${tujuanLng},${tujuanLat}` +
                        "?overview=full&geometries=geojson";

                    const response = await fetch(url, {
                        signal: controller.signal,
                    });

                    if (!response.ok) {
                        throw new Error("Layanan rute tidak tersedia.");
                    }

                    const hasil = await response.json();

                    if (
                        hasil.code !== "Ok" ||
                        !hasil.routes?.length
                    ) {
                        throw new Error("Rute kendaraan tidak ditemukan.");
                    }

                    const rute = hasil.routes[0];

                    const koordinat =
                        rute.geometry.coordinates.map(
                            ([lng, lat]) => [lat, lng]
                        );

                    if (!aktif) return;

                    setTitikRute(koordinat);

                    const jarakKm = (rute.distance / 1000).toFixed(1);
                    const menit = Math.round(rute.duration / 60);

                    setPesanRute(
                        `Rute ke ${tujuan.nama_tempat}: ${jarakKm} km, sekitar ${menit} menit.`
                    );

                } catch (error) {
                    if (
                        aktif &&
                        error.name !== "AbortError"
                    ) {
                        setPesanRute(
                            error.message || "Gagal menghitung rute."
                        );
                    }
                }
            },

            (error) => {
                if (!aktif) return;

                setPesanRute(
                    error.code === 1
                        ? "Izin GPS ditolak. Aktifkan izin lokasi browser."
                        : "Lokasi GPS tidak ditemukan. Coba lagi."
                );
            },

            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0,
            }
        );

        return () => {
            aktif = false;
            controller.abort();
        };
    }, [idRute, tujuan, loading]);

    // ======================================
    // 15. TAMPILAN MAP
    // ======================================

    return (
        <>
            {/* INFORMASI RUTE */}
            {idRute && (
                <div
                    style={{
                        marginBottom: "10px",
                        color: "#394959",
                    }}
                >
                    <p style={{ margin: "0 0 8px" }}>
                        {pesanRute}
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            window.location.href = "/peta";
                        }}
                        style={{
                            padding: "8px 14px",
                            border: "none",
                            borderRadius: "6px",
                            background: "#6A89A7",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        ✕ Tutup Rute
                    </button>
                </div>
            )}

            {/* STATUS DATA */}
            {loading && (
                <p style={{ color: "#394959" }}>
                    Memuat lokasi budaya...
                </p>
            )}

            {errorData && (
                <p style={{ color: "red" }}>
                    {errorData}
                </p>
            )}

            {/* HASIL PENCARIAN */}
            {!loading &&
                !errorData &&
                filteredLocations.length === 0 && (
                    <p style={{ color: "#64748b" }}>
                        {culturalLocations.length === 0
                            ? "Belum ada tempat budaya yang ditambahkan admin."
                            : "Tempat budaya tidak ditemukan."}
                    </p>
                )}

            {/* PETA OPENSTREETMAP */}
            <MapContainer
                center={[1.1300, 104.0500]}
                zoom={13}
                minZoom={12}
                maxZoom={17}
                scrollWheelZoom={true}
                maxBounds={batamBounds}
                maxBoundsViscosity={1.0}
                style={{
                    width: "100%",
                    height: "560px",
                }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* MARKER TEMPAT BUDAYA */}
                {filteredLocations.map((place) => (
                    <Marker
                        key={place.id}
                        position={place.position}
                        icon={icon}
                    >
                        <Popup className="budaya-popup">
                            <div className="popup-budaya">

                                {place.image && (
                                    <img
                                        src={place.image}
                                        alt={place.nama_tempat}
                                        className="popup-budaya-image"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />
                                )}

                                <h3>{place.nama_tempat}</h3>

                                <p>{place.kategori}</p>

                                {place.deskripsi && (
                                    <p>{place.deskripsi}</p>
                                )}

                                {/* HANYA TOMBOL LIHAT DETAIL */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        window.location.href =
                                            `/peta?detail=${place.id}`;
                                    }}
                                >
                                    Lihat Detail →
                                </button>

                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* MARKER GPS PENGGUNA */}
                {lokasiPengguna && (
                    <Marker
                        position={lokasiPengguna}
                        icon={icon}
                    >
                        <Popup>
                            Lokasi awal kamu
                        </Popup>
                    </Marker>
                )}

                {/* GARIS RUTE KENDARAAN */}
                {titikRute.length > 1 && (
                    <Polyline
                        positions={titikRute}
                        pathOptions={{
                            color: "#2563eb",
                            weight: 6,
                            opacity: 0.9,
                        }}
                    />
                )}

                <FokusPeta posisi={lokasiPengguna} />

                <FokusHasilPencarian
                    locations={focusLocations}
                    searchTerm={focusSearchTerm}
                    searchTrigger={searchTrigger}
                />

                <SesuaikanRute titikRute={titikRute} />

            </MapContainer>
        </>
    );
}

export default Map;
