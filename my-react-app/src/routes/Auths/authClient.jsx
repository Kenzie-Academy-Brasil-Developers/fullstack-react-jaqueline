import { Navigate, Outlet, useLocation } from "react-router-dom";

export function UserRoutes() {
  const admin = JSON.parse(localStorage.getItem("@admin"));
  let location = useLocation();

  return !admin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
