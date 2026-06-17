import type { ReactNode } from 'react';

export type BadgeVariant =
  | 'confirmed'
  | 'progress'
  | 'disabled'
  | 'deadline'
  | 'new'
  | 'best'
  | 'oneday'
  | 'guide'
  | 'dday';

export interface BadgeProps {
  children: ReactNode;
  variant: BadgeVariant;
}