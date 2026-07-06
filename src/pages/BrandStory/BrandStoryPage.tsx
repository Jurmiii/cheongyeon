import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, SubKvSymbolLine } from "../../components/common";
import "./BrandStoryPage.scss";

// About 섹션 배경 이미지 — 교체 시 아래 import 경로만 수정하세요.
import brandStoryAboutImage from "../../assets/images/02brand-story/brand-2.webp";

// 청연에 담긴 이야기 카드 이미지 — 교체 시 아래 import 경로만 수정하세요.
import brandMeaningImage1 from "../../assets/images/02brand-story/brand-3_1.webp";
import brandMeaningImage2 from "../../assets/images/02brand-story/brand-3_2.webp";
import brandMeaningImage3 from "../../assets/images/02brand-story/brand-3_3.webp";

// 카드 hover 마스크 이미지 — 교체 시 아래 import 경로만 수정하세요.
import meaningHoverImage from "../../assets/images/02brand-story/hover.webp";

const brandStoryMeaningCards = [
  {
    id: 1,
    image: brandMeaningImage1,
    number: "01",
    hanja: "靑",
    lines: ["차가 시작되는", "생명의 시간"],
  },
  {
    id: 2,
    image: brandMeaningImage2,
    number: "02",
    hanja: "淵",
    lines: ["머무름이", "깊어지는 시간"],
  },
  {
    id: 3,
    image: brandMeaningImage3,
    number: "03",
    hanja: "靑淵",
    lines: ["자연의 시간과", "깊이를 담은 이름"],
  },
] as const;

// 청연의 다섯 가지 철학 — 교체 시 아래 import 경로만 수정하세요.
import philosophyBackgroundImage from "../../assets/images/02brand-story/five.webp";
import rollTopImage from "../../assets/images/02brand-story/roll-top.webp";
import rollBottomImage from "../../assets/images/02brand-story/roll-bottom.webp";
import rollBodyImage1 from "../../assets/images/02brand-story/roll-body-1.webp";
import rollBodyImage2 from "../../assets/images/02brand-story/roll-body-2.webp";
import rollBodyImage3 from "../../assets/images/02brand-story/roll-body-3.webp";
import rollBodyImage4 from "../../assets/images/02brand-story/roll-body-4.webp";
import rollBodyImage5 from "../../assets/images/02brand-story/roll-body-5.webp";
import characterImage1 from "../../assets/images/02brand-story/cc-1.webp";
import characterImage2 from "../../assets/images/02brand-story/cc-2.webp";
import characterImage3 from "../../assets/images/02brand-story/cc-3.webp";
import characterImage4 from "../../assets/images/02brand-story/cc-4.webp";
import characterImage5 from "../../assets/images/02brand-story/cc-5.webp";
import compactHanjaImage1 from "../../assets/images/02brand-story/cc-ta1.webp";
import compactHanjaImage2 from "../../assets/images/02brand-story/cc-ta2.webp";
import compactHanjaImage3 from "../../assets/images/02brand-story/cc-ta3.webp";
import compactHanjaImage4 from "../../assets/images/02brand-story/cc-ta4.webp";
import compactHanjaImage5 from "../../assets/images/02brand-story/cc-ta5.webp";
import horizontalBodyImage1 from "../../assets/images/02brand-story/p-bg1.webp";
import horizontalBodyImage2 from "../../assets/images/02brand-story/p-bg2.webp";
import horizontalBodyImage3 from "../../assets/images/02brand-story/p-bg3.webp";
import horizontalBodyImage4 from "../../assets/images/02brand-story/p-bg4.webp";
import horizontalBodyImage5 from "../../assets/images/02brand-story/p-bg5.webp";
import compactRollImage from "../../assets/images/02brand-story/roll.webp";

const philosophyItems = [
  {
    id: 1,
    bodyImage: rollBodyImage1,
    characterImage: characterImage1,
    compactHanjaImage: compactHanjaImage1,
    horizontalBodyImage: horizontalBodyImage1,
    subtitle: "고요함",
    lines: ["차를 마시는 것은", "잠시 멈추는 일, 고요한", "마음이 좋은 차를 만듭니다."],
    horizontalDesc: "차를 마시는 것은 잠시 멈추는 일, 고요한 마음이 좋은 차를 만듭니다.",
    horizontalDescLines: ["차를 마시는 것은", "잠시 멈추는 일, 고요한 마음이", "좋은 차를 만듭니다."],
    mobileHorizontalDescLines: ["차를 마시는 것은", "잠시 멈추는 일, 고요한 마음이", "좋은 차를 만듭니다."],
  },
  {
    id: 2,
    bodyImage: rollBodyImage2,
    characterImage: characterImage2,
    compactHanjaImage: compactHanjaImage2,
    horizontalBodyImage: horizontalBodyImage2,
    subtitle: "기다림",
    lines: ["좋은 차는 서두르지", "않습니다. 자연의 시간이", "맡기고 충분히 기다립니다."],
    horizontalDesc: "좋은 차는 서두르지 않습니다. 자연의 시간이 맡기고 충분히 기다립니다.",
    horizontalDescLines: ["좋은 차는 서두르지 않습니다.", "자연의 시간이 맡기고", "충분히 기다립니다."],
  },
  {
    id: 3,
    bodyImage: rollBodyImage3,
    characterImage: characterImage3,
    compactHanjaImage: compactHanjaImage3,
    horizontalBodyImage: horizontalBodyImage3,
    subtitle: "자연",
    lines: ["자연에서 온 그대로를", "담습니다. 계절과 땅의", "흐름을 거스르지 않습니다."],
    horizontalDesc: "자연에서 온 그대로를 담습니다. 계절과 땅의 흐름을 거스르지 않습니다.",
    horizontalDescLines: ["자연에서 온 그대로를 담습니다.", "계절과 땅의 흐름을", "거스르지 않습니다."],
  },
  {
    id: 4,
    bodyImage: rollBodyImage4,
    characterImage: characterImage4,
    compactHanjaImage: compactHanjaImage4,
    horizontalBodyImage: horizontalBodyImage4,
    subtitle: "인연",
    lines: ["차는 사람과 사람을", "이어줍니다. 스쳐가는", "인연도 소중히 생각합니다."],
    horizontalDesc: "차는 사람과 사람을 이어줍니다. 스쳐가는 인연도 소중히 생각합니다.",
    horizontalDescLines: ["차는 사람과 사람을 이어줍니다.", "스쳐가는 인연도 소중히 생각합니다."],
    mobileHorizontalDescLines: ["차는 사람과 사람을 이어줍니다.", "스쳐가는 인연도", "소중히 생각합니다."],
  },
  {
    id: 5,
    bodyImage: rollBodyImage5,
    characterImage: characterImage5,
    compactHanjaImage: compactHanjaImage5,
    horizontalBodyImage: horizontalBodyImage5,
    subtitle: "여운",
    lines: ["한 잔의 차는 마음에 오래", "남는 여운이 됩니다. 그", "여운이 일상이 됩니다."],
    horizontalDesc: "한 잔의 차는 마음에 오래 남는 여운이 됩니다. 그 여운이 일상이 됩니다.",
    horizontalDescLines: ["한 잔의 차는 마음에", "오래 남는 여운이 됩니다.", "그 여운이 일상이 됩니다."],
  },
] as const;

// 차를 만드는 사람들 — 교체 시 아래 import 경로만 수정하세요.
import peopleBackgroundImage from "../../assets/images/02brand-story/branb-4-bg.webp";
import peopleCardImage1 from "../../assets/images/02brand-story/brand-4-1.webp";
import peopleCardImage2 from "../../assets/images/02brand-story/brand-4-2.webp";
import peopleCardImage3 from "../../assets/images/02brand-story/brand-4-3.webp";

const peopleCards = [
  {
    id: 1,
    image: peopleCardImage1,
    title: "재배",
    description: "차가 자라는 시간을 기다립니다.",
  },
  {
    id: 2,
    image: peopleCardImage2,
    title: "제다",
    description: "전통 방식으로 차를 덖습니다.",
    imagePosition: "center 60%",
  },
  {
    id: 3,
    image: peopleCardImage3,
    title: "숙성",
    description: "시간이 향이 되기를 기다립니다.",
    imagePosition: "center 60%",
  },
] as const;

// 청연이 전하는 시간 — 교체 시 아래 import 경로만 수정하세요.
import brandStoryTimeImage from "../../assets/images/02brand-story/brand-5.webp";
import lastBg from "../../assets/images/02brand-story/last-bg.webp";
import logoWhite from "../../assets/images/00header-footer/logo-white.svg";

const brandStoryTimeDescParagraphs = [
  ["차를 우리는 순간 흩어졌던 마음은", "천천히 가라앉습니다."],
  ["청연은 바쁜 하루 속 잠시 멈추어", "머무는 시간을 제안합니다."],
  ["한 잔의 차가 전하는 온기와 여백으로", "편안한 쉼을 경험해보세요."],
] as const;

const brandStoryTimeMobileDescLines = [
  "차를 우리는 순간 흩어졌던 마음은",
  "천천히 가라앉습니다. 청연은 바쁜 하루 속",
  "잠시 멈추어 머무는 시간을 제안합니다. 한 잔의 차가",
  "전하는 온기와 여백으로 편안한 쉼을 경험해보세요.",
] as const;

const ROLL_WIDTH_REM = 16.375;
const ROLL_BODY_HEIGHT_REM = ROLL_WIDTH_REM * (709 / 262);
const ROLL_BOTTOM_HEIGHT_REM = ROLL_WIDTH_REM * (16 / 262);
const ROLL_BOTTOM_OVERLAP_REM = 0.5;
const ROLL_UNROLL_HEIGHT_REM = ROLL_BODY_HEIGHT_REM + ROLL_BOTTOM_HEIGHT_REM - ROLL_BOTTOM_OVERLAP_REM;

function getRollUnrollHeightPx(scroll: HTMLElement) {
  const bodyFrame = scroll.querySelector<HTMLElement>(".brand-story-philosophy__roll-body-frame");
  const rollBottom = scroll.querySelector<HTMLElement>(".brand-story-philosophy__roll-bottom");
  const bodyHeight = bodyFrame?.getBoundingClientRect().height ?? 0;
  const bottomHeight = rollBottom?.getBoundingClientRect().height ?? 0;

  if (bodyHeight > 0 && bottomHeight > 0) {
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return bodyHeight + bottomHeight - ROLL_BOTTOM_OVERLAP_REM * rootFontSize;
  }

  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return ROLL_UNROLL_HEIGHT_REM * rootFontSize;
}

function BrandStoryPage() {
  const philosophySectionRef = useRef<HTMLElement>(null);
  const scrollRefs = useRef<(HTMLElement | null)[]>([]);
  const horizontalBodyWrapRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let context: gsap.Context | null = null;
    let philosophyMedia: gsap.MatchMedia | null = null;

    const initPhilosophyAnimation = () => {
      context?.revert();
      philosophyMedia?.revert();

      philosophyMedia = gsap.matchMedia();

      philosophyMedia.add("(min-width: 64.0625rem)", () => {
        context = gsap.context(() => {
          const section = philosophySectionRef.current;

          if (!section) {
            return;
          }

          const scrolls = scrollRefs.current.filter(Boolean) as HTMLElement[];

          if (scrolls.length === 0) {
            return;
          }

          const resetScrollState = () => {
            scrolls.forEach((scroll) => {
              const rollTop = scroll.querySelector<HTMLElement>(".brand-story-philosophy__roll-top");
              const bodyWrap = scroll.querySelector<HTMLElement>(".brand-story-philosophy__roll-body-wrap");

              if (!rollTop || !bodyWrap) {
                return;
              }

              gsap.set(rollTop, { autoAlpha: 1 });
              gsap.set(bodyWrap, { height: 0 });
            });
          };

          resetScrollState();

          const timeline = gsap.timeline({
            paused: true,
          });

          scrolls.forEach((scroll, index) => {
            const bodyWrap = scroll.querySelector<HTMLElement>(".brand-story-philosophy__roll-body-wrap");

            if (!bodyWrap) {
              return;
            }

            const offset = index * 0.2;
            const unrollHeight = getRollUnrollHeightPx(scroll);

            timeline.fromTo(
              bodyWrap,
              { height: 0 },
              { height: unrollHeight, duration: 1.5, ease: "power2.inOut" },
              offset,
            );
          });

          const triggerTarget = section;
          let hasLeftSection = true;
          let sectionOverlapsViewport = false;

          const isSectionFullyOutside = () => {
            const rect = triggerTarget.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            return rect.bottom <= 0 || rect.top >= viewportHeight;
          };

          const syncSectionPresence = () => {
            const overlapsViewport = !isSectionFullyOutside();

            if (sectionOverlapsViewport && !overlapsViewport) {
              hasLeftSection = true;
              timeline.pause(0);
              resetScrollState();
            }

            if (!sectionOverlapsViewport && overlapsViewport && hasLeftSection && isRolledSectionReached()) {
              playUnroll();
            }

            sectionOverlapsViewport = overlapsViewport;
          };

          const playUnroll = () => {
            if (!hasLeftSection) {
              return;
            }

            hasLeftSection = false;
            timeline.restart(true);
          };

          const isRolledSectionReached = () => {
            const rect = triggerTarget.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            return rect.top <= 1 && rect.bottom >= viewportHeight * 0.55;
          };

          ScrollTrigger.create({
            id: "brand-story-philosophy-unroll",
            trigger: triggerTarget,
            start: "top top",
            onEnter: playUnroll,
            onEnterBack: playUnroll,
            invalidateOnRefresh: true,
          });

          ScrollTrigger.create({
            id: "brand-story-philosophy-presence",
            start: 0,
            end: "max",
            onUpdate: syncSectionPresence,
            onRefresh: () => {
              sectionOverlapsViewport = !isSectionFullyOutside();
            },
            invalidateOnRefresh: true,
          });

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();

            sectionOverlapsViewport = !isSectionFullyOutside();

            if (isRolledSectionReached()) {
              playUnroll();
            }
          });
        }, philosophySectionRef);

        return () => {
          context?.revert();
        };
      });

      philosophyMedia.add("(max-width: 64rem)", () => {
        const horizontalContext = gsap.context(() => {
          const section = philosophySectionRef.current;

          if (!section) {
            return;
          }

          const bodyWraps = horizontalBodyWrapRefs.current.filter(Boolean) as HTMLElement[];

          if (bodyWraps.length === 0) {
            return;
          }

          const getHorizontalUnrollWidthPx = (bodyWrap: HTMLElement) => {
            const scrollUnit = bodyWrap.closest<HTMLElement>(".brand-story-philosophy__h-scroll-unit");

            if (!scrollUnit) {
              return 0;
            }

            const rollStart = scrollUnit.querySelector<HTMLElement>(".brand-story-philosophy__h-roll-start-wrap");
            const rollEnd = scrollUnit.querySelector<HTMLElement>(".brand-story-philosophy__h-roll-end-wrap");
            const unitWidth = scrollUnit.getBoundingClientRect().width;
            const rollStartWidth = rollStart?.getBoundingClientRect().width ?? 0;
            const rollEndWidth = rollEnd?.getBoundingClientRect().width ?? 0;

            return Math.max(0, unitWidth - rollStartWidth - rollEndWidth);
          };

          const syncHorizontalBodyWidths = () => {
            bodyWraps.forEach((bodyWrap) => {
              const unrollWidth = getHorizontalUnrollWidthPx(bodyWrap);
              const body = bodyWrap.querySelector<HTMLElement>(".brand-story-philosophy__h-body");

              if (!body || unrollWidth <= 0) {
                return;
              }

              gsap.set(body, { width: unrollWidth, minWidth: unrollWidth });
            });
          };

          const resetHorizontalState = () => {
            syncHorizontalBodyWidths();

            bodyWraps.forEach((bodyWrap) => {
              gsap.set(bodyWrap, { width: 0 });
            });
          };

          const timeline = gsap.timeline({
            paused: true,
          });

          const rebuildHorizontalTimeline = () => {
            timeline.clear();
            syncHorizontalBodyWidths();
            resetHorizontalState();

            bodyWraps.forEach((bodyWrap, index) => {
              const unrollWidth = getHorizontalUnrollWidthPx(bodyWrap);

              if (unrollWidth <= 0) {
                return;
              }

              timeline.fromTo(
                bodyWrap,
                { width: 0 },
                { width: unrollWidth, duration: 1.5, ease: "power2.inOut" },
                index * 0.2,
              );
            });
          };

          rebuildHorizontalTimeline();

          let hasLeftSection = true;
          let sectionOverlapsViewport = false;

          const isSectionFullyOutside = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            return rect.bottom <= 0 || rect.top >= viewportHeight;
          };

          const syncSectionPresence = () => {
            const overlapsViewport = !isSectionFullyOutside();

            if (sectionOverlapsViewport && !overlapsViewport) {
              hasLeftSection = true;
              timeline.pause(0);
              resetHorizontalState();
            }

            if (!sectionOverlapsViewport && overlapsViewport && hasLeftSection && isSectionReached()) {
              playUnroll();
            }

            sectionOverlapsViewport = overlapsViewport;
          };

          const playUnroll = () => {
            if (!hasLeftSection) {
              return;
            }

            hasLeftSection = false;
            timeline.restart(true);
          };

          const isSectionReached = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            return rect.top <= viewportHeight * 0.75 && rect.bottom >= viewportHeight * 0.25;
          };

          ScrollTrigger.create({
            id: "brand-story-philosophy-h-unroll",
            trigger: section,
            start: "top 75%",
            onEnter: playUnroll,
            onEnterBack: playUnroll,
            invalidateOnRefresh: true,
          });

          ScrollTrigger.create({
            id: "brand-story-philosophy-h-presence",
            start: 0,
            end: "max",
            onUpdate: syncSectionPresence,
            onRefresh: () => {
              sectionOverlapsViewport = !isSectionFullyOutside();
              rebuildHorizontalTimeline();
            },
            invalidateOnRefresh: true,
          });

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            sectionOverlapsViewport = !isSectionFullyOutside();

            if (isSectionReached()) {
              playUnroll();
            }
          });
        }, philosophySectionRef);

        return () => {
          horizontalContext.revert();
        };
      });

      ScrollTrigger.refresh();
    };

    const section = philosophySectionRef.current;

    if (!section) {
      return undefined;
    }

    const images = section.querySelectorAll<HTMLImageElement>(
      ".brand-story-philosophy__roll-top, .brand-story-philosophy__roll-body, .brand-story-philosophy__roll-bottom, .brand-story-philosophy__character, .brand-story-philosophy__h-roll-start, .brand-story-philosophy__h-roll-end, .brand-story-philosophy__h-bg, .brand-story-philosophy__h-character",
    );

    const pendingImages = Array.from(images).filter((image) => !image.complete || image.naturalHeight === 0);

    if (pendingImages.length === 0) {
      initPhilosophyAnimation();
      return () => {
        philosophyMedia?.revert();
        context?.revert();
      };
    }

    let loadedCount = 0;

    const handleImageReady = () => {
      loadedCount += 1;

      if (loadedCount >= pendingImages.length) {
        initPhilosophyAnimation();
      }
    };

    pendingImages.forEach((image) => {
      image.addEventListener("load", handleImageReady, { once: true });
      image.addEventListener("error", handleImageReady, { once: true });
    });

    return () => {
      pendingImages.forEach((image) => {
        image.removeEventListener("load", handleImageReady);
        image.removeEventListener("error", handleImageReady);
      });
      philosophyMedia?.revert();
      context?.revert();
    };
  }, []);

  return (
    <main className="brand-story-page">

      <section
        className="brand-story-kv"
        aria-label="브랜드 스토리 키비주얼"
      >
        <div className="brand-story-kv__grid">
          <div className="brand-story-kv__content">
            <div className="brand-story-kv__head">
              <h1 className="brand-story-kv__title ft-64r ink500">브랜드 스토리</h1>
              <SubKvSymbolLine blockClass="brand-story-kv" tone="responsive" />
            </div>
            <p className="brand-story-kv__description ft-28r ink500">
              <span className="brand-story-kv__description-line">자연이 만든 시간을 차에 담고,</span>
              <span className="brand-story-kv__description-line">그 시간을 사람들의 일상으로 전합니다.</span>
            </p>
          </div>
        </div>
      </section>

      <section
        className="brand-story-about"
        style={{ backgroundImage: `url(${brandStoryAboutImage})` }}
        aria-label="청연이 담고 있는 의미"
      >
        <div className="brand-story-about__overlay" aria-hidden="true" />
        <div className="brand-story-about__inner">
          <h2 className="brand-story-about__title ft-48b white">청연이 담고 있는 의미</h2>
          <div className="brand-story-about__subtitle ft-22r white">
            <p className="brand-story-about__subtitle-para">
              <span className="brand-story-about__subtitle-line">청연은 자연의 푸름과 깊은</span>
              <span className="brand-story-about__subtitle-line">물의 이름을 담고 있습니다.</span>
            </p>
            <p className="brand-story-about__subtitle-para">
              <span className="brand-story-about__subtitle-line">계절이 머문 찻잎과 시간이</span>
              <span className="brand-story-about__subtitle-line">쌓인 한 잔의 차처럼,</span>
            </p>
            <p className="brand-story-about__subtitle-para">
              <span className="brand-story-about__subtitle-line">자연이 만든 깊이를</span>
              <span className="brand-story-about__subtitle-line">사람들의 일상에 전하고자 합니다.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="brand-story-meaning" aria-label="청연에 담긴 이야기">
        <div className="brand-story-meaning__inner">
          <h2 className="brand-story-meaning__title ft-48b ink500">청연에 담긴 이야기</h2>
          <div className="brand-story-meaning__cards">
            {brandStoryMeaningCards.map((card) => (
              <article className="brand-story-meaning__card" key={card.id} tabIndex={0}>
                <img className="brand-story-meaning__image" src={card.image} alt="" aria-hidden="true" />
                <span
                  className="brand-story-meaning__hover-mask"
                  style={{ backgroundImage: `url(${meaningHoverImage})` }}
                  aria-hidden="true"
                />
                <div className="brand-story-meaning__content">
                  <div className="brand-story-meaning__content-inner">
                    <div className="brand-story-meaning__number-head">
                      <span className="brand-story-meaning__number ft-36r white">{card.number}</span>
                      <hr className="brand-story-meaning__line" />
                    </div>
                    <strong className="brand-story-meaning__hanja ft-28r white">{card.hanja}</strong>
                    <p className="brand-story-meaning__desc ft-22r white">
                      {card.lines.map((line, index) => (
                        <span className="brand-story-meaning__desc-line" key={`${card.id}-${index}`}>
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={philosophySectionRef}
        className="brand-story-philosophy"
        style={{ backgroundImage: `url(${philosophyBackgroundImage})` }}
        aria-label="청연의 다섯 가지 철학"
      >
        <div className="brand-story-philosophy__overlay" aria-hidden="true" />
        <div className="brand-story-philosophy__inner">
          <h2 className="brand-story-philosophy__title ft-48b white">청연의 다섯 가지 철학</h2>
          <div className="brand-story-philosophy__list">
            {philosophyItems.map((item, index) => (
              <article
                className="brand-story-philosophy__scroll"
                key={item.id}
                ref={(element) => {
                  scrollRefs.current[index] = element;
                }}
              >
                <img className="brand-story-philosophy__roll-top" src={rollTopImage} alt="" aria-hidden="true" />
                <div className="brand-story-philosophy__roll-body-wrap">
                  <div className="brand-story-philosophy__roll-body-frame">
                    <img
                      className="brand-story-philosophy__roll-body"
                      src={item.bodyImage}
                      alt=""
                      aria-hidden="true"
                    />
                    <div className="brand-story-philosophy__content">
                      <img
                        className="brand-story-philosophy__character"
                        src={item.characterImage}
                        alt=""
                        aria-hidden="true"
                      />
                      <h3 className="brand-story-philosophy__subtitle ft-28b ink500">{item.subtitle}</h3>
                      <p className="brand-story-philosophy__desc ft-18r ink500">
                        {item.lines.map((line, lineIndex) => (
                          <span className="brand-story-philosophy__desc-line" key={`${item.id}-${lineIndex}`}>
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <img className="brand-story-philosophy__roll-bottom" src={rollBottomImage} alt="" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>

          <div className="brand-story-philosophy__h-track">
            {philosophyItems.map((item, index) => (
              <article className="brand-story-philosophy__h-item" key={`horizontal-${item.id}`}>
                <div className="brand-story-philosophy__h-scroll-unit">
                  <span className="brand-story-philosophy__h-roll-start-wrap" aria-hidden="true">
                    <img
                      className="brand-story-philosophy__h-roll-start"
                      src={compactRollImage}
                      alt=""
                    />
                  </span>
                  <div
                    className="brand-story-philosophy__h-body-wrap"
                    ref={(element) => {
                      horizontalBodyWrapRefs.current[index] = element;
                    }}
                  >
                    <div className="brand-story-philosophy__h-body">
                      <img
                        className="brand-story-philosophy__h-bg"
                        src={item.horizontalBodyImage}
                        alt=""
                        aria-hidden="true"
                      />
                      <div className="brand-story-philosophy__h-content">
                        <span className="brand-story-philosophy__h-illus-spacer" aria-hidden="true" />
                        <div className="brand-story-philosophy__h-center">
                          <img
                            className="brand-story-philosophy__h-character"
                            src={item.compactHanjaImage}
                            alt=""
                            aria-hidden="true"
                          />
                          <h3 className="brand-story-philosophy__h-subtitle ft-28b ink500">{item.subtitle}</h3>
                        </div>
                        <p className="brand-story-philosophy__h-desc brand-story-philosophy__h-desc--tablet ft-18r ink500">
                          {item.horizontalDescLines.map((line, lineIndex) => (
                            <span className="brand-story-philosophy__h-desc-line" key={`${item.id}-h-${lineIndex}`}>
                              {line}
                            </span>
                          ))}
                        </p>
                        <p className="brand-story-philosophy__h-desc brand-story-philosophy__h-desc--mobile ft-18r ink500">
                          {("mobileHorizontalDescLines" in item ? item.mobileHorizontalDescLines : item.horizontalDescLines).map((line, lineIndex) => (
                            <span className="brand-story-philosophy__h-desc-line" key={`${item.id}-h-mo-${lineIndex}`}>
                              {line}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span className="brand-story-philosophy__h-roll-end-wrap" aria-hidden="true">
                    <img
                      className="brand-story-philosophy__h-roll-end"
                      src={compactRollImage}
                      alt=""
                    />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="brand-story-people"
        style={{ backgroundImage: `url(${peopleBackgroundImage})` }}
        aria-label="차를 만드는 사람들"
      >
        <div className="brand-story-people__overlay" aria-hidden="true" />
        <div className="brand-story-people__inner">
          <div className="brand-story-people__head">
            <h2 className="brand-story-people__title ft-48b white">차를 만드는 사람들</h2>
            <p className="brand-story-people__subtitle ft-28r white">차는 자연만으로 완성되지 않습니다</p>
          </div>

          <div className="brand-story-people__cards">
            {peopleCards.map((card, index) => (
              <article
                className={`brand-story-people__card${index === 0 ? " is-default" : ""}`}
                key={card.id}
              >
                <img
                  className="brand-story-people__card-image"
                  src={card.image}
                  alt=""
                  aria-hidden="true"
                  style={"imagePosition" in card ? { objectPosition: card.imagePosition } : undefined}
                />
                <div className="brand-story-people__card-dim" aria-hidden="true" />
                <div className="brand-story-people__card-content">
                  <h3 className="brand-story-people__card-title ft-36r white">{card.title}</h3>
                  <p className="brand-story-people__card-desc ft-22r white">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-story-time" aria-label="청연이 전하는 시간">
        <div className="brand-story-time__inner">
          <div className="brand-story-time__content">
            <h2 className="brand-story-time__title ft-48b ink500">청연이 전하는 시간</h2>
            <p className="brand-story-time__subtitle ft-28r ink500">
              <span className="brand-story-time__subtitle-line">한 잔의 차는 빠르게</span>
              <span className="brand-story-time__subtitle-line">소비되는 음료가 아닙니다.</span>
            </p>
            <div className="brand-story-time__desc-group brand-story-time__desc-group--default">
              {brandStoryTimeDescParagraphs.map((paragraph, paragraphIndex) => (
                <p className="brand-story-time__desc ft-22r ink500" key={paragraphIndex}>
                  {paragraph.map((line, lineIndex) => (
                    <span className="brand-story-time__desc-line" key={lineIndex}>
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            <div className="brand-story-time__desc-group brand-story-time__desc-group--mobile">
              <p className="brand-story-time__desc ft-22r ink500">
                {brandStoryTimeMobileDescLines.map((line, lineIndex) => (
                  <span className="brand-story-time__desc-line" key={lineIndex}>
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="brand-story-time__visual">
            <img className="brand-story-time__image" src={brandStoryTimeImage} alt="" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section
        className="brand-story-last"
        style={{ backgroundImage: `url(${lastBg})` }}
        aria-label="청연 브랜드 메시지"
      >
        <div className="brand-story-last__overlay" aria-hidden="true" />
        <div className="brand-story-last__inner">
          <img className="brand-story-last__logo" src={logoWhite} alt="청연" />
          <h2 className="brand-story-last__title ft-36r white">
            시간은 흐르지만
            <br />
            좋은 차는 기다림으로 완성됩니다.
          </h2>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default BrandStoryPage;