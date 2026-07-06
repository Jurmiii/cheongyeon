import type { SiteGnbMenuItem } from "../../data/siteNavConfig";

export type HeaderNavMenuItem = SiteGnbMenuItem;

export const pathMatches = (pathname: string, to: string) =>
  pathname === to || pathname.startsWith(`${to}/`);

/** 같은 부모 하위 메뉴 중 현재 경로와 가장 구체적으로 일치하는 항목만 활성 */
export function isSubmenuItemActive(
  pathname: string,
  to: string,
  siblings: readonly { to: string }[],
) {
  if (!pathMatches(pathname, to)) {
    return false;
  }

  return !siblings.some(
    (sibling) =>
      sibling.to !== to &&
      sibling.to.length > to.length &&
      pathMatches(pathname, sibling.to),
  );
}

export function getActiveMenuIndex(pathname: string, menus: HeaderNavMenuItem[]) {
  const index = menus.findIndex(
    (menu) =>
      pathMatches(pathname, menu.to) ||
      menu.children.some((child) => pathMatches(pathname, child.to)),
  );

  return index >= 0 ? index : 0;
}
