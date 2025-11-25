import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import HomePage from "./pages/HomePage";
import OrderFormPage from "./pages/OrderFormPage";
import NotFoundPage from "./pages/NotFoundPage";
import DataMaterialTek from "./pages/DataMaterialTek";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="order" element={<OrderFormPage />} />
        <Route path="DataMaterial" element={<DataMaterialTek />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
