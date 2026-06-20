import type { InputHTMLAttributes } from "react";

export type InputState = "default" | "filled" | "error" | "success" | "disabled";

export type InputAlias = "in1" | "in2" | "in3" | "in4" | "in5";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  state?: InputState | InputAlias;
}
