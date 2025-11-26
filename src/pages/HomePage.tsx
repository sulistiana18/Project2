const HomePage = () => {
  return (
    <div className="page">
      <div className="page-card">
        <h2 className="page-title">Selamat Datang</h2>
        <p className="page-subtitle">
          Aplikasi ini menggunakan Google Maps Places untuk membantu menentukan lokasi pelanggan
          pada proses pemesanan.
        </p>
        <p style={{ maxWidth: 640 }}>
          Gunakan menu <strong>Form Pemesanan</strong> untuk mengisi data dan memilih lokasi
          langsung di peta. Anda juga dapat melihat <strong>trafo terdekat</strong> dan
          <strong> data material teknis</strong> melalui menu di sebelah kiri.
        </p>
      </div>
    </div>
  );
};

export default HomePage;


