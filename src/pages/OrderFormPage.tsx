import { useGooglePlacesMap } from "../hooks/useGooglePlacesMap";
import { GOOGLE_MAPS_API_KEY } from "../utils/constants";

const OrderFormPage = () => {
  useGooglePlacesMap(GOOGLE_MAPS_API_KEY);

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
      </div>

      <input
        id="pac-input"
        className="controls"
        type="text"
        placeholder="Search lokasi..."
      />

      <div id="map" />

      <div id="latlngResult">
        <p>
          <strong>Latitude:</strong> <span id="latDisplay">-</span>
        </p>
        <p>
          <strong>Longitude:</strong> <span id="lngDisplay">-</span>
        </p>
      </div>

      <input type="hidden" id="lat" />
      <input type="hidden" id="lng" />

      <button className="btn-submit">Simpan Data</button>
    </div>
  );
};

export default OrderFormPage;


