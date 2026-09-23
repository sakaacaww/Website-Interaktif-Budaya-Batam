import Navbar from "../components/Navbar";
import Map from "../components/Map";

function Home() {
    return (
        <div className="home">

            <Navbar />

            <section className="map-header">

                <div className="header-badge">
                    ✦ WARISAN BUDAYA KEPULAUAN RIAU
                </div>

                <h1>
                    Jelajahi Budaya
                    <span> Kota Batam</span>
                </h1>

                <p className="header-description">
                    Temukan berbagai seni, tradisi, dan warisan budaya
                    khas Kepulauan Riau yang tersebar di Kota Batam
                    melalui peta interaktif.
                </p>

                <div className="category-list">
                    <div className="category-item">
                        🎭
                        <span>Seni</span>
                    </div>

                    <div className="category-item">
                        🪕
                        <span>Tradisi</span>
                    </div>

                    <div className="category-item">
                        📜
                        <span>Sejarah</span>
                    </div>

                    <div className="category-item">
                        🍽️
                        <span>Kuliner</span>
                    </div>
                </div>

            </section>

            <section className="map-wrapper">

                <div className="map-title">
                    <div>
                        <span>📍 PETA SEBARAN</span>

                        <h2>
                            Temukan Budaya di Sekitarmu
                        </h2>
                    </div>

                    <p>
                        Klik marker pada peta untuk
                        melihat informasi budaya.
                    </p>
                </div>

                <div className="map-card">
                    <Map />
                </div>

            </section>

            <section className="info-section">

                <div className="info-card">
                    <div className="info-icon">📍</div>

                    <div>
                        <strong>Lokasi Budaya</strong>
                        <p>
                            Jelajahi lokasi budaya yang
                            tersebar di Kota Batam.
                        </p>
                    </div>
                </div>

                <div className="info-card">
                    <div className="info-icon">📖</div>

                    <div>
                        <strong>Informasi Budaya</strong>
                        <p>
                            Kenali sejarah dan informasi
                            budaya Kepulauan Riau.
                        </p>
                    </div>
                </div>

                <div className="info-card">
                    <div className="info-icon">🌊</div>

                    <div>
                        <strong>Kepulauan Riau</strong>
                        <p>
                            Mengenal kekayaan budaya
                            masyarakat Melayu.
                        </p>
                    </div>
                </div>

            </section>

        </div>
    );
}

export default Home;