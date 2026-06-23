import { useState } from "react";
import { classIntroductionCarouselItems } from "../../data/classIntroductionCarousel";
import "./ClassIntroductionCarouselSection.scss";

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
                className={[
                  "class-intro-carousel__card",
                  isActive && "class-intro-carousel__card--active",
                  isInactive && "class-intro-carousel__card--inactive",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() => setHoveredIndex(index)}
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

export default ClassIntroductionCarouselSection;
