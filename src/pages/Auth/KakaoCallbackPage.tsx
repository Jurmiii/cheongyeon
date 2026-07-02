import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import {
  completeKakaoLogin,
  readOAuthRedirectPath,
  resolveLoginIdFromSession,
} from "../../utils/kakaoAuth";

function KakaoCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [message, setMessage] = useState("카카오 로그인을 처리하고 있습니다.");

  useEffect(() => {
    let active = true;

    async function handleCallback() {
      const code = searchParams.get("code");
      const kakaoError = searchParams.get("error");
      const kakaoErrorDescription = searchParams.get("error_description");

      if (kakaoError) {
        setMessage(kakaoErrorDescription || "카카오 로그인이 취소되었습니다.");
        navigate("/login", { replace: true });
        return;
      }

      if (!code) {
        setMessage("카카오 인증 코드가 없습니다. 다시 시도해 주세요.");
        navigate("/login", { replace: true });
        return;
      }

      try {
        await completeKakaoLogin(code);

        if (!active) {
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
      } catch {
        if (!active) {
          return;
        }

        setMessage("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        navigate("/login", { replace: true });
      }
    }

    void handleCallback();

    return () => {
      active = false;
    };
  }, [login, navigate, searchParams]);

  return (
    <main className="login-page-wrapper" aria-live="polite">
      <p className="ft-16r" style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        {message}
      </p>
    </main>
  );
}

export default KakaoCallbackPage;
