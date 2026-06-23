import { useCallback, useEffect, useRef, useState } from "react";

import reviewBg from "../../assets/images/08class/class-introduction-7-bg.webp";
import { classIntroductionReviews } from "../../data/classIntroductionReviews";
import "./ClassIntroductionReviewSection.scss";

function ClassIntroductionReviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  const startBloomReveal = useCallback((index: number) => {
    setActiveIndex(index);
    setHasRevealed(false);
    setIsRevealing(false);
    setIsAnimating(true);

    requestAnimationFrame(() => {
      setIsRevealing(true);
    });
  }, []);

  const handleBloomAnimationEnd = useCallback((event: React.AnimationEvent<HTMLImageElement>) => {
    if (event.animationName !== "class-intro-review-bloom") {
      return;
    }

    setIsRevealing(false);
    setHasRevealed(true);
    setIsAnimating(false);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex || isAnimating) {
        return;
      }

      startBloomReveal(index);
    },
    [activeIndex, isAnimating, startBloomReveal],
  );

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const triggerReveal = () => {
      if (hasTriggeredRef.current) {
        return;
      }

      hasTriggeredRef.current = true;
      startBloomReveal(0);
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
  }, [startBloomReveal]);

  const review = classIntroductionReviews[activeIndex];

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
            className={[
              "class-intro-review__media",
              (isRevealing || hasRevealed) && "class-intro-review__media--visible",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <figure
              className={[
                "class-intro-review__figure",
                isRevealing && "class-intro-review__figure--revealing",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <img
                className={[
                  "class-intro-review__image",
                  isRevealing && "class-intro-review__image--revealing",
                  hasRevealed && "class-intro-review__image--revealed",
                ]
                  .filter(Boolean)
                  .join(" ")}
                src={review.image}
                alt=""
                aria-hidden="true"
                onAnimationEnd={handleBloomAnimationEnd}
              />
            </figure>
          </div>

          <div className="class-intro-review__content">
            <div className="class-intro-review__quote-block">
              <div className="class-intro-review__quote-head">
                <span className="class-intro-review__quote-mark ft-36b deep500" aria-hidden="true">
                  "
                </span>
                <h2 className="class-intro-review__headline ft-36b deep500">
                  {review.headline.split("\n").map((line, lineIndex, lines) => (
                    <span key={`${review.id}-headline-${lineIndex}`}>
                      {line}
                      {lineIndex < lines.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
                <span
                  className="class-intro-review__quote-mark class-intro-review__quote-mark--close ft-36b deep500"
                  aria-hidden="true"
                >
                  "
                </span>
              </div>

              <div className="class-intro-review__stars" aria-label="별점 5점">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <span key={`${review.id}-star-${starIndex}`} className="class-intro-review__star">
                    ★
                  </span>
                ))}
              </div>

              <p className="class-intro-review__name ft-28b deep500">{review.name}</p>
            </div>

            <p className="class-intro-review__body ft-22r ink500">
              {review.body.split("\n").map((line, lineIndex, lines) => (
                <span key={`${review.id}-body-${lineIndex}`}>
                  {line}
                  {lineIndex < lines.length - 1 && <br />}
                </span>
              ))}
            </p>

            <p className="class-intro-review__date ft-18b deep400">{review.date}</p>
          </div>
        </div>

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
              disabled={isAnimating}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClassIntroductionReviewSection;
