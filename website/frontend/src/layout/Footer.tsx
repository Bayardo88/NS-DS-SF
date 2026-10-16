import { useId, useState, type FormEvent } from 'react';
import { Button, IconButton, Logo, TextField } from '@nicasource/ds';
import type { SiteSettings } from '../lib/types';
import { SmartLink } from './RouterLink';
import './Footer.css';

const SOCIAL = [
  { key: 'instagram', icon: 'instagram', name: 'Instagram' },
  { key: 'facebook', icon: 'facebook', name: 'Facebook' },
  { key: 'linkedin', icon: 'linkedin', name: 'LinkedIn' },
] as const;

/**
 * Footer Module (annotation 57:103212): 1) menu + newsletter + careers card, 2) the giant brand
 * wordmark, 3) trail bar with logo, copyright, social. Mobile: one column, newsletter first.
 * Composed from DS Logo, TextField, Button and IconButton; DS SiteFooter is a simpler bar.
 */
export function Footer({ site }: { site: SiteSettings }) {
  const { footer } = site;
  const [subscribed, setSubscribed] = useState(false);
  const newTabId = useId();

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer className="footer">
      <div className="footer__top container container--wide">
        <nav className="footer__menu" aria-label="Footer">
          {footer.columns.map((col) => (
            <div key={col.heading} className="footer__col">
              <h2 className="footer__heading ns-text-web-h4-black">{col.heading}</h2>
              <ul className="footer__links ns-text-web-caption-light">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink className="footer__link" href={link.href}>
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="footer__badges">
            {footer.badges.map((badge) => (
              <li key={badge.src}>
                <img src={badge.src} alt={badge.alt} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__aside">
          <form className="footer__subscribe" onSubmit={handleSubscribe}>
            <h2 className="footer__heading ns-text-web-h4-black">{footer.subscribe.heading}</h2>
            <p className="footer__muted ns-text-web-caption-light">{footer.subscribe.body}</p>
            <div className="footer__subscribe-row">
              <TextField
                label={footer.subscribe.label}
                type="email"
                name="email"
                required
                placeholder={footer.subscribe.placeholder}
                autoComplete="email"
                className="footer__email"
              />
              <Button type="submit" variant="outlined" size="sm">
                {footer.subscribe.cta}
              </Button>
            </div>
            <p className="footer__muted ns-text-web-small-regular" role="status">
              {subscribed ? 'Thanks for subscribing (reference build: nothing was sent).' : ''}
            </p>
          </form>

          <div className="footer__careers" style={{
              backgroundImage: `linear-gradient(var(--ns-color-bg-overlay), var(--ns-color-bg-overlay)), url(${footer.careersCard.image})`,
            }}>
            <p className="ns-text-web-lead-medium">
              <strong>{footer.careersCard.label}</strong>
            </p>
            <Button asChild variant="outlined" size="sm">
              <SmartLink href={footer.careersCard.cta.href}>{footer.careersCard.cta.label}</SmartLink>
            </Button>
          </div>
        </div>
      </div>

      <p className="footer__watermark container container--wide" aria-hidden="true">
        {footer.watermark}
      </p>

      <div className="footer__trail container container--wide">
        <div className="footer__brand">
          <SmartLink href="/" className="footer__logo" aria-label="NicaSource home">
            <Logo variant="on-dark" label="" width={96} />
          </SmartLink>
          <p className="ns-text-web-caption-light">{footer.tagline}</p>
        </div>
        <p className="footer__copy ns-text-web-caption-light">{footer.copyright}</p>
        <div className="footer__social">
          <span className="ns-text-web-caption-light">Follow Us</span>
          <ul>
            {SOCIAL.filter((s) => footer.social[s.key]).map((s) => (
              <li key={s.key}>
                <IconButton
                  asChild
                  variant="text"
                  size="sm"
                  icon={s.icon}
                  aria-label={`NicaSource on ${s.name}`}
                  aria-describedby={newTabId}
                >
                  <a href={footer.social[s.key]} target="_blank" rel="noopener noreferrer">
                    {s.name}
                  </a>
                </IconButton>
              </li>
            ))}
          </ul>
          <span id={newTabId} hidden>
            (opens in new tab)
          </span>
        </div>
      </div>
    </footer>
  );
}
