import type { Entry } from '../../lib/types';
import { metaList, metaString } from '../../lib/entries';

/** A `{ title, body }` pair from the job's `benefits` repeater. */
export interface JobBenefit {
  title: string;
  body?: string;
}

/** Typed view of an `ns_job` entry's meta (fields listed in website/specs/job.md). */
export interface JobFields {
  title: string;
  seniority?: string;
  roleName?: string;
  location?: string;
  employmentType?: string;
  hours?: string;
  workMode?: string;
  englishLevel?: string;
  skills: string[];
  heroImage?: string;
  aboutCompany?: string | string[];
  description?: string | string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefitsIntro?: string;
  benefits: JobBenefit[];
  applyUrl?: string;
  closed: boolean;
  validThrough?: string;
}

function metaText(entry: Entry, key: string): string | string[] | undefined {
  const value = entry.meta[key];
  if (typeof value === 'string' && value.trim()) return value;
  if (Array.isArray(value) && value.length) return value as string[];
  return undefined;
}

function metaBenefits(entry: Entry): JobBenefit[] {
  const value = entry.meta.benefits;
  if (!Array.isArray(value)) return [];
  return value.filter((b): b is JobBenefit => typeof b === 'object' && b !== null && 'title' in b);
}

export function jobFields(entry: Entry): JobFields {
  const image = entry.meta.hero_image;
  return {
    title: entry.title,
    seniority: metaString(entry, 'seniority'),
    roleName: metaString(entry, 'role_name'),
    location: metaString(entry, 'location'),
    employmentType: metaString(entry, 'type'),
    hours: metaString(entry, 'hours'),
    workMode: metaString(entry, 'work_mode'),
    englishLevel: metaString(entry, 'english_level'),
    skills: metaList(entry, 'tags'),
    heroImage: typeof image === 'string' ? image : undefined,
    aboutCompany: metaText(entry, 'about_company'),
    description: metaText(entry, 'body'),
    responsibilities: metaList(entry, 'responsibilities'),
    requirements: metaList(entry, 'requirements'),
    niceToHave: metaList(entry, 'nice_to_have'),
    benefitsIntro: metaString(entry, 'benefits_intro'),
    benefits: metaBenefits(entry),
    applyUrl: metaString(entry, 'apply_url'),
    closed: (metaString(entry, 'status') ?? 'open').toLowerCase() === 'closed',
    validThrough: metaString(entry, 'valid_through'),
  };
}

const EMPLOYMENT_TYPES: Record<string, string> = {
  'full-time': 'FULL_TIME',
  'part-time': 'PART_TIME',
  contract: 'CONTRACTOR',
  'contractor (b2b)': 'CONTRACTOR',
};

/** schema.org JobPosting for search engines (job.md page notes). */
export function jobPostingJsonLd(entry: Entry, job: JobFields, url: string) {
  const description = [job.description, job.responsibilities.length ? job.responsibilities : undefined]
    .flat()
    .filter(Boolean)
    .join('\n');
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: description || entry.excerpt,
    datePosted: entry.date ? entry.date.slice(0, 10) : undefined,
    validThrough: job.validThrough,
    employmentType: job.employmentType ? EMPLOYMENT_TYPES[job.employmentType.toLowerCase()] : undefined,
    jobLocationType: (job.workMode ?? 'Remote') === 'Remote' ? 'TELECOMMUTE' : undefined,
    applicantLocationRequirements: job.location ? { '@type': 'Country', name: job.location } : undefined,
    hiringOrganization: { '@type': 'Organization', name: 'NicaSource', sameAs: 'https://nicasource.com' },
    url,
  };
}
