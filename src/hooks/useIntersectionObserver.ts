import { useEffect, useRef, useState } from 'react';

/**
 * Hook for intersection observer an html ref element
 */
export default (options: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLElement>();
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Callback invoked whe intersection observer run
   * @param entries
   */
  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    // set the html ref element visibility state
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    // create intersection observer
    const observer = new IntersectionObserver(callbackFunction, options);

    // link the observer to html ref element
    if (containerRef.current) observer.observe(containerRef.current);

    // when un mount the component
    return () => {
      // remove the observer
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  // return the ref and the state
  return [containerRef, isVisible];
};
