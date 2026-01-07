import React, { useEffect, useState } from "react";
import axios from "axios";

interface Transaksi {
  NOAGENDA: string;
  NO_REGISTRASI: string;
  TGLMOHON: string;
  IDPEL: string;
  NAMA: string;
  JENIS_TRANSAKSI: string;
  STATUS_PERMOHONAN: string;
}

const DataPermohonan: React.FC = () => {
  const [data, setData] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/transaksi-pelanggan";

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get<Transaksi[]>(API_URL); // ✅ Type-safe
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data transaksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        
        {/* Kalau mau nanti bisa taruh tombol Upload di sini */}
      </div>

      {/* LOADING & ERROR */}
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* TABLE */}
      <table
        border={1}
        width="100%"
        cellPadding={8}
        style={{ borderCollapse: "collapse", marginTop: 12 }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>NOAGENDA</th>
            <th>NOREGISTRASI</th>
            <th>TGL MOHON</th>
            <th>IDPELANGGAN</th>
            <th>NAMA</th>
            <th>JENIS TRANSAKSI</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && !loading && (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                Tidak ada data
              </td>
            </tr>
          )}

          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.NOAGENDA}</td>
              <td>{row.NO_REGISTRASI}</td>
              <td>
                {row.TGLMOHON
                  ? new Date(row.TGLMOHON).toLocaleDateString()
                  : "-"}
              </td>
              <td>{row.IDPEL}</td>
              <td>{row.NAMA}</td>
              <td>{row.JENIS_TRANSAKSI}</td>
              <td>{row.STATUS_PERMOHONAN}</td>
              <td>
                <button
                  onClick={() => alert("Trafo Terdekat - akan dikembangkan")}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataPermohonan;
