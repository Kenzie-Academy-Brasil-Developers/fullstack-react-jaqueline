import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AdminRoutes() {
  const admin = JSON.parse(localStorage.getItem("@admin"));


  return admin ? (
    <Outlet />
  ) : (
    <Navigate to="/"/>
  );
}
