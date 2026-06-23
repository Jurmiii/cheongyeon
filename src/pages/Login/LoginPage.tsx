import { Navigate } from "react-router-dom";

import { Footer, Header } from "../../components/common";
import { useAuth } from "../../contexts/AuthContext";
import Login from "./Login";
import "./LoginPage.scss";

function LoginPage() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="login-page-wrapper">
      <div className="login-page-wrapper__header">
        <Header />
      </div>
      <Login />
      <Footer />
    </main>
  );
}

export default LoginPage;
