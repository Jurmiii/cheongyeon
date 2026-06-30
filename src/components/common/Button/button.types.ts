import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "payment"
  | "reservationEdit"
  | "cancel"
  | "reservation"
  | "favorite"
  | "detail"
  | "classMore"
  | "kakao"
  | "naver";

export type ButtonAlias = "btn1" | "btn2" | "btn3" | "btn4" | "btn5" | "btn6" | "btn7" | "btn8" | "btn9";

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant | ButtonAlias;
  showIcon?: boolean;
  icon?: ReactNode;
  iconAlt?: string;
  iconPosition?: "left" | "right";
  iconSrc?: string;
  responsiveSize?: "tablet" | "mobile";
  responsiveTone?: "primary" | "outline";
}

export type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "href"> & {
    href?: never;
  };

export type ButtonAsAnchorProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "type"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;
