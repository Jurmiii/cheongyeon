import "./input.scss";

import type { InputProps } from "./input.types";

export default function Input({
  state = "default",
  className = "",
  disabled,
  ...props
}: InputProps) {
  const isDisabled = state === "disabled" || disabled;
  const classes = [
    "cy-input",
    `cy-input--${state}`,
    "ft-14r",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <input className={classes} disabled={isDisabled} {...props} />;
}
