import { useState } from "react";
import { Link } from "react-router-dom";

import hamMenu from "../../../assets/images/00header-footer/ham-menu.svg";
import hamMenuX from "../../../assets/images/00header-footer/ham-menu-x.svg";
import logo from "../../../assets/images/00header-footer/logo.svg";
import Icon from "../Icon";
import "./MobileHeader.scss";

interface MobileHeaderSubmenuItem {
  label: string;
  to: string;
}

interface MobileHeaderMenuItem {
  label: string;
  to: string;
  children: MobileHeaderSubmenuItem[];
}

const mobileHeaderMenus: MobileHeaderMenuItem[] = [
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

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(0);

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleAccordion = (index: number) => {
    setActiveMenuIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="mobile-header-shell">
      <header className="mobile-header" aria-label="모바일 헤더">
        <h1 className="mobile-header__logo">
          <Link to="/" aria-label="청연 홈" onClick={closeMenu}>
            <img src={logo} alt="청연" />
          </Link>
        </h1>

        <div className="mobile-header__right">
          <button className="mobile-header__language ft-18b ink500" type="button" aria-label="언어 선택">
            KO
          </button>
          <button
            className="mobile-header__menu-button"
            type="button"
            aria-label={isMenuOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <img src={hamMenu} alt="" aria-hidden="true" />
          </button>
        </div>
      </header>

      <section
        className={["mobile-menu", isMenuOpen && "mobile-menu--open"].filter(Boolean).join(" ")}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-menu__inner">
          <header className="mobile-menu__header" aria-label="모바일 메뉴 헤더">
            <Link className="mobile-menu__login" to="/login" onClick={closeMenu}>
              <span className="mobile-menu__user-frame" aria-hidden="true">
                <Icon name="user" />
              </span>
              <span className="mobile-menu__login-text ft-14b ink500">로그인</span>
            </Link>

            <button
              className="mobile-menu__close-button"
              type="button"
              aria-label="모바일 메뉴 닫기"
              onClick={toggleMenu}
            >
              <img src={hamMenuX} alt="" aria-hidden="true" />
            </button>
          </header>

          <nav className="mobile-menu__accordion" aria-label="모바일 주요 메뉴">
            {mobileHeaderMenus.map((menu, index) => {
              const isOpen = activeMenuIndex === index;
              const panelId = `mobile-menu-panel-${index}`;

              return (
                <div className="mobile-menu__accordion-item" key={menu.label}>
                  <button
                    className="mobile-menu__accordion-button"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="mobile-menu__accordion-label ft-16b ink500">{menu.label}</span>
                    <Icon
                      className={[
                        "mobile-menu__accordion-icon",
                        isOpen && "mobile-menu__accordion-icon--open",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      name="angle-down"
                      aria-hidden="true"
                    />
                  </button>

                  <span className="mobile-menu__accordion-line" aria-hidden="true" />

                  <div
                    className={[
                      "mobile-menu__submenu",
                      isOpen && "mobile-menu__submenu--open",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    id={panelId}
                  >
                    {menu.children.map((child) => (
                      <Link
                        className="mobile-menu__submenu-link ft-14r ink500"
                        key={child.label}
                        to={child.to}
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </section>
    </div>
  );
}
