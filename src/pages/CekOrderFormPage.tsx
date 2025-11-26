import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Trafo {
  
  NAMA_MATERIAL: string;
  KOORDINAT_X: string;
  KOORDINAT_Y: string;
}

const CekOrderFormPage: React.FC = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [nearbyTrafos, setNearbyTrafos] = useState<Trafo[]>([]);
  const [loadingTrafos, setLoadingTrafos] = useState<boolean>(false);

  const fetchNearbyTrafos = async (latitude: number, longitude: number) => {
    setLoadingTrafos(true);
    try {
      const res = await axios.get<Trafo[]>(
        `http://localhost:5000/api/materialTek/nearby?lat=${latitude}&lng=${longitude}&limit=1000`
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
    <div className="page">
      <div className="page-card">
        <h2 className="page-title" style={{ textAlign: "left" }}>
          Cek Gardu Terdekat
        </h2>
        <p className="page-subtitle">
          Masukkan koordinat latitude dan longitude untuk melihat daftar trafo terdekat.
        </p>

        <div className="form-container">

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

        <div style={{ marginTop: 24 }}>
          <div className="table-caption">Trafo Terdekat</div>
          {loadingTrafos ? (
            <p>Loading...</p>
          ) : nearbyTrafos.length === 0 ? (
            <p style={{ color: "#6b7280" }}>Tidak ada trafo terdekat</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>NAMA_MATERIAL</th>
                  <th>KOORDINAT_X</th>
                  <th>KOORDINAT_Y</th>
                </tr>
              </thead>
              <tbody>
                {nearbyTrafos.map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.NAMA_MATERIAL}</td>
                    <td>{t.KOORDINAT_X}</td>
                    <td>{t.KOORDINAT_Y}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 24 }}>
          <button className="btn-submit">
            Simpan Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default CekOrderFormPage;
