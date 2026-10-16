import { useId, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Button, Icon, TextField } from '@nicasource/ds';
import { Rich } from '../components/Rich';
import './ContactModule.css';

export type InquiryType = 'project' | 'team' | 'general';

export interface ContactModuleProps {
  heading?: string;
  subheading?: string;
  services?: string[];
  /** Which tab is open first. */
  defaultType?: InquiryType;
  /** `page`: the Contact Us page variant (no band background, bigger heading). */
  layout?: 'band' | 'page';
  /** Override tab labels, e.g. `{ project: 'New Business' }` on the Contact Us page. */
  tabLabels?: Partial<Record<InquiryType, string>>;
  /** Controlled open tab (pair with `onTypeChange`); omit to let the module own it. */
  type?: InquiryType;
  onTypeChange?: (type: InquiryType) => void;
}

const TABS: { id: InquiryType; label: string }[] = [
  { id: 'project', label: 'New Project' },
  { id: 'team', label: 'Join Our Team' },
  { id: 'general', label: 'General Inquiries' },
];

const DEFAULT_SERVICES = [
  'Software Development',
  'Project Management',
  'QA Testing',
  'UX Audit',
  'UI Design',
  'UX Design',
  'Salesforce Administration',
  'Salesforce Development',
  'Staff Augmentation',
];

/**
 * Contact Module (annotation 57:103202): the form changes with the inquiry type. New Project uses
 * multi-select service chips, Join Our Team adds a portfolio upload. Tabs follow the ARIA tabs
 * pattern (arrow keys move between them).
 */
export function ContactModule({
  heading = 'Are you looking for a **reliable company** for staff augmentation services?',
  subheading,
  services = DEFAULT_SERVICES,
  defaultType = 'project',
  layout = 'band',
  tabLabels,
  type: controlledType,
  onTypeChange,
}: ContactModuleProps) {
  const [uncontrolledType, setUncontrolledType] = useState<InquiryType>(defaultType);
  const type = controlledType ?? uncontrolledType;
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const baseId = useId();

  function setType(next: InquiryType) {
    setUncontrolledType(next);
    onTypeChange?.(next);
  }

  function handleToggleService(service: string) {
    setSelected((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]));
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const i = TABS.findIndex((t) => t.id === type);
    const next = TABS[(i + (event.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length]!;
    setType(next.id);
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Reference build: no backend. A real build posts to a WP endpoint / form plugin here.
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className={`contact contact--${layout}`}>
      <div className="container contact__inner">
        <header className="contact__head">
          <Rich
            as="h2"
            className={`contact__heading ${layout === 'page' ? 'ns-text-web-h3-light' : 'ns-text-web-h2-light'}`}
            text={heading}
          />
          {subheading && <Rich as="p" className="body-copy ns-text-web-body-light" text={subheading} />}
        </header>

        <div role="tablist" aria-label="Inquiry type" className="contact__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={type === tab.id}
              aria-controls={`${baseId}-panel`}
              tabIndex={type === tab.id ? 0 : -1}
              className="contact__tab ns-text-web-body-light"
              onClick={() => setType(tab.id)}
              onKeyDown={handleTabKeyDown}
            >
              {tabLabels?.[tab.id] ?? tab.label}
            </button>
          ))}
        </div>

        <form
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${type}`}
          className="contact__form"
          onSubmit={handleSubmit}
        >
          <div className="contact__fields">
            <TextField label="Full Name" name="name" placeholder="Tom Riddle" autoComplete="name" required />
            <TextField label="Email" name="email" type="email" placeholder="darklord87@gmail.com" autoComplete="email" required />
            {type === 'team' ? (
              <TextField label="LinkedIn or Portfolio URL" name="portfolio" type="url" placeholder="https://" />
            ) : (
              <TextField label="Company" name="company" placeholder="slitherine.io" autoComplete="organization" />
            )}
          </div>

          <div className={`contact__row contact__row--${type}`}>
            {type === 'project' && (
              <fieldset className="contact__services">
                <legend className="contact__label ns-text-web-eyebrow-black">Service Requested</legend>
                <ul className="contact__chips">
                  {services.map((service) => {
                    const on = selected.includes(service);
                    return (
                      <li key={service}>
                        <button
                          type="button"
                          className="chip ns-text-web-small-regular"
                          aria-pressed={on}
                          onClick={() => handleToggleService(service)}
                        >
                          {service}
                          {on && <Icon name="close" size="xs" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            )}
            {type === 'team' && (
              <div className="contact__upload">
                <label className="contact__label ns-text-web-eyebrow-black" htmlFor={`${baseId}-cv`}>
                  Upload your CV or portfolio
                </label>
                <input id={`${baseId}-cv`} className="contact__file ns-text-web-caption-light" type="file" name="cv" accept=".pdf,.doc,.docx" />
              </div>
            )}

            <div className="contact__message">
              <label className="contact__label ns-text-web-eyebrow-black" htmlFor={`${baseId}-msg`}>
                Message
              </label>
              <div className="contact__textarea-wrap">
                <textarea
                  id={`${baseId}-msg`}
                  name="message"
                  className="contact__textarea ns-text-web-body-light"
                  placeholder="Drop us some lines here..."
                  rows={3}
                />
                <Button type="submit" variant="outlined" size="sm" icon="send" className="contact__send">
                  Send
                </Button>
              </div>
            </div>
          </div>
          <p className="contact__status ns-text-web-caption-light" role="status">
            {sent ? 'Thanks! This is a reference build, so nothing was sent.' : ''}
          </p>
        </form>
      </div>
    </section>
  );
}
