import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>Halaman tidak ditemukan</h2>
      <p>
        Maaf, halaman yang Anda cari tidak tersedia. Kembali ke{" "}
        <Link to="/">beranda</Link>.
      </p>
    </div>
  );
};

export default NotFoundPage;


