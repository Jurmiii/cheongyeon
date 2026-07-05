import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Footer, Header, Icon, Button, SubKvSymbolLine } from "../../components/common";
import chaIcon from "../../assets/images/09season-class/cha-icon.svg";
import tryIcon from "../../assets/images/09season-class/try-icon.svg";
import {
  SEASON_CLASS_GALLERY_TITLE,
  getSeasonGalleryItemStyleVars,
  seasonClassGalleryItems,
} from "../../data/seasonClassGallery";
import {
  SEASON_CLASS_PROMO,
  SEASON_SECTION_DESCRIPTION,
  SEASON_SECTION_TITLE,
  getSeasonOrbitPosition,
  getSeasonScrollLayout,
  seasonClassAssets,
  seasonClassItems,
  type SeasonOrbitPosition,
  type SeasonScrollLayoutConfig,
} from "../../data/seasonClassItems";
import {
  SEASON_CLASS_BRANCHES,
  SEASON_CLASS_SCHEDULE_DESCRIPTION,
  SEASON_CLASS_SCHEDULE_DIVIDER,
  SEASON_CLASS_SCHEDULE_TITLE,
  SEASON_CLASS_SCHEDULE_WEEKDAYS,
  canGoToPreviousMonth,
  formatScheduleDateKey,
  formatScheduleDateLabel,
  formatScheduleMonthLabel,
  getCalendarGridDates,
  getCupImage,
  getScheduleDaysForMonth,
  getScheduleTimeSlots,
  getFirstAvailableTimeIndex,
  getSeatDots,
  isBeforeDay,
  isSameDay,
  isSameMonthView,
  startOfDay,
  type SeasonClassBranch,
  type SeasonClassScheduleDay,
} from "../../data/seasonClassSchedule";
import { getActiveSeasonReservationClass } from "../../data/seasonClassReservation";
import type { ReservationBranch } from "../../data/reservationClasses";
import "./SeasonClassPage.scss";

const PX_PER_REM = 16;

function pxToRem(px: number) {
  return `${px / PX_PER_REM}rem`;
}

// --- SeasonClassListSection helpers ---

const SCROLL_END = 3000;
const SCROLL_END_TABLET = 1875; // 750px × 2.5 — 태블릿 섹션 높이 기준
const SEASON_SCROLL_TABLET_MQ = "(max-width: 768px)";
const SEASON_SCROLL_DESKTOP_MQ = "(min-width: 769px)";
const ORBIT_STROKE_COLOR = "#c4ad98";
const TEXT_EASE = "power3.out";
const MAX_SEASON_INDEX = seasonClassItems.length - 1;

type OrbitSlotAngles = Record<Exclude<SeasonOrbitPosition, "main">, number>;

function computeOrbitSlotAngles(layout: SeasonScrollLayoutConfig): OrbitSlotAngles {
  const angles = {} as OrbitSlotAngles;

  (["top", "middle", "bottom"] as const).forEach((slot) => {
    const { pos } = getCoords(layout, slot, layout.cupWidthPx, layout.cupHeightPx);
    const center = getCupCenter(pos, layout.cupWidthPx, layout.cupHeightPx);

    angles[slot] = Math.atan2(
      center.y - layout.orbitRingCenter.yPx,
      center.x - layout.orbitRingCenter.xPx,
    );
  });

  return angles;
}

function buildRingArcPath(
  layout: SeasonScrollLayoutConfig,
  fromAngle: number,
  toAngle: number,
) {
  const r = layout.orbitRingRadiusPx;
  const cx = layout.orbitRingCenter.xPx;
  const cy = layout.orbitRingCenter.yPx;
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

function getMainPos(
  layout: SeasonScrollLayoutConfig,
  widthPx: number,
  heightPx: number,
): CupPos {
  return {
    leftPx: layout.sceneCenter.xPx - widthPx / 2,
    topPx: layout.sceneCenter.yPx - heightPx / 2,
  };
}

function getOrbitPos(
  layout: SeasonScrollLayoutConfig,
  position: Exclude<SeasonOrbitPosition, "main">,
  widthPx: number,
  heightPx: number,
): CupPos {
  const slot = layout.orbitSlots[position];

  return {
    leftPx: slot.leftPx + (slot.frameWidthPx - widthPx) / 2,
    topPx: slot.topPx + (slot.frameHeightPx - heightPx) / 2,
  };
}

function getCoords(
  layout: SeasonScrollLayoutConfig,
  position: SeasonOrbitPosition,
  widthPx: number,
  heightPx: number,
): { pos: CupPos; alpha: number } {
  if (position === "main") {
    return { pos: getMainPos(layout, widthPx, heightPx), alpha: 0 };
  }

  return { pos: getOrbitPos(layout, position, widthPx, heightPx), alpha: 1 };
}

function getCupCenter(pos: CupPos, widthPx: number, heightPx: number) {
  return {
    x: pos.leftPx + widthPx / 2,
    y: pos.topPx + heightPx / 2,
  };
}

function getPolarState(
  layout: SeasonScrollLayoutConfig,
  slotAngles: OrbitSlotAngles,
  position: SeasonOrbitPosition,
  widthPx: number,
  heightPx: number,
): PolarState {
  const { pos } = getCoords(layout, position, widthPx, heightPx);
  const center = getCupCenter(pos, widthPx, heightPx);
  const angle = Math.atan2(
    center.y - layout.orbitRingCenter.yPx,
    center.x - layout.orbitRingCenter.xPx,
  );

  if (position === "main") {
    return {
      angle,
      radius: Math.hypot(
        center.x - layout.orbitRingCenter.xPx,
        center.y - layout.orbitRingCenter.yPx,
      ),
      alpha: 0,
    };
  }

  return {
    angle: slotAngles[position],
    radius: layout.orbitRingRadiusPx,
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
  layout: SeasonScrollLayoutConfig,
  slotAngles: OrbitSlotAngles,
  fromActive: number,
  toActive: number,
  t: number,
  trailPath: SVGPathElement | null,
) {
  if (!trailPath) return;

  let bestFromAngle = 0;
  let bestDelta = 0;
  const { cupWidthPx, cupHeightPx } = layout;

  seasonClassItems.forEach((_, seasonIndex) => {
    const fromOrbit = getSeasonOrbitPosition(seasonIndex, fromActive);
    const toOrbit = getSeasonOrbitPosition(seasonIndex, toActive);
    const fromPolar = getPolarState(layout, slotAngles, fromOrbit, cupWidthPx, cupHeightPx);
    const toPolar = getPolarState(layout, slotAngles, toOrbit, cupWidthPx, cupHeightPx);
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
  trailPath.setAttribute("d", buildRingArcPath(layout, bestFromAngle, endAngle));
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
  layout: SeasonScrollLayoutConfig,
  polar: PolarState,
  widthPx: number,
  heightPx: number,
): CupPos {
  const cx = layout.orbitRingCenter.xPx + Math.cos(polar.angle) * polar.radius;
  const cy = layout.orbitRingCenter.yPx + Math.sin(polar.angle) * polar.radius;

  return {
    leftPx: cx - widthPx / 2,
    topPx: cy - heightPx / 2,
  };
}

function applyScrollProgress(
  progress: number,
  cups: HTMLElement[],
  scenes: HTMLImageElement[],
  trailPath: SVGPathElement | null,
  layout: SeasonScrollLayoutConfig,
  slotAngles: OrbitSlotAngles,
) {
  const { fromActive, toActive, t } = getScrollBlend(progress);
  const { cupWidthPx, cupHeightPx } = layout;

  seasonClassItems.forEach((_, seasonIndex) => {
    const cup = cups[seasonIndex];
    if (!cup) return;

    const fromOrbit = getSeasonOrbitPosition(seasonIndex, fromActive);
    const toOrbit = getSeasonOrbitPosition(seasonIndex, toActive);

    const fromPolar = getPolarState(layout, slotAngles, fromOrbit, cupWidthPx, cupHeightPx);
    const toPolar = getPolarState(layout, slotAngles, toOrbit, cupWidthPx, cupHeightPx);
    const polar = interpolatePolarCcw(fromPolar, toPolar, t);
    const pos = polarToPos(layout, polar, cupWidthPx, cupHeightPx);
    const alpha = polar.alpha;

    gsap.set(cup, {
      left: pxToRem(pos.leftPx),
      top: pxToRem(pos.topPx),
      width: pxToRem(cupWidthPx),
      height: pxToRem(cupHeightPx),
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

  applyOrbitTrailStroke(layout, slotAngles, fromActive, toActive, t, trailPath);
}

function getScrollBlend(progress: number) {
  const floatIndex = Math.min(MAX_SEASON_INDEX, progress * MAX_SEASON_INDEX);
  const fromActive = Math.floor(floatIndex);
  const toActive = Math.min(MAX_SEASON_INDEX, fromActive + 1);
  const t = floatIndex - fromActive;

  return { fromActive, toActive, t, floatIndex };
}

function getDesktopScrollEnd() {
  return Math.max(Math.round(window.innerHeight * 3), SCROLL_END);
}

function getTabletScrollEnd(section: HTMLElement) {
  const sectionHeight = section.offsetHeight;

  return Math.max(
    Math.round(window.innerHeight * 1.75),
    Math.round(sectionHeight * 2.5),
    SCROLL_END_TABLET,
  );
}

function SeasonClassListSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollLayoutRef = useRef(getSeasonScrollLayout(window.innerWidth));
  const layoutWidthRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const applyLayoutRef = useRef<(() => void) | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollViewBox, setScrollViewBox] = useState(() => ({
    widthPx: scrollLayoutRef.current.viewWidthPx,
    heightPx: scrollLayoutRef.current.viewHeightPx,
  }));

  const season = seasonClassItems[activeIndex];
  const leadLines = SEASON_SECTION_DESCRIPTION.split("\n");
  const descLines = season.description.split("\n");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const updateLayout = () => {
      const width = section.clientWidth || window.innerWidth;
      if (Math.abs(width - layoutWidthRef.current) < 1) {
        return;
      }

      layoutWidthRef.current = width;
      scrollLayoutRef.current = getSeasonScrollLayout(width);
      setScrollViewBox({
        widthPx: scrollLayoutRef.current.viewWidthPx,
        heightPx: scrollLayoutRef.current.viewHeightPx,
      });
      applyLayoutRef.current?.();
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(section);
    window.addEventListener("resize", updateLayout);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pinEl = pinRef.current;
    const section = sectionRef.current;
    if (!pinEl || !section) return;

    const cups = Array.from(section.querySelectorAll<HTMLElement>(".season-scroll__cup"));
    const scenes = Array.from(section.querySelectorAll<HTMLImageElement>(".season-scroll__scene-img"));
    const trailPath = section.querySelector<SVGPathElement>(".season-scroll__orbit-trail");

    if (cups.length !== seasonClassItems.length || scenes.length !== seasonClassItems.length) {
      return;
    }

    const scrollState = { progress: 0 };

    const runApply = (progress: number) => {
      scrollProgressRef.current = progress;
      const layout = scrollLayoutRef.current;
      const slotAngles = computeOrbitSlotAngles(layout);
      applyScrollProgress(progress, cups, scenes, trailPath, layout, slotAngles);
    };

    const getStableIndex = (progress: number) =>
      Math.min(MAX_SEASON_INDEX, Math.max(0, Math.round(progress * MAX_SEASON_INDEX)));

    const syncScrollTrackHeight = (getScrollEnd: () => number) => {
      const scrollEnd = getScrollEnd();
      pinEl.style.height = `${section.offsetHeight + scrollEnd}px`;
    };

    const createSeasonScrollTrigger = (getScrollEnd: () => number) => {
      let currentIndex = 0;

      runApply(0);
      syncScrollTrackHeight(getScrollEnd);

      const trigger = ScrollTrigger.create({
        trigger: pinEl,
        start: "top top",
        end: () => `+=${getScrollEnd()}`,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (value) => getStableIndex(value) / MAX_SEASON_INDEX,
          delay: 0.06,
          duration: { min: 0.2, max: 0.45 },
          ease: "power3.out",
          inertia: false,
        },
        onRefresh: () => syncScrollTrackHeight(getScrollEnd),
        onUpdate: (self) => {
          const nextIndex = getStableIndex(self.progress);
          if (nextIndex === currentIndex) {
            return;
          }

          currentIndex = nextIndex;
          setActiveIndex(nextIndex);
          gsap.to(scrollState, {
            progress: nextIndex / MAX_SEASON_INDEX,
            duration: 0.9,
            ease: "power3.inOut",
            overwrite: "auto",
            onUpdate: () => runApply(scrollState.progress),
          });
        },
      });

      applyLayoutRef.current = () => {
        runApply(scrollProgressRef.current);
        syncScrollTrackHeight(getScrollEnd);
        trigger.refresh();
      };

      return trigger;
    };

    const clearScrollTrackHeight = () => {
      pinEl.style.height = "";
    };

    const mm = gsap.matchMedia();

    mm.add(SEASON_SCROLL_DESKTOP_MQ, () => {
      const trigger = createSeasonScrollTrigger(getDesktopScrollEnd);
      requestAnimationFrame(() => ScrollTrigger.refresh(true));

      return () => {
        trigger.kill();
        clearScrollTrackHeight();
        if (applyLayoutRef.current) {
          applyLayoutRef.current = null;
        }
      };
    });

    mm.add(SEASON_SCROLL_TABLET_MQ, () => {
      const trigger = createSeasonScrollTrigger(() => getTabletScrollEnd(section));
      requestAnimationFrame(() => ScrollTrigger.refresh(true));

      return () => {
        trigger.kill();
        clearScrollTrackHeight();
        if (applyLayoutRef.current) {
          applyLayoutRef.current = null;
        }
      };
    });

    const refresh = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      applyLayoutRef.current = null;
      clearScrollTrackHeight();
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      mm.revert();
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
    <div ref={pinRef} className="season-scroll-pin">
      <section
        ref={sectionRef}
        className={`season-scroll season-scroll--${season.key}`}
        aria-label="사계절 시즌 클래스"
      >
      <img className="season-scroll__bg" src={seasonClassAssets.bg} alt="" aria-hidden="true" />

      <div className="season-scroll__visual" aria-hidden="true">
        <img
          className="season-scroll__ellipse"
          src={seasonClassAssets.ellipse}
          alt=""
          aria-hidden="true"
        />

        <svg
          className="season-scroll__orbit-trail-svg"
          viewBox={`0 0 ${scrollViewBox.widthPx} ${scrollViewBox.heightPx}`}
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
          <img
            className="season-scroll__subbg-img season-scroll__subbg-img--desktop"
            src={seasonClassAssets.subBg}
            alt=""
          />
          <img
            className="season-scroll__subbg-img season-scroll__subbg-img--tablet"
            src={seasonClassAssets.subBgTablet}
            alt=""
          />
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
                  <img className="season-scroll__icon-img" src={chaIcon} alt="" aria-hidden="true" />
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
                  <img className="season-scroll__icon-img" src={tryIcon} alt="" aria-hidden="true" />
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
    </div>
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

// --- SeasonClassScheduleSection ---

type ScheduleFilter = "branch" | "date" | null;

function SeasonClassScheduleSection() {
  const navigate = useNavigate();
  const today = useMemo(() => startOfDay(new Date()), []);
  const filtersWrapRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState(() => today);
  const [activeTimeIndex, setActiveTimeIndex] = useState(0);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [openFilter, setOpenFilter] = useState<ScheduleFilter>(null);
  const [selectedBranch, setSelectedBranch] = useState<SeasonClassBranch>(SEASON_CLASS_BRANCHES[0]);

  const seasonReservationClass = useMemo(
    () => getActiveSeasonReservationClass(selectedDate),
    [selectedDate],
  );

  const allTimeSlots = useMemo(
    () =>
      getScheduleTimeSlots(
        selectedDate,
        selectedBranch.shortLabel as ReservationBranch,
        seasonReservationClass.title,
      ),
    [selectedDate, selectedBranch.shortLabel, seasonReservationClass.title],
  );

  const monthLabel = formatScheduleMonthLabel(calendarMonth.getFullYear(), calendarMonth.getMonth());
  const dateLabel = formatScheduleDateLabel(selectedDate);
  const calendarDates = useMemo(
    () => getCalendarGridDates(calendarMonth.getFullYear(), calendarMonth.getMonth()),
    [calendarMonth],
  );

  const canGoPrevMonth = canGoToPreviousMonth(calendarMonth, today);

  useEffect(() => {
    const slots = getScheduleTimeSlots(
      selectedDate,
      selectedBranch.shortLabel as ReservationBranch,
      seasonReservationClass.title,
    );
    setActiveTimeIndex(getFirstAvailableTimeIndex(slots));
  }, [selectedDate, selectedBranch.shortLabel, seasonReservationClass.title]);

  useEffect(() => {
    setCalendarMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedDate]);

  const selectDate = useCallback(
    (date: Date) => {
      if (isBeforeDay(date, today)) {
        return;
      }

      setSelectedDate(startOfDay(date));
    },
    [today],
  );

  const handleCardClick = useCallback(
    (index: number) => {
      const slot = allTimeSlots[index];
      if (!slot || slot.isPast) {
        return;
      }

      setActiveTimeIndex(index);
    },
    [allTimeSlots],
  );

  const handleReserveClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      const slot = allTimeSlots[activeTimeIndex];
      if (!slot || slot.isPast) {
        return;
      }

      const params = new URLSearchParams({
        branch: selectedBranch.shortLabel,
        date: formatScheduleDateKey(selectedDate),
        time: slot.time,
        classId: String(seasonReservationClass.id),
      });

      navigate(`/reservation?${params.toString()}`);
    },
    [
      activeTimeIndex,
      allTimeSlots,
      navigate,
      seasonReservationClass.id,
      selectedBranch.shortLabel,
      selectedDate,
    ],
  );

  useEffect(() => {
    if (!openFilter) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!filtersWrapRef.current?.contains(event.target as Node)) {
        setOpenFilter(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenFilter(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openFilter]);

  const toggleFilter = useCallback((filter: Exclude<ScheduleFilter, null>) => {
    setOpenFilter((prev) => (prev === filter ? null : filter));
  }, []);

  const changeCalendarMonth = (offset: number) => {
    const nextMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + offset, 1);
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    if (offset < 0 && nextMonth.getTime() < currentMonthStart.getTime()) {
      return;
    }

    setCalendarMonth(nextMonth);
  };

  const selectDay = useCallback(
    (day: SeasonClassScheduleDay) => {
      if (day.isPast) {
        return;
      }

      selectDate(day.date);
      setOpenFilter(null);
    },
    [selectDate],
  );

  const handleBranchSelect = (branch: SeasonClassBranch) => {
    setSelectedBranch(branch);
    setOpenFilter(null);
  };

  const handleCalendarDateSelect = (date: Date) => {
    if (isBeforeDay(date, today)) {
      return;
    }

    if (!isSameMonthView(calendarMonth, date)) {
      return;
    }

    const monthDays = getScheduleDaysForMonth(date.getFullYear(), date.getMonth(), today);
    const day = monthDays.find((item) => isSameDay(item.date, date));
    if (!day) {
      return;
    }

    selectDay(day);
  };

  return (
    <section className="season-schedule" aria-label={SEASON_CLASS_SCHEDULE_TITLE}>
      <header className="season-schedule__header">
        <div className="season-schedule__intro">
          <h2 className="season-schedule__title ft-48b ink500">{SEASON_CLASS_SCHEDULE_TITLE}</h2>
          <p className="season-schedule__desc ft-20r ink500">{SEASON_CLASS_SCHEDULE_DESCRIPTION}</p>

          <div ref={filtersWrapRef} className="season-schedule__filters-wrap">
          <div className="season-schedule__filters">
            <div className="season-schedule__filter-item">
              <button
                className={[
                  "season-schedule__filter-tab",
                  openFilter === "branch" && "season-schedule__filter-tab--open",
                ]
                  .filter(Boolean)
                  .join(" ")}
                type="button"
                aria-expanded={openFilter === "branch"}
                aria-haspopup="listbox"
                onClick={() => toggleFilter("branch")}
              >
                <span className="season-schedule__filter-label">{selectedBranch.shortLabel}</span>
                <Icon className="season-schedule__filter-icon" name="angle-down" aria-hidden="true" />
              </button>

              {openFilter === "branch" && (
                <div
                  className="season-schedule__filter-panel season-schedule__filter-panel--branch"
                  role="listbox"
                  aria-label="지점 선택"
                >
                  {SEASON_CLASS_BRANCHES.map((branch) => {
                    const isSelected = branch.id === selectedBranch.id;

                    return (
                      <button
                        key={branch.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={[
                          "season-schedule__branch-option",
                          isSelected && "season-schedule__branch-option--active",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => handleBranchSelect(branch)}
                      >
                        <span className="season-schedule__branch-name ft-18b ink500">{branch.name}</span>
                        <span className="season-schedule__branch-address ft-14r ink300">{branch.address}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="season-schedule__filter-item">
              <button
                className={[
                  "season-schedule__filter-tab",
                  openFilter === "date" && "season-schedule__filter-tab--open",
                ]
                  .filter(Boolean)
                  .join(" ")}
                type="button"
                aria-expanded={openFilter === "date"}
                aria-haspopup="dialog"
                onClick={() => toggleFilter("date")}
              >
                <span className="season-schedule__filter-label">{dateLabel}</span>
                <Icon className="season-schedule__filter-icon" name="angle-down" aria-hidden="true" />
              </button>

              {openFilter === "date" && (
                <div
                  className="season-schedule__filter-panel season-schedule__filter-panel--date season-schedule__calendar-panel"
                  role="dialog"
                  aria-label={`${monthLabel} 달력`}
                >
              <div className="season-schedule__calendar-head">
                <button
                  className="season-schedule__calendar-nav-btn"
                  type="button"
                  aria-label="이전 달"
                  disabled={!canGoPrevMonth}
                  onClick={() => changeCalendarMonth(-1)}
                >
                  <Icon name="chevron-left" />
                </button>
                <span className="season-schedule__calendar-month">{monthLabel}</span>
                <button
                  className="season-schedule__calendar-nav-btn"
                  type="button"
                  aria-label="다음 달"
                  onClick={() => changeCalendarMonth(1)}
                >
                  <Icon name="chevron-right" />
                </button>
              </div>

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
                  const scheduleDay = getScheduleDaysForMonth(
                    date.getFullYear(),
                    date.getMonth(),
                    today,
                  ).find((item) => isSameDay(item.date, date));
                  const isSelectable = Boolean(scheduleDay && !scheduleDay.isPast);
                  const isSelected = isSameDay(date, selectedDate);

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
                      aria-label={`${date.getDate()}일`}
                      onClick={() => handleCalendarDateSelect(date)}
                    >
                      <span className="season-schedule__calendar-day ft-18b">{date.getDate()}</span>
                    </button>
                  );
                })}
              </div>
            </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </header>

      <div className="season-schedule__carousel" aria-label="클래스 시간 선택">
        {allTimeSlots.length > 0 ? (
          <div className="season-schedule__track">
            {allTimeSlots.map((item, index) => {
              const isActive = index === activeTimeIndex;
              const isPast = item.isPast;
              const showReserveButton = isActive && !isPast;
              const seatDots = getSeatDots(item.remainingSeats);
              const cupImage = getCupImage(isPast ? 1 : item.remainingSeats);

              return (
                <article
                  key={item.id}
                  className={[
                    "season-schedule__card",
                    isActive && "season-schedule__card--active",
                    showReserveButton && "season-schedule__card--reserve",
                    isPast && "season-schedule__card--past",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div
                    className={[
                      "season-schedule__card-surface",
                      isActive && "season-schedule__card-surface--active",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div
                      className="season-schedule__card-body"
                      role="button"
                      tabIndex={isPast ? -1 : 0}
                      aria-disabled={isPast}
                      aria-label={`${item.time}, 잔여 ${item.remainingSeats}석`}
                      aria-current={isActive ? "time" : undefined}
                      onKeyDown={(event) => {
                        if (isPast) {
                          return;
                        }

                        if (event.key !== "Enter" && event.key !== " ") {
                          return;
                        }

                        event.preventDefault();
                        handleCardClick(index);
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCardClick(index);
                      }}
                    >
                      <div className="season-schedule__card-head">
                        <p className="season-schedule__time-label ft-32b deep500">{item.time}</p>
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
                        <p className="season-schedule__remain ft-18r ink500">
                          {isPast ? "마감" : `잔여 ${item.remainingSeats}석`}
                        </p>
                      </div>
                    </div>

                    {showReserveButton ? (
                      <Button
                        className="season-schedule__reserve-btn"
                        variant="btn6"
                        type="button"
                        icon={<Icon className="season-schedule__reserve-icon" name="arrow-right" />}
                        iconPosition="right"
                        onClick={handleReserveClick}
                      >
                        예약하기
                      </Button>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="season-schedule__empty ft-22r ink500">선택한 날짜에 예약 가능한 시간이 없습니다.</p>
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
        {seasonClassGalleryItems.map((item) => (
          <figure
            key={item.id}
            className={[
              "season-gallery__item",
              item.hideOnTablet && "season-gallery__item--hide-tablet",
            ]
              .filter(Boolean)
              .join(" ")}
            style={getSeasonGalleryItemStyleVars(item)}
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
        ))}
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
              <SubKvSymbolLine blockClass="season-class-kv" tone="responsive" />
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
