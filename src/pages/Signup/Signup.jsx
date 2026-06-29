import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Icon, Input } from "../../components/common";
import { hasAccount, saveAccount } from "../../utils/accountStorage";
import { saveUserProfile } from "../../utils/userProfileStorage";
import logo from "../../assets/images/00header-footer/logo.svg";
import "./Signup.scss";

function formatPhone(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return value;
}

function isValidBirth(value) {
  if (!/^\d{8}$/.test(value)) return false;
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6));
  const day = Number(value.slice(6, 8));
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  const lastDay = new Date(year, month, 0).getDate();
  return day >= 1 && day <= lastDay;
}

const validators = {
  loginId: (v) => /^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(v),
  password: (v) => /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/.test(v),
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  name: (v) => /^[가-힣a-zA-Z]{2,}$/.test(v.trim()),
  birth: (v) => isValidBirth(v),
  phone: (v) => /^01[016789]\d{7,8}$/.test(v),
};

const errorMessages = {
  loginId: "영문으로 시작하는 4~20자의 영문/숫자로 입력해 주세요.",
  password: "영문과 숫자를 포함해 8~20자로 입력해 주세요.",
  email: "올바른 이메일 형식이 아니에요.",
  name: "이름은 한글 또는 영문으로 2자 이상 입력해 주세요.",
  birth: "생년월일 8자리를 정확히 입력해 주세요. (예: 19990101)",
  phone: "올바른 휴대전화번호 형식이 아니에요. (예: 01012345678)",
};

const TERM_ITEMS = [
  {
    id: "age",
    required: true,
    label: "만 14세 이상입니다",
    desc: "만 14세 미만 아동은 보호자 동의 후 가입할 수 있습니다.",
  },
  {
    id: "service",
    required: true,
    label: "청연 이용약관 동의",
    desc: "청연 서비스 이용과 관련한 회원의 권리·의무 및 책임사항에 동의합니다.",
  },
  {
    id: "privacy",
    required: true,
    label: "개인정보 수집·이용 동의",
    desc: "회원 식별 및 서비스 제공을 위해 아이디, 비밀번호, 이름, 이메일, 생년월일, 휴대전화번호를 수집·이용합니다.",
  },
  {
    id: "marketing",
    required: false,
    label: "마케팅 정보 수신 동의",
    desc: "이벤트·혜택 등 마케팅 정보를 이메일 또는 문자로 받아봅니다.",
  },
];

export default function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    loginId: "",
    password: "",
    email: "",
    name: "",
    birth: "",
    phone: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [terms, setTerms] = useState(() =>
    Object.fromEntries(TERM_ITEMS.map((item) => [item.id, false]))
  );

  const allChecked = TERM_ITEMS.every((item) => terms[item.id]);

  const toggleAll = () => {
    const next = !allChecked;
    setTerms(Object.fromEntries(TERM_ITEMS.map((item) => [item.id, next])));
  };

  const toggleTerm = (id) => {
    setTerms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getFieldState = (field) => {
    const value = values[field];
    if (!value) return "default";
    const isValid = validators[field](value);
    if (focusedField === field) {
      return isValid ? "success" : "error";
    }
    return isValid ? "default" : "error";
  };

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFocus = (field) => () => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const allFieldsValid = Object.keys(validators).every((field) =>
      validators[field](values[field])
    );
    const requiredTermsAgreed = TERM_ITEMS.filter((item) => item.required).every(
      (item) => terms[item.id]
    );

    if (!allFieldsValid) {
      setSubmitError("입력 정보를 다시 확인해 주세요.");
      return;
    }

    if (!requiredTermsAgreed) {
      setSubmitError("필수 약관에 동의해 주세요.");
      return;
    }

    const loginId = values.loginId.trim();

    if (hasAccount(loginId)) {
      setSubmitError("이미 사용 중인 아이디예요.");
      return;
    }

    const name = values.name.trim();
    const phone = formatPhone(values.phone);
    const email = values.email.trim();

    saveAccount({
      loginId,
      password: values.password,
      name,
      phone,
      email,
      birth: values.birth,
    });
    saveUserProfile({ loginId, name, phone, email });

    setSubmitError("");
    setIsSuccessOpen(true);
  };

  const renderError = (field) =>
    getFieldState(field) === "error" ? (
      <p className="signup-field__error ft-14r" role="alert">
        {errorMessages[field]}
      </p>
    ) : null;

  return (
    <section className="signup-page" aria-label="회원가입">
      <section className="signup-card">
        <h1 className="signup-card__title ft-28b">청연과 함께하기</h1>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <div className="signup-field__control">
              <Icon className="signup-field__icon" name="user" aria-hidden="true" />
              <Input
                className="signup-field__input"
                id="signup-id"
                name="loginId"
                placeholder="아이디"
                state={getFieldState("loginId")}
                value={values.loginId}
                onChange={handleChange("loginId")}
                onFocus={handleFocus("loginId")}
                onBlur={handleBlur}
                autoComplete="username"
              />
            </div>
            {renderError("loginId")}
          </div>

          <div className="signup-field">
            <div className="signup-field__control">
              <Icon className="signup-field__icon" name="lock" aria-hidden="true" />
              <Input
                className="signup-field__input signup-field__input--password"
                id="signup-password"
                name="password"
                type="password"
                placeholder="비밀번호"
                state={getFieldState("password")}
                value={values.password}
                onChange={handleChange("password")}
                onFocus={handleFocus("password")}
                onBlur={handleBlur}
                autoComplete="new-password"
              />
              <Icon className="signup-field__icon-right" name="eye-slash" aria-hidden="true" />
            </div>
            {renderError("password")}
          </div>

          <div className="signup-field">
            <div className="signup-field__control">
              <Icon className="signup-field__icon" name="envelope" aria-hidden="true" />
              <Input
                className="signup-field__input"
                id="signup-email"
                name="email"
                type="email"
                placeholder="이메일주소 (비밀번호 찾기 등 본인 확인용)"
                state={getFieldState("email")}
                value={values.email}
                onChange={handleChange("email")}
                onFocus={handleFocus("email")}
                onBlur={handleBlur}
                autoComplete="email"
              />
            </div>
            {renderError("email")}
          </div>

          <div className="signup-field">
            <div className="signup-field__control">
              <Icon className="signup-field__icon" name="user" aria-hidden="true" />
              <Input
                className="signup-field__input"
                id="signup-name"
                name="name"
                placeholder="이름"
                state={getFieldState("name")}
                value={values.name}
                onChange={handleChange("name")}
                onFocus={handleFocus("name")}
                onBlur={handleBlur}
                autoComplete="name"
              />
            </div>
            {renderError("name")}
          </div>

          <div className="signup-field">
            <div className="signup-field__control">
              <Icon className="signup-field__icon" name="calendar" aria-hidden="true" />
              <Input
                className="signup-field__input"
                id="signup-birth"
                name="birth"
                inputMode="numeric"
                maxLength={8}
                placeholder="생년월일 8자리"
                state={getFieldState("birth")}
                value={values.birth}
                onChange={handleChange("birth")}
                onFocus={handleFocus("birth")}
                onBlur={handleBlur}
                autoComplete="bday"
              />
            </div>
            {renderError("birth")}
          </div>

          <div className="signup-field">
            <div className="signup-field__phone-row">
              <div className="signup-field__control signup-field__phone-input">
                <Icon className="signup-field__icon" name="mobile" aria-hidden="true" />
                <Input
                  className="signup-field__input"
                  id="signup-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="휴대전화번호"
                  state={getFieldState("phone")}
                  value={values.phone}
                  onChange={handleChange("phone")}
                  onFocus={handleFocus("phone")}
                  onBlur={handleBlur}
                  autoComplete="tel"
                />
              </div>
              {/* <button className="signup-verify ft-16r" type="button">
                인증
              </button> */}
            </div>
            {renderError("phone")}
          </div>

          <div className="signup-terms">
            <div className="signup-agree">
              <label className="signup-agree__label">
                <input
                  className="signup-agree__checkbox"
                  type="checkbox"
                  name="agreeAll"
                  checked={allChecked}
                  onChange={toggleAll}
                />
                <span className="signup-agree__text ft-14r">
                  <strong className="signup-agree__required">[필수]</strong> 인증 약관 전체동의
                </span>
              </label>
              <button
                className="signup-agree__toggle"
                type="button"
                aria-expanded={termsOpen}
                aria-label="약관 자세히 보기"
                onClick={() => setTermsOpen((prev) => !prev)}
              >
                <Icon
                  className={`signup-agree__chevron${termsOpen ? " signup-agree__chevron--open" : ""}`}
                  name="angle-down"
                  aria-hidden="true"
                />
              </button>
            </div>

            {termsOpen ? (
              <ul className="signup-terms__list">
                {TERM_ITEMS.map((item) => (
                  <li className="signup-terms__item" key={item.id}>
                    <label className="signup-terms__head">
                      <input
                        className="signup-agree__checkbox"
                        type="checkbox"
                        name={item.id}
                        checked={terms[item.id]}
                        onChange={() => toggleTerm(item.id)}
                      />
                      <span className="signup-terms__label ft-14r">
                        <strong className="signup-terms__tag">
                          {item.required ? "[필수]" : "[선택]"}
                        </strong>{" "}
                        {item.label}
                      </span>
                    </label>
                    <p className="signup-terms__desc ft-14r">{item.desc}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {submitError ? (
            <p className="signup-field__error ft-14r" role="alert">
              {submitError}
            </p>
          ) : null}

          <Button className="signup-submit" variant="btn1" type="submit">
            가입하기
          </Button>
        </form>
      </section>

      {isSuccessOpen ? (
        <div className="signup-success" role="presentation">
          <div
            className="signup-success__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-success-title"
          >
            <h2 className="signup-success__title ft-28b" id="signup-success-title">
              청연과 함께하기
            </h2>
            <img className="signup-success__logo" src={logo} alt="청연" />
            <p className="signup-success__heading ft-28b">회원가입이 완료되었습니다</p>
            <p className="signup-success__desc ft-16r">
              청연의 회원이 되신 것을 환영합니다.
              <br />
              이제 다양한 다도 클래스를 예약해보세요.
            </p>
            <div className="signup-success__notice">
              <Icon
                className="signup-success__notice-icon"
                name="circle-info"
                aria-hidden="true"
              />
              <span className="signup-success__notice-text ft-16r">
                가입한 정보가 정상적으로 등록되었습니다.
              </span>
            </div>
            <div className="signup-success__actions">
              <Button
                className="signup-success__button"
                variant="btn1"
                type="button"
                onClick={() => navigate("/login")}
              >
                로그인하기
              </Button>
              <Button
                className="signup-success__button"
                variant="btn2"
                type="button"
                onClick={() => navigate("/")}
              >
                메인으로 가기
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
