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

export type BadgeAlias = "ba1" | "ba2" | "ba3" | "ba4" | "ba5" | "ba6" | "ba7" | "ba8" | "ba9";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant | BadgeAlias;
  children?: ReactNode;
}
