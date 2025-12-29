import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoverBtn, setHoverBtn] = useState(false);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        backgroundColor: "#00a9ce",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Garis dekoratif (SAMA dengan HomePage) */}
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

      {/* Card Login */}
      <div
        style={{
          width: "380px",
          backgroundColor: "#fff",
          color: "#114152",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          zIndex: 1,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>
          Login
        </h2>

        <p style={{ textAlign: "center", marginBottom: "24px", fontSize: "14px" }}>
          Silakan masuk untuk melanjutkan
        </p>

        {/* Email */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "14px", fontWeight: 600 }}>
            Email
          </label>
          <input
            type="email"
            placeholder="email@contoh.com"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "6px",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ fontSize: "14px", fontWeight: 600 }}>
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "6px",
            }}
          />
        </div>

        {/* Button Login */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: hoverBtn ? "#114152ff" : "#00a9ce",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
          onClick={() => navigate("/permohonan")}
        >
          Login
        </button>

        {/* Back to Home */}
        <p
          style={{
            textAlign: "center",
            marginTop: "16px",
            fontSize: "14px",
            cursor: "pointer",
            color: "#00a9ce",
          }}
          onClick={() => navigate("/")}
        >
          ← Kembali ke Home
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
