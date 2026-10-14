import type { MutableRefObject, Ref, RefCallback } from 'react';

/** Combines refs so one element can feed a forwarded ref and an internal one. */
export function composeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<T | null>).current = node;
    }
  };
}
