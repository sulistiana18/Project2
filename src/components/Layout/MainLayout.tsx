import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export const MainLayout = () => {
  
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageTitles: Record<string, string> = {
    "/": "Home Page",
    "/dashboard": "Dashboard",
    "/Permohonan": "Permohonan Pelanggan",
    "/cekOrder": "Cek Gardu Terdekat",
    "/administrasi": "Administrasi",
    "/DataMaterial": "Data Material Teknik",
    "/setting": "Pengaturan",
    "/pasang-baru": "Pasang Baru",
    "/sambung-sementara": "Sambung Sementara",
    "/ubah-daya": "Ubah Daya",
    "/balik-nama": "Balik Nama",
    "/dataPermohonan": "Data Permohonan",
  };

  const currentTitle =
    pageTitles[location.pathname] || "Permohonan Pelanggan";

  const menuItems = [
    { path: "/Permohonan", label: "Permohonan" },
    { path: "/DataPermohonan", label: "Data Permohonan" },
    { path: "/Transaksi", label: "Transaksi" },
    { path: "/DataMaterial", label: "Data Material Teknik" },
    { path: "/DataMaterialTelTek", label: "Material Tel Tek" },
    { path: "/UserManagement", label: "User Management" },
    { path: "/setting", label: "Setting" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, Arial" }}>
      {/* ================= SIDEBAR ================= */}
      <aside
        style={{
          width: 260,
          background: "linear-gradient(180deg, #0f4c5c, #0b2f3a)",
          color: "#fff",
          padding: "28px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 36,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <img
          src="/src/assets/logo/pln-large.png"
          alt="Logo"
          style={{
            width: 150,
            margin: "0 auto",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,.3))",
          }}
        />

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  position: "relative",
                  padding: "12px 16px 12px 20px",
                  borderRadius: 10,
                  textDecoration: "none",
                  color: active ? "#0f172a" : "#e5f6fb",
                  background: active ? "#ffffff" : "transparent",
                  fontWeight: active ? 600 : 400,
                  transition: "all .25s ease",
                  boxShadow: active
                    ? "0 6px 14px rgba(0,0,0,.15)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(6px)";
                  e.currentTarget.style.background =
                    active ? "#ffffff" : "rgba(255,255,255,.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.background = active
                    ? "#ffffff"
                    : "transparent";
                }}
              >
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 8,
                      bottom: 8,
                      width: 4,
                      borderRadius: 4,
                      background: "#00c2ff",
                    }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f4f7fb" }}>
        {/* ================= HEADER ================= */}
        <header
          style={{
            padding: "18px 36px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <h1 style={{ fontSize: 24, margin: 0 }}>{currentTitle}</h1>
            <div
              style={{
                width: 60,
                height: 4,
                marginTop: 6,
                borderRadius: 8,
                background: "linear-gradient(90deg,#00c2ff,#0077ff)",
              }}
            />
          </div>

          {/* PROFILE */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#f1f5f9",
                padding: "8px 14px",
                borderRadius: 14,
                cursor: "pointer",
                transition: ".2s",
              }}
            >
              <img
                src="https://i.pravatar.cc/50?img=12"
                alt="profile"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1p solid #00c2ff",    
                }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Hendra</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  Manager Unit
                </div>
              </div>
            </div>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 10px)",
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 10px 25px rgba(0,0,0,.15)",
                  overflow: "hidden",
                  minWidth: 160,
                }}
              >
                {["Profile", "Settings"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    style={{
                      display: "block",
                      padding: "10px 14px",
                      textDecoration: "none",
                      color: "#0f172a",
                      fontSize: 14,
                    }}
                  >
                    {item}
                  </Link>
                ))}
                <button
                  onClick={() => alert("Logout berhasil!")}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "none",
                    background: "#f8fafc",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <main style={{ flex: 1, padding: 36, fontSize: 13 }}>
          <Outlet />
        </main>

        {/* ================= FOOTER ================= */}
        <footer
          style={{
            padding: 14,
            fontSize: 12,
            textAlign: "center",
            background: "#fff",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          © {new Date().getFullYear()} PT Perusahaan Listrik Nasional
        </footer>
      </div>
    </div>
  );
};
