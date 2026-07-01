import { Link } from "react-router-dom";
import githubIcon from "../../../assets/images/00header-footer/github.svg";
import kakaoIcon from "../../../assets/images/00header-footer/kakao.svg";
import logoWhite from "../../../assets/images/00header-footer/logo-white.svg";
import naverIcon from "../../../assets/images/00header-footer/naver.svg";
import "./Footer.scss";

const footerLinks = [
  { label: "브랜드 소개", to: "/about" },
  { label: "제품소개", to: "/product/tea-story" },
  { label: "다도 클래스", to: "/class" },
  { label: "예약", to: "/reservation" },
  { label: "이벤트", to: "/event" },
];

const snsLinks = [
  { label: "kakao", icon: kakaoIcon, href: "https://www.kakaocorp.com/page/service/service/KakaoTalk" },
  { label: "naver", icon: naverIcon, href: "https://www.naver.com/" },
  { label: "github", icon: githubIcon, href: "https://github.com/Jurmiii/cheongyeon.git" },
];

const policyLinks = [
  { label: "이용약관", to: "/terms" },
  { label: "개인정보 처리 방침", to: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link className="site-footer__logo" to="/" aria-label="청연 메인페이지로 이동">
              <img className="site-footer__logo-image" src={logoWhite} alt="청연" />
            </Link>
            <p className="site-footer__slogan site-footer__slogan--desktop ft-16r text-white">
              자연이 선물한 차 한 잔,
              <br />
              일상에 여유를 더합니다.
            </p>
            <p className="site-footer__slogan site-footer__slogan--compact ft-14r text-white">
              자연이 선물한 차 한 잔,
              <br />
              일상에 여유를 더합니다.
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="푸터 메뉴">
            {footerLinks.map((link) => (
              <Link className="site-footer__nav-link ft-18r" key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
            <Link className="site-footer__nav-link ft-18r" to="/contact">
              문의하기
            </Link>
          </nav>
        </div>

        <div className="site-footer__divider" aria-hidden="true" />

        <div className="site-footer__bottom">
          <ul className="site-footer__sns" aria-label="SNS 링크">
            {snsLinks.map((sns) => (
              <li key={sns.label}>
                <a
                  className="site-footer__sns-link"
                  href={sns.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${sns.label} 새 창으로 이동`}
                >
                  <img src={sns.icon} alt="" />
                </a>
              </li>
            ))}
          </ul>

          <nav className="site-footer__policies" aria-label="푸터 약관">
            {policyLinks.map((link) => (
              <Link className="site-footer__policy-link ft-14r" key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
