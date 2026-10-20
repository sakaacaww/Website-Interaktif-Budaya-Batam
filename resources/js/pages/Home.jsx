
import Navbar from "../components/Navbar";

function Home() {
    const budaya = [
        {
            kategori: "Tradisi",
            nama: "Budaya Melayu",
            deskripsi:
                "Mengenal tradisi dan warisan budaya Melayu yang berkembang di Kota Batam.",
            gambar: "/images/budaya-1.jpg",
        },
        {
            kategori: "Seni",
            nama: "Seni Tradisional",
            deskripsi:
                "Temukan berbagai kesenian tradisional yang menjadi bagian dari identitas Batam.",
            gambar: "/images/budaya-2.jpg",
        },
        {
            kategori: "Kuliner",
            nama: "Kuliner Khas Batam",
            deskripsi:
                "Kenali makanan khas yang menjadi bagian dari kekayaan budaya Kota Batam.",
            gambar: "/images/budaya-3.jpg",
        },
        {
            kategori: "Sejarah",
            nama: "Sejarah Batam",
            deskripsi:
                "Mengenal sejarah dan perkembangan budaya masyarakat di Kota Batam.",
            gambar: "/images/budaya-4.jpg",
        },
    ];

    return (
        <div className="bc-home">
            <Navbar />

            {/* HERO */}
            <section className="bc-hero">
                <div className="bc-hero-content">
                    <div className="bc-hero-badge">
                        ✦ WARISAN BUDAYA KEPULAUAN RIAU
                    </div>

                    <h1 className="bc-hero-title">
                        Jelajahi
                        <br />
                        Seni dan Budaya
                        <br />
                        <span>Kota Batam</span>
                    </h1>

                    <p className="bc-hero-description">
                        Temukan berbagai seni, tradisi, makanan, dan
                        warisan budaya khas Kepulauan Riau yang
                        tersebar di Kota Batam.
                    </p>

                    <a href="/peta" className="bc-map-button">
                        Lihat Peta <span>→</span>
                    </a>
                </div>

                <div className="bc-hero-image">
                    <img
                        src="/images/museum-batam.jpg"
                        alt="Warisan budaya Kota Batam"
                    />
                </div>
            </section>

            {/* BUDAYA POPULER */}
            <section className="bc-popular">
                <div className="bc-section-heading">
                    <span>✦ TEMPAT POPULER</span>
                    <h2>Jelajahi Budaya Kota Batam</h2>
                </div>

                <div className="bc-culture-grid">
                    {budaya.map((item) => (
                        <article
                            className="bc-culture-card"
                            key={item.kategori}
                        >
                            <div className="bc-culture-image">
                                <img
                                    src={item.gambar}
                                    alt={item.nama}
                                    loading="lazy"
                                />
                            </div>

                            <div className="bc-culture-content">
                                <span className="bc-culture-category">
                                    {item.kategori}
                                </span>

                                <h3>{item.nama}</h3>

                                <p>{item.deskripsi}</p>

                                <a
                                    href="/peta"
                                    className="bc-detail-link"
                                >
                                    Lihat detail →
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bc-footer">
                <p>
                    © {new Date().getFullYear()} Batam Culture.
                    Sebaran dan Informasi Seni &amp; Budaya Khas
                    Kepulauan Riau di Kota Batam.
                </p>
            </footer>
        </div>
    );
}

export default Home;
