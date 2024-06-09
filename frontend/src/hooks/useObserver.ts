import { useRef, useCallback } from "react";

/**
 * A custom hook that uses IntersectionObserver to execute a callback function
 * when an element becomes visible in the viewport.
 *
 * @param callback - The function to be executed when the element is visible.
 * @param options - Optional IntersectionObserver configuration options.
 * @returns A ref callback function to be assigned to the element to be observed.
 */
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
