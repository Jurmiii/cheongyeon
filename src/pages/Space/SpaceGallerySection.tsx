import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type SpaceGalleryCard = {
  image: string;
  title: string;
  location: readonly [string, string];
  feature: string;
};

export type SpaceGallerySectionProps = {
  blockClass: string;
  ariaLabel: string;
  mainTitleLines: [string, string];
  subtitle: string;
  cards: readonly SpaceGalleryCard[];
};

const GALLERY_CARD_COUNT = 4;
const GALLERY_DESIGN = {
  startWidthRem: 29.0625,
  startHeightRem: 43.75,
  finalWidthRem: 20.9375,
  finalHeightRem: 32.4375,
  cardGapRem: 1.5,
  titleGapRem: 4.375,
} as const;
const GALLERY_ANIMATION_MIN_WIDTH = "48.0625rem";
const GALLERY_STATIC_MAX_WIDTH = "48rem";
const GALLERY_HOLD_DURATION = 0.5;
const GALLERY_HOVER_READY_PROGRESS = 1;

const remToPx = (value: number) => {
  const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);

  return value * (Number.isFinite(rootFontSize) ? rootFontSize : 16);
};

type GalleryMetrics = {
  startWidth: number;
  startHeight: number;
  finalWidth: number;
  finalHeight: number;
  cardGap: number;
  titleGap: number;
};

const getGalleryMetrics = (stageWidth: number): GalleryMetrics => {
  const cardGap = remToPx(GALLERY_DESIGN.cardGapRem);
  const titleGap = remToPx(GALLERY_DESIGN.titleGapRem);
  const maxFinalWidth = remToPx(GALLERY_DESIGN.finalWidthRem);
  const maxStartWidth = remToPx(GALLERY_DESIGN.startWidthRem);
  const finalAspect = GALLERY_DESIGN.finalWidthRem / GALLERY_DESIGN.finalHeightRem;
  const startAspect = GALLERY_DESIGN.startWidthRem / GALLERY_DESIGN.startHeightRem;
  const safeStageWidth = Math.max(stageWidth, 0);
  const fittedFinalWidth =
    (safeStageWidth - (GALLERY_CARD_COUNT - 1) * cardGap) / GALLERY_CARD_COUNT;
  const finalWidth = Math.min(maxFinalWidth, Math.max(0, fittedFinalWidth));
  const finalHeight = finalWidth / finalAspect;
  const startWidth = Math.min(maxStartWidth, safeStageWidth * 0.92);
  const startHeight = startWidth / startAspect;

  return {
    startWidth,
    startHeight,
    finalWidth,
    finalHeight,
    cardGap,
    titleGap,
  };
};

function SpaceGallerySection({
  blockClass,
  ariaLabel,
  mainTitleLines,
  subtitle,
  cards,
}: SpaceGallerySectionProps) {
  const galleryRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const readyClass = `${blockClass}--cards-ready`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const gallery = galleryRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const head = headRef.current;
    const mainTitle = mainTitleRef.current;
    const subtitleEl = subtitleRef.current;

    if (!gallery || !pin || !stage || !head || !mainTitle || !subtitleEl) {
      return;
    }

    const refreshScroll = () => {
      ScrollTrigger.refresh();
    };

    const mm = gsap.matchMedia();

    mm.add(`(min-width: ${GALLERY_ANIMATION_MIN_WIDTH})`, () => {
      let applyInitialState: (() => void) | null = null;

      const context = gsap.context(() => {
        const cardElements = cardRefs.current.filter(Boolean) as HTMLElement[];

        if (cardElements.length === 0) {
          return;
        }

        const readMetrics = () => getGalleryMetrics(stage.offsetWidth);

        const getRowStart = () => {
          const { cardGap, finalWidth } = readMetrics();
          const rowWidth = cardElements.length * finalWidth + (cardElements.length - 1) * cardGap;
          return Math.max(0, (stage.offsetWidth - rowWidth) / 2);
        };

        const getFinalCardX = () => {
          const stageWidth = stage.offsetWidth;
          const stageCenterX = stageWidth / 2;
          const rowStart = getRowStart();
          const { cardGap, finalWidth } = readMetrics();

          return cardElements.map((_, index) => {
            const cardCenterX = rowStart + index * (finalWidth + cardGap) + finalWidth / 2;
            return cardCenterX - stageCenterX;
          });
        };

        const positionSubtitle = () => {
          const { finalHeight, titleGap } = readMetrics();
          const cardTop = stage.offsetHeight / 2 - finalHeight / 2;

          gsap.set(head, {
            top: cardTop - titleGap - head.offsetHeight,
            left: getRowStart(),
          });
        };

        const syncStageHeight = () => {
          const { startHeight } = readMetrics();

          gsap.set(stage, { height: startHeight });
        };

        const setHoverEnabled = (enabled: boolean) => {
          gallery.classList.toggle(readyClass, enabled);
        };

        const updateHoverState = (progress: number) => {
          setHoverEnabled(progress >= GALLERY_HOVER_READY_PROGRESS);
        };

        applyInitialState = () => {
          setHoverEnabled(false);
          syncStageHeight();

          gsap.set(mainTitle, {
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
            top: "50%",
            xPercent: 0,
            yPercent: -50,
            x: 0,
            y: 0,
            autoAlpha: 1,
            scale: 1,
            zIndex: 5,
            transformOrigin: "center center",
          });
          gsap.set(subtitleEl, {
            clipPath: "inset(0 100% 0 0)",
            WebkitClipPath: "inset(0 100% 0 0)",
          });
          positionSubtitle();
          gsap.set(head, { opacity: 0 });
          const { startHeight, startWidth } = readMetrics();

          cardElements.forEach((card, index) => {
            gsap.set(card, {
              position: "absolute",
              left: "50%",
              top: "50%",
              xPercent: -50,
              yPercent: -50,
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              width: startWidth,
              height: startHeight,
              autoAlpha: index === 0 ? 1 : 0,
              transformOrigin: "center center",
              zIndex: cardElements.length - index,
            });
          });
        };

        applyInitialState();
        ScrollTrigger.addEventListener("refreshInit", applyInitialState);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: gallery,
            start: "top top",
            end: "+=140%",
            scrub: 1.2,
            pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              updateHoverState(self.progress);
            },
          },
        });

        timeline
          .to({}, { duration: GALLERY_HOLD_DURATION })
          .to(mainTitle, {
            y: -40,
            autoAlpha: 0,
            duration: 0.35,
            ease: "power2.inOut",
          })
          .to(
            head,
            {
              opacity: 1,
              duration: 0.2,
              ease: "power2.out",
            },
            "<",
          )
          .to(
            subtitleEl,
            {
              clipPath: "inset(0 0% 0 0)",
              WebkitClipPath: "inset(0 0% 0 0)",
              duration: 0.8,
              ease: "sine.inOut",
            },
            "<0.12",
          )
          .to(
            cardElements.slice(1),
            {
              autoAlpha: 1,
              duration: 0.2,
              ease: "sine.out",
            },
            "<0.18",
          )
          .to(
            cardElements,
            {
              width: () => readMetrics().finalWidth,
              height: () => readMetrics().finalHeight,
              duration: 0.62,
              ease: "sine.inOut",
            },
            "<0.1",
          )
          .to(
            cardElements,
            {
              x: (index) => getFinalCardX()[index] ?? 0,
              duration: 1.1,
              ease: "sine.inOut",
              stagger: {
                each: 0.028,
                from: "center",
                ease: "sine.out",
              },
            },
            "<0.3",
          );

        const scrollTrigger = timeline.scrollTrigger;

        if (scrollTrigger) {
          updateHoverState(scrollTrigger.progress);
        }

        requestAnimationFrame(refreshScroll);
      }, gallery);

      window.addEventListener("resize", refreshScroll);

      return () => {
        if (applyInitialState) {
          ScrollTrigger.removeEventListener("refreshInit", applyInitialState);
        }
        gallery.classList.remove(readyClass);
        window.removeEventListener("resize", refreshScroll);
        context.revert();
      };
    });

    mm.add(`(max-width: ${GALLERY_STATIC_MAX_WIDTH})`, () => {
      const context = gsap.context(() => {
        gsap.set(stage, { clearProps: "height" });
        gsap.set(mainTitle, { clearProps: "all" });
        gsap.set(head, { clearProps: "top,left,opacity" });
        gsap.set(subtitleEl, { clearProps: "clipPath,WebkitClipPath" });
        gsap.set(`.${blockClass}__subtitle-reveal`, { clearProps: "all" });
        gsap.set(`.${blockClass}__card`, { clearProps: "all" });
      }, gallery);

      return () => context.revert();
    });

    gallery.querySelectorAll<HTMLImageElement>(`.${blockClass}__image`).forEach((image) => {
      if (image.complete) {
        return;
      }

      image.addEventListener("load", refreshScroll, { once: true });
    });

    window.addEventListener("load", refreshScroll);

    return () => {
      window.removeEventListener("load", refreshScroll);
      mm.revert();
    };
  }, [blockClass, readyClass]);

  return (
    <section className={blockClass} aria-label={ariaLabel} ref={galleryRef}>
      <div className={`${blockClass}__pin`} ref={pinRef}>
        <h2 className={`${blockClass}__main-title ft-96r`} ref={mainTitleRef}>
          {mainTitleLines[0]}
          <br />
          {mainTitleLines[1]}
        </h2>

        <div className={`${blockClass}__content`}>
          <div className={`${blockClass}__stage`} ref={stageRef}>
            <div className={`${blockClass}__head`} ref={headRef}>
              <h3 className={`${blockClass}__subtitle ft-64b`}>
                <span className={`${blockClass}__subtitle-ghost`} aria-hidden="true">
                  {subtitle}
                </span>
                <span className={`${blockClass}__subtitle-reveal`} ref={subtitleRef}>
                  {subtitle}
                </span>
              </h3>
            </div>

            {cards.map((card, index) => (
              <article
                className={`${blockClass}__card`}
                key={card.image}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
              >
                <img src={card.image} alt="" className={`${blockClass}__image`} aria-hidden="true" />

                <div className={`${blockClass}__card-overlay`} aria-hidden="true" />

                <div className={`${blockClass}__card-content`}>
                  <h4 className={`${blockClass}__card-title ft-28b`}>{card.title}</h4>
                  <p className={`${blockClass}__card-text ft-16r`}>
                    {card.location[0]}
                    {' '}
                    <br className={`${blockClass}__card-location-break`} aria-hidden="true" />
                    {card.location[1]}
                  </p>
                  <p className={`${blockClass}__card-text ft-16r`}>{card.feature}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpaceGallerySection;
