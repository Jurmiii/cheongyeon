import { useEffect, useRef, useState } from "react";

export function useScrollReveal<T extends HTMLDivElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isVisible };
}
