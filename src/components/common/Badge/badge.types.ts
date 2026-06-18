import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "confirmed"
  | "progress"
  | "disabled"
  | "deadline"
  | "new"
  | "recommend"
  | "best"
  | "oneday"
  | "guide"
  | "dday";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
  children?: ReactNode;
}
