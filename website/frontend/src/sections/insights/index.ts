import type { ComponentType } from 'react';
import { InsightsHero } from './InsightsHero';
import { FeaturedPost } from './FeaturedPost';
import { InsightsGrid } from './InsightsGrid';
import { PostHero } from './PostHero';
import { ReadingProgress } from './ReadingProgress';
import { PostArticle } from './PostArticle';
import { RelatedPosts } from './RelatedPosts';
import { ContactPage } from './ContactPage';

/** Section types owned by the "insights" page group. Merged into ../registry.tsx. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const insightsSections: Record<string, ComponentType<any>> = {
  'insights-hero': InsightsHero,
  'featured-post': FeaturedPost,
  'insights-grid': InsightsGrid,
  'post-hero': PostHero,
  'reading-progress': ReadingProgress,
  'post-article': PostArticle,
  'related-posts': RelatedPosts,
  'contact-page': ContactPage,
};
