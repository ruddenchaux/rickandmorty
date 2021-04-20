/* eslint-disable @typescript-eslint/no-explicit-any */
import useIntersectionObserver from './useIntersectionObserver';

/**
 * hook for handle card lazy (only when the card enter in the viewport)
 */
export default () =>
  useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0
  });
