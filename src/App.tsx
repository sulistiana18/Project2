import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CekOrderFormPage from "./pages/CekOrderFormPage";
import DataMaterialTek from "./pages/DataMaterialTek";
import PasangBaru from "./pages/PasangBaru";
import NotFoundPage from "./pages/NotFoundPage";
import Permohonan from "./pages/PermohonanPage";
import PermohonanPage from "./pages/PermohonanPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="Permohonan" element={<PermohonanPage />} />
        <Route path="cekOrder" element={<CekOrderFormPage />} />
        <Route path="DataMaterial" element={<DataMaterialTek />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/pasang-baru" element={<PasangBaru />} />
      </Route>
    </Routes>
  );
};

export default App;
