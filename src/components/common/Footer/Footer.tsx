import { Link } from "react-router-dom";
import type { MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import footerBg from "../../../assets/images/00header-footer/footer-bg.webp";
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

const routeAliases: Record<string, string> = {
  "/about/story": "/about",
  "/brand/story": "/about",
  "/brandstory": "/about",
  "/brand-story": "/about",
  "/class/general": "/class",
  "/class/introduction": "/class",
  "/event/ongoing": "/event",
  "/shop/tea-story": "/product/tea-story",
  "/tea-story": "/product/tea-story",
  "/tea-store": "/product/tea-story",
};

function normalizePath(path: string) {
  return routeAliases[path] ?? path;
}

export default function Footer() {
  const { pathname } = useLocation();

  const handleInternalLinkClick = (to: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (normalizePath(pathname) !== normalizePath(to)) {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link
              className="site-footer__logo"
              to="/"
              aria-label="청연 메인페이지로 이동"
              onClick={handleInternalLinkClick("/")}
            >
              <img className="site-footer__logo-image" src={logoWhite} alt="청연" />
            </Link>
            <p className="site-footer__slogan ft-16r text-white">
              자연이 선물한 차 한 잔,
              <br />
              일상에 여유를 더합니다.
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="푸터 메뉴">
            {footerLinks.map((link) => (
              <Link
                className="site-footer__nav-link ft-18r text-white"
                key={link.label}
                to={link.to}
                onClick={handleInternalLinkClick(link.to)}
              >
                {link.label}
              </Link>
            ))}
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
        </div>
      </div>
    </footer>
  );
}
