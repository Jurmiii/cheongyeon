import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Footer, Header, Icon } from "../../components/common";
import subSymbol from "../../assets/images/01main/subsymbol.svg";
import {
  SEASON_CLASS_GALLERY_GRID,
  SEASON_CLASS_GALLERY_TITLE,
  seasonClassGalleryItems,
} from "../../data/seasonClassGallery";
import {
  ORBIT_RING_CENTER,
  ORBIT_RING_RADIUS_PX,
  SEASON_CLASS_PROMO,
  SEASON_ORBIT_SLOTS,
  SEASON_SCENE_CENTER,
  SEASON_SECTION_DESCRIPTION,
  SEASON_SECTION_TITLE,
  getSeasonOrbitPosition,
  ORBIT_CUP_SIZE_REM,
  seasonClassAssets,
  seasonClassItems,
  type SeasonOrbitPosition,
} from "../../data/seasonClassItems";
import {
  SEASON_CLASS_SCHEDULE_DESCRIPTION,
  SEASON_CLASS_SCHEDULE_DIVIDER,
  SEASON_CLASS_SCHEDULE_TITLE,
  SEASON_CLASS_SCHEDULE_WEEKDAYS,
  canGoToPreviousMonth,
  formatScheduleMonthLabel,
  getCalendarGridDates,
  getCupImage,
  getScheduleDaysForMonth,
  getSeatDots,
  isBeforeDay,
  isSameDay,
  isSameMonthView,
  startOfDay,
  type SeasonClassScheduleDay,
} from "../../data/seasonClassSchedule";
import "./SeasonClassPage.scss";

const PX_PER_REM = 16;

function pxToRem(px: number) {
  return `${px / PX_PER_REM}rem`;
}

// --- SeasonClassListSection helpers ---

const SCROLL_END = 3000;
const ORBIT_STROKE_COLOR = "#c4ad98";
const TEXT_EASE = "power3.out";
const MAX_SEASON_INDEX = seasonClassItems.length - 1;

const REF_CUP_WIDTH_REM = ORBIT_CUP_SIZE_REM;
const REF_CUP_HEIGHT_REM = ORBIT_CUP_SIZE_REM;

/** 궤도 슬롯 각도 — Figma 슬롯 중심 기준 */
const ORBIT_SLOT_ANGLES: Record<Exclude<SeasonOrbitPosition, "main">, number> = {
  top: 0,
  middle: 0,
  bottom: 0,
};

function initOrbitSlotAngles() {
  (["top", "middle", "bottom"] as const).forEach((slot) => {
    const { pos } = getCoords(slot, REF_CUP_WIDTH_REM, REF_CUP_HEIGHT_REM);
    const center = getCupCenter(pos, REF_CUP_WIDTH_REM, REF_CUP_HEIGHT_REM);
    ORBIT_SLOT_ANGLES[slot] = Math.atan2(
      center.y - ORBIT_RING_CENTER.yPx,
      center.x - ORBIT_RING_CENTER.xPx,
    );
  });
}

function buildRingArcPath(fromAngle: number, toAngle: number) {
  const r = ORBIT_RING_RADIUS_PX;
  const cx = ORBIT_RING_CENTER.xPx;
  const cy = ORBIT_RING_CENTER.yPx;
  const x1 = cx + Math.cos(fromAngle) * r;
  const y1 = cy + Math.sin(fromAngle) * r;
  const x2 = cx + Math.cos(toAngle) * r;
  const y2 = cy + Math.sin(toAngle) * r;
  const delta = getCcwAngleDelta(fromAngle, toAngle);
  const largeArc = delta > Math.PI ? 1 : 0;

  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 0 ${x2} ${y2}`;
}

type CupPos = { leftPx: number; topPx: number };
type PolarState = { angle: number; radius: number; alpha: number };

function getMainPos(widthRem: number, heightRem: number): CupPos {
  const w = widthRem * PX_PER_REM;
  const h = heightRem * PX_PER_REM;
  return {
    leftPx: SEASON_SCENE_CENTER.xPx - w / 2,
    topPx: SEASON_SCENE_CENTER.yPx - h / 2,
  };
}

function getOrbitPos(
  position: Exclude<SeasonOrbitPosition, "main">,
  widthRem: number,
  heightRem: number,
): CupPos {
  const slot = SEASON_ORBIT_SLOTS[position];
  const w = widthRem * PX_PER_REM;
  const h = heightRem * PX_PER_REM;

  return {
    leftPx: slot.leftPx + (slot.frameWidthPx - w) / 2,
    topPx: slot.topPx + (slot.frameHeightPx - h) / 2,
  };
}

function getCoords(
  position: SeasonOrbitPosition,
  widthRem: number,
  heightRem: number,
): { pos: CupPos; alpha: number } {
  if (position === "main") {
    return { pos: getMainPos(widthRem, heightRem), alpha: 0 };
  }

  return { pos: getOrbitPos(position, widthRem, heightRem), alpha: 1 };
}

function getCupCenter(pos: CupPos, widthRem: number, heightRem: number) {
  const w = widthRem * PX_PER_REM;
  const h = heightRem * PX_PER_REM;
  return {
    x: pos.leftPx + w / 2,
    y: pos.topPx + h / 2,
  };
}

function getPolarState(
  position: SeasonOrbitPosition,
  widthRem: number,
  heightRem: number,
): PolarState {
  const { pos } = getCoords(position, widthRem, heightRem);
  const center = getCupCenter(pos, widthRem, heightRem);
  const angle = Math.atan2(
    center.y - ORBIT_RING_CENTER.yPx,
    center.x - ORBIT_RING_CENTER.xPx,
  );

  if (position === "main") {
    return {
      angle,
      radius: Math.hypot(
        center.x - ORBIT_RING_CENTER.xPx,
        center.y - ORBIT_RING_CENTER.yPx,
      ),
      alpha: 0,
    };
  }

  return {
    angle: ORBIT_SLOT_ANGLES[position],
    radius: ORBIT_RING_RADIUS_PX,
    alpha: 1,
  };
}

/** 시계 반대 방향 각도 차이 (항상 원호를 따라 이동) */
function getCcwAngleDelta(fromAngle: number, toAngle: number) {
  let delta = toAngle - fromAngle;
  if (delta <= 0) {
    delta += Math.PI * 2;
  }
  return delta;
}

function applyOrbitTrailStroke(
  fromActive: number,
  toActive: number,
  t: number,
  trailPath: SVGPathElement | null,
) {
  if (!trailPath) return;

  let bestFromAngle = 0;
  let bestDelta = 0;

  seasonClassItems.forEach((_, seasonIndex) => {
    const fromOrbit = getSeasonOrbitPosition(seasonIndex, fromActive);
    const toOrbit = getSeasonOrbitPosition(seasonIndex, toActive);
    const fromPolar = getPolarState(fromOrbit, ORBIT_CUP_SIZE_REM, ORBIT_CUP_SIZE_REM);
    const toPolar = getPolarState(toOrbit, ORBIT_CUP_SIZE_REM, ORBIT_CUP_SIZE_REM);
    const delta = getCcwAngleDelta(fromPolar.angle, toPolar.angle);

    if (delta > bestDelta) {
      bestDelta = delta;
      bestFromAngle = fromPolar.angle;
    }
  });

  if (bestDelta < 0.05 || t <= 0.001) {
    trailPath.style.opacity = "0";
    return;
  }

  const endAngle = bestFromAngle + bestDelta * t;
  trailPath.setAttribute("d", buildRingArcPath(bestFromAngle, endAngle));
  trailPath.style.opacity = String(Math.sin(t * Math.PI) * 0.95);
}

function interpolatePolarCcw(from: PolarState, to: PolarState, t: number): PolarState {
  const angleDelta = getCcwAngleDelta(from.angle, to.angle);

  return {
    angle: from.angle + angleDelta * t,
    radius: from.radius + (to.radius - from.radius) * t,
    alpha: from.alpha + (to.alpha - from.alpha) * t,
  };
}

function polarToPos(
  polar: PolarState,
  widthRem: number,
  heightRem: number,
): CupPos {
  const cx = ORBIT_RING_CENTER.xPx + Math.cos(polar.angle) * polar.radius;
  const cy = ORBIT_RING_CENTER.yPx + Math.sin(polar.angle) * polar.radius;
  const w = widthRem * PX_PER_REM;
  const h = heightRem * PX_PER_REM;

  return {
    leftPx: cx - w / 2,
    topPx: cy - h / 2,
  };
}

initOrbitSlotAngles();

function getScrollBlend(progress: number) {
  const floatIndex = Math.min(MAX_SEASON_INDEX, progress * MAX_SEASON_INDEX);
  const fromActive = Math.floor(floatIndex);
  const toActive = Math.min(MAX_SEASON_INDEX, fromActive + 1);
  const t = floatIndex - fromActive;

  return { fromActive, toActive, t, floatIndex };
}

function applyScrollProgress(
  progress: number,
  cups: HTMLElement[],
  scenes: HTMLImageElement[],
  trailPath: SVGPathElement | null,
) {
  const { fromActive, toActive, t } = getScrollBlend(progress);

  seasonClassItems.forEach((_, seasonIndex) => {
    const cup = cups[seasonIndex];
    if (!cup) return;

    const fromOrbit = getSeasonOrbitPosition(seasonIndex, fromActive);
    const toOrbit = getSeasonOrbitPosition(seasonIndex, toActive);

    const fromPolar = getPolarState(fromOrbit, ORBIT_CUP_SIZE_REM, ORBIT_CUP_SIZE_REM);
    const toPolar = getPolarState(toOrbit, ORBIT_CUP_SIZE_REM, ORBIT_CUP_SIZE_REM);
    const polar = interpolatePolarCcw(fromPolar, toPolar, t);
    const pos = polarToPos(polar, ORBIT_CUP_SIZE_REM, ORBIT_CUP_SIZE_REM);
    const alpha = polar.alpha;

    gsap.set(cup, {
      left: pxToRem(pos.leftPx),
      top: pxToRem(pos.topPx),
      width: `${ORBIT_CUP_SIZE_REM}rem`,
      height: `${ORBIT_CUP_SIZE_REM}rem`,
      opacity: alpha,
      visibility: alpha < 0.05 ? "hidden" : "visible",
    });
  });

  scenes.forEach((scene, index) => {
    if (!scene) return;

    let opacity = 0;
    let scale = 0.82;

    if (index === fromActive) {
      opacity = 1 - t;
      scale = 1 - 0.18 * t;
    } else if (index === toActive) {
      opacity = t;
      scale = 0.82 + 0.18 * t;
    }

    gsap.set(scene, { opacity, scale, force3D: true });
  });

  applyOrbitTrailStroke(fromActive, toActive, t, trailPath);
}

function SeasonClassListSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const season = seasonClassItems[activeIndex];
  const leadLines = SEASON_SECTION_DESCRIPTION.split("\n");
  const descLines = season.description.split("\n");

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cups = Array.from(section.querySelectorAll<HTMLElement>(".season-scroll__cup"));
    const scenes = Array.from(section.querySelectorAll<HTMLImageElement>(".season-scroll__scene-img"));
    const trailPath = section.querySelector<SVGPathElement>(".season-scroll__orbit-trail");

    if (cups.length !== seasonClassItems.length || scenes.length !== seasonClassItems.length) {
      return;
    }

    const scrollState = { progress: 0 };

    const ctx = gsap.context(() => {
      applyScrollProgress(0, cups, scenes, trailPath);

      gsap.to(scrollState, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(Math.round(window.innerHeight * 3), SCROLL_END)}`,
          scrub: 0.35,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => Math.round(value * MAX_SEASON_INDEX) / MAX_SEASON_INDEX,
            duration: { min: 0.2, max: 0.45 },
            ease: "power3.out",
            inertia: false,
          },
          onUpdate: (self) => {
            scrollState.progress = self.progress;
            applyScrollProgress(self.progress, cups, scenes, trailPath);
            const nextIndex = Math.round(getScrollBlend(self.progress).floatIndex);
            setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
          },
        },
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>(".season-scroll__animate");
    gsap.killTweensOf(targets);
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, ease: TEXT_EASE },
    );
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className={`season-scroll season-scroll--${season.key}`}
      aria-label="사계절 시즌 클래스"
    >
      <img className="season-scroll__bg" src={seasonClassAssets.bg} alt="" aria-hidden="true" />

      <div className="season-scroll__circle" aria-hidden="true" />

      <svg
        className="season-scroll__orbit-trail-svg"
        viewBox="0 0 1920 940"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path className="season-scroll__orbit-trail" stroke={ORBIT_STROKE_COLOR} />
      </svg>

      <div className="season-scroll__orbit" aria-hidden="true">
        {seasonClassItems.map((item) => (
          <div key={item.key} className="season-scroll__cup" data-season={item.key}>
            <img src={item.teaImage} alt="" />
          </div>
        ))}
      </div>

      <div className="season-scroll__subbg" aria-hidden="true">
        <img className="season-scroll__subbg-img" src={seasonClassAssets.subBg} alt="" />
      </div>

      <div className="season-scroll__scene" aria-hidden="true">
        {seasonClassItems.map((item, index) => (
          <img
            key={item.key}
            className={[
              "season-scroll__scene-img",
              index === activeIndex && "is-active",
            ]
              .filter(Boolean)
              .join(" ")}
            src={item.sceneImage}
            alt=""
          />
        ))}
      </div>

      <div className="season-scroll__left">
        <header className="season-scroll__header">
          <div className="season-scroll__intro">
            <h2 className="season-scroll__heading ft-48b ink500">{SEASON_SECTION_TITLE}</h2>
            <p className="season-scroll__lead ft-28r ink500">
              {leadLines.map((line, i) => (
                <span key={`lead-${i}`}>
                  {line}
                  {i < leadLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          <img
            key={`hanja-${season.key}`}
            className="season-scroll__hanja season-scroll__animate"
            src={season.wordImage}
            alt=""
            aria-hidden="true"
          />
        </header>

        <div className="season-scroll__detail">
          <div className="season-scroll__copy-block">
            <div className="season-scroll__copy">
              <h3 className="season-scroll__title ft-48b ink500 season-scroll__animate">
                {season.title}
              </h3>
              <p className="season-scroll__desc ft-28r ink500 season-scroll__animate">
                {descLines.map((line, i) => (
                  <span key={`desc-${season.key}-${i}`} className="season-scroll__desc-line">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <dl className="season-scroll__meta">
              <div className="season-scroll__meta-row season-scroll__animate">
                <dt className="season-scroll__meta-label">
                  <span className="season-scroll__icon season-scroll__icon--tea" aria-hidden="true" />
                  <span className="ft-18b ink500">오늘의 차</span>
                </dt>
                <dd className="ft-18r ink500">{season.todayTea}</dd>
              </div>
              <div className="season-scroll__meta-row season-scroll__animate">
                <dt className="season-scroll__meta-label">
                  <Icon className="season-scroll__icon-svg ink500" name="clock" />
                  <span className="ft-18b ink500">진행 시간</span>
                </dt>
                <dd className="ft-18r ink500">{season.duration}</dd>
              </div>
              <div className="season-scroll__meta-row season-scroll__meta-row--wide season-scroll__animate">
                <dt className="season-scroll__meta-label">
                  <span className="season-scroll__icon season-scroll__icon--hand" aria-hidden="true" />
                  <span className="ft-18b ink500">체험 내용</span>
                </dt>
                <dd className="ft-18r ink500">{season.experience}</dd>
              </div>
              <div className="season-scroll__meta-row season-scroll__animate">
                <dt className="season-scroll__meta-label">
                  <Icon className="season-scroll__icon-svg ink500" name="user" />
                  <span className="ft-18b ink500">정원</span>
                </dt>
                <dd className="ft-18r ink500">{season.capacity}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeasonClassPromoSection() {
  return (
    <section className="season-promo" aria-label={SEASON_CLASS_PROMO.title}>
      <img
        className="season-promo__bg"
        src={seasonClassAssets.promoBg}
        alt=""
        aria-hidden="true"
      />
      <div className="season-promo__shade" aria-hidden="true" />

      <div className="season-promo__content">
        <div className="season-promo__copy">
          <h2 className="season-promo__title ft-48b white">{SEASON_CLASS_PROMO.title}</h2>
          <p className="season-promo__subtitle ft-28r white">{SEASON_CLASS_PROMO.subtitle}</p>
        </div>
        <p className="season-promo__date ft-22r white">{SEASON_CLASS_PROMO.openLabel}</p>
      </div>
    </section>
  );
}

// --- SeasonClassScheduleSection helpers ---

const CARD_STEP_REM = 15.25;
const ACTIVE_ANCHOR_REM = 38.125;

function getCenterIndex(count: number) {
  return count > 0 ? Math.floor((count - 1) / 2) : 0;
}

function SeasonClassScheduleSection() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const monthWrapRef = useRef<HTMLDivElement>(null);

  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [activeIndex, setActiveIndex] = useState(() =>
    getCenterIndex(getScheduleDaysForMonth(today.getFullYear(), today.getMonth(), today).length),
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const scheduleDays = useMemo(
    () => getScheduleDaysForMonth(viewMonth.getFullYear(), viewMonth.getMonth(), today),
    [today, viewMonth],
  );

  const monthLabel = formatScheduleMonthLabel(viewMonth.getFullYear(), viewMonth.getMonth());
  const calendarDates = useMemo(
    () => getCalendarGridDates(viewMonth.getFullYear(), viewMonth.getMonth()),
    [viewMonth],
  );

  const lastIndex = Math.max(0, scheduleDays.length - 1);
  const trackOffsetRem = ACTIVE_ANCHOR_REM - activeIndex * CARD_STEP_REM;
  const thumbOffsetPercent = lastIndex > 0 ? (activeIndex / lastIndex) * 100 : 0;
  const canGoPrevMonth = canGoToPreviousMonth(viewMonth, today);
  const selectedDay = scheduleDays[activeIndex] ?? scheduleDays[0];

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, lastIndex));
  }, [lastIndex]);

  useEffect(() => {
    if (!isCalendarOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!monthWrapRef.current?.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCalendarOpen]);

  const moveMonth = (offset: number) => {
    if (offset < 0 && !canGoPrevMonth) {
      return;
    }

    setViewMonth((prev) => {
      const next = new Date(prev.getFullYear(), prev.getMonth() + offset, 1);
      const nextDays = getScheduleDaysForMonth(next.getFullYear(), next.getMonth(), today);
      setActiveIndex(getCenterIndex(nextDays.length));
      return next;
    });
    setIsCalendarOpen(false);
  };

  const selectDay = useCallback(
    (day: SeasonClassScheduleDay) => {
      const index = scheduleDays.findIndex((item) => isSameDay(item.date, day.date));
      if (index < 0) {
        return;
      }

      setActiveIndex(index);
      setIsCalendarOpen(false);
    },
    [scheduleDays],
  );

  const handleCalendarDateSelect = (date: Date) => {
    if (isBeforeDay(date, today)) {
      return;
    }

    if (!isSameMonthView(viewMonth, date)) {
      return;
    }

    const day = scheduleDays.find((item) => isSameDay(item.date, date));
    if (!day) {
      return;
    }

    selectDay(day);
  };

  const setIndexFromClientX = useCallback(
    (clientX: number) => {
      const track = scrollbarRef.current;
      if (!track) {
        return;
      }

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
    if (!isDragging) {
      return;
    }

    setIndexFromClientX(event.clientX);
  };

  const handleScrollbarPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

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

        <div ref={monthWrapRef} className="season-schedule__month-wrap">
          <div className="season-schedule__month">
            <div className="season-schedule__month-nav">
              <button
                className="season-schedule__month-btn"
                type="button"
                aria-label="이전 달"
                disabled={!canGoPrevMonth}
                onClick={() => moveMonth(-1)}
              >
                <Icon name="chevron-left" />
              </button>
              <span className="season-schedule__month-label">{monthLabel}</span>
              <button
                className="season-schedule__month-btn"
                type="button"
                aria-label="다음 달"
                onClick={() => moveMonth(1)}
              >
                <Icon name="chevron-right" />
              </button>
            </div>
            <button
              className="season-schedule__calendar-btn"
              type="button"
              aria-label="달력 펼치기"
              aria-expanded={isCalendarOpen}
              onClick={() => setIsCalendarOpen((prev) => !prev)}
            >
              <Icon className="season-schedule__calendar-icon ink500" name="calendar" />
            </button>
          </div>

          {isCalendarOpen && (
            <div className="season-schedule__calendar-panel" role="dialog" aria-label={`${monthLabel} 달력`}>
              <div className="season-schedule__calendar-weekdays" aria-hidden="true">
                {SEASON_CLASS_SCHEDULE_WEEKDAYS.map((weekday) => (
                  <span key={weekday} className="season-schedule__calendar-weekday ft-14b ink500">
                    {weekday}
                  </span>
                ))}
              </div>
              <div className="season-schedule__calendar-grid">
                {calendarDates.map((date, index) => {
                  if (!date) {
                    return (
                      <span
                        key={`blank-${index}`}
                        className="season-schedule__calendar-cell season-schedule__calendar-cell--blank"
                        aria-hidden="true"
                      />
                    );
                  }

                  const isPast = isBeforeDay(date, today);
                  const scheduleDay = scheduleDays.find((item) => isSameDay(item.date, date));
                  const isSelectable = Boolean(scheduleDay);
                  const isSelected = selectedDay ? isSameDay(date, selectedDay.date) : false;

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      className={[
                        "season-schedule__calendar-cell",
                        isPast && "season-schedule__calendar-cell--past",
                        isSelectable && "season-schedule__calendar-cell--available",
                        isSelected && "season-schedule__calendar-cell--selected",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      disabled={!isSelectable}
                      aria-label={
                        scheduleDay
                          ? `${date.getDate()}일, 잔여 ${scheduleDay.remainingSeats}석`
                          : `${date.getDate()}일`
                      }
                      onClick={() => handleCalendarDateSelect(date)}
                    >
                      <span className="season-schedule__calendar-day ft-18b">{date.getDate()}</span>
                      {scheduleDay && (
                        <span className="season-schedule__calendar-seats ft-14r deep400">
                          {scheduleDay.remainingSeats}석
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="season-schedule__carousel">
        {scheduleDays.length > 0 ? (
          <>
            <div
              className={[
                "season-schedule__track",
                isDragging && "season-schedule__track--dragging",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ transform: `translateX(${trackOffsetRem}rem)` }}
            >
              {scheduleDays.map((item, index) => {
                const isActive = index === activeIndex;
                const seatDots = getSeatDots(item.remainingSeats);
                const cupImage = getCupImage(item.remainingSeats);

                return (
                  <article
                    key={item.id}
                    className={["season-schedule__card", isActive && "season-schedule__card--active"]
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

                      <img className="season-schedule__cup" src={cupImage} alt="" aria-hidden="true" />

                      <div className="season-schedule__seats">
                        <div className="season-schedule__dots" aria-hidden="true">
                          {seatDots.map((state, dotIndex) => (
                            <span
                              key={`${item.id}-dot-${dotIndex}`}
                              className={["season-schedule__dot", `season-schedule__dot--${state}`].join(" ")}
                            />
                          ))}
                        </div>
                        <p className="season-schedule__remain ft-18r ink500">잔여 {item.remainingSeats}석</p>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>

            <div
              ref={scrollbarRef}
              className={["season-schedule__scrollbar", isDragging && "season-schedule__scrollbar--dragging"]
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
          </>
        ) : (
          <p className="season-schedule__empty ft-22r ink500">이번 달 예약 가능한 일정이 없습니다.</p>
        )}
      </div>
    </section>
  );
}

function SeasonClassGallerySection() {
  return (
    <section className="season-gallery" aria-label={SEASON_CLASS_GALLERY_TITLE}>
      <h2 className="season-gallery__title ft-48b ink500">{SEASON_CLASS_GALLERY_TITLE}</h2>

      <div className="season-gallery__grid">
        {seasonClassGalleryItems.map((item) => {
          const leftRem = pxToRem(item.frame.leftPx - SEASON_CLASS_GALLERY_GRID.leftPx);
          const topRem = pxToRem(item.frame.topPx - SEASON_CLASS_GALLERY_GRID.topPx);
          const widthRem = pxToRem(item.frame.widthPx);
          const heightRem = pxToRem(item.frame.heightPx);

          return (
            <figure
              key={item.id}
              className="season-gallery__item"
              style={{
                left: leftRem,
                top: topRem,
                width: widthRem,
                height: heightRem,
              }}
            >
              <img
                className="season-gallery__img"
                src={item.image}
                alt={item.alt}
                style={
                  item.crop
                    ? {
                        width: `${item.crop.widthPercent}%`,
                        height: `${item.crop.heightPercent}%`,
                        left: `${item.crop.leftPercent}%`,
                        top: `${item.crop.topPercent}%`,
                      }
                    : undefined
                }
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function SeasonClassPage() {
  return (
    <main className="season-class-page">
      <div className="season-class-page__header">
        <Header />
      </div>

      <section
        className="season-class-kv"
        style={{ backgroundImage: `url(${seasonClassAssets.kvBg})` }}
        aria-label="시즌 클래스"
      >
        <div className="season-class-kv__grid">
          <div className="season-class-kv__content">
            <div className="season-class-kv__head">
              <h1 className="season-class-kv__title ft-64b ink500">시즌 클래스</h1>
              <img className="season-class-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
            </div>
            <p className="season-class-kv__description ft-28r ink500">
              계절마다 다른 향기를 따라
              <br />
              새로운 차를 경험합니다.
            </p>
          </div>
        </div>
      </section>

      <SeasonClassListSection />

      <SeasonClassPromoSection />

      <SeasonClassScheduleSection />

      <SeasonClassGallerySection />

      <Footer />
    </main>
  );
}

export default SeasonClassPage;
