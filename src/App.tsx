import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";

import HomePage from "./pages/HomePage";
import OrderFormPage from "./pages/OrderFormPage";
import CekOrderFormPage from "./pages/CekOrderFormPage";
import DataMaterialTek from "./pages/DataMaterialTek";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="order" element={<OrderFormPage />} />
        <Route path="cekOrder" element={<CekOrderFormPage />} />
        <Route path="DataMaterial" element={<DataMaterialTek />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
