import Navbar from "../components/Navbar";
import Map from "../components/Map";

function Peta() {
    return (
        <>
            <Navbar />

            <main className="peta-container">

                <div className="peta-header">
                    <div className="peta-label">
                        📍 PETA SEBARAN BUDAYA
                    </div>

                    <h1>Peta Interaktif Kota Batam</h1>

                    <p>
                        Jelajahi lokasi seni, tradisi, sejarah, dan budaya
                        yang terdapat di Kota Batam.
                    </p>
                </div>

                <div className="search-box">
                    <span>🔍</span>

                    <input
                        type="text"
                        placeholder="Cari Tempat atau Lokasi"
                    />
                </div>

                <div className="filter-list">

                    <button type="button">
                        🏠 Rumah Ibadah
                    </button>

                    <button type="button">
                        🎭 Seni & Pertunjukan
                    </button>

                    <button type="button">
                        🏛️ Museum
                    </button>

                    <button type="button">
                        🏛️ Bangunan Bersejarah
                    </button>

                    <button type="button">
                        📍 Lainnya
                    </button>

                </div>

                <div className="interactive-map">
                    <Map />
                </div>

            </main>
        </>
    );
}

export default Peta;