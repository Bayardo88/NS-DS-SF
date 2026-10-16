import type { ComponentType } from 'react';
import { InfoCards } from './InfoCards';
import { ImageCollage } from './ImageCollage';
import { InterestMarquee } from './InterestMarquee';
import { JobList } from './JobList';
import { JobHero } from './JobHero';
import { JobDescription } from './JobDescription';
import { JobApplication } from './JobApplication';

/** Section types owned by the "careers" page group. Merged into ../registry.tsx. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const careersSections: Record<string, ComponentType<any>> = {
  'info-cards': InfoCards,
  'image-collage': ImageCollage,
  'interest-marquee': InterestMarquee,
  'job-list': JobList,
  'job-hero': JobHero,
  'job-description': JobDescription,
  'job-application': JobApplication,
};
