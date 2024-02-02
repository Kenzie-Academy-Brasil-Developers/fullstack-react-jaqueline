import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage/homePage";
import { RegisterPage } from "../pages/RegisterPage/registerPage";
import { AdminPage } from "../pages/AdminPage/adminPage";
import { ClientPage } from "../pages/ClientPage/clientPage";
import { AdminRoutes } from "./Auths/authAdmin";
import { UserRoutes } from "./Auths/authClient";
import { AdminContactsPage } from "../pages/AdminContactsPage/adminContactsPage";
import { ErrorPage } from "../pages/ErrorPage/errorPage";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/client-contacts" element={<AdminContactsPage />} />
      </Route>
      <Route element={<UserRoutes />}>
        <Route path="/client" element={<ClientPage />} />
      </Route>
    </Routes>
  );
};
