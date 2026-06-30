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

export default function Button(props: ButtonProps) {
  const {
    children,
    icon,
    iconAlt = "",
    iconPosition = "left",
    iconSrc,
    responsiveSize,
    responsiveTone = "primary",
    variant = "payment",
    className = "",
    showIcon = true,
  } = props;
  const resolvedVariant = buttonAliases[variant as ButtonAlias] ?? variant;
  const typographyClass = responsiveSize === "mobile" ? "ft-14b" : resolvedVariant === "classMore" ? "ft-18b" : "ft-16b";
  const injectedIcon = iconSrc ? (
    <img className="cy-button__icon-image" src={iconSrc} alt={iconAlt} aria-hidden={iconAlt ? undefined : "true"} />
  ) : icon ? (
    <span className="cy-button__icon" aria-hidden="true">
      {icon}
    </span>
  ) : null;
  const classes = [
    "cy-button",
    `cy-button--${resolvedVariant}`,
    responsiveSize && "cy-button--responsive",
    responsiveSize && `cy-button--responsive-${responsiveSize}`,
    responsiveSize && `cy-button--responsive-${responsiveTone}`,
    typographyClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {iconPosition === "left" && injectedIcon}
      {children}
      {iconPosition === "right" && injectedIcon}
      {showIcon && resolvedVariant === "classMore" && (
        <Icon name="chevron-right" />
      )}
    </>
  );

  if (typeof props.href === "string") {
    const {
      children: _children,
      className: _className,
      icon: _icon,
      iconAlt: _iconAlt,
      iconPosition: _iconPosition,
      iconSrc: _iconSrc,
      rel,
      responsiveSize: _responsiveSize,
      responsiveTone: _responsiveTone,
      showIcon: _showIcon,
      target,
      variant: _variant,
      ...anchorProps
    } = props;
    const safeRel = target === "_blank" ? (rel ?? "noreferrer") : rel;

    return (
      <a className={classes} rel={safeRel} target={target} {...anchorProps}>
        {content}
      </a>
    );
  }

  const {
    children: _children,
    className: _className,
    icon: _icon,
    iconAlt: _iconAlt,
    iconPosition: _iconPosition,
    iconSrc: _iconSrc,
    responsiveSize: _responsiveSize,
    responsiveTone: _responsiveTone,
    showIcon: _showIcon,
    type = "button",
    variant: _variant,
    ...buttonProps
  } = props;

  return (
    <button className={classes} type={type} {...buttonProps}>
      {content}
    </button>
  );
}
