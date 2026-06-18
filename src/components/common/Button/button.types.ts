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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}
