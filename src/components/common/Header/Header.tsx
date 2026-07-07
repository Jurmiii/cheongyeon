import { useEffect, useState } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";

import { useSiteHeaderScroll } from "../../../hooks/useSiteHeaderScroll";

import hamMenu from "../../../assets/images/00header-footer/ham-menu.svg";

import hamMenuX from "../../../assets/images/00header-footer/ham-menu-x.svg";

import logo from "../../../assets/images/00header-footer/logo.svg";

import { gnbMenus } from "../../../data/siteNavConfig";

import { getActiveMenuIndex, isSubmenuItemActive } from "../headerMenuUtils";

import Icon from "../Icon";

import "./Header.scss";



type ActiveDropdown = "user" | null;



const getNavLinkClassName = (baseClassName: string, activeClassName: string, isActive: boolean) =>

  [baseClassName, isActive && "active", isActive && activeClassName].filter(Boolean).join(" ");



export default function Header() {

  const { isLoggedIn, loginId, logout } = useAuth();

  const { pathname } = useLocation();

  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const [isGnbOpen, setIsGnbOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeMenuIndex, setActiveMenuIndex] = useState(() => getActiveMenuIndex(pathname, gnbMenus));

  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number | null>(() =>

    getActiveMenuIndex(pathname, gnbMenus),

  );

  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const { isScrolled, isScrollHidden } = useSiteHeaderScroll();



  const activeMenu = gnbMenus[activeMenuIndex] ?? gnbMenus[0];



  useEffect(() => {

    const index = getActiveMenuIndex(pathname, gnbMenus);

    setActiveMenuIndex(index);

    setActiveAccordionIndex(index);

    setIsGnbOpen(false);
    setActiveDropdown(null);

    setIsMenuOpen(false);

    setIsUserPopupOpen(false);

  }, [pathname]);



  useEffect(() => {

    if (isScrollHidden) {
      setIsGnbOpen(false);
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

        onMouseLeave={() => {
          setIsGnbOpen(false);
          setActiveDropdown(null);
        }}

      >

        <div className="site-header__overlay" aria-hidden="true" />

        <div
          className="site-header__gnb-bridge"
          onMouseLeave={(event) => {
            const relatedTarget = event.relatedTarget as Node | null;

            if (!relatedTarget || !event.currentTarget.contains(relatedTarget)) {
              setIsGnbOpen(false);
            }
          }}
        >
          <div
            className="site-header__bar-hit"
            onMouseEnter={() => setIsGnbOpen(true)}
          >
            <div className="site-header__inner">
              <h1 className="site-header__logo">
                <Link to="/" aria-label="청연 홈">
                  <img src={logo} alt="청연" />
                </Link>
              </h1>

              <div className="site-header__interactive">
                <nav className="site-header__gnb" aria-label="주요 메뉴">
                  {gnbMenus.map((menu) => (
                    <div className="site-header__menu-item" key={menu.label}>
                      <NavLink className="site-header__menu-link ft-18b ink500" to={menu.to}>
                        {menu.label}
                      </NavLink>
                    </div>
                  ))}
                </nav>

                <div
                  className={[
                    "site-header__submenu-panel",
                    isGnbOpen && "site-header__submenu-panel--open",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden={!isGnbOpen}
                >
                  {gnbMenus.map((menu) => (
                    <div
                      className={[
                        "site-header__menu-item",
                        "site-header__menu-item--submenu",
                        isGnbOpen && "site-header__menu-item--active",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={menu.label}
                    >
                      <span
                        className="site-header__menu-link site-header__menu-link--sizer ft-18b ink500"
                        aria-hidden="true"
                      >
                        {menu.label}
                      </span>
                      <span className="site-header__dropdown-line" aria-hidden="true" />
                      <ul className="site-header__submenu" aria-hidden={!isGnbOpen}>
                        {menu.children.map((child) => {
                          const isChildActive = isSubmenuItemActive(pathname, child.to, menu.children);

                          return (
                            <li key={child.label}>
                              <NavLink
                                className={getNavLinkClassName(
                                  "site-header__submenu-link ft-18b ink500",
                                  "site-header__submenu-link--active",
                                  isChildActive,
                                )}
                                to={child.to}
                              >
                                {child.label}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

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

                className="site-header__tablet-primary-link ft-18b"

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

            {activeMenu.children.map((child) => {
              const isChildActive = isSubmenuItemActive(pathname, child.to, activeMenu.children);

              return (
              <Link

                className={[
                  "site-header__tablet-secondary-link",
                  "ft-18b",
                  "ink500",
                  isChildActive && "site-header__tablet-secondary-link--active",
                ]
                  .filter(Boolean)
                  .join(" ")}

                key={child.label}

                to={child.to}

                onClick={closeMenu}

              >

                {child.label}

              </Link>
              );
            })}

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

              to={isLoggedIn ? "/mypage" : "/login"}

              onClick={closeMenu}

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

                    {menu.children.map((child) => {
                      const isChildActive = isSubmenuItemActive(pathname, child.to, menu.children);

                      return (
                      <Link

                        className={[
                          "site-header__mobile-submenu-link",
                          "ft-14r",
                          "ink500",
                          isChildActive && "site-header__mobile-submenu-link--active",
                        ]
                          .filter(Boolean)
                          .join(" ")}

                        key={child.label}

                        to={child.to}

                        onClick={closeMenu}

                      >

                        {child.label}

                      </Link>
                      );
                    })}

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


