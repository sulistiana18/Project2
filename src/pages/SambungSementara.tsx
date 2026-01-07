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
const SambungSementara: React.FC = () => {
  useGooglePlacesMap(GOOGLE_MAPS_API_KEY);

  /* ===== MAP ===== */
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  /* ===== FORM ===== */
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [noAgenda, setNoAgenda] = useState("");
  const [alamat, setAlamat] = useState("");
  const [daya, setDaya] = useState("");
  const [fasa, setFasa] = useState("");

  /* ===== TRAFO ===== */
  const [nearbyTrafos, setNearbyTrafos] = useState<Trafo[]>([]);
  const [selectedTrafo, setSelectedTrafo] = useState<Trafo | null>(null);
  const [loadingTrafos, setLoadingTrafos] = useState(false);

  /* ================= FETCH TRAFO ================= */
  const fetchNearbyTrafos = async (latitude: number, longitude: number) => {
    setLoadingTrafos(true);
    try {
      const res = await axios.get<Trafo[]>(
        `http://localhost:5000/api/materialTek/nearby?lat=${latitude}&lng=${longitude}&limit=3`
      );
      setNearbyTrafos(res.data);
    } catch (err) {
      console.error("Error fetching trafo:", err);
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

  /* ================= SIMPAN DATA ================= */
  const handleSimpan = async () => {
    if (!namaPelanggan || !noAgenda || !alamat || !daya || !fasa) {
      alert("Lengkapi semua form!");
      return;
    }

    if (!selectedTrafo) {
      alert("Pilih trafo terlebih dahulu!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/pasangbaru/simpan", {
        nama_pelanggan: namaPelanggan,
        no_agenda: noAgenda,
        alamat,
        daya,
        fasa,
        nama_trafo: selectedTrafo.NAMA_MATERIAL,
        koordinat_x: lat,
        koordinat_y: lng,
      });

      alert("✅ Data berhasil disimpan");
      setNamaPelanggan("");
      setNoAgenda("");
      setAlamat("");
      setDaya("");
      setFasa("");
      setSelectedTrafo(null);
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menyimpan data");
    }
  };

  /* ================= RENDER ================= */
  return (
    <div style={{ padding: 20 }}>
      {/* MAP */}
      <input id="pac-input" className="controls" type="text" placeholder="Cari lokasi..." />
      <div id="map" style={{ height: 400, marginBottom: 20 }} />
      <input type="hidden" id="lat" />
      <input type="hidden" id="lng" />

      {/* FORM */}
      <div className="form-container">
        <Input label="Nama Pelanggan" value={namaPelanggan} setValue={setNamaPelanggan} />
        <Input label="No Agenda" value={noAgenda} setValue={setNoAgenda} />
        <Textarea label="Alamat" value={alamat} setValue={setAlamat} />
        <Input label="Daya" value={daya} setValue={setDaya} />
        <Input label="Fasa" value={fasa} setValue={setFasa} />
      </div>

      {/* TRAFO */}
      <div style={{ marginTop: 30 }}>
        <h3>Trafo Terdekat</h3>

        {loadingTrafos ? (
          <p>Loading...</p>
        ) : nearbyTrafos.length === 0 ? (
          <p>Tidak ada trafo</p>
        ) : (
          nearbyTrafos.map((t, i) => (
            <div
              key={i}
              style={{
                border: selectedTrafo === t ? "2px solid #00a9ce" : "1px solid #ddd",
                padding: 16,
                borderRadius: 10,
                marginBottom: 12,
              }}
            >
              <Detail label="Nama Trafo" value={t.NAMA_MATERIAL} />
              <Detail label="Lokasi" value={t.LOKASI} />
              <Detail label="Alamat" value={t.ALAMAT} />

              <button
                onClick={() => setSelectedTrafo(t)}
                style={{
                  marginTop: 10,
                  padding: "8px 16px",
                  background: "#00a9ce",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Gunakan Trafo Ini
              </button>
            </div>
          ))
        )}
      </div>

      <button onClick={handleSimpan} style={{ marginTop: 30 }}>
        Simpan Data
      </button>
    </div>
  );
};

/* ================= COMPONENT BANTUAN ================= */
const Input = ({ label, value, setValue }: any) => (
  <div className="form-group">
    <label>{label}</label>
    <input value={value} onChange={(e) => setValue(e.target.value)} />
  </div>
);

const Textarea = ({ label, value, setValue }: any) => (
  <div className="form-group">
    <label>{label}</label>
    <textarea value={value} onChange={(e) => setValue(e.target.value)} />
  </div>
);

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", marginBottom: 6 }}>
    <div style={{ width: 140, fontWeight: 600 }}>{label}</div>
    <div>:</div>
    <div style={{ marginLeft: 6 }}>{value || "-"}</div>
  </div>
);

export default SambungSementara;
