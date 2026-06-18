import type { InputHTMLAttributes } from "react";

export type InputState = "default" | "filled" | "error" | "success" | "disabled";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  state?: InputState;
}
