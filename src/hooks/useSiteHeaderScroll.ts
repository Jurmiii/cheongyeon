import { useEffect, useState } from "react";

const SCROLL_BG_THRESHOLD = 32;
const SCROLL_DELTA = 6;

export function useSiteHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollHidden, setIsScrollHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      setIsScrolled(currentScrollY > SCROLL_BG_THRESHOLD);

      if (currentScrollY <= SCROLL_BG_THRESHOLD) {
        setIsScrollHidden(false);
      } else if (Math.abs(delta) >= SCROLL_DELTA) {
        setIsScrollHidden(delta < 0);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { isScrolled, isScrollHidden };
}
