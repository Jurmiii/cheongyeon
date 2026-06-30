import { Link } from "react-router-dom";

import githubIcon from "../../../assets/images/00header-footer/github.svg";
import kakaoIcon from "../../../assets/images/00header-footer/kakao.svg";
import logoWhite from "../../../assets/images/00header-footer/logo-white.svg";
import naverIcon from "../../../assets/images/00header-footer/naver.svg";
import "./MobileFooter.scss";

const mobileFooterLinks = [
  { label: "브랜드 소개", to: "/about" },
  { label: "제품소개", to: "/product/tea-story" },
  { label: "다도 클래스", to: "/class" },
  { label: "예약", to: "/reservation" },
  { label: "이벤트", to: "/event" },
];

const mobileFooterSnsLinks = [
  { label: "kakao", icon: kakaoIcon, href: "https://www.kakaocorp.com/page/service/service/KakaoTalk" },
  { label: "naver", icon: naverIcon, href: "https://www.naver.com/" },
  { label: "github", icon: githubIcon, href: "https://github.com/Jurmiii/cheongyeon.git" },
];

const mobileFooterPolicyLinks = [
  { label: "이용약관", to: "/terms" },
  { label: "개인정보 처리 방침", to: "/privacy" },
];

export default function MobileFooter() {
  return (
    <footer className="mobile-footer">
      <nav className="mobile-footer__hidden-nav" aria-label="모바일 푸터 메뉴">
        {mobileFooterLinks.map((link) => (
          <Link key={link.label} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mobile-footer__brand">
        <Link className="mobile-footer__logo" to="/" aria-label="청연 메인페이지로 이동">
          <img className="mobile-footer__logo-image" src={logoWhite} alt="청연" />
        </Link>
        <p className="mobile-footer__slogan ft-14r text-white">
          자연이 선물한 차 한 잔,
          <br />
          일상에 여유를 더합니다.
        </p>
      </div>

      <div className="mobile-footer__divider" aria-hidden="true" />

      <div className="mobile-footer__bottom">
        <ul className="mobile-footer__sns" aria-label="SNS 링크">
          {mobileFooterSnsLinks.map((sns) => (
            <li key={sns.label}>
              <a
                className="mobile-footer__sns-link"
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

        <nav className="mobile-footer__policies" aria-label="모바일 푸터 약관">
          {mobileFooterPolicyLinks.map((link) => (
            <Link className="mobile-footer__policy-link ft-10r text-white" key={link.label} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
