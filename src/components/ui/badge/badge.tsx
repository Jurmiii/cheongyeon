import './Badge.scss';
import type { BadgeProps } from './Badge.types';

export default function Badge({
  children,
  variant,
}: BadgeProps) {
  return (
    <span className={`badge badge--${variant} ft-14b`}>
      {children}
    </span>
  );
}