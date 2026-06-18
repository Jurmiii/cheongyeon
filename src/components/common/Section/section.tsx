import "./section.scss";

import type { SectionProps } from "./section.types";

export default function Section({ children, className = "", ...props }: SectionProps) {
  const classes = ["cy-section", className].filter(Boolean).join(" ");

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
}
