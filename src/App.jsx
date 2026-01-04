import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import SearchPage from "./pages/SearchPage";
import DatasetsPage from "./pages/DatasetsPage";
import ProfilePage from "./pages/ProfilePage";
import DatasetPage from "./pages/DatasetPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import NotFoundState from "./components/NotFoundState";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/datasets/:id" element={<DatasetPage />} />

          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="*"
            element={
              <NotFoundState
                title="Страница не найдена"
                subTitle="Проверьте адрес или начните с главной"
              />
            }
          />

        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
