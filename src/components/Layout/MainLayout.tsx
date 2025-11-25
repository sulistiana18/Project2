import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export const MainLayout = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { path: "/", label: "Dashboard" },
    { path: "/order", label: "Order Pemesanan" },
    { path: "/administrasi", label: "Administrasi" },
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
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar freeze */}
      <aside
        style={{
          width: 240,
          background: "#1f2937",
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
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          LOGO PERUSAHAAN
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: "10px 14px",
                borderRadius: 6,
                textDecoration: "none",
                color: location.pathname === item.path ? "#1f2937" : "#fff",
                backgroundColor: location.pathname === item.path ? "#fff" : "transparent",
                fontWeight: location.pathname === item.path ? "bold" : "normal",
                transition: "0.2s",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f9fafb" }}>
        <header
          style={{
            padding: "16px 32px",
            borderBottom: "1px solid #ddd",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: 22, fontWeight: "bold" }}>
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
                  border: "2px solid #1f2937",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: "bold", fontSize: 14 }}>John Doe</span>
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
                  border: "1px solid #ddd",
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
                    color: "#111",
                    fontSize: 14,
                    borderBottom: "1px solid #eee",
                  }}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  style={{
                    padding: "8px 12px",
                    textDecoration: "none",
                    color: "#111",
                    fontSize: 14,
                    borderBottom: "1px solid #eee",
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
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
          <Outlet />
        </main>

        <footer
          style={{
            padding: "12px 24px",
            borderTop: "1px solid #ddd",
            fontSize: 12,
            textAlign: "center",
            background: "#fff",
          }}
        >
          © {new Date().getFullYear()} PT X
        </footer>
      </div>
    </div>
  );
};
