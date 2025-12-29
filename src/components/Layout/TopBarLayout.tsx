import React from "react";
import { Outlet, Link } from "react-router-dom";

const TopBarLayout: React.FC = () => {
  const baseButtonStyle: React.CSSProperties = {
    padding: "0px 0px",
    borderRadius: "0px",
    fontWeight: 600,
    textDecoration: "none",
    border: "1px solid #1e40af",
    display: "inline-block",
    transition: "all 0.25s ease",
    cursor: "pointer",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* TOP BAR */}
      <header
        style={{
          height: "60px",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          padding: "5px 20px",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO KIRI */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/src/assets/logo/pln-large.png"
            alt="Logo Perusahaan"
            style={{ width: 140 }}
          />
        </div>

        {/* TOMBOL KANAN 
        <nav style={{ display: "flex", gap: "12px" }}>
          {/* REGISTRASI 
          <Link
            to="/registrasi"
            style={{
              ...baseButtonStyle,
              backgroundColor: "#ffffff",
              color: "#1e40af",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1e40af";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(30,64,175,0.35)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.color = "#1e40af";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Registrasi
          </Link> 

          {/* LOGIN 
          <Link
            to="/login"
            style={{
              ...baseButtonStyle,
              backgroundColor: "#1e40af",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1e3a8a";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(30,64,175,0.45)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1e40af";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Login
          </Link>
        </nav> */}
      </header>
      

      {/* PAGE CONTENT */}
      <main style={{ flex: 1, padding: "0px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default TopBarLayout;
