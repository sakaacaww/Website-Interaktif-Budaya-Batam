
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap
} from "react-leaflet";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const icon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const culturalLocations = [
    {
        id: 1,
        name: "Rumah Limas Potong",
        category: "Bangunan Bersejarah",
        position: [1.150510, 104.132119],
        image: "/images/rumah-limas-potong.jpg",
        description:
            "Rumah tradisional Melayu yang menjadi salah satu warisan budaya di Kota Batam."
    },
    {
        id: 2,
        name: "Desa Wisata",
        category: "Wisata Budaya",
        position: [1.156321, 104.084210],
        image: "/images/desa-wisata.jpg",
        description:
            "Informasi mengenai desa wisata dan potensi budaya di Kota Batam."
    },
    {
        id: 3,
        name: "Museum Kota Batam",
        category: "Museum",
        position: [1.10, 104.04],
        image: "/images/museum-batam.jpg",
        description:
            "Informasi museum dan sejarah budaya Kota Batam."
    }
];

// Menyesuaikan peta agar seluruh rute terlihat
function SesuaikanRute({ titikRute }) {
    const map = useMap();

    useEffect(() => {
        if (titikRute.length > 1) {
            map.fitBounds(titikRute, {
                padding: [35, 35],
                maxZoom: 15
            });
        }
    }, [map, titikRute]);

    return null;
}

function Map() {
    const batamBounds = [
        [0.98, 103.85],
        [1.28, 104.20]
    ];

    // Membaca ID tujuan dari tombol Lihat Rute
    const params = new URLSearchParams(window.location.search);
    const idRute = params.get("rute");

    const tujuan = culturalLocations.find(
        (place) => String(place.id) === idRute
    );

    const [lokasiPengguna, setLokasiPengguna] = useState(null);
    const [titikRute, setTitikRute] = useState([]);
    const [pesanRute, setPesanRute] = useState("");

    // Mengambil lokasi GPS pengguna
    useEffect(() => {
        if (!idRute) return;

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
                    posisi.coords.longitude
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
                        signal: controller.signal
                    });

                    if (!response.ok) {
                        throw new Error("Layanan rute tidak tersedia.");
                    }

                    const data = await response.json();

                    if (data.code !== "Ok" || !data.routes?.length) {
                        throw new Error("Rute kendaraan tidak ditemukan.");
                    }

                    const hasil = data.routes[0];

                    // OSRM memberi [longitude, latitude].
                    // Leaflet membutuhkan [latitude, longitude].
                    const koordinat = hasil.geometry.coordinates.map(
                        ([lng, lat]) => [lat, lng]
                    );

                    if (!aktif) return;

                    setTitikRute(koordinat);

                    const jarakKm = (
                        hasil.distance / 1000
                    ).toFixed(1);

                    const menit = Math.round(hasil.duration / 60);

                    setPesanRute(
                        `Rute ke ${tujuan.name}: ${jarakKm} km, sekitar ${menit} menit.`
                    );
                } catch (error) {
                    if (aktif && error.name !== "AbortError") {
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
                maximumAge: 0
            }
        );

        return () => {
            aktif = false;
            controller.abort();
        };
    }, [idRute]);

    return (
        <>
            {/* Informasi hanya muncul ketika rute dipilih */}
            {idRute && (
                <p style={{ margin: "0 0 8px", color: "#394959" }}>
                    {pesanRute}
                    {" "}
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
                             cursor: "pointer"
                            }}
                        >
                         ✕ Tutup Rute
                    </button>
                </p>
            )}

            <MapContainer
                center={
                    lokasiPengguna ||
                    tujuan?.position ||
                    [1.1300, 104.0500]
                }
                zoom={13}
                minZoom={12}
                maxZoom={17}
                scrollWheelZoom={true}
                maxBounds={batamBounds}
                maxBoundsViscosity={1.0}
                style={{
                    width: "100%",
                    height: "560px"
                }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {culturalLocations.map((place) => (
                    <Marker
                        key={place.id}
                        position={place.position}
                        icon={icon}
                    >
                        <Popup className="budaya-popup">
                            <div className="popup-budaya">
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    className="popup-budaya-image"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />

                                <h3>{place.name}</h3>
                                <p>{place.category}</p>

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

                {/* Marker lokasi GPS pengguna */}
                {lokasiPengguna && (
                    <Marker
                        position={lokasiPengguna}
                        icon={icon}
                    >
                        <Popup>Lokasi awal kamu</Popup>
                    </Marker>
                )}

                {/* Garis rute kendaraan berwarna biru */}
                {titikRute.length > 1 && (
                    <Polyline
                        positions={titikRute}
                        pathOptions={{
                            color: "#2563eb",
                            weight: 6,
                            opacity: 0.9
                        }}
                    />
                )}

                <SesuaikanRute titikRute={titikRute} />
            </MapContainer>
        </>
    );
}

export default Map;