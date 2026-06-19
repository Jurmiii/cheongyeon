import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/images/svg/logo.svg";
import "./Header.scss";

interface HeaderMenuItem {
  label: string;
  children: string[];
}

const gnbMenus: HeaderMenuItem[] = [
  { label: "브랜드 소개", children: ["브랜드 스토리", "공간소개", "오시는 길"] },
  { label: "제품 소개", children: ["차 이야기", "차 컬렉션", "계절의 차"] },
  { label: "다도 클래스", children: ["일반 클래스", "시즌 클래스"] },
  { label: "예약", children: ["예약하기", "예약확인"] },
  { label: "이벤트", children: ["진행중 이벤트", "공지사항"] },
];

const actionMenus: HeaderMenuItem[] = [
  { label: "user", children: ["로그인", "회원가입", "마이페이지"] },
  { label: "KR", children: ["EN"] },
];

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header
      className={["site-header", "han50", isHovered && "site-header--open"].filter(Boolean).join(" ")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="site-header__inner">
        <h1 className="site-header__logo">
          <a href="/" aria-label="청연 홈">
            <img src={logo} alt="청연" />
          </a>
        </h1>

        <nav className="site-header__gnb" aria-label="주요 메뉴">
          {gnbMenus.map((menu) => (
            <div className="site-header__menu-item" key={menu.label}>
              <a className="site-header__menu-link ft-18b ink500" href={`#${menu.label}`}>
                {menu.label}
              </a>
              <span className="site-header__dropdown-line" aria-hidden="true" />
              <ul className="site-header__submenu" aria-hidden={!isHovered}>
                {menu.children.map((child) => (
                  <li key={child}>
                    <a className="site-header__submenu-link ft-18b ink500" href={`#${child}`}>
                      {child}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="site-header__actions">
          {actionMenus.map((menu) => (
            <div className="site-header__menu-item site-header__menu-item--action" key={menu.label}>
              <a className="site-header__menu-link site-header__action-link ft-18b ink500" href={`#${menu.label}`}>
                {menu.label === "user" ? <FontAwesomeIcon icon={faUser} aria-label="사용자 메뉴" /> : menu.label}
              </a>
              <span className="site-header__dropdown-line" aria-hidden="true" />
              <ul className="site-header__submenu" aria-hidden={!isHovered}>
                {menu.children.map((child) => (
                  <li key={child}>
                    <a className="site-header__submenu-link ft-18b ink500" href={`#${child}`}>
                      {child}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
