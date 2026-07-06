import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useSiteHeaderScroll } from "../../../hooks/useSiteHeaderScroll";
import hamMenu from "../../../assets/images/00header-footer/ham-menu.svg";
import hamMenuX from "../../../assets/images/00header-footer/ham-menu-x.svg";
import logo from "../../../assets/images/00header-footer/logo.svg";
import { getActiveMenuIndex, pathMatches } from "../headerMenuUtils";
import Icon from "../Icon";
import "./Header.scss";

type ActiveDropdown = "gnb" | "user" | null;

interface HeaderMenuItem {
  label: string;
  to: string;
  children: HeaderSubmenuItem[];
}

interface HeaderSubmenuItem {
  label: string;
  to: string;
}

const TEA_STORY_PATH = "/product/tea-story";

const gnbMenus: HeaderMenuItem[] = [
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
      { label: "차 이야기", to: TEA_STORY_PATH },
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

const getNavLinkClassName = (baseClassName: string, activeClassName: string, isActive: boolean) =>
  [baseClassName, isActive && "active", isActive && activeClassName].filter(Boolean).join(" ");

export default function Header() {
  const { isLoggedIn, loginId, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(() => getActiveMenuIndex(pathname, gnbMenus));
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number | null>(() =>
    getActiveMenuIndex(pathname, gnbMenus),
  );
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const { isScrolled, isScrollHidden } = useSiteHeaderScroll();

  const isGnbOpen = activeDropdown === "gnb";
  const activeMenu = gnbMenus[activeMenuIndex] ?? gnbMenus[0];

  useEffect(() => {
    const index = getActiveMenuIndex(pathname, gnbMenus);
    setActiveMenuIndex(index);
    setActiveAccordionIndex(index);
  }, [pathname]);

  useEffect(() => {
    if (isScrollHidden) {
      setActiveDropdown(null);
    }
  }, [isScrollHidden]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsUserPopupOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((current) => {
      const next = !current;

      if (next) {
        const index = getActiveMenuIndex(pathname, gnbMenus);
        setActiveMenuIndex(index);
        setActiveAccordionIndex(index);
      }

      return next;
    });
    setIsUserPopupOpen(false);
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordionIndex((current) => (current === index ? null : index));
  };

  const handleMobilePanelLoginClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeMenu();
    navigate("/mypage");
  };

  return (
    <div
      className={[
        "site-header-shell",
        isMenuOpen && "site-header-shell--menu-open",
        isScrollHidden && !isMenuOpen && "site-header-shell--scroll-hidden",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header
        className={[
          "site-header site-header--desktop",
          isGnbOpen && "site-header--open",
          isScrolled && "site-header--scrolled",
        ]
          .filter(Boolean)
          .join(" ")}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="site-header__overlay" aria-hidden="true" />
        <div className="site-header__inner">
          <h1 className="site-header__logo">
            <Link to="/" aria-label="청연 홈">
              <img src={logo} alt="청연" />
            </Link>
          </h1>

          <div className="site-header__interactive">
            <nav
              className="site-header__gnb"
              aria-label="주요 메뉴"
              onMouseEnter={() => setActiveDropdown("gnb")}
            >
              {gnbMenus.map((menu) => {
                const isMenuActive =
                  pathMatches(pathname, menu.to) ||
                  menu.children.some((child) => pathMatches(pathname, child.to));

                return (
                  <div
                    className={[
                      "site-header__menu-item",
                      activeDropdown === "gnb" && "site-header__menu-item--active",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={menu.label}
                  >
                    <NavLink
                      className={() =>
                        getNavLinkClassName(
                          "site-header__menu-link ft-18b ink500",
                          "site-header__menu-link--active",
                          isMenuActive,
                        )
                      }
                      to={menu.to}
                    >
                      {menu.label}
                    </NavLink>
                    <span className="site-header__dropdown-line" aria-hidden="true" />
                    <ul className="site-header__submenu" aria-hidden={activeDropdown !== "gnb"}>
                      {menu.children.map((child) => (
                        <li key={child.label}>
                          <NavLink
                            className={({ isActive }) =>
                              getNavLinkClassName(
                                "site-header__submenu-link ft-18b ink500",
                                "site-header__submenu-link--active",
                                isActive,
                              )
                            }
                            end={!child.to.endsWith("/notice")}
                            to={child.to}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </nav>

            <div className="site-header__actions">
              <div
                className={[
                  "site-header__menu-item",
                  "site-header__menu-item--action",
                  "site-header__menu-item--user",
                  activeDropdown === "user" && "site-header__menu-item--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => setActiveDropdown("user")}
              >
                <button
                  className="site-header__menu-link site-header__action-link ft-18b ink500"
                  type="button"
                  aria-label="사용자 메뉴"
                  aria-expanded={activeDropdown === "user"}
                  onClick={() => setActiveDropdown("user")}
                >
                  <Icon className="site-header__user-icon" name="user" aria-hidden="true" />
                  {isLoggedIn ? <span className="site-header__user-name ft-14r">{loginId}</span> : null}
                  <Icon className="site-header__angle-icon" name="angle-down" aria-hidden="true" />
                </button>
                <span className="site-header__dropdown-line" aria-hidden="true" />
                <ul
                  className="site-header__action-dropdown site-header__action-dropdown--user"
                  aria-hidden={activeDropdown !== "user"}
                >
                  <li>
                    {isLoggedIn ? (
                      <button
                        className="site-header__action-dropdown-link ft-16b ink500"
                        type="button"
                        onClick={() => {
                          logout();
                          setActiveDropdown(null);
                        }}
                      >
                        로그아웃
                      </button>
                    ) : (
                      <Link className="site-header__action-dropdown-link ft-16b ink500" to="/login">
                        로그인
                      </Link>
                    )}
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        getNavLinkClassName(
                          "site-header__action-dropdown-link ft-16b ink500",
                          "site-header__action-dropdown-link--active",
                          isActive,
                        )
                      }
                      end
                      to="/mypage"
                    >
                      마이페이지
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header
        className={[
          "site-header site-header--compact",
          isScrolled && "site-header--scrolled",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="태블릿·모바일 헤더"
      >
        <div className="site-header__compact-inner">
          <div className="site-header__compact-left">
            <h1 className="site-header__compact-logo">
              <Link to="/" aria-label="청연 홈" onClick={closeMenu}>
                <img src={logo} alt="청연" />
              </Link>
            </h1>
          </div>

          <button
            className="site-header__menu-toggle"
            type="button"
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <img src={isMenuOpen ? hamMenuX : hamMenu} alt="" aria-hidden="true" />
          </button>
        </div>
      </header>

      <section
        className={["site-header__tablet-panel", isMenuOpen && "site-header__tablet-panel--open"]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!isMenuOpen}
      >
        <div className="site-header__tablet-panel-header">
          <h2 className="site-header__tablet-panel-logo">
            <Link to="/" aria-label="청연 홈" onClick={closeMenu}>
              <img src={logo} alt="청연" />
            </Link>
          </h2>
          <button
            className="site-header__tablet-panel-close"
            type="button"
            aria-label="메뉴 닫기"
            onClick={toggleMenu}
          >
            <img src={hamMenuX} alt="" aria-hidden="true" />
          </button>
        </div>

        <div className="site-header__tablet-panel-body">
          <nav className="site-header__tablet-primary" aria-label="태블릿 주요 메뉴">
            {gnbMenus.map((menu, index) => (
              <Link
                className={[
                  "site-header__tablet-primary-link",
                  "ft-18b",
                  activeMenuIndex === index && "site-header__tablet-primary-link--active",
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

          <div className="site-header__tablet-utility">
            <div className="site-header__tablet-utility-row">
              <button
                className="site-header__tablet-user-button"
                type="button"
                aria-label="사용자 메뉴"
                aria-expanded={isUserPopupOpen}
                onClick={() => setIsUserPopupOpen((current) => !current)}
              >
                <Icon name="user" aria-hidden="true" />
              </button>
              <div
                className={[
                  "site-header__tablet-user-popup",
                  isUserPopupOpen && "site-header__tablet-popup--open",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden={!isUserPopupOpen}
              >
                {isLoggedIn ? (
                  <button
                    className="site-header__tablet-popup-link ft-16b ink500"
                    type="button"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    로그아웃
                  </button>
                ) : (
                  <Link className="site-header__tablet-popup-link ft-16b ink500" to="/login" onClick={closeMenu}>
                    로그인
                  </Link>
                )}
                <Link className="site-header__tablet-popup-link ft-16b ink500" to="/mypage" onClick={closeMenu}>
                  마이페이지
                </Link>
              </div>
            </div>
          </div>

          <span className="site-header__tablet-divider" aria-hidden="true" />

          <nav className="site-header__tablet-secondary" aria-label={`${activeMenu.label} 하위 메뉴`}>
            {activeMenu.children.map((child) => (
              <Link
                className="site-header__tablet-secondary-link ft-18b ink500"
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

      <section
        className={["site-header__mobile-panel", isMenuOpen && "site-header__mobile-panel--open"]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!isMenuOpen}
      >
        <div className="site-header__mobile-panel-inner">
          <header className="site-header__mobile-panel-header" aria-label="모바일 메뉴 헤더">
            <Link
              className="site-header__mobile-panel-login"
              to="/mypage"
              onClick={handleMobilePanelLoginClick}
            >
              <span className="site-header__mobile-panel-user-frame" aria-hidden="true">
                <Icon name="user" />
              </span>
              <span className="site-header__mobile-panel-login-text ft-14b ink500">
                {isLoggedIn ? loginId : "로그인"}
              </span>
            </Link>

            <button
              className="site-header__mobile-panel-close"
              type="button"
              aria-label="메뉴 닫기"
              onClick={toggleMenu}
            >
              <img src={hamMenuX} alt="" aria-hidden="true" />
            </button>
          </header>

          <nav className="site-header__mobile-accordion" aria-label="모바일 주요 메뉴">
            {gnbMenus.map((menu, index) => {
              const isOpen = activeAccordionIndex === index;
              const panelId = `site-header-mobile-panel-${index}`;

              return (
                <div className="site-header__mobile-accordion-item" key={menu.label}>
                  <button
                    className="site-header__mobile-accordion-button"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="site-header__mobile-accordion-label ft-16b ink500">{menu.label}</span>
                    <Icon
                      className={[
                        "site-header__mobile-accordion-icon",
                        isOpen && "site-header__mobile-accordion-icon--open",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      name="angle-down"
                      aria-hidden="true"
                    />
                  </button>
                  <span className="site-header__mobile-accordion-line" aria-hidden="true" />
                  <div
                    className={[
                      "site-header__mobile-submenu",
                      isOpen && "site-header__mobile-submenu--open",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    id={panelId}
                  >
                    {menu.children.map((child) => (
                      <Link
                        className="site-header__mobile-submenu-link ft-14r ink500"
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
