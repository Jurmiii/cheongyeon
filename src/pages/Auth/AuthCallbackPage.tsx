import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import PageMeta from "../../components/seo/PageMeta";
import { PAGE_SEO } from "../../data/pageSeoMeta";
import { supabase } from "../../lib/supabase";
import { readOAuthRedirectPath, resolveLoginIdFromSession } from "../../utils/kakaoAuth";

function AuthCallbackPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [message, setMessage] = useState("카카오 로그인을 처리하고 있습니다.");

  useEffect(() => {
    let active = true;

    async function completeOAuthLogin() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!active) {
        return;
      }

      if (error || !session) {
        setMessage("카카오 로그인에 실패했습니다. 다시 시도해 주세요.");
        navigate("/login", { replace: true });
        return;
      }

      const loginId = await resolveLoginIdFromSession();

      if (!loginId) {
        setMessage("사용자 정보를 불러오지 못했습니다. 다시 시도해 주세요.");
        navigate("/login", { replace: true });
        return;
      }

      login(loginId, true);
      navigate(readOAuthRedirectPath(), { replace: true });
    }

    void completeOAuthLogin();

    return () => {
      active = false;
    };
  }, [login, navigate]);

  return (
    <main className="login-page-wrapper" aria-live="polite">
      <PageMeta {...PAGE_SEO.authCallback} />
      <p className="ft-16r" style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        {message}
      </p>
    </main>
  );
}

export default AuthCallbackPage;
