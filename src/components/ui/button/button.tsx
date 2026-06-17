import './Button.scss';

import type { ButtonProps } from './Button.types';

export default function Button({
  children,
  variant = 'primary-deep',
  icon,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant}`}
      disabled={disabled}
      {...props}
    >
      {children}

      {icon && (
        <span className="button__icon">
          {icon}
        </span>
      )}
    </button>
  );
}