import { Button, Input } from "../../components/common";
import "./Login.scss";

export default function Login() {
  return (
    <main className="login-page">
      <section className="login-card">
        <header className="login-card__header">
          <span className="login-card__mark" aria-hidden="true" />
          <h1 className="ft-28b color-deep500">청연에 오신 것을 환영합니다.</h1>
          <p className="ft-16r color-ink300">
            차분한 다도의 시간을 위해
            <br />
            로그인해 주세요
          </p>
        </header>

        <form className="login-form">
          <div className="login-form__group">
            <label className="ft-14b color-ink500" htmlFor="login-id">
              아이디
            </label>
            <Input id="login-id" name="loginId" placeholder="아이디를 입력하세요" state="default" />
          </div>

          <div className="login-form__group">
            <label className="ft-14b color-ink500" htmlFor="login-password">
              비밀번호
            </label>
            <Input
              id="login-password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              state="default"
            />
          </div>

          <label className="login-form__keep">
            <Input className="login-form__checkbox" type="checkbox" name="keepLogin" />
            <span className="ft-14r color-ink500">로그인 상태 유지</span>
          </label>

          <Button variant="payment" fullWidth type="submit">
            로그인
          </Button>

          <div className="login-divider" aria-hidden="true">
            <span />
            <p className="ft-14r color-ink200">또는</p>
            <span />
          </div>

          <Button variant="kakao" fullWidth>
            카카오로 시작하기
          </Button>

          <Button variant="naver" fullWidth>
            네이버로 시작하기
          </Button>
        </form>

        <nav className="login-links" aria-label="login links">
          <p className="login-links__row">
            <span className="ft-14r color-deep500">계정이 없으신가요?</span>
            <a className="ft-14r color-moon500" href="#signup">
              회원가입
            </a>
          </p>
          <p className="login-links__row">
            <a className="ft-14r color-ink200" href="#find-password">
              비밀번호 찾기
            </a>
            <a className="ft-14r color-ink200" href="#find-id">
              아이디 찾기
            </a>
          </p>
        </nav>
      </section>
    </main>
  );
}
