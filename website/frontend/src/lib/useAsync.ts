import { useEffect, useState } from 'react';

export type AsyncState<T> =
  | { status: 'loading'; data?: undefined; error?: undefined }
  | { status: 'ready'; data: T; error?: undefined }
  | { status: 'error'; data?: undefined; error: Error };

/**
 * Loads data for `key` and aborts the previous request when `key` changes (AI-GUIDE K11, K13).
 * Pass a module-level `load` function so its identity is stable.
 */
export function useAsync<T>(key: string, load: (key: string, signal: AbortSignal) => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<{ key: string; value: AsyncState<T> }>({ key, value: { status: 'loading' } });

  useEffect(() => {
    const controller = new AbortController();
    load(key, controller.signal)
      .then((data) => setState({ key, value: { status: 'ready', data } }))
      .catch((error: Error) => {
        if (error.name !== 'AbortError') setState({ key, value: { status: 'error', error } });
      });
    return () => controller.abort();
  }, [key, load]);

  // Derived during render: a stale result for an old key reads as loading (K8).
  return state.key === key ? state.value : { status: 'loading' };
}
