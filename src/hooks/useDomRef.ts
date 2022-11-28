import { MutableRefObject, useCallback, useRef } from 'react';
export default function useDomRef<T extends HTMLElement>(): [
  MutableRefObject<T | null> | undefined,
  (dom: T) => void
] {
  const domRef = useRef<T>(null);
  const setTomRef = useCallback((dom: T) => {
    // @ts-expect-error
    domRef.current = dom;
  }, []);

  return [domRef, setTomRef];
}
