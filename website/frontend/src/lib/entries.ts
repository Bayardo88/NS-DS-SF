import type { Entry, Media } from './types';

/** Helpers to read WordPress entry meta in a typed way. */

export function metaString(entry: Entry, key: string): string | undefined {
  const value = entry.meta[key];
  return typeof value === 'string' ? value : undefined;
}

export function metaList(entry: Entry, key: string): string[] {
  const value = entry.meta[key];
  return Array.isArray(value) ? (value as string[]) : [];
}

export function metaMedia(entry: Entry, key = 'image'): Media | undefined {
  const value = entry.meta[key];
  if (typeof value === 'string') return { src: value, alt: '' };
  if (value && typeof value === 'object' && 'src' in value) return value as Media;
  return undefined;
}

export const entryHref: Record<Entry['type'], (slug: string) => string> = {
  page: (slug) => `/${slug}`,
  post: (slug) => `/insights/${slug}`,
  ns_job: (slug) => `/careers/jobs/${slug}`,
  ns_case_study: (slug) => `/results/${slug}`,
};
