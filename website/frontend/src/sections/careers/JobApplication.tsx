import { useEffect, useReducer, useRef, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, TextField } from '@nicasource/ds';
import { useEntry } from '../../lib/EntryContext';
import type { Link } from '../../lib/types';
import { Rich } from '../../components/Rich';
import { SmartLink } from '../../layout/RouterLink';
import { FileField, SelectField, TextAreaField } from './FormFields';
import { jobFields } from './jobMeta';
import './JobApplication.css';

export interface JobApplicationProps {
  /** Anchor for the hero "Apply now" button. */
  id?: string;
  heading?: string;
  /** Sibling inquiry types; they live in the Contact Module on /contact. */
  otherTabs?: Link[];
  activeTabLabel?: string;
  countries?: string[];
  submitLabel?: string;
}

type FieldName = 'name' | 'email' | 'phone' | 'cv' | 'country' | 'english' | 'portfolio';
type Errors = Partial<Record<FieldName, string>>;

type State =
  | { status: 'editing' | 'sending'; errors: Errors }
  | { status: 'sent'; errors: Errors; firstName: string };

type Action =
  | { type: 'validate'; field: FieldName; error?: string }
  | { type: 'invalid'; errors: Errors }
  | { type: 'sending' }
  | { type: 'sent'; firstName: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'validate':
      return { ...state, errors: { ...state.errors, [action.field]: action.error } };
    case 'invalid':
      return { status: 'editing', errors: action.errors };
    case 'sending':
      return { status: 'sending', errors: {} };
    case 'sent':
      return { status: 'sent', errors: {}, firstName: action.firstName };
  }
}

const ENGLISH_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const DEFAULT_COUNTRIES = [
  'Argentina',
  'Bolivia',
  'Brazil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Dominican Republic',
  'Ecuador',
  'El Salvador',
  'Guatemala',
  'Honduras',
  'Mexico',
  'Nicaragua',
  'Panama',
  'Paraguay',
  'Peru',
  'Uruguay',
  'Venezuela',
  'Other',
];
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const FILE_TYPES = ['pdf', 'doc', 'docx'];
const FIELD_ORDER: FieldName[] = ['name', 'email', 'phone', 'cv', 'country', 'english', 'portfolio'];

function validate(field: FieldName, value: FormDataEntryValue | null): string | undefined {
  const text = typeof value === 'string' ? value.trim() : '';
  switch (field) {
    case 'name':
      return text ? undefined : 'Enter your full name.';
    case 'email':
      if (!text) return 'Enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) ? undefined : 'Enter a valid email address, like name@example.com.';
    case 'phone':
      if (!text) return 'Enter your phone number.';
      return /^\+?[\d\s().-]{7,}$/.test(text) ? undefined : 'Enter a phone number with country code, like +505 8888 8888.';
    case 'cv': {
      if (!(value instanceof File) || !value.name) return 'Attach your CV or portfolio (PDF, DOC or DOCX).';
      const ext = value.name.split('.').pop()?.toLowerCase() ?? '';
      if (!FILE_TYPES.includes(ext)) return 'Use a PDF, DOC or DOCX file.';
      return value.size > MAX_FILE_BYTES ? 'The file is over 10 MB. Attach a smaller file.' : undefined;
    }
    case 'country':
      return text ? undefined : 'Select the country you live in.';
    case 'english':
      return text ? undefined : 'Select your English level.';
    case 'portfolio':
      if (!text) return undefined;
      try {
        const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
        return url.hostname.includes('.') ? undefined : 'Enter a valid link, like linkedin.com/in/your-name.';
      } catch {
        return 'Enter a valid link, like linkedin.com/in/your-name.';
      }
  }
}

function isFieldName(name: string): name is FieldName {
  return (FIELD_ORDER as string[]).includes(name);
}

/**
 * Application form, "Join Our Team" variant of the Contact Module (8:5362). Reference build:
 * client-side validation on blur and submit, a loading state and a success message; nothing is
 * sent. If the job has an `apply_url` (external ATS), it shows a link there instead of the form.
 */
export function JobApplication({
  id = 'apply',
  heading = '**Show us** your moves!',
  otherTabs = [
    { label: 'New Project', href: '/contact' },
    { label: 'General Inquiries', href: '/contact' },
  ],
  activeTabLabel = 'Join Our Team',
  countries = DEFAULT_COUNTRIES,
  submitLabel = 'Apply Now',
}: JobApplicationProps) {
  const entry = useEntry();
  const { pathname } = useLocation();
  const [state, dispatch] = useReducer(reducer, { status: 'editing', errors: {} });
  const timer = useRef<number | undefined>(undefined);

  // Clear the simulated request if the page unmounts mid-send.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const job = entry ? jobFields(entry) : undefined;
  if (job?.closed) return null;
  const { errors } = state;

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    const target: EventTarget = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
    if (!isFieldName(target.name) || target.type === 'file') return;
    // Validate on blur only once the person has typed, or to clear an existing error.
    if (!target.value && !errors[target.name]) return;
    dispatch({ type: 'validate', field: target.name, error: validate(target.name, target.value) });
  }

  function handleFieldChange(event: ChangeEvent<HTMLFormElement>) {
    const target: EventTarget = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
    if (!isFieldName(target.name)) return;
    if (target instanceof HTMLInputElement && target.type === 'file') {
      dispatch({ type: 'validate', field: 'cv', error: validate('cv', target.files?.[0] ?? null) });
    } else if (target instanceof HTMLSelectElement || errors[target.name]) {
      dispatch({ type: 'validate', field: target.name, error: validate(target.name, target.value) });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};
    for (const field of FIELD_ORDER) {
      const error = validate(field, data.get(field));
      if (error) next[field] = error;
    }
    const firstInvalid = FIELD_ORDER.find((field) => next[field]);
    if (firstInvalid) {
      dispatch({ type: 'invalid', errors: next });
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    // Reference build: a real build POSTs `data` to /wp-json/ns/v1/apply (or a form plugin) here.
    const firstName = String(data.get('name')).trim().split(/\s+/)[0] ?? '';
    dispatch({ type: 'sending' });
    timer.current = window.setTimeout(() => dispatch({ type: 'sent', firstName }), 900);
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section id={id} className="job-apply">
      <div className="container job-apply__inner">
        <Rich as="h2" className="job-apply__heading ns-text-web-h2-light" text={heading} />

        <nav aria-label="Inquiry type" className="job-apply__tabs">
          <ul className="job-apply__tab-list">
            {otherTabs.slice(0, 1).map((tab) => (
              <li key={tab.label}>
                <SmartLink className="job-apply__tab ns-text-web-body-light" href={tab.href}>
                  {tab.label}
                </SmartLink>
              </li>
            ))}
            <li>
              <span className="job-apply__tab job-apply__tab--active ns-text-web-body-light" aria-current="page">
                {activeTabLabel}
              </span>
            </li>
            {otherTabs.slice(1).map((tab) => (
              <li key={tab.label}>
                <SmartLink className="job-apply__tab ns-text-web-body-light" href={tab.href}>
                  {tab.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        {job?.applyUrl ? (
          <div className="job-apply__external">
            <p className="ns-text-web-body-light job-apply__note">Applications for this role go through our hiring platform.</p>
            <Button asChild variant="filled" size="lg" icon="external-link">
              <a href={job.applyUrl} target="_blank" rel="noreferrer">
                {submitLabel}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        ) : state.status === 'sent' ? (
          <div className="job-apply__success" role="status">
            <p className="job-apply__success-text ns-text-web-h3-light" tabIndex={-1} ref={(el) => el?.focus()}>
              Thanks{state.firstName ? `, ${state.firstName}` : ''}! We received your application
              {job ? ` for ${job.title}` : ''}. Our talent team will get back to you soon.
            </p>
          </div>
        ) : (
          <form className="job-apply__form" noValidate onSubmit={handleSubmit} onBlur={handleBlur} onChange={handleFieldChange}>
            <input type="hidden" name="job_id" value={entry ? String(entry.id) : ''} />
            <input type="hidden" name="job_title" value={job?.title ?? ''} />
            <input type="hidden" name="source" value={pathname} />

            <div className="job-apply__fields">
              <TextField label="Full Name" name="name" placeholder="Tom Riddle" autoComplete="name" required error={errors.name} />
              <TextField
                label="Email"
                name="email"
                type="email"
                placeholder="darklord87@gmail.com"
                autoComplete="email"
                required
                error={errors.email}
              />
              <TextField label="Phone" name="phone" type="tel" placeholder="+505 8888 8888" autoComplete="tel" required error={errors.phone} />
              <FileField
                label="CV / Portfolio"
                name="cv"
                accept=".pdf,.doc,.docx"
                placeholder="PDF, DOC, DOCX · 10 MB"
                required
                error={errors.cv}
              />
              <SelectField label="Country" name="country" options={countries} placeholder="Select country" autoComplete="country-name" required error={errors.country} />
              <SelectField label="English Level" name="english" options={ENGLISH_LEVELS} placeholder="Select level" required error={errors.english} />
              <TextField
                className="job-apply__portfolio"
                label="Portfolio URL"
                name="portfolio"
                type="url"
                inputMode="url"
                placeholder="linkedin.com/in/your-name"
                helperText="LinkedIn, GitHub or your site (optional)"
                error={errors.portfolio}
              />
            </div>

            <TextAreaField
              label="Message"
              name="message"
              placeholder="Drop us some lines here..."
              rows={3}
              action={
                <Button type="submit" variant="outlined" size="sm" icon="send" loading={state.status === 'sending'}>
                  {submitLabel}
                </Button>
              }
            />

            <p className="job-apply__summary ns-text-web-caption-light" role="alert">
              {errorCount > 0 ? `Please fix the ${errorCount === 1 ? 'highlighted field' : `${errorCount} highlighted fields`} above.` : ''}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
