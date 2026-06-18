import "./input.scss";

import type { InputProps } from "./input.types";

export default function Input({
  state = "default",
  className = "",
  value,
  defaultValue,
  ...props
}: InputProps) {
  const isFilled =
    value !== undefined
      ? String(value).length > 0
      : defaultValue !== undefined && String(defaultValue).length > 0;
  const classes = [
    "cy-input",
    `cy-input--${state}`,
    isFilled ? "cy-input--filled" : "",
    "ft-14r",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <input className={classes} value={value} defaultValue={defaultValue} {...props} />;
}
