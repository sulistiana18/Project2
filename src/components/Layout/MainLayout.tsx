import { Link, Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          padding: "12px 24px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: 20, margin: 0 }}>INOVASI PERCEPATAN PASANG BARU</h1>
        <nav style={{ display: "flex", gap: 16 }}>
          <Link to="/">Home</Link>
          <Link to="/order">Form Pemesanan</Link>
        </nav>
      </header>

      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>

      <footer
        style={{
          padding: "12px 24px",
          borderTop: "1px solid #ddd",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} INOVASI PERCEPATAN PASANG BARU
      </footer>
    </div>
  );
};


