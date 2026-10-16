import type { Entry, Media } from '../../lib/types';
import { metaList, metaMedia, metaString } from '../../lib/entries';

/**
 * Case study (CPT `ns_case_study`) fields, read from the entry's `meta`. Field model:
 * website/specs/case-study.md (end). Every field is optional so a half-filled entry still renders.
 */
export interface CaseStudyTestimonial {
  quote: string;
  name: string;
  role?: string;
  photo?: Media;
}

export interface CaseStudyFields {
  client?: string;
  project?: string;
  industry?: string;
  tags: string[];
  /** Featured image: list thumbnail and related cards. */
  image?: Media;
  /** Detail hero background (falls back to `image`). */
  heroImage?: Media;
  logo?: Media;
  /** Two-line project headline (`**bold**` allowed): detail intro + list row title. */
  headline?: string;
  /** List row body (falls back to the WP excerpt). */
  summary?: string;
  featured: boolean;
  testimonial?: CaseStudyTestimonial;
}

function isTestimonial(value: unknown): value is CaseStudyTestimonial {
  return !!value && typeof value === 'object' && 'quote' in value && 'name' in value;
}

export function caseStudyFields(entry: Entry): CaseStudyFields {
  const featured = entry.meta.featured;
  const testimonial = entry.meta.testimonial;
  return {
    client: metaString(entry, 'client'),
    project: metaString(entry, 'project'),
    industry: metaString(entry, 'industry'),
    tags: metaList(entry, 'tags'),
    image: metaMedia(entry, 'image'),
    heroImage: metaMedia(entry, 'hero_image') ?? metaMedia(entry, 'image'),
    logo: metaMedia(entry, 'logo'),
    headline: metaString(entry, 'headline'),
    summary: metaString(entry, 'summary') || entry.excerpt || undefined,
    featured: featured === true || featured === 'true' || featured === '1' || featured === 1,
    testimonial: isTestimonial(testimonial) ? testimonial : undefined,
  };
}

/** "Brand +\nProject Name" as in the Figma hero; the post title when either part is missing. */
export function caseStudyTitle(entry: Entry): string {
  const { client, project } = caseStudyFields(entry);
  return client && project ? `${client} +\n${project}` : entry.title;
}
