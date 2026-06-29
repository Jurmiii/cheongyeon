import { Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import ReservationPage from "./ReservationPage";

export default function ReservationPageRoute() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <ReservationPage />;
}
