import type { ComponentType } from 'react';
import { Hero } from './Hero';
import { LogoMarquee } from './LogoMarquee';
import { BentoServices } from './BentoServices';
import { TextureCallout } from './TextureCallout';
import { GeneralModule } from './GeneralModule';
import { TimezoneBento } from './TimezoneBento';
import { Columns } from './Columns';
import { PostBento } from './PostBento';
import { Banner } from './Banner';
import { SeoStates } from './SeoStates';
import { ContactModule } from './ContactModule';
import { servicesSections } from './services';
import { resultsSections } from './results';
import { careersSections } from './careers';
import { insightsSections } from './insights';
import { exploreSections } from './explore';

/**
 * Section type (WordPress `ns_sections[].type`) → component. This is the whole page-builder
 * vocabulary; website/DESIGN.md documents every type and its fields.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registry: Record<string, ComponentType<any>> = {
  hero: Hero,
  'logo-marquee': LogoMarquee,
  'bento-services': BentoServices,
  'texture-callout': TextureCallout,
  general: GeneralModule,
  'timezone-bento': TimezoneBento,
  columns: Columns,
  'post-bento': PostBento,
  banner: Banner,
  'seo-states': SeoStates,
  contact: ContactModule,
  ...servicesSections,
  ...resultsSections,
  ...careersSections,
  ...insightsSections,
  ...exploreSections,
};
