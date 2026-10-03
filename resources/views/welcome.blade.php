<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Batam Culture</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #ffffff;
            color: #111827;
        }

        /* =========================
           NAVBAR
        ========================= */

        .navbar {
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 8%;
            background: #ffffff;
            border-bottom: 1px solid #eeeeee;
        }

        .logo {
            font-size: 21px;
            font-weight: 700;
            color: #087ea4;
        }

        .nav-menu {
            display: flex;
            align-items: center;
            gap: 40px;
        }

        .nav-menu a {
            text-decoration: none;
            color: #222;
            font-size: 14px;
            font-weight: 500;
            transition: 0.3s;
        }

        .nav-menu a:hover {
            color: #087ea4;
        }

        .nav-menu a.active {
            color: #087ea4;
            font-weight: 700;
        }

        /* =========================
           HERO
        ========================= */

        .hero {
            min-height: 420px;
            background: linear-gradient(
                90deg,
                #f3fbfd 0%,
                #e9f8fb 55%,
                #d3f1f5 100%
            );

            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 60px 8%;
            gap: 50px;
        }

        .hero-content {
            width: 50%;
        }

        .hero-small {
            display: inline-block;
            padding: 7px 13px;
            border-radius: 20px;
            background: #dff4f7;
            color: #087ea4;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.5px;
            margin-bottom: 18px;
        }

        .hero-title {
            font-size: 46px;
            line-height: 1.15;
            font-weight: 700;
            margin-bottom: 20px;
        }

        .hero-title span {
            color: #087ea4;
        }

        .hero-description {
            max-width: 520px;
            font-size: 15px;
            line-height: 1.8;
            color: #5d6970;
            margin-bottom: 28px;
        }

        .btn-map {
            display: inline-flex;
            align-items: center;
            gap: 12px;

            padding: 13px 22px;
            border-radius: 8px;

            background: #087ea4;
            color: white;

            text-decoration: none;
            font-size: 14px;
            font-weight: 600;

            transition: 0.3s;
        }

        .btn-map:hover {
            background: #066b8b;
            transform: translateY(-2px);
        }

        /* =========================
           HERO IMAGE
        ========================= */

        .hero-image {
            width: 45%;
            display: flex;
            justify-content: center;
        }

        .hero-image-box {
            width: 100%;
            max-width: 520px;
            height: 290px;

            border-radius: 18px;
            overflow: hidden;

            background: #d8eef2;
            box-shadow: 0 15px 35px rgba(0, 90, 110, 0.12);
        }

        .hero-image-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        /* =========================
           POPULAR SECTION
        ========================= */

        .popular {
            padding: 55px 8% 70px;
            background: #ffffff;
        }

        .section-title {
            margin-bottom: 28px;
        }

        .section-title small {
            color: #087ea4;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .section-title h2 {
            font-size: 26px;
            margin-top: 7px;
        }

        .popular-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 22px;
        }

        /* =========================
           CARD
        ========================= */

        .culture-card {
            background: #ffffff;
            border: 1px solid #e7eeee;
            border-radius: 12px;
            overflow: hidden;

            box-shadow: 0 5px 18px rgba(0, 0, 0, 0.05);

            transition: 0.3s;
        }

        .culture-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.09);
        }

        .culture-image {
            width: 100%;
            height: 170px;
            overflow: hidden;
            background: #e9f5f7;
        }

        .culture-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.4s;
        }

        .culture-card:hover .culture-image img {
            transform: scale(1.05);
        }

        .culture-content {
            padding: 17px;
        }

        .culture-category {
            color: #087ea4;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 7px;
        }

        .culture-content h3 {
            font-size: 16px;
            margin-bottom: 8px;
        }

        .culture-content p {
            color: #6b7280;
            font-size: 12px;
            line-height: 1.6;
        }

        .detail-link {
            display: inline-block;
            margin-top: 12px;
            color: #087ea4;
            font-size: 12px;
            font-weight: 600;
            text-decoration: none;
        }

        .detail-link:hover {
            text-decoration: underline;
        }

        /* =========================
           FOOTER
        ========================= */

        .footer {
            background: #f4fafb;
            padding: 25px 8%;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 900px) {

            .navbar {
                padding: 0 5%;
            }

            .hero {
                padding: 50px 5%;
                flex-direction: column;
                align-items: flex-start;
            }

            .hero-content {
                width: 100%;
            }

            .hero-image {
                width: 100%;
            }

            .popular {
                padding-left: 5%;
                padding-right: 5%;
            }

            .popular-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 600px) {

            .navbar {
                height: auto;
                padding: 20px 5%;
                flex-direction: column;
                gap: 15px;
            }

            .nav-menu {
                gap: 20px;
            }

            .hero-title {
                font-size: 34px;
            }

            .hero-image-box {
                height: 230px;
            }

            .popular-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>

    <!-- =========================
         NAVBAR
    ========================== -->

    <nav class="navbar">

        <div class="logo">
            Batam Culture
        </div>

        <div class="nav-menu">

            <a href="{{ url('/') }}" class="active">
                Beranda
            </a>

            <a href="{{ url('/peta') }}">
                Peta
            </a>

            <a href="{{ url('/tentang') }}">
                Tentang
            </a>

        </div>

    </nav>


    <!-- =========================
         HERO
    ========================== -->

    <section class="hero">

        <div class="hero-content">

            <div class="hero-small">
                ✦ WARISAN BUDAYA KEPULAUAN RIAU
            </div>

            <h1 class="hero-title">
                Jelajahi<br>
                Seni dan Budaya<br>
                <span>Kota Batam</span>
            </h1>

            <p class="hero-description">
                Temukan berbagai seni, tradisi, makanan, dan warisan
                budaya khas Kepulauan Riau yang tersebar di Kota Batam.
            </p>

            <a href="{{ url('/peta') }}" class="btn-map">
                Lihat Peta
                <span>→</span>
            </a>

        </div>


        <!-- GAMBAR KEBUDAYAAN -->

        <div class="hero-image">

            <div class="hero-image-box">

                <img
                   src="{{ asset('images/Budaya.batam.jpg') }}"
                 alt="Kebudayaan Kota Batam"
                >

            </div>

        </div>

    </section>


    <!-- =========================
         TEMPAT POPULER
    ========================== -->

    <section class="popular">

        <div class="section-title">

            <small>✦ TEMPAT POPULER</small>

            <h2>
                Jelajahi Budaya Kota Batam
            </h2>

        </div>


        <div class="popular-grid">


            <!-- CARD 1 -->

            <div class="culture-card">

                <div class="culture-image">

                    <img
                        src="{{ asset('images/budaya-1.jpg') }}"
                        alt="Budaya Melayu Batam"
                    >

                </div>

                <div class="culture-content">

                    <div class="culture-category">
                        Tradisi
                    </div>

                    <h3>
                        Budaya Melayu
                    </h3>

                    <p>
                        Mengenal tradisi dan warisan budaya Melayu
                        yang berkembang di Kota Batam.
                    </p>

                    <a href="{{ url('/peta') }}" class="detail-link">
                        Lihat detail →
                    </a>

                </div>

            </div>


            <!-- CARD 2 -->

            <div class="culture-card">

                <div class="culture-image">

                    <img
                        src="{{ asset('images/budaya-2.jpg') }}"
                        alt="Seni Tradisional Batam"
                    >

                </div>

                <div class="culture-content">

                    <div class="culture-category">
                        Seni
                    </div>

                    <h3>
                        Seni Tradisional
                    </h3>

                    <p>
                        Temukan berbagai kesenian tradisional
                        yang menjadi bagian dari identitas Batam.
                    </p>

                    <a href="{{ url('/peta') }}" class="detail-link">
                        Lihat detail →
                    </a>

                </div>

            </div>


            <!-- CARD 3 -->

            <div class="culture-card">

                <div class="culture-image">

                    <img
                        src="{{ asset('images/budaya-3.jpg') }}"
                        alt="Kuliner Batam"
                    >

                </div>

                <div class="culture-content">

                    <div class="culture-category">
                        Kuliner
                    </div>

                    <h3>
                        Kuliner Khas Batam
                    </h3>

                    <p>
                        Kenali berbagai makanan khas yang menjadi
                        bagian dari kekayaan budaya Kota Batam.
                    </p>

                    <a href="{{ url('/peta') }}" class="detail-link">
                        Lihat detail →
                    </a>

                </div>

            </div>


            <!-- CARD 4 -->

            <div class="culture-card">

                <div class="culture-image">

                    <img
                        src="{{ asset('images/budaya-4.jpg') }}"
                        alt="Sejarah Batam"
                    >

                </div>

                <div class="culture-content">

                    <div class="culture-category">
                        Sejarah
                    </div>

                    <h3>
                        Sejarah Batam
                    </h3>

                    <p>
                        Mengenal sejarah dan perkembangan budaya
                        masyarakat di Kota Batam.
                    </p>

                    <a href="{{ url('/peta') }}" class="detail-link">
                        Lihat detail →
                    </a>

                </div>

            </div>

        </div>

    </section>


    <!-- =========================
         FOOTER
    ========================== -->

    <footer class="footer">

        <p>
            © {{ date('Y') }} Batam Culture.
            Sebaran dan Informasi Seni & Budaya Khas Kepulauan Riau di Kota Batam.
        </p>

    </footer>

</body>
</html> 