import { Link } from "react-router-dom";

import githubIcon from "../../../assets/images/00header-footer/github.svg";
import kakaoIcon from "../../../assets/images/00header-footer/kakao.svg";
import logoWhite from "../../../assets/images/00header-footer/logo-white.svg";
import naverIcon from "../../../assets/images/00header-footer/naver.svg";
import "./TabletFooter.scss";

const tabletFooterLinks = [
  { label: "브랜드 소개", to: "/about" },
  { label: "제품소개", to: "/product/tea-story" },
  { label: "다도 클래스", to: "/class" },
  { label: "예약", to: "/reservation" },
  { label: "이벤트", to: "/event" },
];

const tabletFooterSnsLinks = [
  { label: "kakao", icon: kakaoIcon, href: "https://www.kakaocorp.com/page/service/service/KakaoTalk" },
  { label: "naver", icon: naverIcon, href: "https://www.naver.com/" },
  { label: "github", icon: githubIcon, href: "https://github.com/Jurmiii/cheongyeon.git" },
];

const tabletFooterPolicyLinks = [
  { label: "이용약관", to: "/terms" },
  { label: "개인정보 처리 방침", to: "/privacy" },
];

export default function TabletFooter() {
  return (
    <footer className="tablet-footer">
      <div className="tablet-footer__brand">
        <Link className="tablet-footer__logo" to="/" aria-label="청연 메인페이지로 이동">
          <img className="tablet-footer__logo-image" src={logoWhite} alt="청연" />
        </Link>
        <p className="tablet-footer__slogan ft-14r text-white">
          자연이 선물한 차 한 잔,
          <br />
          일상에 여유를 더합니다.
        </p>
      </div>

      <nav className="tablet-footer__nav" aria-label="태블릿 푸터 메뉴">
        {tabletFooterLinks.map((link) => (
          <Link className="tablet-footer__nav-link ft-14r text-white" key={link.label} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="tablet-footer__divider" aria-hidden="true" />

      <div className="tablet-footer__bottom">
        <ul className="tablet-footer__sns" aria-label="SNS 링크">
          {tabletFooterSnsLinks.map((sns) => (
            <li key={sns.label}>
              <a
                className="tablet-footer__sns-link"
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

        <nav className="tablet-footer__policies" aria-label="태블릿 푸터 약관">
          {tabletFooterPolicyLinks.map((link) => (
            <Link className="tablet-footer__policy-link ft-14r text-white" key={link.label} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
