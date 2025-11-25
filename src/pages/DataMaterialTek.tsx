import * as React from 'react';
import { useState, useEffect } from 'react';
import * as axios from 'axios'; // atau gunakan tsconfig flag jika mau import default

interface Trafo {
  LOKASI: string;
  ALAMAT: string;
  NAMA: string;
  KOORDINAT_X: string;
  KOORDINAT_Y: string;
  
}

const DataMaterialTek: React.FC = () => {
  const [trafos, setTrafos] = useState<Trafo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Daftar Trafo</h2>
      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>LOKASI</th>
            <th>ALAMAT</th>
            <th>NAMA</th>
            <th>KOORDINAT_X</th>
            <th>KOORDINAT_Y</th>
            
          </tr>
        </thead>
        <tbody>
          {trafos.map((trafo, index) => (
            <tr key={index}>
              <td>{trafo.LOKASI}</td>
              <td>{trafo.ALAMAT}</td>
              <td>{trafo.NAMA}</td>
              <td>{trafo.KOORDINAT_X}</td>
              <td>{trafo.KOORDINAT_Y}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataMaterialTek;
