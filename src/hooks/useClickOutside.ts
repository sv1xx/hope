import type React from 'react';
import { useEffect } from 'react';

type UseClickOutsideOptions = {
  enabled?: boolean;
};

const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: () => void,
  options?: UseClickOutsideOptions,
) => {
  const { enabled = true } = options || {};

  useEffect(() => {
    if (!enabled) return;

    const handler = (event: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      if (!element.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [ref, callback, options]);
};

export default useClickOutside;
