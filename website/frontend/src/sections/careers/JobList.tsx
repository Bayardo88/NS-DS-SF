import { Icon } from '@nicasource/ds';
import { fetchCollection } from '../../lib/wp';
import { useAsync } from '../../lib/useAsync';
import { entryHref, metaMedia, metaString } from '../../lib/entries';
import type { Entry, Link } from '../../lib/types';
import { Rich } from '../../components/Rich';
import { SmartLink } from '../../layout/RouterLink';
import './JobList.css';

export interface JobListProps {
  /** Anchor for the hero "See all openings" CTA. */
  id?: string;
  eyebrow?: string;
  heading?: string;
  /** Card call to action label. */
  ctaLabel?: string;
  /** Used when a job has no `image` meta. */
  fallbackImage?: string;
  /** Shown when no job is open. */
  emptyText?: string;
  emptyCta?: Link;
}

const FALLBACK_IMAGE = '/assets/careers/job-card-placeholder.jpg';

function isOpen(job: Entry) {
  return (metaString(job, 'status') ?? 'open').toLowerCase() !== 'closed';
}

function JobCard({ job, ctaLabel, fallbackImage }: { job: Entry; ctaLabel: string; fallbackImage: string }) {
  const image = metaMedia(job)?.src ?? fallbackImage;
  return (
    <li className="job-card">
      <SmartLink className="job-card__link" href={entryHref.ns_job(job.slug)}>
        <img className="job-card__img" src={image} alt="" loading="lazy" />
        <span className="job-card__content">
          <span className="job-card__title ns-text-web-h4-black">{job.title}</span>
          <span className="job-card__cta ns-text-web-lead-medium" aria-hidden="true">
            {ctaLabel}
            <Icon name="arrow-right" size="md" />
          </span>
        </span>
      </SmartLink>
    </li>
  );
}

/**
 * Open Roles (Careers 1:1984): every open `ns_job` from WordPress as a card linking to its detail
 * page. 3 columns, wrapping; on mobile the cards drop the image.
 */
export function JobList({
  id = 'open-roles',
  eyebrow,
  heading,
  ctaLabel = 'Apply Now',
  fallbackImage = FALLBACK_IMAGE,
  emptyText = 'No open roles right now. Check back soon.',
  emptyCta,
}: JobListProps) {
  const jobs = useAsync('jobs', fetchCollection);
  const open = (jobs.data ?? []).filter(isOpen);

  return (
    <section id={id} className="job-list" aria-busy={jobs.status === 'loading'}>
      <div className="container job-list__inner">
        {(eyebrow || heading) && (
          <header className="job-list__head">
            {eyebrow && <p className="job-list__eyebrow ns-text-web-eyebrow-black">{eyebrow}</p>}
            {heading && <Rich as="h2" className="heading ns-text-web-h2-light" text={heading} />}
          </header>
        )}
        {jobs.status === 'ready' && open.length === 0 && (
          <p className="job-list__empty ns-text-web-body-light">
            {emptyText}{' '}
            {emptyCta && (
              <SmartLink className="job-list__empty-link" href={emptyCta.href}>
                {emptyCta.label}
              </SmartLink>
            )}
          </p>
        )}
        {jobs.status === 'error' && (
          <p className="job-list__empty ns-text-web-body-light">We couldn’t load the open roles. Please try again later.</p>
        )}
        {open.length > 0 && (
          <ul className="job-list__grid" aria-label="Open roles">
            {open.map((job) => (
              <JobCard key={job.slug} job={job} ctaLabel={ctaLabel} fallbackImage={fallbackImage} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
