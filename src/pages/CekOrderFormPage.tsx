import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Trafo {
  LOKASI: string;
  ALAMAT: string;
  NAMA_MATERIAL: string;
  KOORDINAT_X: string;
  KOORDINAT_Y: string;
}

const OrderFormPage: React.FC = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [nearbyTrafos, setNearbyTrafos] = useState<Trafo[]>([]);
  const [loadingTrafos, setLoadingTrafos] = useState<boolean>(false);

  const fetchNearbyTrafos = async (latitude: number, longitude: number) => {
    setLoadingTrafos(true);
    try {
      const res = await axios.get<Trafo[]>(
        `http://localhost:5000/api/materialTek/nearby?lat=${latitude}&lng=${longitude}&limit=100`
      );
      setNearbyTrafos(res.data);
    } catch (err) {
      console.error("Error fetching nearby trafos:", err);
      setNearbyTrafos([]);
    } finally {
      setLoadingTrafos(false);
    }
  };

  useEffect(() => {
    if (lat !== null && lng !== null) {
      fetchNearbyTrafos(lat, lng);
    }
  }, [lat, lng]);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Form Pemesanan</h2>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="nama">Nama Permohonan Pelanggan</label>
          <input
            type="text"
            id="nama"
            placeholder="Masukkan nama pelanggan..."
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="agenda">No Agenda</label>
          <input
            type="text"
            id="agenda"
            placeholder="Masukkan Nomor Induk Kependudukan..."
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="alamat">Alamat</label>
          <textarea
            id="alamat"
            placeholder="Masukkan alamat lengkap..."
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Daya">Daya</label>
          <input
            type="text"
            id="Daya"
            placeholder="Masukkan besarnya daya"
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Fasa">Fasa</label>
          <input
            type="text"
            id="Fasa"
            placeholder="Masukkan Fasa"
            autoComplete="off"
          />
        </div>

        {/* Input Latitude & Longitude */}
        <div className="form-group">
          <label htmlFor="latInput">Latitude</label>
          <input
            type="number"
            id="latInput"
            placeholder="Masukkan Latitude..."
            value={lat ?? ""}
            onChange={(e) => setLat(parseFloat(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lngInput">Longitude</label>
          <input
            type="number"
            id="lngInput"
            placeholder="Masukkan Longitude..."
            value={lng ?? ""}
            onChange={(e) => setLng(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Trafo Terdekat</h3>
        {loadingTrafos ? (
          <p>Loading...</p>
        ) : nearbyTrafos.length === 0 ? (
          <p>Tidak ada trafo terdekat</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={thStyle}>LOKASI</th>
                <th style={thStyle}>ALAMAT</th>
                <th style={thStyle}>NAMA_MATERIAL</th>
                <th style={thStyle}>KOORDINAT_X</th>
                <th style={thStyle}>KOORDINAT_Y</th>
              </tr>
            </thead>
            <tbody>
              {nearbyTrafos.map((t, idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#fff" : "#f9f9f9",
                  }}
                >
                  <td style={tdStyle}>{t.LOKASI}</td>
                  <td style={tdStyle}>{t.ALAMAT}</td>
                  <td style={tdStyle}>{t.NAMA_MATERIAL}</td>
                  <td style={tdStyle}>{t.KOORDINAT_X}</td>
                  <td style={tdStyle}>{t.KOORDINAT_Y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button className="btn-submit" style={{ marginTop: 20 }}>
        Simpan Data
      </button>
    </div>
  );
};

// Styles
const thStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};
const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default OrderFormPage;
