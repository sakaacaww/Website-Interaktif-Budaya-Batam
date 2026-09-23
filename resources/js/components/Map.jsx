import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function Map() {

    // Titik tengah Kota Batam
    const posisiBatam = [1.1301, 104.0530];

    // Batas wilayah tampilan peta
    const batasBatam = [
        [0.95, 103.80],
        [1.30, 104.25]
    ];

    return (
        <MapContainer
            center={posisiBatam}
            zoom={11}
            minZoom={10}
            maxZoom={15}
            maxBounds={batasBatam}
            maxBoundsViscosity={1.0}
            style={{
                height: "560px",
                width: "100%"
            }}
        >

            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={posisiBatam}>
                <Popup>
                    <strong>Kota Batam</strong>
                    <br />
                    Wilayah sebaran budaya Kepulauan Riau.
                </Popup>
            </Marker>

        </MapContainer>
    );
}

export default Map;