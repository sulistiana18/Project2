import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [hoverBtn, setHoverBtn] = useState<string | null>(null);
  const navigate = useNavigate();

  const buttonStyle = (type: string) => ({
    padding: "12px 24px",
    borderRadius: "8px",
    backgroundColor: hoverBtn === type ? "#114152ff" : "#fff",
    color: hoverBtn === type ? "#fff" : "#00a9ce",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        backgroundColor: "#00a9ce",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Garis dekoratif */}
      <svg
        style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: "100%" }}
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
      >
        <path
          d="M0 300 Q400 400 800 300 L800 600 L0 600 Z"
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M0 350 Q400 450 800 350 L800 600 L0 600 Z"
          fill="rgba(255,255,255,0.08)"
        />
      </svg>

      {/* Kiri - teks */}
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: "42px", fontWeight: 700, marginBottom: "16px" }}>
          Mulai Pengalaman Baru Bersama Layanan PLN
        </h1>

        <p
          style={{
            fontSize: "18px",
            maxWidth: "400px",
            lineHeight: 1.6,
            marginBottom: "24px",
          }}
        >
          Permohonan layanan kelistrikan dan kebutuhan rumah kini lebih mudah,
          cepat, dan terintegrasi melalui website PLN.
        </p>

        <div style={{ display: "flex", gap: "16px" }}>
          {/* REGISTER */}
          <button
            style={buttonStyle("register")}
            onMouseEnter={() => setHoverBtn("register")}
            onMouseLeave={() => setHoverBtn(null)}
            onClick={() => navigate("/register")}
          >
            Register
          </button>

          {/* LOGIN */}
          <button
            style={buttonStyle("login")}
            onMouseEnter={() => setHoverBtn("login")}
            onMouseLeave={() => setHoverBtn(null)}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* Kanan - ilustrasi */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", zIndex: 1 }}>
        <img
          src="/src/assets/illustration/hp2.png"
          alt="PLN Mobile"
          style={{ maxWidth: "400px" }}
        />
      </div>
    </div>
  );
};

export default HomePage;
