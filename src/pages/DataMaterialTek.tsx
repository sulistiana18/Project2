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
    <div style={{ maxWidth: '1000px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Daftar Trafo</h2>

      {/* Filter Inputs */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <label>
          Filter by LOKASI:
          <input
            type="text"
            value={filterLokasi}
            onChange={e => { setFilterLokasi(e.target.value); setCurrentPage(1); }}
            style={{ marginLeft: '5px', padding: '4px' }}
          />
        </label>
        <label>
          Filter by ALAMAT:
          <input
            type="text"
            value={filterAlamat}
            onChange={e => { setFilterAlamat(e.target.value); setCurrentPage(1); }}
            style={{ marginLeft: '5px', padding: '4px' }}
          />
        </label>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={thStyle}>No</th>
              <th style={thStyle}>LOKASI</th>
              <th style={thStyle}>ALAMAT</th>
              <th style={thStyle}>NAMA</th>
              <th style={thStyle}>KOORDINAT_X</th>
              <th style={thStyle}>KOORDINAT_Y</th>
              <th style={thStyle}>BESAR_TRAFO</th>
            </tr>
          </thead>
          <tbody>
            {currentTrafos.map((trafo, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                <td style={tdStyle}>{indexOfFirst + index + 1}</td>
                <td style={tdStyle}>{trafo.LOKASI}</td>
                <td style={tdStyle}>{trafo.ALAMAT}</td>
                <td style={tdStyle}>{trafo.NAMA}</td>
                <td style={tdStyle}>{trafo.KOORDINAT_X}</td>
                <td style={tdStyle}>{trafo.KOORDINAT_Y}</td>
                <td style={tdStyle}>{trafo.BESAR_TRAFO || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '15px' }}>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ ...buttonStyle, opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
        >
          &laquo; Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ ...buttonStyle, opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

// Styles
const thStyle: React.CSSProperties = { 
  border: '1px solid #ddd', 
  padding: '8px', 
  textAlign: 'left',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
};

const tdStyle: React.CSSProperties = { 
  border: '1px solid #ddd', 
  padding: '8px',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  height: '40px'
};

const buttonStyle: React.CSSProperties = {
  padding: '5px 12px',
  border: '1px solid #007bff',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  transition: 'all 0.2s',
};

export default DataMaterialTek;
