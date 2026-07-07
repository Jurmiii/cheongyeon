import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import ReservationPage from "./ReservationPage";

export default function ReservationPageRoute() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isEditMode = new URLSearchParams(location.search).get("mode") === "edit";
  const redirectTo = `${location.pathname}${location.search}`;

  if (!isLoggedIn && isEditMode) {
    return <Navigate to="/login" replace state={{ redirectTo }} />;
  }

  return <ReservationPage />;
}
