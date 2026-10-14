import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Button } from '../Button/Button.js';
import { IconButton } from '../IconButton/IconButton.js';
import { Logo } from '../Logo/index.js';
import { NavLink } from '../NavLink/NavLink.js';
import { useTheme } from '../../theme/ThemeProvider.js';
import { Slot } from '../../utils/Slot.js';
import { cx } from '../../utils/cx.js';

/** A navigation destination: `{ label: 'Services', href: '/services' }`. */
export interface SiteLink {
  /** Visible label. */
  label: string;
  /** Destination; also used as the React key and matched against `current`. */
  href: string;
}

/** What `renderLink` receives: render an element that navigates to `href` and shows `children`. */
export interface SiteLinkRenderProps {
  href: string;
  children: ReactNode;
}

/**
 * Renders a router link. The returned element is wrapped with `asChild`, so it receives
 * `className`, `aria-current`, `aria-label`, `onClick` and a ref, and must forward them to its `<a>`.
 *
 * - Next.js: `({ href, children }) => <Link href={href}>{children}</Link>`
 * - React Router: `({ href, children }) => <Link to={href}>{children}</Link>`
 */
export type RenderSiteLink = (props: SiteLinkRenderProps) => ReactElement;

export type SiteHeaderLogoVariant = 'main' | 'on-dark' | 'mono-light';

export interface SiteHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Top-level links (Figma: 4–6). Put everything else in the footer. */
  links: SiteLink[];
  /** `href` of the current page. The matching link is Active and gets `aria-current="page"`. */
  current?: string;
  /** The single CTA (Button / Filled S), e.g. `{ label: 'Contact us', href: '/contact' }`. */
  cta?: SiteLink;
  /**
   * Figma exposed Logo variant. Defaults to `on-dark` when the nearest ThemeProvider is `dark` or
   * `web-2025`, `main` otherwise.
   */
  logoVariant?: SiteHeaderLogoVariant;
  /** Where the logo links to. */
  logoHref?: string;
  /** Accessible name of the logo link. */
  logoLabel?: string;
  /** Router integration for every link in the header (logo, nav links, CTA). Defaults to a plain `<a>`. */
  renderLink?: RenderSiteLink;
  /**
   * Target of a "Skip to content" link rendered as the first focusable element (visible on focus),
   * e.g. `"#main"`. Omit to leave it out (when the page provides its own).
   */
  skipLinkHref?: string;
  /** Text of the skip link. */
  skipLinkLabel?: string;
  /** Accessible name of the `<nav>` landmark. */
  navLabel?: string;
  /** Accessible name of the mobile menu button. Its open state is announced via `aria-expanded`. */
  menuLabel?: string;
  /** Controlled open state of the mobile menu. */
  menuOpen?: boolean;
  /** Initial open state of the mobile menu when uncontrolled. */
  defaultMenuOpen?: boolean;
  /** Called when the mobile menu wants to open or close (toggle, Escape, link click, resize to desktop). */
  onMenuOpenChange?: (open: boolean) => void;
}

const DESKTOP_QUERY = '(min-width: 1024px)';
const SCROLL_THRESHOLD = 8;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function renderDefaultLink({ href, children }: SiteLinkRenderProps): ReactElement {
  return <a href={href}>{children}</a>;
}

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}
const getScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const getServerScrolled = () => false;

const isDesktop = () => typeof window.matchMedia === 'function' && window.matchMedia(DESKTOP_QUERY).matches;

function useControllableOpen(
  value: boolean | undefined,
  defaultValue: boolean,
  onChange: ((open: boolean) => void) | undefined,
): [boolean, (open: boolean) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const controlled = value !== undefined;
  const open = controlled ? value : internal;
  const setOpen = useCallback(
    (next: boolean) => {
      if (!controlled) setInternal(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );
  return [open, setOpen];
}

/**
 * The site header (Figma "Navigation Bar"): logo, uppercase links and one CTA on desktop
 * (≥1024px); logo and a menu button that opens a full-screen menu below that. The breakpoint is a
 * CSS media query, so server and client render the same markup.
 */
export const SiteHeader = forwardRef<HTMLElement, SiteHeaderProps>(function SiteHeader(
  {
    links,
    current,
    cta,
    logoVariant,
    logoHref = '/',
    logoLabel = 'NicaSource home',
    renderLink = renderDefaultLink,
    skipLinkHref,
    skipLinkLabel = 'Skip to content',
    navLabel = 'Main',
    menuLabel = 'Menu',
    menuOpen,
    defaultMenuOpen = false,
    onMenuOpenChange,
    className,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const [open, setOpen] = useControllableOpen(menuOpen, defaultMenuOpen, onMenuOpenChange);
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const resolvedLogo = logoVariant ?? (theme === 'dark' || theme === 'web-2025' ? 'on-dark' : 'main');

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return undefined;
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  // Lock page scroll behind the full-screen menu; close it when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return undefined;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    if (!isDesktop()) body.style.overflow = 'hidden';

    const media = typeof window.matchMedia === 'function' ? window.matchMedia(DESKTOP_QUERY) : null;
    function handleMediaChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    media?.addEventListener('change', handleMediaChange);
    return () => {
      body.style.overflow = previousOverflow;
      media?.removeEventListener('change', handleMediaChange);
    };
  }, [open, setOpen]);

  function handleToggleClick() {
    setOpen(!open);
  }

  function handlePanelLinkClick() {
    setOpen(false);
  }

  // Focus trap while the menu is open: Tab cycles between the toggle and the menu's links.
  function handleNavKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!open || event.key !== 'Tab' || !toggleRef.current || !panelRef.current) return;
    const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const navLinks = (onClick?: () => void) =>
    links.map((link) => (
      <li key={link.href} className="ns-site-header__item">
        <NavLink asChild active={link.href === current} onClick={onClick}>
          {renderLink({ href: link.href, children: link.label })}
        </NavLink>
      </li>
    ));

  const ctaButton = (extraClass: string, onClick?: () => void) =>
    cta ? (
      <Button asChild variant="filled" size="sm" className={extraClass} onClick={onClick}>
        {renderLink({ href: cta.href, children: cta.label })}
      </Button>
    ) : null;

  return (
    <header
      ref={ref}
      className={cx(
        'ns-site-header',
        open && 'ns-site-header--menu-open',
        scrolled && 'ns-site-header--scrolled',
        className,
      )}
      {...rest}
    >
      {skipLinkHref && (
        <a className="ns-site-header__skip" href={skipLinkHref}>
          {skipLinkLabel}
        </a>
      )}
      <div className="ns-site-header__bar">
        <Slot className="ns-site-header__logo" aria-label={logoLabel}>
          {renderLink({
            href: logoHref,
            children: <Logo label="" variant={resolvedLogo} className="ns-site-header__logo-mark" />,
          })}
        </Slot>

        {/* Focus trap handler: keydown bubbles from the links and the toggle, not from the nav itself. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <nav aria-label={navLabel} className="ns-site-header__nav" onKeyDown={handleNavKeyDown}>
          <ul className="ns-site-header__links">{navLinks()}</ul>
          {ctaButton('ns-site-header__cta')}

          <IconButton
            ref={toggleRef}
            variant="text"
            size="md"
            icon={open ? 'close' : 'menu'}
            aria-label={menuLabel}
            aria-expanded={open}
            aria-controls={panelId}
            className="ns-site-header__toggle"
            onClick={handleToggleClick}
          />

          <div id={panelId} ref={panelRef} className="ns-site-header__panel" hidden={!open}>
            <ul className="ns-site-header__panel-links">{navLinks(handlePanelLinkClick)}</ul>
            {ctaButton('ns-site-header__panel-cta', handlePanelLinkClick)}
          </div>
        </nav>
      </div>
    </header>
  );
});
