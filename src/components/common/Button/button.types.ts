import type { ButtonHTMLAttributes, ReactNode } from "react";

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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant | ButtonAlias;
  showIcon?: boolean;
}
