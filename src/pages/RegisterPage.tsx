import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [hoverBtn, setHoverBtn] = useState(false);
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#00a9ce",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <h2
          style={{
            textAlign: "center",
            color: "#114152",
            marginBottom: "8px",
            fontSize: "28px",
          }}
        >
          Registrasi Akun
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
            marginBottom: "24px",
          }}
        >
          Daftar untuk menggunakan layanan PLN
        </p>

        {/* Form */}
        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Nama */}
          <div>
            <label style={labelStyle}>Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>Password</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "8px",
                paddingRight: "8px",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  borderRadius: "8px",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#00a9ce",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "4px 6px",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="button"
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            style={{
              marginTop: "12px",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: hoverBtn ? "#114152" : "#00a9ce",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => navigate("/permohonan")}
            
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#666",
            marginTop: "20px",
          }}
        >
          Sudah punya akun?{" "}
          <span
            style={{
              color: "#00a9ce",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

/* ===== Reusable Styles ===== */

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: 600,
  color: "#114152",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
};

export default RegisterPage;
