import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Icon } from "../../components/common";
import {
  SEASON_CUP_SLOTS,
  SEASON_SCROLL_SNAP,
  SEASON_SECTION_DESCRIPTION,
  SEASON_SECTION_TITLE,
  getSeasonCupSlotIndex,
  seasonClassAssets,
  seasonClassItems,
} from "../../data/seasonClassItems";
import "./SeasonClassListSection.scss";

const HOLD = 0.18;
const ROTATE = 0.42;
const SCROLL_END = 2100;
const TEXT_EASE = "power3.out";
const PX_PER_REM = 16;

function pxToRem(px: number) {
  return `${px / PX_PER_REM}rem`;
}

function nearestSeasonIndex(progress: number) {
  let best = 0;
  let bestDistance = Math.abs(progress - SEASON_SCROLL_SNAP[0]);

  SEASON_SCROLL_SNAP.forEach((snap, index) => {
    const distance = Math.abs(progress - snap);
    if (distance < bestDistance) {
      best = index;
      bestDistance = distance;
    }
  });

  return best;
}

function setCupSlot(cup: HTMLElement, seasonIndex: number, activeIndex: number) {
  const item = seasonClassItems[seasonIndex];
  const slotIndex = getSeasonCupSlotIndex(seasonIndex, activeIndex);

  if (slotIndex < 0) {
    gsap.set(cup, {
      autoAlpha: 0,
      pointerEvents: "none",
    });
    cup.classList.add("is-hidden");
    return;
  }

  const slot = SEASON_CUP_SLOTS[slotIndex];

  cup.classList.remove("is-hidden");
  gsap.set(cup, {
    autoAlpha: 1,
    pointerEvents: "auto",
    left: pxToRem(slot.leftPx),
    top: pxToRem(slot.topPx),
    width: `${item.cupSizeRem}rem`,
    height: `${item.cupSizeRem}rem`,
  });
}

function SeasonClassListSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cupRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const season = seasonClassItems[activeIndex];
  const leadLines = SEASON_SECTION_DESCRIPTION.split("\n");
  const descLines = season.description.split("\n");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const cups = cupRefs.current.filter(Boolean) as HTMLButtonElement[];

    if (!section || cups.length === 0) {
      return;
    }

    const mm = gsap.matchMedia();
    let revertDesktop: (() => void) | undefined;

    mm.add("(min-width: 64rem)", () => {
      const ctx = gsap.context(() => {
        seasonClassItems.forEach((_, seasonIndex) => {
          setCupSlot(cups[seasonIndex], seasonIndex, 0);
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${SCROLL_END}`,
            scrub: 0.08,
            pin: true,
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
              const next = nearestSeasonIndex(self.progress);
              setActiveIndex((prev) => (prev === next ? prev : next));
            },
          },
        });

        timelineRef.current = timeline;
        scrollTriggerRef.current = timeline.scrollTrigger ?? null;

        timeline.addLabel("spring").to({}, { duration: HOLD });

        for (let active = 1; active < seasonClassItems.length; active += 1) {
          let tweenPosition: string | number = ">";

          seasonClassItems.forEach((_, seasonIndex) => {
            const cup = cups[seasonIndex];
            const slotIndex = getSeasonCupSlotIndex(seasonIndex, active);

            if (slotIndex < 0) {
              timeline.to(
                cup,
                {
                  autoAlpha: 0,
                  ease: "power2.inOut",
                  duration: ROTATE,
                  onStart: () => {
                    cup.classList.add("is-hidden");
                  },
                },
                tweenPosition,
              );
            } else {
              const slot = SEASON_CUP_SLOTS[slotIndex];

              timeline.to(
                cup,
                {
                  left: pxToRem(slot.leftPx),
                  top: pxToRem(slot.topPx),
                  autoAlpha: 1,
                  ease: "power2.inOut",
                  duration: ROTATE,
                  onStart: () => {
                    cup.classList.remove("is-hidden");
                  },
                },
                tweenPosition,
              );
            }

            tweenPosition = "<";
          });

          timeline
            .addLabel(seasonClassItems[active].key)
            .to({}, { duration: HOLD });
        }
      }, section);

      revertDesktop = () => ctx.revert();
    });

    mm.add("(max-width: 63.99rem)", () => {
      cups.forEach((cup, seasonIndex) => {
        gsap.set(cup, { clearProps: "left,top,width,height" });
        setCupSlot(cup, seasonIndex, activeIndex);
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      revertDesktop?.();
      timelineRef.current = null;
      scrollTriggerRef.current = null;
      mm.revert();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const targets = section.querySelectorAll<HTMLElement>(".season-scroll__animate");

    gsap.killTweensOf(targets);
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: TEXT_EASE,
      },
    );
  }, [activeIndex]);

  const selectSeason = (index: number) => {
    const timeline = timelineRef.current;
    const st = scrollTriggerRef.current;

    if (timeline && st) {
      const labelTime = timeline.labels[seasonClassItems[index].key];
      if (labelTime !== undefined) {
        const ratio = labelTime / timeline.duration();
        window.scrollTo({ top: st.start + ratio * (st.end - st.start), behavior: "smooth" });
        return;
      }
    }

    setActiveIndex(index);
    const cups = cupRefs.current.filter(Boolean) as HTMLButtonElement[];
    cups.forEach((cup, seasonIndex) => {
      setCupSlot(cup, seasonIndex, index);
    });
  };

  return (
    <section ref={sectionRef} className={`season-scroll season-scroll--${season.key}`} aria-label="사계절 시즌 클래스">
      <img className="season-scroll__bg" src={seasonClassAssets.bg} alt="" aria-hidden="true" />

      <div className="season-scroll__circle" aria-hidden="true" />

      <img className="season-scroll__subbg" src={seasonClassAssets.subBg} alt="" aria-hidden="true" />

      <div className="season-scroll__scene" aria-hidden="true">
        {seasonClassItems.map((item, index) => (
          <img
            key={item.key}
            className={["season-scroll__scene-img", index === activeIndex && "is-active"].filter(Boolean).join(" ")}
            src={item.sceneImage}
            alt=""
          />
        ))}
      </div>

      {seasonClassItems.map((item, index) => (
        <button
          key={item.key}
          ref={(node) => {
            cupRefs.current[index] = node;
          }}
          type="button"
          className={[
            "season-scroll__cup",
            item.key === "winter" && "season-scroll__cup--small",
            index === activeIndex && "is-active",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={`${item.seasonLabel} 클래스`}
          aria-pressed={index === activeIndex}
          onClick={() => selectSeason(index)}
        >
          <img src={item.teaImage} alt="" />
        </button>
      ))}

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
              <h3 className="season-scroll__title ft-48b ink500 season-scroll__animate">{season.title}</h3>
              <p className="season-scroll__desc ft-28r ink500 season-scroll__animate">
                {descLines.map((line, i) => (
                  <span key={`desc-${season.key}-${i}`}>
                    {line}
                    {i < descLines.length - 1 && <br />}
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

      <div className="season-scroll__mobile-tabs" role="tablist" aria-label="계절 선택">
        {seasonClassItems.map((item, index) => (
          <button
            key={`tab-${item.key}`}
            type="button"
            role="tab"
            className={["season-scroll__mobile-tab", index === activeIndex && "is-active"].filter(Boolean).join(" ")}
            aria-selected={index === activeIndex}
            onClick={() => selectSeason(index)}
          >
            <img src={item.teaImage} alt="" />
          </button>
        ))}
      </div>
    </section>
  );
}

export default SeasonClassListSection;
