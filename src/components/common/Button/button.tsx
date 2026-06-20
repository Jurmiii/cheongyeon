import "./button.scss";

import Icon from "../Icon";
import type { ButtonProps } from "./button.types";

export default function Button({
  children,
  variant = "payment",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const typographyClass = variant === "classMore" ? "ft-18b" : "ft-16b";
  const classes = ["cy-button", `cy-button--${variant}`, typographyClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
      {variant === "classMore" && (
        <Icon name="angle-right" />
      )}
    </button>
  );
}
