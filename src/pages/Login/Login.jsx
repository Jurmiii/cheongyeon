import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input } from "../../components/common";
import { useAuth } from "../../contexts/AuthContext";
import { TEMP_LOGIN_ID, TEMP_LOGIN_PASSWORD, validateTempLogin } from "../../data/tempLoginCredentials";
import logo from "../../assets/images/00header-footer/logo.svg";
import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputState, setInputState] = useState("default");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!loginId.trim() || !password.trim()) {
      setInputState("error");
      setErrorMessage("아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    if (!validateTempLogin(loginId.trim(), password)) {
      setInputState("error");
      setErrorMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    setInputState("success");
    login(loginId.trim(), keepLogin);
    navigate("/");
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setInputState("default");
    setErrorMessage("");
  };

  return (
    <section className="login-page" aria-label="로그인">
      <section className="login-card">
        <header className="login-card__header">
          <img className="login-card__logo" src={logo} alt="청연" />
          <h1 className="login-card__title ft-28b">청연에 오신 것을 환영합니다.</h1>
          <p className="login-card__description ft-16r">
            차분한 다도의 시간을 위해
            <br />
            로그인해 주세요
          </p>
        </header>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-form__group">
            <label className="ft-14b" htmlFor="login-id">
              아이디
            </label>
            <Input
              id="login-id"
              name="loginId"
              placeholder="아이디를 입력하세요"
              state={inputState}
              value={loginId}
              onChange={handleInputChange(setLoginId)}
              autoComplete="username"
            />
          </div>

          <div className="login-form__group">
            <label className="ft-14b" htmlFor="login-password">
              비밀번호
            </label>
            <Input
              id="login-password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              state={inputState}
              value={password}
              onChange={handleInputChange(setPassword)}
              autoComplete="current-password"
            />
          </div>

          {errorMessage ? (
            <p className="login-form__error ft-14r" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <label className="login-form__keep">
            <input
              className="login-form__checkbox"
              type="checkbox"
              name="keepLogin"
              checked={keepLogin}
              onChange={(event) => setKeepLogin(event.target.checked)}
            />
            <span className="ft-14r">로그인 상태 유지</span>
          </label>

          <Button variant="payment" type="submit">
            로그인
          </Button>

          <Button variant="kakao" type="button">
            카카오로 시작하기
          </Button>

          <Button variant="naver" type="button">
            네이버로 시작하기
          </Button>
        </form>

        <nav className="login-links" aria-label="login links">
          <p className="login-links__row">
            <span className="ft-14r">계정이 없으신가요?</span>
            <a className="ft-14r login-links__signup" href="#signup">
              회원가입
            </a>
          </p>
          <p className="login-links__row">
            <a className="ft-14r" href="#find-password">
              비밀번호 찾기
            </a>
            <a className="ft-14r" href="#find-id">
              아이디 찾기
            </a>
          </p>
        </nav>

        <aside className="login-temp-credentials" aria-label="임시 로그인 계정">
          <p className="login-temp-credentials__title ft-14b">임시 로그인 계정</p>
          <dl className="login-temp-credentials__list">
            <div className="login-temp-credentials__item">
              <dt className="ft-14r">아이디</dt>
              <dd className="ft-14b">{TEMP_LOGIN_ID}</dd>
            </div>
            <div className="login-temp-credentials__item">
              <dt className="ft-14r">비밀번호</dt>
              <dd className="ft-14b">{TEMP_LOGIN_PASSWORD}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </section>
  );
}
