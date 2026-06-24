import { useCallback, useEffect, useRef, useState } from "react";

import reviewBg from "../../assets/images/08class/class-introduction-7-bg.webp";
import { classIntroductionReviews } from "../../data/classIntroductionReviews";
import "./ClassIntroductionReviewSection.scss";

const FADE_DURATION_MS = 800;

type PanelState = "hidden" | "fading" | "shown";

function ClassIntroductionReviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const isTransitioningRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [panelState, setPanelState] = useState<PanelState>("hidden");

  const finishFadeIn = useCallback(() => {
    isTransitioningRef.current = false;
    setPanelState("shown");
  }, []);

  const startFadeIn = useCallback((index: number) => {
    isTransitioningRef.current = true;
    setPanelState("hidden");
    setActiveIndex(index);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPanelState("fading");
      });
    });
  }, []);

  const handleFadeAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLElement>) => {
      if (event.animationName !== "class-intro-review-fade-in") {
        return;
      }

      finishFadeIn();
    },
    [finishFadeIn],
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex || isTransitioningRef.current) {
        return;
      }

      startFadeIn(index);
    },
    [activeIndex, startFadeIn],
  );

  useEffect(() => {
    if (panelState !== "fading") {
      return undefined;
    }

    const fallbackTimer = window.setTimeout(() => {
      finishFadeIn();
    }, FADE_DURATION_MS + 50);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [finishFadeIn, panelState, activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const triggerReveal = () => {
      if (hasTriggeredRef.current) {
        return;
      }

      hasTriggeredRef.current = true;
      startFadeIn(0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          triggerReveal();
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);

    requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

      if (inView) {
        triggerReveal();
        observer.disconnect();
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [startFadeIn]);

  const review = classIntroductionReviews[activeIndex];
  const panelClass =
    panelState === "fading"
      ? "class-intro-review__panel--fading-in"
      : panelState === "shown"
        ? "class-intro-review__panel--visible"
        : "";

  return (
    <section
      ref={sectionRef}
      className="class-intro-review"
      style={{ backgroundImage: `url(${reviewBg})` }}
      aria-label="클래스 수강 후기"
    >
      <div className="class-intro-review__grid">
        <div className="class-intro-review__layout">
          <div
            className={["class-intro-review__media", "class-intro-review__panel", panelClass]
              .filter(Boolean)
              .join(" ")}
            onAnimationEnd={handleFadeAnimationEnd}
          >
            <figure className="class-intro-review__figure">
              <img
                className="class-intro-review__image"
                src={review.image}
                alt=""
                aria-hidden="true"
              />
            </figure>
          </div>

          <div
            className={["class-intro-review__content", "class-intro-review__panel", panelClass]
              .filter(Boolean)
              .join(" ")}
            aria-live="off"
          >
            <div className="class-intro-review__quote-block">
              <blockquote className="class-intro-review__quote-head">
                <h2 className="class-intro-review__headline ft-36b deep500">
                  <span className="class-intro-review__quote-mark" aria-hidden="true">
                    "
                  </span>
                  <span className="class-intro-review__headline-text">{review.headline}</span>
                  <span
                    className="class-intro-review__quote-mark class-intro-review__quote-mark--close"
                    aria-hidden="true"
                  >
                    "
                  </span>
                </h2>
              </blockquote>

              <div className="class-intro-review__stars" aria-label="별점 5점">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <span key={`star-${starIndex}`} className="class-intro-review__star">
                    ★
                  </span>
                ))}
              </div>

              <p className="class-intro-review__name ft-28b deep500">{review.name}</p>
            </div>

            <p className="class-intro-review__body ft-22r ink500">{review.body}</p>

            <div className="class-intro-review__meta">
              <p className="class-intro-review__date ft-18b deep400">{review.date}</p>

              <div className="class-intro-review__pagination" role="tablist" aria-label="후기 슬라이드">
                {classIntroductionReviews.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    className={[
                      "class-intro-review__dot",
                      index === activeIndex && "class-intro-review__dot--active",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-label={`후기 ${index + 1}`}
                    aria-selected={index === activeIndex}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClassIntroductionReviewSection;
