import type { CollectionName, Entry, SiteSettings } from './types';

/**
 * Data layer. Reads the headless WordPress through the Vite proxy (`/wp-json` → Playground on
 * :9400). If WordPress isn't running, it falls back to the same seed JSON WordPress is built from
 * (website/content), so the visual reference always renders.
 */

const seed = import.meta.glob<{ default: Record<string, unknown> }>('../../../content/**/*.json', { eager: true });

function seedFiles(dir: string) {
  return Object.entries(seed)
    .filter(([path]) => path.includes(`/content/${dir}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod], i) => ({ ...(mod.default as object), id: `seed-${dir}-${i}` }) as unknown as SeedEntry);
}

interface SeedEntry {
  id: string;
  slug: string;
  title: string;
  parent?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  meta?: Record<string, unknown>;
  sections?: Entry['sections'];
}

const typeByDir = { pages: 'page', posts: 'post', jobs: 'ns_job', 'case-studies': 'ns_case_study' } as const;

function toEntry(dir: keyof typeof typeByDir, s: SeedEntry): Entry {
  return {
    id: s.id,
    type: typeByDir[dir],
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt ?? '',
    date: s.date ?? '',
    content: s.content ?? '',
    meta: s.meta ?? {},
    sections: s.sections ?? [],
  };
}

function seedRoute(path: string): Entry | null {
  const clean = path.replace(/^\/+|\/+$/g, '') || 'home';
  const parts = clean.split('/');
  const slug = parts[parts.length - 1]!;
  const prefixes: [string, keyof typeof typeByDir][] = [
    ['results/', 'case-studies'],
    ['careers/jobs/', 'jobs'],
    ['insights/', 'posts'],
  ];
  for (const [prefix, dir] of prefixes) {
    if (clean.startsWith(prefix) && parts.length === prefix.split('/').length) {
      const hit = seedFiles(dir).find((s) => s.slug === slug);
      if (hit) return toEntry(dir, hit);
    }
  }
  const page = seedFiles('pages').find((s) => (s.parent ? `${s.parent}/${s.slug}` : s.slug) === clean);
  return page ? toEntry('pages', page) : null;
}

export class NotFoundError extends Error {}

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (res.status === 404) throw new NotFoundError(url);
  if (!res.ok || !res.headers.get('content-type')?.includes('json')) throw new Error(`WP ${res.status}`);
  return (await res.json()) as T;
}

/** Where content came from, shown in the dev badge. */
export type Source = 'wordpress' | 'seed';

export async function fetchRoute(path: string, signal?: AbortSignal): Promise<{ data: Entry; source: Source }> {
  try {
    const data = await getJson<Entry>(`/wp-json/ns/v1/route?path=${encodeURIComponent(path)}`, signal);
    return { data, source: 'wordpress' };
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err;
    // WordPress seeds itself at boot; content added to website/content since then (or WP being
    // offline) still renders from the seed JSON.
    const data = seedRoute(path);
    if (!data) throw new NotFoundError(path);
    return { data, source: 'seed' };
  }
}

export async function fetchCollection(name: string, signal?: AbortSignal): Promise<Entry[]> {
  try {
    const fromWp = await getJson<Entry[]>(`/wp-json/ns/v1/collection/${name}`, signal);
    const known = new Set(fromWp.map((e) => e.slug));
    const added = seedFiles(name).filter((s) => !known.has(s.slug));
    return [...fromWp, ...added.map((s) => toEntry(name as CollectionName, s))];
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err;
    return seedFiles(name).map((s) => toEntry(name as CollectionName, s));
  }
}

export async function fetchSite(_key: string, signal?: AbortSignal): Promise<SiteSettings> {
  try {
    return await getJson<SiteSettings>('/wp-json/ns/v1/site', signal);
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err;
    const site = Object.entries(seed).find(([p]) => p.endsWith('/content/site.json'));
    return site![1].default as unknown as SiteSettings;
  }
}
