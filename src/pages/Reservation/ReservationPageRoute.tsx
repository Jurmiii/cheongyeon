import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import ReservationPage from "./ReservationPage";

export default function ReservationPageRoute() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ redirectTo: location.pathname }} />;
  }

  return <ReservationPage />;
}
