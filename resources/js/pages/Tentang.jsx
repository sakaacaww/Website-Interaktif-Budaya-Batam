
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Tentang() {
    return (
        <>
            <Navbar />

            <main className="tentang-page">
                {/* Hero */}
                <section className="tentang-hero">
                    <span className="tentang-label">
                        MENGENAL BUDAYA KITA
                    </span>

                    <h1>Tentang Budaya Batam</h1>

                    <p>
                        Mengenal, menjaga, dan melestarikan kekayaan
                        seni serta budaya Kepulauan Riau di Kota Batam.
                    </p>
                </section>

                {/* Informasi Website */}
                <section className="tentang-content">
                    <span className="tentang-subtitle">
                        TENTANG WEBSITE
                    </span>

                    <h2>
                        Jelajahi Kekayaan Budaya Kepulauan Riau
                    </h2>

                    <p>
                        Website ini merupakan media informasi interaktif
                        untuk mengenalkan berbagai seni, tradisi, sejarah,
                        dan kebudayaan khas Kepulauan Riau yang terdapat
                        di Kota Batam.
                    </p>

                    <p>
                        Melalui peta interaktif, pengunjung dapat mengetahui
                        lokasi budaya serta memperoleh informasi mengenai
                        sejarah dan keunikan budaya daerah.
                    </p>
                </section>

                {/* Tujuan Website */}
                <section className="tentang-tujuan">
                    <h2>Tujuan Website</h2>

                    <div className="tujuan-list">
                        <article>
                            <h3>📍 Informasi Lokasi</h3>
                            <p>
                                Menampilkan persebaran lokasi seni dan
                                budaya di Kota Batam.
                            </p>
                        </article>

                        <article>
                            <h3>🎨 Pengenalan Budaya</h3>
                            <p>
                                Menyediakan informasi tentang seni,
                                tradisi, dan sejarah budaya daerah.
                            </p>
                        </article>

                        <article>
                            <h3>🌿 Pelestarian Budaya</h3>
                            <p>
                                Meningkatkan kepedulian masyarakat
                                terhadap warisan budaya.
                            </p>
                        </article>
                    </div>
                </section>
            </main>

           
            <Footer />
        </>
    );
}
