import "./container.scss";

import type { ContainerProps } from "./container.types";

export default function Container({ children, className = "", ...props }: ContainerProps) {
  const classes = ["cy-container", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
