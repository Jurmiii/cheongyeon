import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "payment"
  | "primary-deep"
  | "secondary-deep"
  | "text-deep"
  | "primary-plum"
  | "secondary-plum"
  | "text-plum"
  | "more"
  | "kakao"
  | "naver";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  fullWidth?: boolean;
}
