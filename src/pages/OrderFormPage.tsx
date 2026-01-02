import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGooglePlacesMap } from "../hooks/useGooglePlacesMap";
import { GOOGLE_MAPS_API_KEY } from "../utils/constants";

/* ================= INTERFACE ================= */
interface Trafo {
  LOKASI: string;
  ALAMAT: string;
  NAMA_MATERIAL: string;
  DAYA: string;
  FASA: string;
  TEGANGAN: string;
  JENIS: string;
  KONDISI: string;
  KOORDINAT_X: string;
  KOORDINAT_Y: string;
}

/* ================= COMPONENT ================= */
const OrderFormPage: React.FC = () => {
  useGooglePlacesMap(GOOGLE_MAPS_API_KEY);

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [nearbyTrafos, setNearbyTrafos] = useState<Trafo[]>([]);
  const [loadingTrafos, setLoadingTrafos] = useState(false);

  /* ================= FETCH TRAFO ================= */
  const fetchNearbyTrafos = async (latitude: number, longitude: number) => {
    setLoadingTrafos(true);
    try {
      const res = await axios.get<Trafo[]>(
        `http://localhost:5000/api/materialTek/nearby?lat=${latitude}&lng=${longitude}&limit=10`
      );
      setNearbyTrafos(res.data);
    } catch (err) {
      console.error("Error fetching nearby trafos:", err);
      setNearbyTrafos([]);
    } finally {
      setLoadingTrafos(false);
    }
  };

  /* ================= OBSERVE LAT LNG ================= */
  useEffect(() => {
    const latInput = document.getElementById("lat") as HTMLInputElement;
    const lngInput = document.getElementById("lng") as HTMLInputElement;

    if (!latInput || !lngInput) return;

    const observer = new MutationObserver(() => {
      const latitude = parseFloat(latInput.value);
      const longitude = parseFloat(lngInput.value);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        setLat(latitude);
        setLng(longitude);
        fetchNearbyTrafos(latitude, longitude);
      }
    });

    observer.observe(latInput, { attributes: true, attributeFilter: ["value"] });
    observer.observe(lngInput, { attributes: true, attributeFilter: ["value"] });

    return () => observer.disconnect();
  }, []);

  /* ================= RENDER ================= */
  return (
    <div style={{ padding: 20 }}>
      {/* ================= FORM ================= */}
      <div className="form-container">
        <div className="form-group">
          <label>Nama Permohonan Pelanggan</label>
          <input type="text" placeholder="Masukkan nama pelanggan..." />
        </div>

        <div className="form-group">
          <label>No Agenda</label>
          <input type="text" placeholder="Masukkan nomor agenda..." />
        </div>

        <div className="form-group">
          <label>Alamat</label>
          <textarea placeholder="Masukkan alamat lengkap..." />
        </div>

        <div className="form-group">
          <label>Daya</label>
          <input type="text" placeholder="Masukkan besarnya daya" />
        </div>

        <div className="form-group">
          <label>Fasa</label>
          <input type="text" placeholder="Masukkan fasa" />
        </div>
      </div>

      {/* ================= MAP ================= */}
      <input
        id="pac-input"
        className="controls"
        type="text"
        placeholder="Search lokasi..."
      />

      <div id="map" style={{ height: 400, marginBottom: 20 }} />

      <input type="hidden" id="lat" />
      <input type="hidden" id="lng" />

      {/* ================= TRAFO TERDEKAT ================= */}
      <div style={{ marginTop: 30 }}>
        <h3>Trafo Terdekat</h3>

        {loadingTrafos ? (
          <p>Loading...</p>
        ) : nearbyTrafos.length === 0 ? (
          <p>Tidak ada trafo terdekat</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {nearbyTrafos.map((t, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  padding: 16,
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <h4 style={{ marginBottom: 12, color: "#0a66c2" }}>
                  Trafo Terdekat {idx + 1}
                </h4>

                <Detail label="Nama Trafo" value={t.NAMA_MATERIAL} />
                <Detail label="Lokasi" value={t.LOKASI} />
                <Detail label="Alamat" value={t.ALAMAT} />
                <Detail label="Daya" value={t.DAYA} />
                <Detail label="Fasa" value={t.FASA} />
                <Detail label="Tegangan" value={t.TEGANGAN} />
                <Detail label="Jenis" value={t.JENIS} />
                <Detail label="Kondisi" value={t.KONDISI} />
                <Detail label="Koordinat X" value={t.KOORDINAT_X} />
                <Detail label="Koordinat Y" value={t.KOORDINAT_Y} />

                <button
                  style={{
                    marginTop: 12,
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "none",
                    backgroundColor: "#00a9ce",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Gunakan Trafo Ini
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="btn-submit" style={{ marginTop: 30 }}>
        Simpan Data
      </button>
    </div>
  );
};

/* ================= DETAIL ROW ================= */
const Detail = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", marginBottom: 6 }}>
    <div style={{ width: 140, fontWeight: 600 }}>{label}</div>
    <div style={{ marginRight: 8 }}>:</div>
    <div>{value || "-"}</div>
  </div>
);

export default OrderFormPage;
