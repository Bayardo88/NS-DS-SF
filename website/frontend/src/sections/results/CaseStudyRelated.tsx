import { fetchCollection } from '../../lib/wp';
import { useAsync } from '../../lib/useAsync';
import { entryHref } from '../../lib/entries';
import { useEntry } from '../../lib/EntryContext';
import type { Entry } from '../../lib/types';
import { Rich } from '../../components/Rich';
import { OverlayCard } from '../../components/OverlayCard';
import { caseStudyFields } from './caseStudy';
import './CaseStudyRelated.css';

export interface CaseStudyRelatedProps {
  heading?: string;
  /** Explicit picks (field `related_case_studies`, slugs). Otherwise: same industry/tags first. */
  slugs?: string[];
  limit?: number;
}

function overlap(a: Entry, b: Entry) {
  const fa = caseStudyFields(a);
  const fb = caseStudyFields(b);
  const shared = fa.tags.filter((t) => fb.tags.includes(t)).length;
  return shared + (fa.industry && fa.industry === fb.industry ? 2 : 0);
}

function pickRelated(all: Entry[], current: Entry | null, slugs: string[] | undefined, limit: number) {
  const others = all.filter((e) => e.slug !== current?.slug);
  if (slugs?.length) {
    return slugs.map((s) => others.find((e) => e.slug === s)).filter((e): e is Entry => !!e).slice(0, limit);
  }
  if (!current) return others.slice(0, limit);
  return [...others].sort((a, b) => overlap(b, current) - overlap(a, current)).slice(0, limit);
}

/**
 * "Explore more case studies like this" (Figma 1:3993): three photo cards linking to related case
 * studies, excluding the one being read. Stacks on mobile.
 */
export function CaseStudyRelated({
  heading = 'Explore more case studies like this',
  slugs,
  limit = 3,
}: CaseStudyRelatedProps) {
  const entry = useEntry();
  const studies = useAsync('case-studies', fetchCollection);
  const related = pickRelated(studies.data ?? [], entry, slugs, limit);
  if (studies.status === 'ready' && related.length === 0) return null;

  return (
    <section className="cs-related" aria-busy={studies.status === 'loading'}>
      <div className="container cs-related__inner">
        <Rich as="h2" className="cs-related__heading ns-text-web-h2-light" text={heading} />
        <div className="cs-related__grid">
          {related.map((study) => {
            const f = caseStudyFields(study);
            return (
              <OverlayCard
                key={study.slug}
                className="cs-related__card"
                href={entryHref.ns_case_study(study.slug)}
                title={study.title}
                image={f.image}
                tags={f.tags}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
