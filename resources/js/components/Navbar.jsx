
function Navbar() {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";

    return (
        <nav className="navbar">
            <h2>Batam Culture</h2>

            <div className="navbar-menu">
                <a
                    href="/"
                    style={{
                        color: path === "/" ? "#0782aa" : "#111827",
                        fontWeight: path === "/" ? 700 : 400
                    }}
                >
                    Beranda
                </a>

                <a
                    href="/peta"
                    style={{
                        color: path === "/peta" ? "#0782aa" : "#111827",
                        fontWeight: path === "/peta" ? 700 : 400
                    }}
                >
                    Peta
                </a>

                <a
                    href="/tentang"
                    style={{
                        color: path === "/tentang" ? "#0782aa" : "#111827",
                        fontWeight: path === "/tentang" ? 700 : 400
                    }}
                >
                    Tentang
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
