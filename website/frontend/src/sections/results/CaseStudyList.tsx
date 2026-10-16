import { fetchCollection } from '../../lib/wp';
import { useAsync } from '../../lib/useAsync';
import { entryHref } from '../../lib/entries';
import type { Entry } from '../../lib/types';
import { Rich, Paragraphs } from '../../components/Rich';
import { Cta } from '../../components/Cta';
import { OverlayCard } from '../../components/OverlayCard';
import { caseStudyFields } from './caseStudy';
import './CaseStudyList.css';

export interface CaseStudyListProps {
  /** Label of each row's link to the case study. */
  ctaLabel?: string;
  /** Show the featured card on top (annotation 57:103448). Default true. */
  showFeatured?: boolean;
}

function splitFeatured(entries: Entry[]) {
  const featured = entries.find((e) => caseStudyFields(e).featured) ?? entries[0];
  return { featured, rest: entries.filter((e) => e !== featured) };
}

/**
 * Case-study list (Figma 1:88633 + 33:23293 / 7:5545 / 7:5559). Reads the `case-studies`
 * collection: the entry flagged `featured` fills the full-width card on top, the rest render as
 * two-column General-Module rows that alternate the image side (annotation 57:103458).
 */
export function CaseStudyList({ ctaLabel = 'Read case study', showFeatured = true }: CaseStudyListProps) {
  const studies = useAsync('case-studies', fetchCollection);
  const all = studies.data ?? [];
  const { featured, rest } = showFeatured ? splitFeatured(all) : { featured: undefined, rest: all };
  const featuredFields = featured ? caseStudyFields(featured) : undefined;

  return (
    <section className="cs-list" aria-busy={studies.status === 'loading'} aria-label="Case studies">
      <div className="container cs-list__inner">
        {featured && featuredFields && (
          <OverlayCard
            className="cs-list__featured"
            size="lg"
            headingLevel={2}
            href={entryHref.ns_case_study(featured.slug)}
            title={featured.title}
            image={featuredFields.image}
            tags={featuredFields.tags}
          />
        )}
        {rest.map((study, i) => {
          const f = caseStudyFields(study);
          const href = entryHref.ns_case_study(study.slug);
          return (
            <article key={study.slug} className={`cs-list__row${i % 2 === 1 ? ' cs-list__row--mirror' : ''}`}>
              <div className="cs-list__copy">
                {(f.industry || f.client) && (
                  <p className="cs-list__eyebrow ns-text-web-caption-light">
                    {[f.client, f.industry].filter(Boolean).join(' · ')}
                  </p>
                )}
                <Rich as="h2" className="heading cs-list__title ns-text-web-h2-light" text={f.headline ?? study.title} />
                <Paragraphs className="cs-list__body ns-text-web-body-light" body={f.summary} />
                <Cta
                  className="cs-list__cta"
                  cta={{ label: ctaLabel, href }}
                  size="lg"
                  aria-label={`${ctaLabel}: ${study.title}`}
                />
              </div>
              {f.image && (
                <div className="cs-list__media">
                  <img src={f.image.src} alt={f.image.alt} loading="lazy" />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
