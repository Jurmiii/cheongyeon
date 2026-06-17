import type {
    ButtonHTMLAttributes,
    ReactNode,
  } from 'react';
  
  export type ButtonVariant =
    | 'primary-deep'
    | 'secondary-deep'
    | 'text-deep'
    | 'primary-plum'
    | 'secondary-plum'
    | 'text-plum'
    | 'more';
  
  export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    icon?: ReactNode;
  }