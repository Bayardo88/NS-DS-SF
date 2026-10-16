import { createContext, useContext } from 'react';
import type { SiteSettings } from './types';

export const SiteContext = createContext<SiteSettings | null>(null);

/** Site-wide settings (nav, footer, contact module) from WordPress. */
export function useSite(): SiteSettings | null {
  return useContext(SiteContext);
}
