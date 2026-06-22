import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/svg/logo.svg";
import Icon from "../Icon";
import "./Header.scss";

type ActiveDropdown = "gnb" | null;

interface HeaderMenuItem {
  label: string;
  children: string[];
}

interface HeaderActionItem {
  id: "user" | "language";
  label: string;
}

const gnbMenus: HeaderMenuItem[] = [
  { label: "브랜드 소개", children: ["브랜드 스토리", "공간소개", "오시는 길"] },
  { label: "제품 소개", children: ["차 이야기", "차 컬렉션", "계절의 차"] },
  { label: "다도 클래스", children: ["일반 클래스", "시즌 클래스"] },
  { label: "예약", children: ["예약하기"] },
  { label: "이벤트", children: ["진행중 이벤트", "공지사항"] },
];

const actionMenus: HeaderActionItem[] = [
  { id: "user", label: "user" },
  { id: "language", label: "KR" },
];

const submenuHrefs: Record<string, string> = {
  예약하기: "/reservation",
  공지사항: "/event/notice",
};

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const isGnbOpen = activeDropdown === "gnb";

  return (
    <header
      className={["site-header", isGnbOpen && "site-header--open"].filter(Boolean).join(" ")}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="site-header__overlay" aria-hidden="true" />
      <div className="site-header__inner">
        <h1 className="site-header__logo">
          <a href="/" aria-label="청연 홈">
            <img src={logo} alt="청연" />
          </a>
        </h1>

        <div className="site-header__interactive">
          <nav
            className="site-header__gnb"
            aria-label="주요 메뉴"
            onMouseEnter={() => setActiveDropdown("gnb")}
          >
            {gnbMenus.map((menu) => (
              <div
                className={[
                  "site-header__menu-item",
                  activeDropdown === "gnb" && "site-header__menu-item--active",
                ].filter(Boolean).join(" ")}
                key={menu.label}
              >
                <a className="site-header__menu-link ft-18b ink500" href={`#${menu.label}`}>
                  {menu.label}
                </a>
                <span className="site-header__dropdown-line" aria-hidden="true" />
                <ul className="site-header__submenu" aria-hidden={activeDropdown !== "gnb"}>
                  {menu.children.map((child) => {
                    const href = submenuHrefs[child];

                    return (
                      <li key={child}>
                        {href ? (
                          <Link className="site-header__submenu-link ft-18b ink500" to={href}>
                            {child}
                          </Link>
                        ) : (
                          <a className="site-header__submenu-link ft-18b ink500" href={`#${child}`}>
                            {child}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="site-header__actions">
            {actionMenus.map((menu) => (
              <div
                className={[
                  "site-header__menu-item",
                  "site-header__menu-item--action",
                  `site-header__menu-item--${menu.id}`,
                ].filter(Boolean).join(" ")}
                key={menu.id}
              >
                <button
                  className="site-header__menu-link site-header__action-link ft-18b ink500"
                  type="button"
                  aria-label={menu.id === "user" ? "사용자 메뉴" : "언어 선택"}
                >
                  {menu.id === "user" ? (
                    <Icon className="site-header__user-icon" name="user" aria-label="사용자 메뉴" />
                  ) : (
                    menu.label
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
