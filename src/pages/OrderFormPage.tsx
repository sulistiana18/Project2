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

const OrderFormPage: React.FC = () => {
  useGooglePlacesMap(GOOGLE_MAPS_API_KEY);

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [nearbyTrafos, setNearbyTrafos] = useState<Trafo[]>([]);
  const [loadingTrafos, setLoadingTrafos] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const fetchNearbyTrafos = async (latitude: number, longitude: number) => {
    setLoadingTrafos(true);
    setHasFetched(true);
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
    <div className="page">
      <div className="page-card">
        <h2 className="page-title" style={{ textAlign: "left" }}>
          Form Pemesanan
        </h2>
        <p className="page-subtitle">
          Lengkapi data pelanggan dan tentukan lokasi permohonan untuk melihat informasi teknis terkait.
        </p>

        <div className="form-container">
          <div className="form-group">
            <label htmlFor="nama">Nama Permohonan Pelanggan</label>
            <input type="text" id="nama" placeholder="Masukkan nama pelanggan..." autoComplete="off" />
          </div>

          <div className="form-group">
            <label htmlFor="agenda">No Agenda</label>
            <input type="text" id="agenda" placeholder="Masukkan Nomor Induk Kependudukan..." autoComplete="off" />
          </div>

          <div className="form-group">
            <label htmlFor="alamat">Alamat</label>
            <textarea id="alamat" placeholder="Masukkan alamat lengkap..." autoComplete="off" />
          </div>

          <div className="form-group">
            <label htmlFor="Daya">Daya</label>
            <input type="text" id="Daya" placeholder="Masukkan besarnya daya" autoComplete="off" />
          </div>

          <div className="form-group">
            <label htmlFor="Fasa">Fasa</label>
            <input type="text" id="Fasa" placeholder="Masukkan Fasa" autoComplete="off" />
          </div>
        </div>

        {/* MAP & INPUT */}
        <input id="pac-input" className="controls" type="text" placeholder="Search lokasi..." />
        <div id="map" />

        <div id="latlngResult">
        <p><strong>Latitude:</strong> <span id="latDisplay">-</span></p>
        <p><strong>Longitude:</strong> <span id="lngDisplay">-</span></p>
      </div>

      <input type="hidden" id="lat" />
      <input type="hidden" id="lng" />

        {/* ===================================================== */}
        {/*                  TABEL SELALU MUNCUL                  */}
        {/* ===================================================== */}
        <div style={{ marginTop: 24 }}>
          <div className="table-caption">Cek Bagian Teknis</div>
          <table className="table">
            <thead>
              <tr>
                <th>LOKASI</th>
                <th>ALAMAT</th>
                <th>NAMA_MATERIAL</th>
                <th>KOORDINAT_X</th>
                <th>KOORDINAT_Y</th>
              </tr>
            </thead>
            <tbody>
              {/* BELUM PILIH LOKASI */}
              {!hasFetched && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: 12, color: "#6b7280" }}>
                    Silakan pilih lokasi pada peta untuk melihat trafo terdekat.
                  </td>
                </tr>
              )}

              {/* LOADING */}
              {loadingTrafos && hasFetched && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: 12 }}>
                    Loading...
                  </td>
                </tr>
              )}

              {/* SUDAH FETCH TAPI DATA KOSONG */}
              {hasFetched && !loadingTrafos && nearbyTrafos.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: 12, color: "red" }}>
                    Tidak ada trafo di sekitar lokasi ini.
                  </td>
                </tr>
              )}

              {/* DATA ADA */}
              {nearbyTrafos.length > 0 &&
                nearbyTrafos.map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.LOKASI}</td>
                    <td>{t.ALAMAT}</td>
                    <td>{t.NAMA_MATERIAL}</td>
                    <td>{t.KOORDINAT_X}</td>
                    <td>{t.KOORDINAT_Y}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 24 }}>
          <button className="btn-submit">Simpan Data</button>
        </div>
      </div>
    </div>
  );
};

export default OrderFormPage;
