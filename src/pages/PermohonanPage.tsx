import React from "react";
import { useNavigate } from "react-router-dom";

const cardStyle: React.CSSProperties = {
  background: "#2596be",
  color: "#ffffff",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const PermohonanPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {/* Card 1 */}
        <div
          style={cardStyle}
          onClick={() => navigate("/pasang-baru")}
        >
          <h3 style={{ marginBottom: 8 }}>Pasang Baru</h3>
          <p>Pengajuan pemasangan listrik baru</p>
        </div>

        {/* Card 2 */}
        <div
          style={cardStyle}
          onClick={() => navigate("/sambung-sementara")}
        >
          <h3 style={{ marginBottom: 8 }}>Sambung Sementara</h3>
          <p>Layanan sambung listrik sementara</p>
        </div>

        {/* Card 3 */}
        <div
          style={cardStyle}
          onClick={() => navigate("/ubah-daya")}
        >
          <h3 style={{ marginBottom: 8 }}>Ubah Daya</h3>
          <p>Pengajuan perubahan daya</p>
        </div>

        {/* Card 4 */}
        <div
          style={cardStyle}
          onClick={() => navigate("/balik-nama")}
        >
          <h3 style={{ marginBottom: 8 }}>Balik Nama</h3>
          <p>Pengajuan balik nama pelanggan</p>
        </div>
      </div>
    </div>
  );
};

export default PermohonanPage;
