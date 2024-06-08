import { useRef, useCallback } from "react";

export function useObserver(
  callback: () => void,
  options?: IntersectionObserverInit
) {
  const observer = useRef<IntersectionObserver>();

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      }, options);

      if (node) observer.current.observe(node);
    },
    [callback, options]
  );

  return ref;
}
