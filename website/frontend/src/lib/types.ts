/** Shapes returned by the ns/v1 REST endpoints (website/wordpress/mu-plugins/ns-headless.php). */

export interface Link {
  label: string;
  href: string;
}

export interface Media {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** Every section is `{ type, ...props }`; `type` picks the component in sections/registry.tsx. */
export interface SectionData {
  type: string;
  id?: string;
  [prop: string]: unknown;
}

export interface Entry {
  id: number | string;
  type: 'page' | 'post' | 'ns_job' | 'ns_case_study';
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  meta: Record<string, unknown>;
  sections: SectionData[];
}

export interface SiteSettings {
  name: string;
  nav: Link[];
  footer: {
    columns: { heading: string; links: Link[] }[];
    badges: Media[];
    subscribe: { heading: string; body: string; label: string; placeholder: string; cta: string };
    careersCard: { label: string; cta: Link; image: string };
    watermark: string;
    tagline: string;
    copyright: string;
    social: { instagram?: string; facebook?: string; linkedin?: string };
  };
  contact: Record<string, unknown>;
}

export type CollectionName = 'posts' | 'jobs' | 'case-studies';
