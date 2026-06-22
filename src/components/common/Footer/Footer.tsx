import footerBg from "../../../assets/images/bg/footer-bg.webp";
import githubIcon from "../../../assets/images/svg/github.svg";
import kakaoIcon from "../../../assets/images/svg/kakao.svg";
import logoWhite from "../../../assets/images/svg/logo-white.svg";
import naverIcon from "../../../assets/images/svg/naver.svg";
import "./Footer.scss";

const footerLinks = [
  { label: "브랜드 소개", href: "#brand" },
  { label: "제품 소개", href: "#product" },
  { label: "다도 클래스", href: "#class" },
  { label: "예약", href: "#reservation" },
  { label: "이벤트", href: "#event" },
];

const snsLinks = [
  { label: "kakao", href: "#kakao", icon: kakaoIcon },
  { label: "naver", href: "#naver", icon: naverIcon },
  { label: "github", href: "#github", icon: githubIcon },
];

export default function Footer() {
  return (
    <footer className="site-footer" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <img className="site-footer__logo" src={logoWhite} alt="청연" />
            <p className="site-footer__slogan ft-16r text-white">
              자연이 선물한 차 한 잔,
              <br />
              일상에 여유를 더합니다.
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="푸터 메뉴">
            {footerLinks.map((link) => (
              <a className="site-footer__nav-link ft-18r text-white" href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="site-footer__divider" aria-hidden="true" />

        <div className="site-footer__bottom">
          <ul className="site-footer__sns" aria-label="SNS 링크">
            {snsLinks.map((sns) => (
              <li key={sns.label}>
                <a className="site-footer__sns-link" href={sns.href} aria-label={sns.label}>
                  <img src={sns.icon} alt="" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
