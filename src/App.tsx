import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CekOrderFormPage from "./pages/CekOrderFormPage";
import DataMaterialTek from "./pages/DataMaterialTek";
import PasangBaru from "./pages/PasangBaru";
import NotFoundPage from "./pages/NotFoundPage";
import PermohonanPage from "./pages/PermohonanPage";
import LoginPage from "./pages/LoginPage";
import TopBarLayout from "./components/Layout/TopBarLayout";
import RegisterPage from "./pages/RegisterPage";
import DataPermohonan from "./pages/DataPermohonan";
import SambungSementara from "./pages/SambungSementara";
import UbahDaya from "./pages/UbahDaya";
import BalikNama from "./pages/BalikNama";


const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<TopBarLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="permohonan" element={<PermohonanPage />} />
        <Route path="dataPermohonan" element={<DataPermohonan />} />
        <Route path="cek-order" element={<CekOrderFormPage />} />
        <Route path="data-material" element={<DataMaterialTek />} />
        <Route path="pasang-baru" element={<PasangBaru />} />
        <Route path="sambung-sementara" element={<SambungSementara />} />
        <Route path="ubah-daya" element={<UbahDaya />} />
        <Route path="balik-nama" element={<BalikNama />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
