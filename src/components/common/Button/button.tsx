import "./button.scss";

import Icon from "../Icon";
import type { ButtonAlias, ButtonProps, ButtonVariant } from "./button.types";

export const buttonAliases: Record<ButtonAlias, ButtonVariant> = {
  btn1: "payment",
  btn2: "reservationEdit",
  btn3: "cancel",
  btn4: "reservation",
  btn5: "favorite",
  btn6: "detail",
  btn7: "classMore",
  btn8: "kakao",
  btn9: "naver",
};

export default function Button({
  children,
  variant = "payment",
  className = "",
  showIcon = true,
  type = "button",
  ...props
}: ButtonProps) {
  const resolvedVariant = buttonAliases[variant as ButtonAlias] ?? variant;
  const typographyClass = resolvedVariant === "classMore" ? "ft-18b" : "ft-16b";
  const classes = ["cy-button", `cy-button--${resolvedVariant}`, typographyClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
      {showIcon && resolvedVariant === "classMore" && (
        <Icon name="angle-right" />
      )}
    </button>
  );
}
