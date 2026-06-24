import { Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import MyPage from "./MyPage";

export default function MyPageRoute() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <MyPage />;
}
