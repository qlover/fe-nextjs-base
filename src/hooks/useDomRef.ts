import { useCallback, useRef } from 'react';
export default function useDomRef<T>() {
  const domRef = useRef<T>();
  const setTomRef = useCallback((dom: T) => {
    domRef.current = dom;
  }, []);

  return [domRef, setTomRef];
}
