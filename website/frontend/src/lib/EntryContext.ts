import { createContext, useContext } from 'react';
import type { Entry } from './types';

export const EntryContext = createContext<Entry | null>(null);

/** The WordPress entry being rendered (lets template sections read post fields). */
export function useEntry(): Entry | null {
  return useContext(EntryContext);
}
