import { useCallback, useRef, useState } from "react";

import { Icon } from "../../components/common";
import {
  SEASON_CLASS_SCHEDULE_DEFAULT_INDEX,
  SEASON_CLASS_SCHEDULE_DESCRIPTION,
  SEASON_CLASS_SCHEDULE_DIVIDER,
  SEASON_CLASS_SCHEDULE_MONTH,
  SEASON_CLASS_SCHEDULE_TITLE,
  getCupImage,
  getSeatDots,
  seasonClassScheduleDays,
} from "../../data/seasonClassSchedule";
import "./SeasonClassScheduleSection.scss";

const CARD_STEP_REM = 15.25;
const ACTIVE_ANCHOR_REM = 38.125;

function SeasonClassScheduleSection() {
  const [activeIndex, setActiveIndex] = useState(SEASON_CLASS_SCHEDULE_DEFAULT_INDEX);
  const [monthLabel] = useState(SEASON_CLASS_SCHEDULE_MONTH);
  const [isDragging, setIsDragging] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const lastIndex = seasonClassScheduleDays.length - 1;
  const trackOffsetRem = ACTIVE_ANCHOR_REM - activeIndex * CARD_STEP_REM;
  const thumbOffsetPercent = lastIndex > 0 ? (activeIndex / lastIndex) * 100 : 0;

  const setIndexFromClientX = useCallback(
    (clientX: number) => {
      const track = scrollbarRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setActiveIndex(Math.round(ratio * lastIndex));
    },
    [lastIndex],
  );

  const handleScrollbarPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setIndexFromClientX(event.clientX);
  };

  const handleScrollbarPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIndexFromClientX(event.clientX);
  };

  const handleScrollbarPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleScrollbarKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(lastIndex, prev + 1));
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(lastIndex);
    }
  };

  return (
    <section className="season-schedule" aria-label={SEASON_CLASS_SCHEDULE_TITLE}>
      <header className="season-schedule__header">
        <div className="season-schedule__intro">
          <h2 className="season-schedule__title ft-48b ink500">{SEASON_CLASS_SCHEDULE_TITLE}</h2>
          <p className="season-schedule__desc ft-28r ink500">{SEASON_CLASS_SCHEDULE_DESCRIPTION}</p>
        </div>

        <div className="season-schedule__month">
          <div className="season-schedule__month-nav">
            <button className="season-schedule__month-btn" type="button" aria-label="이전 달">
              <Icon name="chevron-left" />
            </button>
            <span className="season-schedule__month-label">{monthLabel}</span>
            <button className="season-schedule__month-btn" type="button" aria-label="다음 달">
              <Icon name="chevron-right" />
            </button>
          </div>
          <Icon className="season-schedule__calendar-icon ink500" name="calendar" />
        </div>
      </header>

      <div className="season-schedule__carousel">
        <div
          className={[
            "season-schedule__track",
            isDragging && "season-schedule__track--dragging",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ transform: `translateX(${trackOffsetRem}rem)` }}
        >
          {seasonClassScheduleDays.map((item, index) => {
            const isActive = index === activeIndex;
            const seatDots = getSeatDots(item.remainingSeats);
            const cupImage = getCupImage(item.remainingSeats);

            return (
              <article
                key={item.id}
                className={[
                  "season-schedule__card",
                  isActive && "season-schedule__card--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button
                  type="button"
                  className="season-schedule__card-btn"
                  aria-pressed={isActive}
                  aria-label={`${item.day}일 ${item.weekday}, 잔여 ${item.remainingSeats}석`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="season-schedule__card-head">
                    <p className="season-schedule__day ft-48b deep500">{item.day}</p>
                    <p className="season-schedule__weekday ft-18r deep500">{item.weekday}</p>
                  </div>

                  <img
                    className="season-schedule__divider"
                    src={SEASON_CLASS_SCHEDULE_DIVIDER}
                    alt=""
                    aria-hidden="true"
                  />

                  <img
                    className="season-schedule__cup"
                    src={cupImage}
                    alt=""
                    aria-hidden="true"
                  />

                  <div className="season-schedule__seats">
                    <div className="season-schedule__dots" aria-hidden="true">
                      {seatDots.map((state, dotIndex) => (
                        <span
                          key={`${item.id}-dot-${dotIndex}`}
                          className={[
                            "season-schedule__dot",
                            `season-schedule__dot--${state}`,
                          ].join(" ")}
                        />
                      ))}
                    </div>
                    <p className="season-schedule__remain ft-18r ink500">
                      잔여 {item.remainingSeats}석
                    </p>
                  </div>
                </button>
              </article>
            );
          })}
        </div>

        <div
          ref={scrollbarRef}
          className={[
            "season-schedule__scrollbar",
            isDragging && "season-schedule__scrollbar--dragging",
          ]
            .filter(Boolean)
            .join(" ")}
          role="slider"
          aria-label="일정 카드 위치"
          aria-valuemin={0}
          aria-valuemax={lastIndex}
          aria-valuenow={activeIndex}
          tabIndex={0}
          onPointerDown={handleScrollbarPointerDown}
          onPointerMove={handleScrollbarPointerMove}
          onPointerUp={handleScrollbarPointerUp}
          onPointerCancel={handleScrollbarPointerUp}
          onKeyDown={handleScrollbarKeyDown}
        >
          <div
            className="season-schedule__scrollbar-thumb"
            style={{ left: `${thumbOffsetPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default SeasonClassScheduleSection;
