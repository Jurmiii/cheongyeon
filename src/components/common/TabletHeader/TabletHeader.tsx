import { useState } from "react";
import { Link } from "react-router-dom";

import hamMenu from "../../../assets/images/00header-footer/ham-menu.svg";
import hamMenuX from "../../../assets/images/00header-footer/ham-menu-x.svg";
import logo from "../../../assets/images/00header-footer/logo.svg";
import Icon from "../Icon";
import "./TabletHeader.scss";

interface TabletHeaderSubmenuItem {
  label: string;
  to: string;
}

interface TabletHeaderMenuItem {
  label: string;
  to: string;
  children: TabletHeaderSubmenuItem[];
}

const tabletHeaderMenus: TabletHeaderMenuItem[] = [
  {
    label: "브랜드 소개",
    to: "/about",
    children: [
      { label: "브랜드 스토리", to: "/about" },
      { label: "공간소개", to: "/brand/space" },
      { label: "오시는 길", to: "/store" },
    ],
  },
  {
    label: "제품 소개",
    to: "/shop",
    children: [
      { label: "차 이야기", to: "/product/tea-story" },
      { label: "차 컬렉션", to: "/shop" },
      { label: "계절의 차", to: "/seasontea" },
    ],
  },
  {
    label: "다도 클래스",
    to: "/class",
    children: [
      { label: "일반 클래스", to: "/class" },
      { label: "시즌 클래스", to: "/class/season" },
    ],
  },
  {
    label: "예약",
    to: "/reservation",
    children: [
      { label: "예약하기", to: "/reservation" },
      { label: "공지사항", to: "/reservation/notice" },
      { label: "자주 묻는 질문", to: "/reservation/faq" },
    ],
  },
  {
    label: "이벤트",
    to: "/event",
    children: [{ label: "이벤트", to: "/event" }],
  },
];

export default function TabletHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const activeMenu = tabletHeaderMenus[activeMenuIndex] ?? tabletHeaderMenus[0];

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
    setIsUserPopupOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsUserPopupOpen(false);
  };

  return (
    <div className="tablet-header-shell">
      <header className="tablet-header" aria-label="태블릿 헤더">
        <h1 className="tablet-header__logo">
          <Link to="/" aria-label="청연 홈" onClick={closeMenu}>
            <img src={logo} alt="청연" />
          </Link>
        </h1>

        <button
          className="tablet-header__menu-button"
          type="button"
          aria-label={isMenuOpen ? "햄버거 메뉴 닫기" : "햄버거 메뉴 열기"}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <img src={isMenuOpen ? hamMenuX : hamMenu} alt="" aria-hidden="true" />
        </button>
      </header>

      <section
        className={["tablet-menu", isMenuOpen && "tablet-menu--open"].filter(Boolean).join(" ")}
        aria-hidden={!isMenuOpen}
      >
        <div className="tablet-menu__header">
          <h2 className="tablet-menu__logo">
            <Link to="/" aria-label="청연 홈" onClick={closeMenu}>
              <img src={logo} alt="청연" />
            </Link>
          </h2>

          <button
            className="tablet-menu__close-button"
            type="button"
            aria-label="햄버거 메뉴 닫기"
            onClick={toggleMenu}
          >
            <img src={hamMenuX} alt="" aria-hidden="true" />
          </button>
        </div>

        <div className="tablet-menu__body">
          <nav className="tablet-menu__primary" aria-label="태블릿 주요 메뉴">
            {tabletHeaderMenus.map((menu, index) => (
              <Link
                className={[
                  "tablet-menu__primary-link",
                  "ft-18b",
                  activeMenuIndex === index && "tablet-menu__primary-link--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={menu.label}
                to={menu.to}
                onFocus={() => setActiveMenuIndex(index)}
                onMouseEnter={() => setActiveMenuIndex(index)}
              >
                {menu.label}
              </Link>
            ))}
          </nav>

          <div className="tablet-menu__utility">
            <div className="tablet-menu__utility-row">
              <button
                className="tablet-menu__user-button"
                type="button"
                aria-label="사용자 메뉴"
                aria-expanded={isUserPopupOpen}
                onClick={() => {
                  setIsUserPopupOpen((current) => !current);
                }}
              >
                <Icon name="user" aria-hidden="true" />
              </button>

              <div
                className={[
                  "tablet-menu__user-popup",
                  isUserPopupOpen && "tablet-menu__popup--open",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden={!isUserPopupOpen}
              >
                <Link className="tablet-menu__popup-link ft-16b ink500" to="/login" onClick={closeMenu}>
                  로그인
                </Link>
                <Link className="tablet-menu__popup-link ft-16b ink500" to="/mypage" onClick={closeMenu}>
                  마이페이지
                </Link>
              </div>
            </div>
          </div>

          <span className="tablet-menu__divider" aria-hidden="true" />

          <nav className="tablet-menu__secondary" aria-label={`${activeMenu.label} 하위 메뉴`}>
            {activeMenu.children.map((child) => (
              <Link
                className="tablet-menu__secondary-link ft-18b ink500"
                key={child.label}
                to={child.to}
                onClick={closeMenu}
              >
                {child.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
