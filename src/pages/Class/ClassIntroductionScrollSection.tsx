import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { classIntroductionSlides } from "../../data/classIntroductionSlides";

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

export default ClassIntroductionScrollSection;
