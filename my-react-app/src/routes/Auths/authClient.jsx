import { Navigate, Outlet, useLocation } from "react-router-dom";

export function UserRoutes() {
  const admin = JSON.parse(localStorage.getItem("@admin"));


  return admin === false ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
