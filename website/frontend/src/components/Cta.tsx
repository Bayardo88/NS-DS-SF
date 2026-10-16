import { Button, type ButtonProps } from '@nicasource/ds';
import type { Link } from '../lib/types';
import { SmartLink } from '../layout/RouterLink';

/** A CMS call to action rendered as the DS Button around a router-aware link. */
export function Cta({ cta, variant = 'filled', size = 'md', ...rest }: { cta?: Link } & Omit<ButtonProps, 'asChild'>) {
  if (!cta?.label) return null;
  return (
    <Button asChild variant={variant} size={size} {...rest}>
      <SmartLink href={cta.href}>{cta.label}</SmartLink>
    </Button>
  );
}
