import type { ComponentType } from 'react';
import { BenefitsExplorer } from './BenefitsExplorer';
import { ComparisonCards } from './ComparisonCards';
import { ServiceCard } from './ServiceCard';
import { SkillsMarquee } from './SkillsMarquee';
import { FaqAccordion } from './FaqAccordion';

/** Section types owned by the "services" page group. Merged into ../registry.tsx. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const servicesSections: Record<string, ComponentType<any>> = {
  'benefits-explorer': BenefitsExplorer,
  'comparison-cards': ComparisonCards,
  'service-card': ServiceCard,
  'skills-marquee': SkillsMarquee,
  'faq-accordion': FaqAccordion,
};
