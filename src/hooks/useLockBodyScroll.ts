import { useEffect, type RefObject } from "react";

function findScrollableAncestor(node: Node | null, boundary: HTMLElement): HTMLElement | null {
  let element = node instanceof Element ? node : null;

  while (element && boundary.contains(element)) {
    const style = window.getComputedStyle(element);
    const canScrollY =
      (style.overflowY === "auto" || style.overflowY === "scroll") &&
      element.scrollHeight > element.clientHeight;

    if (canScrollY && element instanceof HTMLElement) {
      return element;
    }

    if (element === boundary) {
      break;
    }

    element = element.parentElement;
  }

  return null;
}

function canScrollInDirection(element: HTMLElement, deltaY: number) {
  if (deltaY < 0) {
    return element.scrollTop > 0;
  }

  if (deltaY > 0) {
    return element.scrollTop + element.clientHeight < element.scrollHeight;
  }

  return false;
}

export function useLockBodyScroll(
  isActive: boolean,
  boundaryRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const preventBackgroundScroll = (event: WheelEvent | TouchEvent) => {
      const boundary = boundaryRef?.current;
      const target = event.target;

      if (!(target instanceof Node)) {
        event.preventDefault();
        return;
      }

      if (boundary && !boundary.contains(target)) {
        event.preventDefault();
        return;
      }

      if (event instanceof WheelEvent && boundary) {
        const scrollable = findScrollableAncestor(target, boundary);

        if (scrollable && canScrollInDirection(scrollable, event.deltaY)) {
          return;
        }

        event.preventDefault();
        return;
      }

      if (!boundary) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    window.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("wheel", preventBackgroundScroll);
      window.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [isActive, boundaryRef]);
}
