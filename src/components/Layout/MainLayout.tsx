import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export const MainLayout = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { path: "/", label: "Dashboard" },
    { path: "/order", label: "Order Pemesanan" },
    { path: "/cekOrder", label: "Cek Gardu Terdekat" },
    { path: "/administrasi", label: "Administrasi" },
    { path: "/DataMaterial", label: "DataMaterialTek" },
    { path: "/setting", label: "Setting" },
  ];

  // Close dropdown if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar freeze */}
      <aside
        style={{
          width: 240,
          background: "#111827",
          color: "#fff",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              margin: "0 auto 8px auto",
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(56,189,248,0.2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2563eb",
              fontWeight: "bold",
            }}
          >
            PB
          </div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Pasang Baru</h2>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#9ca3af" }}>
            Layanan on desk
          </p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: "9px 12px",
                borderRadius: 999,
                textDecoration: "none",
                color: location.pathname === item.path ? "#111827" : "#e5e7eb",
                backgroundColor: location.pathname === item.path ? "#f9fafb" : "transparent",
                fontWeight: location.pathname === item.path ? 600 : 400,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                transition: "background-color 0.15s ease, color 0.15s ease, transform 0.1s ease",
              }}
            >
              {item.label}
              {location.pathname === item.path && (
                <span style={{ width: 6, height: 6, borderRadius: "999px", background: "#2563eb" }} />
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f9fafb" }}>
        <header
          style={{
            padding: "14px 28px",
            borderBottom: "1px solid #e5e7eb",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: 0.2 }}>
            INOVASI PERCEPATAN PASANG BARU
          </span>

          {/* Corporate Profile */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#f3f4f6",
                padding: "6px 12px",
                borderRadius: 12,
                cursor: "pointer",
              }}
            >
              <img
                src="https://i.pravatar.cc/50?img=12"
                alt="profile"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #e5e7eb",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>John Doe</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>Manager Operasional</span>
              </div>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  minWidth: 150,
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link
                  to="/profile"
                  style={{
                    padding: "8px 12px",
                    textDecoration: "none",
                    color: "#111827",
                    fontSize: 14,
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  style={{
                    padding: "8px 12px",
                    textDecoration: "none",
                    color: "#111827",
                    fontSize: 14,
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  Settings
                </Link>
                <button
                  onClick={() => alert("Logout berhasil!")} // bisa diganti logic logout
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: 14,
                  color: "#ef4444",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
          <Outlet />
        </main>

        <footer
          style={{
            padding: "12px 24px",
            borderTop: "1px solid #e5e7eb",
            fontSize: 12,
            textAlign: "center",
            background: "#fff",
            color: "#6b7280",
          }}
        >
          © {new Date().getFullYear()} PT X
        </footer>
      </div>
    </div>
  );
};
