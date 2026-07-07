import { Navigate, useLocation } from "react-router-dom";

import { Footer } from "../../components/common";
import PageMeta from "../../components/seo/PageMeta";
import { PAGE_SEO } from "../../data/pageSeoMeta";
import { useAuth } from "../../contexts/AuthContext";
import Login from "./Login";
import "./LoginPage.scss";

function LoginPage() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const redirectTo =
    typeof location.state?.redirectTo === "string" && location.state.redirectTo.startsWith("/")
      ? location.state.redirectTo
      : "/";

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <main className="login-page-wrapper">
      <PageMeta {...PAGE_SEO.login} />
      <Login />
      <Footer />
    </main>
  );
}

export default LoginPage;
