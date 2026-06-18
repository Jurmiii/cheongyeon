import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "confirmed"
  | "progress"
  | "disabled"
  | "deadline"
  | "recommend"
  | "best"
  | "oneday"
  | "guide"
  | "d7";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
  children?: ReactNode;
}
