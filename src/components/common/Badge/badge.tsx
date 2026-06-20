import "./badge.scss";

import type { BadgeAlias, BadgeProps, BadgeVariant } from "./badge.types";

export const badgeAliases: Record<BadgeAlias, BadgeVariant> = {
  ba1: "confirmed",
  ba2: "progress",
  ba3: "disabled",
  ba4: "deadline",
  ba5: "recommend",
  ba6: "best",
  ba7: "oneday",
  ba8: "guide",
  ba9: "d7",
};

export default function Badge({
  variant,
  children,
  className = "",
  ...props
}: BadgeProps) {
  const resolvedVariant = badgeAliases[variant as BadgeAlias] ?? variant;
  const classes = ["cy-badge", `cy-badge--${resolvedVariant}`, "ft-14b", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
