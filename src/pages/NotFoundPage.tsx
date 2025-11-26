import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="page">
      <div className="page-card">
        <h2 className="page-title">Halaman tidak ditemukan</h2>
        <p className="page-subtitle">
          Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        </p>
        <p>
          Kembali ke{" "}
          <Link to="/" style={{ color: "#2563eb", fontWeight: 500 }}>
            beranda
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;


