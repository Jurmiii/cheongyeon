export interface HeaderNavMenuItem {
  to: string;
  children: { to: string }[];
}

export const pathMatches = (pathname: string, to: string) =>
  pathname === to || pathname.startsWith(`${to}/`);

export function getActiveMenuIndex(pathname: string, menus: HeaderNavMenuItem[]) {
  const index = menus.findIndex(
    (menu) =>
      pathMatches(pathname, menu.to) ||
      menu.children.some((child) => pathMatches(pathname, child.to)),
  );

  return index >= 0 ? index : 0;
}
