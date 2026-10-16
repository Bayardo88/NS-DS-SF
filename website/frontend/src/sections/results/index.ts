import type { ComponentType } from 'react';
import { CaseStudyList } from './CaseStudyList';
import { CaseStudyHero } from './CaseStudyHero';
import { CaseStudyBody } from './CaseStudyBody';
import { CaseStudyTestimonial } from './CaseStudyTestimonial';
import { CaseStudyRelated } from './CaseStudyRelated';

/** Section types owned by the "results" page group. Merged into ../registry.tsx. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resultsSections: Record<string, ComponentType<any>> = {
  'case-study-list': CaseStudyList,
  'case-study-hero': CaseStudyHero,
  'case-study-body': CaseStudyBody,
  'case-study-testimonial': CaseStudyTestimonial,
  'case-study-related': CaseStudyRelated,
};
