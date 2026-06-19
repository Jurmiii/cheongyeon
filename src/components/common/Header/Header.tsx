import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faUser as faRegularUser } from "@fortawesome/free-regular-svg-icons";
import logo from "../../../assets/images/svg/logo.svg";
import "./Header.scss";

type ActiveDropdown = "gnb" | "user" | "language" | null;

interface HeaderMenuItem {
  label: string;
  children: string[];
}

interface HeaderActionItem extends HeaderMenuItem {
  id: Exclude<ActiveDropdown, "gnb" | null>;
}

const gnbMenus: HeaderMenuItem[] = [
  { label: "브랜드 소개", children: ["브랜드 스토리", "공간소개", "오시는 길"] },
  { label: "제품 소개", children: ["차 이야기", "차 컬렉션", "계절의 차"] },
  { label: "다도 클래스", children: ["일반 클래스", "시즌 클래스"] },
  { label: "예약", children: ["예약하기"] },
  { label: "이벤트", children: ["진행중 이벤트", "공지사항"] },
];

const actionMenus: HeaderActionItem[] = [
  { id: "user", label: "user", children: ["로그인", "회원가입", "마이페이지"] },
  { id: "language", label: "KR", children: ["EN"] },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const isGnbOpen = activeDropdown === "gnb";

  return (
    <header className={["site-header", isGnbOpen && "site-header--open"].filter(Boolean).join(" ")}>
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
            onMouseLeave={() => setActiveDropdown(null)}
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
              <div
                className={[
                  "site-header__menu-item",
                  "site-header__menu-item--action",
                  `site-header__menu-item--${menu.id}`,
                  activeDropdown === menu.id && "site-header__menu-item--active",
                ].filter(Boolean).join(" ")}
                key={menu.id}
                onMouseEnter={() => setActiveDropdown(menu.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="site-header__menu-link site-header__action-link ft-18b ink500"
                  type="button"
                  aria-expanded={activeDropdown === menu.id}
                >
                  {menu.id === "user" ? (
                    <FontAwesomeIcon className="site-header__user-icon" icon={faRegularUser} aria-label="사용자 메뉴" />
                  ) : (
                    menu.label
                  )}
                  <FontAwesomeIcon className="site-header__angle-icon" icon={faAngleDown} aria-hidden="true" />
                </button>
                <span className="site-header__dropdown-line" aria-hidden="true" />
                <ul className="site-header__submenu" aria-hidden={activeDropdown !== menu.id}>
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
      </div>
    </header>
  );
}
