import type { InputHTMLAttributes } from "react";

export type InputState = "default" | "error";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  state?: InputState;
}
