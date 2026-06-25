import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import logo from "../../../assets/images/00header-footer/logo.svg";
import Icon from "../Icon";
import "./Header.scss";

type ActiveDropdown = "gnb" | "user" | "language" | null;
type HeaderLanguage = "KO" | "EN";

interface HeaderMenuItem {
  label: string;
  to: string;
  children: HeaderSubmenuItem[];
}

interface HeaderSubmenuItem {
  label: string;
  to: string;
}

interface HeaderActionItem {
  id: "user" | "language";
  label: string;
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
    children: [{ label: "예약하기", to: "/reservation" }],
  },
  {
    label: "이벤트",
    to: "/event",
    children: [
      { label: "진행중 이벤트", to: "/event" },
      { label: "공지사항", to: "/event/notice" },
    ],
  },
];

const actionMenus: HeaderActionItem[] = [
  { id: "user", label: "user" },
  { id: "language", label: "KO" },
];

const pathMatches = (pathname: string, to: string) => pathname === to || pathname.startsWith(`${to}/`);

const getNavLinkClassName = (baseClassName: string, activeClassName: string, isActive: boolean) =>
  [baseClassName, isActive && "active", isActive && activeClassName]
    .filter(Boolean)
    .join(" ");

export default function Header() {
  const { isLoggedIn, loginId, logout } = useAuth();
  const { pathname } = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<HeaderLanguage>("KO");
  const isGnbOpen = activeDropdown === "gnb";
  const nextLanguage: HeaderLanguage = selectedLanguage === "KO" ? "EN" : "KO";
  const handleActionClick = (dropdown: ActiveDropdown) => {
    setActiveDropdown(dropdown);
  };

  return (
    <header
      className={["site-header", isGnbOpen && "site-header--open"].filter(Boolean).join(" ")}
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
                  ].filter(Boolean).join(" ")}
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
                          end={child.to !== "/event/notice"}
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
            {actionMenus.map((menu) => (
              <div
                className={[
                  "site-header__menu-item",
                  "site-header__menu-item--action",
                  `site-header__menu-item--${menu.id}`,
                  activeDropdown === menu.id && "site-header__menu-item--active",
                ].filter(Boolean).join(" ")}
                key={menu.id}
                onMouseEnter={() => setActiveDropdown(menu.id)}
              >
                {menu.id === "user" ? (
                  <>
                    <button
                      className="site-header__menu-link site-header__action-link ft-18b ink500"
                      type="button"
                      aria-label="사용자 메뉴"
                      aria-expanded={activeDropdown === "user"}
                      onClick={() => handleActionClick("user")}
                    >
                      <Icon className="site-header__user-icon" name="user" aria-hidden="true" />
                      {isLoggedIn ? <span className="site-header__user-name ft-14r">{loginId}</span> : null}
                      <Icon className="site-header__angle-icon" name="angle-down" aria-hidden="true" />
                    </button>
                    <span className="site-header__dropdown-line" aria-hidden="true" />
                    <ul className="site-header__action-dropdown site-header__action-dropdown--user" aria-hidden={activeDropdown !== "user"}>
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
                  </>
                ) : (
                  <>
                    <button
                      className="site-header__menu-link site-header__action-link ft-18b ink500"
                      type="button"
                      aria-label="언어 선택"
                      aria-expanded={activeDropdown === "language"}
                      onClick={() => handleActionClick("language")}
                    >
                      {selectedLanguage}
                      <Icon className="site-header__angle-icon" name="angle-down" aria-hidden="true" />
                    </button>
                    <span className="site-header__dropdown-line" aria-hidden="true" />
                    <ul className="site-header__action-dropdown site-header__action-dropdown--language" aria-hidden={activeDropdown !== "language"}>
                      <li>
                        <button
                          className="site-header__action-dropdown-link ft-16b ink500"
                          type="button"
                          onClick={() => {
                            setSelectedLanguage(nextLanguage);
                            setActiveDropdown(null);
                          }}
                        >
                          {nextLanguage}
                        </button>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
