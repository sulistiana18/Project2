import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Trafo {
  LOKASI: string;
  ALAMAT: string;
  NAMA: string;
  KOORDINAT_X: string;
  KOORDINAT_Y: string;
  BESAR_TRAFO?: string;
}

const DataMaterialTek: React.FC = () => {
  const [trafos, setTrafos] = useState<Trafo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filterLokasi, setFilterLokasi] = useState('');
  const [filterAlamat, setFilterAlamat] = useState('');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  useEffect(() => {
    axios.get<Trafo[]>('http://localhost:5000/api/materialTek')
      .then(res => {
        setTrafos(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter data sebelum pagination
  const filteredTrafos = trafos.filter(trafo =>
    trafo.LOKASI.toLowerCase().includes(filterLokasi.toLowerCase()) &&
    trafo.ALAMAT.toLowerCase().includes(filterAlamat.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTrafos.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentTrafos = filteredTrafos.slice(indexOfFirst, indexOfLast);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page">
      <div className="page-card">
        <h2 className="page-title" style={{ textAlign: "left" }}>Daftar Trafo</h2>
        <p className="page-subtitle">
          Filter berdasarkan lokasi dan alamat untuk menemukan data trafo yang Anda butuhkan.
        </p>

        {/* Filter Inputs */}
        <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ minWidth: 220, flex: '1 1 220px' }}>
            <label>
              Filter by LOKASI:
              <input
                type="text"
                value={filterLokasi}
                onChange={e => { setFilterLokasi(e.target.value); setCurrentPage(1); }}
              />
            </label>
          </div>
          <div style={{ minWidth: 220, flex: '1 1 220px' }}>
            <label>
              Filter by ALAMAT:
              <input
                type="text"
                value={filterAlamat}
                onChange={e => { setFilterAlamat(e.target.value); setCurrentPage(1); }}
              />
            </label>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>LOKASI</th>
                <th>ALAMAT</th>
                <th>NAMA</th>
                <th>KOORDINAT_X</th>
                <th>KOORDINAT_Y</th>
                <th>BESAR_TRAFO</th>
              </tr>
            </thead>
            <tbody>
              {currentTrafos.map((trafo, index) => (
                <tr key={index}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{trafo.LOKASI}</td>
                  <td>{trafo.ALAMAT}</td>
                  <td>{trafo.NAMA}</td>
                  <td>{trafo.KOORDINAT_X}</td>
                  <td>{trafo.KOORDINAT_Y}</td>
                  <td>{trafo.BESAR_TRAFO || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 16 }}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-submit"
            style={{
              opacity: currentPage === 1 ? 0.6 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              paddingInline: 16
            }}
          >
            &laquo; Previous
          </button>

          <span style={{ fontSize: '0.9rem', color: '#4b5563' }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn-submit"
            style={{
              opacity: currentPage === totalPages ? 0.6 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              paddingInline: 16
            }}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataMaterialTek;
