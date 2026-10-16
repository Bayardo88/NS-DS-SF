import { useLocation } from 'react-router-dom';
import { Button, Tag } from '@nicasource/ds';
import { useEntry } from '../../lib/EntryContext';
import type { Link } from '../../lib/types';
import { Breadcrumb } from '../../components/Breadcrumb';
import { SmartLink } from '../../layout/RouterLink';
import { jobFields, jobPostingJsonLd } from './jobMeta';
import './JobHero.css';

export interface JobHeroProps {
  /** Default hero background; a job's `hero_image` meta overrides it. */
  background?: string;
  /** The listing page this job belongs to (breadcrumb middle item). */
  parent?: Link;
  applyLabel?: string;
}

/**
 * Job detail hero (1:2421): "{seniority}" over "{role name}" in H1 Black on a photo, with the job's
 * meta as Tags and an Apply button. Template section: reads the `ns_job` entry via useEntry().
 * Also emits the schema.org JobPosting JSON-LD.
 */
export function JobHero({
  background = '/assets/job/hero-bg.jpg',
  parent = { label: 'Careers', href: '/careers' },
  applyLabel = 'Apply now',
}: JobHeroProps) {
  const entry = useEntry();
  const { pathname } = useLocation();
  if (!entry) return null;

  const job = jobFields(entry);
  const tags = [job.location, job.workMode, job.employmentType, job.hours].filter((t): t is string => Boolean(t));
  const applyHref = job.applyUrl ?? '#apply';
  const jsonLd = jobPostingJsonLd(entry, job, `${window.location.origin}${pathname}`);

  return (
    <section className="job-hero">
      <img className="job-hero__bg" src={job.heroImage ?? background} alt="" />
      <div className="job-hero__scrim" aria-hidden="true" />
      <Breadcrumb
        className="job-hero__breadcrumb container"
        items={[{ label: 'Home', href: '/' }, parent, { label: job.title, href: pathname }]}
      />
      <div className="job-hero__content container">
        <h1 className="job-hero__title ns-text-web-h1-black">
          {job.seniority && job.roleName ? (
            <>
              <span className="job-hero__line">{job.seniority}</span>
              <span className="job-hero__line">{job.roleName}</span>
            </>
          ) : (
            job.title
          )}
        </h1>
        {tags.length > 0 && (
          <ul className="job-hero__tags" aria-label="Job details">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag variant="outlined" color="neutral" size="md">
                  {tag}
                </Tag>
              </li>
            ))}
          </ul>
        )}
        {job.closed ? (
          <p className="job-hero__closed ns-text-web-lead-medium" role="status">
            This position is closed.
          </p>
        ) : (
          <Button asChild variant="filled" size="lg" className="job-hero__cta">
            <SmartLink href={applyHref}>{applyLabel}</SmartLink>
          </Button>
        )}
      </div>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </section>
  );
}
