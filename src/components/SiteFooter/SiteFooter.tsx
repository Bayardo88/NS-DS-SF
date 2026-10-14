import { forwardRef, useId, type HTMLAttributes, type ReactElement } from 'react';
import type { IconName } from '../Icon/Icon.js';
import { IconButton } from '../IconButton/IconButton.js';
import { Logo } from '../Logo/index.js';
import type { RenderSiteLink, SiteLink, SiteLinkRenderProps } from '../SiteHeader/SiteHeader.js';
import { useTheme } from '../../theme/ThemeProvider.js';
import { Slot } from '../../utils/Slot.js';
import { cx } from '../../utils/cx.js';

/** Social profile URLs. A network without a URL is left out; with none, the social row is hidden. */
export interface SiteFooterSocial {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export type SiteFooterLogoVariant = 'on-dark' | 'main' | 'mono-light';

/**
 * Footer surface. `inverse` is the navy bg/inverse surface (Light). `canvas` sits on bg/canvas with
 * text/secondary, for Dark and Web 2025 where bg/inverse turns light.
 */
export type SiteFooterSurface = 'inverse' | 'canvas';

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  /** Social links (Figma `Show social`): Facebook, Instagram, LinkedIn. They open in a new tab. */
  social?: SiteFooterSocial;
  /** Legal links, e.g. Terms and Conditions, Privacy Policy. Rendered in a `<nav aria-label="Legal">`. */
  legal?: SiteLink[];
  /** Copyright line (Figma `Copyright`). Defaults to `© <current year> NicaSource, LLC`. */
  copyright?: string;
  /** Figma exposed Logo variant. Defaults to `on-dark` (both surfaces are dark). */
  logoVariant?: SiteFooterLogoVariant;
  /** Where the logo links to. */
  logoHref?: string;
  /** Accessible name of the logo link. */
  logoLabel?: string;
  /** Surface. Defaults to `inverse` in Light and `canvas` in Dark and Web 2025. */
  surface?: SiteFooterSurface;
  /** Router integration for the logo and legal links (same contract as `SiteHeader.renderLink`). */
  renderLink?: RenderSiteLink;
  /** Accessible name of the legal `<nav>`. */
  legalLabel?: string;
}

const networks: { key: keyof SiteFooterSocial; name: string; icon: IconName }[] = [
  { key: 'facebook', name: 'Facebook', icon: 'facebook' },
  { key: 'instagram', name: 'Instagram', icon: 'instagram' },
  { key: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
];

const currentYear = new Date().getFullYear();

function renderDefaultLink({ href, children }: SiteLinkRenderProps): ReactElement {
  return <a href={href}>{children}</a>;
}

/**
 * The site footer (Figma "Footer"): logo, social Icon Buttons, copyright and legal links. A row on
 * desktop, stacked and centered below 768px (CSS media query).
 */
export const SiteFooter = forwardRef<HTMLElement, SiteFooterProps>(function SiteFooter(
  {
    social,
    legal = [],
    copyright = `© ${currentYear} NicaSource, LLC`,
    logoVariant = 'on-dark',
    logoHref = '/',
    logoLabel = 'NicaSource home',
    surface,
    renderLink = renderDefaultLink,
    legalLabel = 'Legal',
    className,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const newTabId = useId();
  const resolvedSurface = surface ?? (theme === 'light' ? 'inverse' : 'canvas');
  const socialLinks = networks.filter((network) => social?.[network.key]);

  return (
    <footer ref={ref} className={cx('ns-site-footer', `ns-site-footer--${resolvedSurface}`, className)} {...rest}>
      <Slot className="ns-site-footer__logo" aria-label={logoLabel}>
        {renderLink({
          href: logoHref,
          children: <Logo label="" variant={logoVariant} className="ns-site-footer__logo-mark" />,
        })}
      </Slot>

      {socialLinks.length > 0 && (
        <ul className="ns-site-footer__social">
          {socialLinks.map((network) => (
            <li key={network.key}>
              <IconButton
                asChild
                variant="text"
                size="md"
                icon={network.icon}
                aria-label={`NicaSource on ${network.name}`}
                aria-describedby={newTabId}
                className="ns-site-footer__social-link"
              >
                <a href={social?.[network.key]} target="_blank" rel="noopener noreferrer">
                  {network.name}
                </a>
              </IconButton>
            </li>
          ))}
        </ul>
      )}
      {socialLinks.length > 0 && (
        <span id={newTabId} hidden>
          (opens in new tab)
        </span>
      )}

      <div className="ns-site-footer__legal">
        <p className="ns-site-footer__copyright ns-text-secondary-body-sm-regular">{copyright}</p>
        {legal.length > 0 && (
          <nav aria-label={legalLabel}>
            <ul className="ns-site-footer__legal-links ns-text-secondary-body-sm-regular">
              {legal.map((link) => (
                <li key={link.href} className="ns-site-footer__legal-item">
                  <Slot className="ns-site-footer__legal-link">
                    {renderLink({ href: link.href, children: link.label })}
                  </Slot>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </footer>
  );
});
