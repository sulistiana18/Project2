import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGooglePlacesMap } from "../hooks/useGooglePlacesMap";
import { GOOGLE_MAPS_API_KEY } from "../utils/constants";

interface Trafo {
  LOKASI: string;
  ALAMAT: string;
  NAMA_MATERIAL: string;
  KOORDINAT_X: string;
  KOORDINAT_Y: string;
}

const SambungSementara: React.FC = () => {
  useGooglePlacesMap(GOOGLE_MAPS_API_KEY);

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [nearbyTrafos, setNearbyTrafos] = useState<Trafo[]>([]);
  const [loadingTrafos, setLoadingTrafos] = useState<boolean>(false);

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

  return (
    <div style={{ padding: 20 }}>
      <input id="pac-input" className="controls" type="text" placeholder="Search lokasi..." />
      <div id="map" style={{ height: 400, marginBottom: 20 }} />

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="nama">Alamat Lengkap</label>
          <input type="text" id="nama" placeholder="Masukkan alamat" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="agenda">Detail Alamat</label>
          <input type="text" id="agenda" placeholder="Masukkan patokan/detail alamat" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="alamat">Provinsi</label>
          <textarea id="alamat" placeholder="Masukkan alamat lengkap..." autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="Daya">Kabupaten/Kota</label>
          <input type="text" id="Daya" placeholder="Masukkan besarnya daya" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="Fasa">Kecamatan</label>
          <input type="text" id="Fasa" placeholder="Masukkan Fasa" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="Fasa">Desa/Kelurahan</label>
          <input type="text" id="Fasa" placeholder="Masukkan Fasa" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="Fasa">Unit Layanan PLN</label>
          <input type="text" id="Fasa" placeholder="Masukkan Fasa" autoComplete="off" />
        </div>
      </div>

      {/* <div id="latlngResult">
        <p><strong>Latitude:</strong> <span id="latDisplay">-</span></p>
        <p><strong>Longitude:</strong> <span id="lngDisplay">-</span></p>
      </div>  */}

      <input type="hidden" id="lat" />
      <input type="hidden" id="lng" />

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
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#f9f9f9" }}>
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

      <button className="btn-submit" style={{ marginTop: 20 }}>Simpan Data</button>
    </div>
  );
};

// Styles
const thStyle: React.CSSProperties = { border: "1px solid #ddd", padding: "8px", textAlign: "left" };
const tdStyle: React.CSSProperties = { border: "1px solid #ddd", padding: "8px" };

export default SambungSementara;
