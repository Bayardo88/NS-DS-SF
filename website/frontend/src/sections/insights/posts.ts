import type { Entry } from '../../lib/types';
import { metaList } from '../../lib/entries';

/** Post helpers shared by the insights sections (index, featured slot, related posts). */

export interface Author {
  name: string;
  role?: string;
  avatar?: string;
  bio?: string;
  verified?: boolean;
  years_experience?: number;
  expertise?: string[];
}

export function postAuthor(entry: Entry): Author | undefined {
  const value = entry.meta.author;
  return value && typeof value === 'object' && 'name' in value ? (value as Author) : undefined;
}

export function isFeatured(entry: Entry): boolean {
  const value = entry.meta.featured;
  return value === true || value === 'true' || value === '1';
}

/** WordPress sends ISO dates, the seed JSON "YYYY-MM-DD hh:mm:ss"; both parse once the space is a T. */
export function postTime(entry: Entry): number {
  const t = Date.parse(entry.date.replace(' ', 'T'));
  return Number.isNaN(t) ? 0 : t;
}

export function newestFirst(posts: Entry[]): Entry[] {
  return [...posts].sort((a, b) => postTime(b) - postTime(a));
}

export function formatPostDate(entry: Entry): string {
  const t = postTime(entry);
  return t ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(t) : '';
}

/** The CMS-flagged featured post, else the newest one. */
export function featuredPost(posts: Entry[]): Entry | undefined {
  return posts.find(isFeatured) ?? newestFirst(posts)[0];
}

/** Every tag used by the posts, most used first ("tag grid = tags used in blog posts"). */
export function tagsInUse(posts: Entry[]): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) for (const tag of metaList(post, 'tags')) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([tag]) => tag);
}

/** Related = most shared tags with `current`, newest first, excluding itself. */
export function relatedPosts(current: Entry, posts: Entry[], count = 3): Entry[] {
  const tags = new Set(metaList(current, 'tags'));
  return newestFirst(posts.filter((p) => p.slug !== current.slug))
    .map((post) => ({ post, overlap: metaList(post, 'tags').filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, count)
    .map(({ post }) => post);
}

export function tagHref(tag: string): string {
  return `/insights?tag=${encodeURIComponent(tag)}`;
}
