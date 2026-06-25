import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, Header } from "../../components/common";
import subSymbol from "../../assets/images/01main/subsymbol.svg";
import classIntroImage from "../../assets/images/08class/class-introduction-2-1.webp";
import classIntroCtaBg from "../../assets/images/08class/class-introduction-6-bg.webp";
import reviewBg from "../../assets/images/08class/class-introduction-7-bg.webp";
import { classIntroductionCarouselItems } from "../../data/classIntroductionCarousel";
import { classIntroductionReviews } from "../../data/classIntroductionReviews";
import { classIntroductionSlides } from "../../data/classIntroductionSlides";
import "./ClassIntroductionPage.scss";

const FADE_DURATION_MS = 800;
const AUTO_ADVANCE_MS = 4000;

type PanelState = "hidden" | "fading" | "shown";

function ClassIntroductionScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const images = imageRefs.current.filter(Boolean) as HTMLImageElement[];
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];

    if (images.length === 0 || panels.length === 0) {
      return;
    }

    const refreshScroll = () => {
      ScrollTrigger.refresh();
    };

    const context = gsap.context(() => {
      const slideCount = classIntroductionSlides.length;
      const labelProgress = Array.from({ length: slideCount }, (_, index) => index / (slideCount - 1));
      const getNearestIndex = (progress: number) =>
        labelProgress.reduce(
          (nearestIndex, labelProgressValue, index) =>
            Math.abs(progress - labelProgressValue) < Math.abs(progress - labelProgress[nearestIndex])
              ? index
              : nearestIndex,
          0,
        );

      const holdDuration = 0.2;
      const transitionDuration = 0.42;

      gsap.set(images, { xPercent: 100, autoAlpha: 0 });
      gsap.set(images[0], { xPercent: 0, autoAlpha: 1 });
      gsap.set(panels, { autoAlpha: 0, y: 12 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(Math.round(window.innerHeight * 2.75), 2400)}`,
          scrub: 0.08,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: "labelsDirectional",
            delay: 0,
            duration: { min: 0.08, max: 0.16 },
            ease: "power4.out",
            inertia: false,
          },
          onUpdate: (self) => {
            const nextIndex = getNearestIndex(self.progress);
            setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
          },
        },
      });

      timeline.addLabel("slide-0").to({}, { duration: holdDuration });

      for (let index = 1; index < slideCount; index += 1) {
        const previousImage = images[index - 1];
        const nextImage = images[index];
        const previousPanel = panels[index - 1];
        const nextPanel = panels[index];

        timeline
          .to(
            previousImage,
            {
              xPercent: -100,
              autoAlpha: 0,
              ease: "power2.inOut",
              duration: transitionDuration,
            },
            `slide-${index - 1}-transition`,
          )
          .fromTo(
            nextImage,
            { xPercent: 100, autoAlpha: 1 },
            {
              xPercent: 0,
              autoAlpha: 1,
              ease: "power2.inOut",
              duration: transitionDuration,
            },
            "<",
          )
          .to(
            previousPanel,
            {
              autoAlpha: 0,
              y: -12,
              ease: "power2.inOut",
              duration: transitionDuration * 0.7,
            },
            "<",
          )
          .fromTo(
            nextPanel,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.inOut",
              duration: transitionDuration * 0.7,
            },
            "<0.08",
          )
          .addLabel(`slide-${index}`)
          .to({}, { duration: holdDuration });
      }
    }, sectionRef);

    images.forEach((image) => {
      if (image.complete) {
        return;
      }

      image.addEventListener("load", refreshScroll, { once: true });
    });

    requestAnimationFrame(refreshScroll);
    window.addEventListener("load", refreshScroll);
    window.addEventListener("resize", refreshScroll);

    return () => {
      window.removeEventListener("load", refreshScroll);
      window.removeEventListener("resize", refreshScroll);
      context.revert();
    };
  }, []);

  return (
    <section className="class-intro-scroll" ref={sectionRef} aria-label="클래스 유형">
      <div className="class-intro-scroll__grid">
        <div className="class-intro-scroll__stage">
          <div className="class-intro-scroll__media" aria-live="polite">
            {classIntroductionSlides.map((slide, index) => (
              <img
                key={slide.key}
                ref={(element) => {
                  imageRefs.current[index] = element;
                }}
                className="class-intro-scroll__image"
                src={slide.image}
                alt={slide.imageAlt}
                aria-hidden={index !== activeIndex}
              />
            ))}
          </div>

          <div className="class-intro-scroll__panel">
            {classIntroductionSlides.map((slide, index) => (
              <div
                key={slide.key}
                ref={(element) => {
                  panelRefs.current[index] = element;
                }}
                className="class-intro-scroll__panel-slide"
                aria-hidden={index !== activeIndex}
              >
                <div className="class-intro-scroll__copy">
                  <h3 className="class-intro-scroll__title ft-36b ink500">{slide.title}</h3>
                  <p className="class-intro-scroll__description ft-22r ink500">{slide.description}</p>
                </div>

                <div className="class-intro-scroll__filters" aria-label="클래스 유형">
                  {classIntroductionSlides.map((filterSlide, filterIndex) => (
                    <span
                      key={filterSlide.key}
                      className={[
                        "class-intro-scroll__filter ft-16r",
                        filterIndex === activeIndex && "class-intro-scroll__filter--active",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-current={filterIndex === activeIndex ? "true" : undefined}
                    >
                      {filterSlide.filterLabel}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClassIntroductionCarouselSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? 0;

  return (
    <section className="class-intro-carousel" aria-label="차를 경험하는 시간">
      <div className="class-intro-carousel__grid">
        <h2 className="class-intro-carousel__title ft-48b ink500">차를 경험하는 시간</h2>

        <div
          className="class-intro-carousel__track"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {classIntroductionCarouselItems.map((item, index) => {
            const isActive = index === activeIndex;
            const isInactive = hoveredIndex !== null && index !== activeIndex;

            return (
              <article
                key={item.id}
                tabIndex={0}
                className={[
                  "class-intro-carousel__card",
                  isActive && "class-intro-carousel__card--active",
                  isInactive && "class-intro-carousel__card--inactive",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)}
              >
                <div className="class-intro-carousel__media">
                  <div className="class-intro-carousel__video-slot" aria-hidden="true" />
                </div>

                <div className="class-intro-carousel__content">
                  <h3
                    className={[
                      "class-intro-carousel__card-title",
                      isActive ? "ft-36b" : "ft-28b",
                      "white",
                    ].join(" ")}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="class-intro-carousel__card-description ft-22r white">
                      {item.description.split("\n").map((line, lineIndex, lines) => (
                        <span key={`${item.id}-${lineIndex}`}>
                          {line}
                          {lineIndex < lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClassIntroductionCtaSection() {
  return (
    <section
      className="class-intro-cta"
      style={{ backgroundImage: `url(${classIntroCtaBg})` }}
      aria-label="클래스 예약 안내"
    >
      <div className="class-intro-cta__grid">
        <div className="class-intro-cta__content">
          <h2 className="class-intro-cta__title ft-48b white">
            <span>한 잔의 차로 머무는 시간</span>
            <span>청연에서 조용히 만나보세요</span>
          </h2>
          <Link className="class-intro-cta__button ft-22b" to="/reservation">
            클래스 예약하기
          </Link>
        </div>
      </div>
    </section>
  );
}

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

  useEffect(() => {
    if (panelState !== "shown") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      if (isTransitioningRef.current) {
        return;
      }

      const nextIndex = (activeIndex + 1) % classIntroductionReviews.length;
      startFadeIn(nextIndex);
    }, AUTO_ADVANCE_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [activeIndex, panelState, startFadeIn]);

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

function ClassIntroductionPage() {
  return (
    <main className="class-intro-page">
      <div className="class-intro-page__header">
        <Header />
      </div>

      <section className="class-intro-kv" aria-label="클래스 소개">
        <div className="class-intro-kv__grid">
          <div className="class-intro-kv__content">
            <div className="class-intro-kv__head">
              <h1 className="class-intro-kv__title ft-64b ink500">클래스 소개</h1>
              <img className="class-intro-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
            </div>
            <p className="class-intro-kv__description ft-28r ink500">
              차를 이해하고, 천천히 우리며
              <br />
              청연의 다도 문화를 경험합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="class-intro-about" aria-label="클래스 소개 상세">
        <div className="class-intro-about__grid">
          <div className="class-intro-about__media">
            <img
              className="class-intro-about__image"
              src={classIntroImage}
              alt="차 도구와 다도 수업 공간"
            />
          </div>
          <div className="class-intro-about__content">
            <h2 className="class-intro-about__title ft-48b ink500">차를 더 가까이 만나는 첫 수업</h2>
            <div className="class-intro-about__description ft-28r ink500">
              <p className="class-intro-about__description-line">어렵게 느껴졌던 다도를 일상 속에서 </p>
              <p className="class-intro-about__description-line">
                즐길 수 있도록 쉽게 풀어냅니다.
                <br />
                차 도구의 쓰임과 기본 흐름을 익히며, 나에게 맞는 차의 취향을 발견해 보세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClassIntroductionScrollSection />

      <ClassIntroductionCarouselSection />

      <ClassIntroductionCtaSection />

      <ClassIntroductionReviewSection />

      <Footer />
    </main>
  );
}

export default ClassIntroductionPage;
