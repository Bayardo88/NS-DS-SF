import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import type { RenderSiteLink } from '@nicasource/ds';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Internal paths use the router; anything else is a plain anchor. */
export const SmartLink = forwardRef<HTMLAnchorElement, Props>(function SmartLink({ href, ...rest }, ref) {
  if (href.startsWith('/') && !href.startsWith('//')) return <Link ref={ref} to={href} {...rest} />;
  return <a ref={ref} href={href} {...rest} />;
});

/** `renderLink` for SiteHeader / SiteFooter. */
export const renderRouterLink: RenderSiteLink = ({ href, children }) => <SmartLink href={href}>{children}</SmartLink>;
