import "./button.scss";

import type { ButtonProps } from "./button.types";

export default function Button({
  children,
  variant = "primary-deep",
  icon,
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const typographyClass =
    variant === "more" ? "ft-18b" : variant === "kakao" || variant === "naver" ? "ft-14r" : "ft-16b";
  const classes = [
    "cy-button",
    `cy-button--${variant}`,
    fullWidth ? "cy-button--full" : "",
    typographyClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
      {icon && <span className="cy-button__icon">{icon}</span>}
    </button>
  );
}
