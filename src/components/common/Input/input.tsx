import "./input.scss";

import type { InputAlias, InputProps, InputState } from "./input.types";

export const inputAliases: Record<InputAlias, InputState> = {
  in1: "default",
  in2: "filled",
  in3: "error",
  in4: "success",
  in5: "disabled",
};

export default function Input({
  state = "default",
  className = "",
  disabled,
  ...props
}: InputProps) {
  const resolvedState = inputAliases[state as InputAlias] ?? state;
  const isDisabled = resolvedState === "disabled" || disabled;
  const classes = [
    "cy-input",
    `cy-input--${resolvedState}`,
    "ft-14r",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <input className={classes} disabled={isDisabled} {...props} />;
}
