import footerBg from "../../../assets/images/00header-footer/footer-bg.webp";
import githubIcon from "../../../assets/images/00header-footer/github.svg";
import kakaoIcon from "../../../assets/images/00header-footer/kakao.svg";
import logoWhite from "../../../assets/images/00header-footer/logo-white.svg";
import naverIcon from "../../../assets/images/00header-footer/naver.svg";
import "./Footer.scss";

const footerLinks = [
  "브랜드 소개",
  "제품소개",
  "다도 클래스",
  "예약",
  "이벤트",
];

const snsLinks = [
  { label: "kakao", icon: kakaoIcon },
  { label: "naver", icon: naverIcon },
  { label: "github", icon: githubIcon },
];

export default function Footer() {
  return (
    <footer className="site-footer" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <div className="site-footer__logo" aria-label="청연 로고">
              <img className="site-footer__logo-image" src={logoWhite} alt="청연" />
            </div>
            <p className="site-footer__slogan ft-16r text-white">
              자연이 선물한 차 한 잔,
              <br />
              일상에 여유를 더합니다.
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="푸터 메뉴">
            {footerLinks.map((label) => (
              <span className="site-footer__nav-link ft-18r text-white" key={label}>
                {label}
              </span>
            ))}
          </nav>
        </div>

        <div className="site-footer__divider" aria-hidden="true" />

        <div className="site-footer__bottom">
          <ul className="site-footer__sns" aria-label="SNS 링크">
            {snsLinks.map((sns) => (
              <li key={sns.label}>
                <span className="site-footer__sns-link" aria-label={sns.label}>
                  <img src={sns.icon} alt="" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
