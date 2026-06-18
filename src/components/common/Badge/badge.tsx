import "./badge.scss";

import type { BadgeProps } from "./badge.types";

export default function Badge({
  variant,
  children,
  className = "",
  ...props
}: BadgeProps) {
  const classes = ["cy-badge", `cy-badge--${variant}`, "ft-14b", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
