import type { ReactNode } from 'react';
import { useEntry } from '../../lib/EntryContext';
import { Paragraphs } from '../../components/Rich';
import { InfoCardGrid, type InfoCardItem } from './InfoCard';
import { jobFields } from './jobMeta';
import './JobDescription.css';

export interface JobDescriptionProps {
  /** Company boilerplate used when the job has no `about_company` (WP Options page default). */
  aboutCompany?: string | string[];
  /** Benefits paragraph used when the job has no `benefits_intro`. */
  benefitsIntro?: string;
  /** Benefit cards used when the job has no `benefits`. */
  benefits?: InfoCardItem[];
  labels?: Partial<Record<'about' | 'description' | 'responsibilities' | 'requirements' | 'niceToHave' | 'benefits', string>>;
}

const DEFAULT_LABELS = {
  about: 'About Nicasource',
  description: 'Job Description',
  responsibilities: 'Role Expectations',
  requirements: 'Requirements',
  niceToHave: 'Nice to Have',
  benefits: 'Benefits',
};

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="job-description__block">
      <h2 className="job-description__label ns-text-web-h2-black">{label}</h2>
      <div className="job-description__content job-prose ns-text-web-body-light">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * Job description (1:2433, annotation 57:103598): label/content rows bound to the job's fields,
 * then the benefit cards. A block whose field is empty is omitted. Template section (useEntry()).
 */
export function JobDescription({ aboutCompany, benefitsIntro, benefits = [], labels }: JobDescriptionProps) {
  const entry = useEntry();
  if (!entry) return null;

  const job = jobFields(entry);
  const l = { ...DEFAULT_LABELS, ...labels };
  const about = job.aboutCompany ?? aboutCompany;
  const intro = job.benefitsIntro ?? benefitsIntro;
  const cards = job.benefits.length ? job.benefits : benefits;

  return (
    <section className="job-description">
      <div className="container job-description__inner">
        {about && (
          <Block label={l.about}>
            <Paragraphs body={about} className="job-description__paras" />
          </Block>
        )}
        {job.description && (
          <Block label={l.description}>
            <Paragraphs body={job.description} className="job-description__paras" />
          </Block>
        )}
        {job.responsibilities.length > 0 && (
          <Block label={l.responsibilities}>
            <BulletList items={job.responsibilities} />
          </Block>
        )}
        {job.requirements.length > 0 && (
          <Block label={l.requirements}>
            <BulletList items={job.requirements} />
          </Block>
        )}
        {job.niceToHave.length > 0 && (
          <Block label={l.niceToHave}>
            <BulletList items={job.niceToHave} />
          </Block>
        )}
        {(intro || cards.length > 0) && (
          <div className="job-description__benefits">
            {intro && (
              <Block label={l.benefits}>
                <Paragraphs body={intro} className="job-description__paras" />
              </Block>
            )}
            {cards.length > 0 && <InfoCardGrid items={cards} label={l.benefits} />}
          </div>
        )}
      </div>
    </section>
  );
}
