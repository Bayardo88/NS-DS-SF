import type { Link, Media } from '../../lib/types';
import { useEntry } from '../../lib/EntryContext';
import { entryHref } from '../../lib/entries';
import { Rich } from '../../components/Rich';
import { Breadcrumb } from '../../components/Breadcrumb';
import { CaseStudyTags } from './CaseStudyTags';
import { caseStudyFields, caseStudyTitle } from './caseStudy';
import './CaseStudyHero.css';

export interface CaseStudyHeroProps {
  /** Overrides; by default everything comes from the case-study entry (annotation 57:103478). */
  title?: string;
  tags?: string[];
  background?: Media;
  breadcrumb?: Link[];
}

/**
 * Case-study hero (Figma 1:3901): featured image under a flat overlay, "Brand +\nProject Name" in
 * H1 Black and the industry/service chips. Content drops to the lower third on mobile.
 */
export function CaseStudyHero({ title, tags, background, breadcrumb }: CaseStudyHeroProps) {
  const entry = useEntry();
  const fields = entry ? caseStudyFields(entry) : undefined;
  const heading = title ?? (entry ? caseStudyTitle(entry) : '');
  const chips = tags ?? fields?.tags ?? [];
  const image = background ?? fields?.heroImage;
  const trail = breadcrumb ?? [
    { label: 'Home', href: '/' },
    { label: 'Results', href: '/results' },
    ...(entry ? [{ label: fields?.client ?? entry.title, href: entryHref.ns_case_study(entry.slug) }] : []),
  ];

  return (
    <section className="cs-hero">
      {image && <img className="cs-hero__bg" src={image.src} alt={image.alt} />}
      <div className="cs-hero__scrim" aria-hidden="true" />
      <Breadcrumb className="cs-hero__breadcrumb container" items={trail} />
      <div className="cs-hero__content container">
        <Rich as="h1" className="cs-hero__title ns-text-web-h1-black" text={heading} />
        <CaseStudyTags tags={chips} />
      </div>
    </section>
  );
}
