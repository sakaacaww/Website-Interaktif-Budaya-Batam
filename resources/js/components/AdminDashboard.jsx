
export default function AdminDashboard() {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h2>Batam Culture</h2>
                <p>ADMIN PANEL</p>

                <nav>
                    <a className="active" href="/admin/dashboard">
                        ⌂ Dashboard
                    </a>
                    <a href="/admin/tempat">
                        ⌖ Data Tempat
                    </a>
                    <a href="/admin/kategori">
                        ▤ Kategori
                    </a>
                </nav>

                <form action="/admin/logout" method="POST">
                    <input
                        type="hidden"
                        name="_token"
                        value={
                            document.querySelector(
                                'meta[name="csrf-token"]'
                            )?.content || ""
                        }
                    />
                    <button type="submit">Logout</button>
                </form>
            </aside>

            <main className="admin-content">
                <h1>Dashboard Admin</h1>
                <p>
                    Selamat datang, {window.adminUser?.name || "Administrator"}.
                    Kelola informasi budaya Kota Batam di sini.
                </p>

                <h2>Ringkasan Data</h2>

                <div className="admin-cards">
                    <article className="admin-card">
                        <span>📍</span>
                        <p>Total Tempat</p>
                        <strong>0</strong>
                    </article>

                    <article className="admin-card">
                        <span>🕌</span>
                        <p>Rumah Ibadah</p>
                        <strong>0</strong>
                    </article>

                    <article className="admin-card">
                        <span>🎭</span>
                        <p>Seni & Pertunjukan</p>
                        <strong>0</strong>
                    </article>

                    <article className="admin-card">
                        <span>🏛️</span>
                        <p>Museum & Sejarah</p>
                        <strong>0</strong>
                    </article>
                </div>

                <section className="admin-table-card">
                    <h2>Data Tempat Terbaru</h2>
                    <p>Daftar tempat budaya yang dikelola.</p>

                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nama Tempat</th>
                                <th>Kategori</th>
                                <th>Lokasi</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="5">
                                    Belum ada data tempat.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
