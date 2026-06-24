import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import subSymbol from "../../assets/images/01main/subsymbol.svg";
import { Footer, Header } from "../../components/common";
import "./BrandStoryPage.scss";

// KV 배경 이미지 — 교체 시 아래 import 경로만 수정하세요.
import brandStoryKvImage from "../../assets/images/02brand-story/brand-kv.webp";

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

const philosophyItems = [
  {
    id: 1,
    bodyImage: rollBodyImage1,
    characterImage: characterImage1,
    subtitle: "고요함",
    lines: ["차를 마시는 것은", "잠시 멈추는 일, 고요한", "마음이 좋은 차를 만듭니다."],
  },
  {
    id: 2,
    bodyImage: rollBodyImage2,
    characterImage: characterImage2,
    subtitle: "기다림",
    lines: ["좋은 차는 서두르지", "않습니다. 자연의 시간이", "맡기고 충분히 기다립니다."],
  },
  {
    id: 3,
    bodyImage: rollBodyImage3,
    characterImage: characterImage3,
    subtitle: "자연",
    lines: ["자연에서 온 그대로를", "담습니다. 계절과 땅의", "흐름을 거스르지 않습니다."],
  },
  {
    id: 4,
    bodyImage: rollBodyImage4,
    characterImage: characterImage4,
    subtitle: "인연",
    lines: ["차는 사람과 사람을", "이어줍니다. 스쳐가는", "인연도 소중히 생각합니다."],
  },
  {
    id: 5,
    bodyImage: rollBodyImage5,
    characterImage: characterImage5,
    subtitle: "여운",
    lines: ["한 잔의 차는 마음에 오래", "남는 여운이 됩니다. 그", "여운이 일상이 됩니다."],
  },
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let context: gsap.Context | null = null;

    const initPhilosophyAnimation = () => {
      context?.revert();

      context = gsap.context(() => {
        const section = philosophySectionRef.current;

        if (!section) {
          return;
        }

        const scrolls = scrollRefs.current.filter(Boolean) as HTMLElement[];

        if (scrolls.length === 0) {
          return;
        }

        const list = section.querySelector<HTMLElement>(".brand-story-philosophy__list");

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

        const triggerTarget = list ?? section;

        const playUnroll = () => {
          timeline.restart(true);
        };

        ScrollTrigger.create({
          trigger: triggerTarget,
          start: "top 88%",
          onEnter: playUnroll,
          onLeaveBack: () => {
            timeline.pause(0);
            resetScrollState();
          },
          invalidateOnRefresh: true,
        });

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();

          if (!triggerTarget) {
            return;
          }

          const triggerLine = window.innerHeight * 0.88;
          const isInView = triggerTarget.getBoundingClientRect().top <= triggerLine;

          if (isInView) {
            playUnroll();
          }
        });
      }, philosophySectionRef);

      ScrollTrigger.refresh();
    };

    const section = philosophySectionRef.current;

    if (!section) {
      return undefined;
    }

    const images = section.querySelectorAll<HTMLImageElement>(
      ".brand-story-philosophy__roll-top, .brand-story-philosophy__roll-body, .brand-story-philosophy__roll-bottom, .brand-story-philosophy__character",
    );

    const pendingImages = Array.from(images).filter((image) => !image.complete || image.naturalHeight === 0);

    if (pendingImages.length === 0) {
      initPhilosophyAnimation();
      return () => {
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
      context?.revert();
    };
  }, []);

  return (
    <main className="brand-story-page">
      <div className="brand-story-page__header">
        <Header />
      </div>

      <section
        className="brand-story-kv"
        style={{ backgroundImage: `url(${brandStoryKvImage})` }}
        aria-label="브랜드 스토리 키비주얼"
      >
        <div className="brand-story-kv__grid">
          <h1 className="brand-story-kv__title ft-64r ink500">브랜드 스토리</h1>
          <img className="brand-story-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
          <p className="brand-story-kv__description ft-28r ink500">
            <span className="brand-story-kv__description-line">자연이 만든 시간을 차에 담고,</span>
            <span className="brand-story-kv__description-line">그 시간을 사람들의 일상으로 전합니다.</span>
          </p>
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
          <p className="brand-story-about__subtitle ft-22r white">
            <span className="brand-story-about__subtitle-line">
              청연은 자연의 푸름과 깊은 물의 이름을 담고 있습니다.
            </span>
            <span className="brand-story-about__subtitle-line">계절이 머문 찻잎과 시간이 쌓인 한 잔의 차처럼,</span>
            <span className="brand-story-about__subtitle-line">
              자연이 만든 깊이를 사람들의 일상에 전하고자 합니다.
            </span>
          </p>
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
                  <span className="brand-story-meaning__number ft-36r white">{card.number}</span>
                  <hr className="brand-story-meaning__line" />
                  <strong className="brand-story-meaning__hanja ft-28r white">{card.hanja}</strong>
                  <p className="brand-story-meaning__desc ft-22r white">
                    {card.lines.map((line, index) => (
                      <span className="brand-story-meaning__desc-line" key={`${card.id}-${index}`}>
                        {line}
                      </span>
                    ))}
                  </p>
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
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default BrandStoryPage;
<h1>받으슈</h1>