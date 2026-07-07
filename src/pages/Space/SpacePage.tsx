import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, SubKvSymbolLine } from "../../components/common";
import PageMeta from "../../components/seo/PageMeta";
import { PAGE_SEO } from "../../data/pageSeoMeta";
import aboutBg from "../../assets/images/03space/about-bg.webp";
import spaceRoomLeft from "../../assets/images/03space/space-3_1.webp";
import spaceRoomRight from "../../assets/images/03space/space-3_2.webp";
import spaceLine from "../../assets/images/03space/space-3-line.svg";
import space2 from "../../assets/images/03space/space-2.webp";
import spaceGallery1 from "../../assets/images/03space/space-4.webp";
import spaceGallery2 from "../../assets/images/03space/space-4_2_2.webp";
import spaceGallery3 from "../../assets/images/03space/space-4_2_3.webp";
import spaceGallery4 from "../../assets/images/03space/space-4_2_4.webp";
import spaceLearning1 from "../../assets/images/03space/space-5.webp";
import spaceLearning2 from "../../assets/images/03space/space-5_2.webp";
import spaceLearning3 from "../../assets/images/03space/space-5_3.webp";
import spaceLearning4 from "../../assets/images/03space/space-5_4.webp";
import spaceCarousel1 from "../../assets/images/03space/space-6_1.webp";
import spaceCarousel2 from "../../assets/images/03space/space-6_2.webp";
import spaceCarousel3 from "../../assets/images/03space/space-6_3.webp";
import spaceCarousel4 from "../../assets/images/03space/space-6_4.webp";
import spaceCarousel5 from "../../assets/images/03space/space-6_5.webp";
import spaceCarousel6 from "../../assets/images/03space/space-6_6.webp";
import spaceCarousel7 from "../../assets/images/03space/space-6_7.webp";
import spaceCarousel8 from "../../assets/images/03space/space-6_8.webp";
import spaceCarousel9 from "../../assets/images/03space/space-6_9.webp";
import spaceCarousel10 from "../../assets/images/03space/space-6_10.webp";
import galleryBg from "../../assets/images/03space/gallery.webp";
import cuser from "../../assets/images/03space/cuser.svg";
import blueprint from "../../assets/images/03space/blueprint.svg";
import mapMarker1 from "../../assets/images/03space/1.svg";
import mapMarker2 from "../../assets/images/03space/2.svg";
import mapMarker3 from "../../assets/images/03space/3.svg";
import mapMarker4 from "../../assets/images/03space/4.svg";
import mapMarker5 from "../../assets/images/03space/5.svg";
import spaceMap1 from "../../assets/images/03space/space-7_1.webp";
import spaceMap2 from "../../assets/images/03space/space-7_2.webp";
import spaceMap3 from "../../assets/images/03space/space-7_3.webp";
import spaceMap4 from "../../assets/images/03space/space-7_4.webp";
import spaceMap5 from "../../assets/images/03space/space-7_5.webp";
import SpaceGallerySection from "./SpaceGallerySection";
import "./SpacePage.scss";

const stayGalleryData = {
  blockClass: "space-gallery",
  ariaLabel: "차향이 스미는 공간",
  mainTitleLines: ["차향이 스미는 시간", "머무름의 공간"] as [string, string],
  subtitle: "머무름의 공간",
  cards: [
    {
      image: spaceGallery1,
      title: "청연 남산 티하우스",
      location: ["위치: 서울특별시", "중구 소파로 42"],
      feature: "특징: 도심형 티하우스",
    },
    {
      image: spaceGallery2,
      title: "청연 구례 티하우스",
      location: ["위치: 전라남도 구례군", "마산면 214"],
      feature: "특징: 자연 속 휴식 공간",
    },
    {
      image: spaceGallery3,
      title: "청연 경주 티하우스",
      location: ["위치: 경상북도 경주시", "첨성로 177"],
      feature: "특징: 한옥 공간",
    },
    {
      image: spaceGallery4,
      title: "청연 제주 티하우스",
      location: ["위치: 제주도 서귀포시 안덕", "면 128"],
      feature: "특징: 제주 차밭 인근",
    },
  ],
} as const;

const learningGalleryData = {
  blockClass: "space-learning",
  ariaLabel: "차와 함께하는 배움의 공간",
  mainTitleLines: ["차와 함께하는 쉼", "배움의 공간"] as [string, string],
  subtitle: "배움의 공간",
  cards: [
    {
      image: spaceLearning1,
      title: "청연 북촌 티하우스",
      location: ["위치: 서울특별시", "종로구 북촌로 58"],
      feature: "특징: 청연 브랜드 쇼룸",
    },
    {
      image: spaceLearning2,
      title: "청연 보성 티하우스",
      location: ["위치: 전라남도 보성군", "보성읍 821"],
      feature: "특징: 보성 차밭 인접",
    },
    {
      image: spaceLearning3,
      title: "청연 강진 티하우스",
      location: ["위치: 전라남도 강진군", "성전면 437"],
      feature: "특징: 한국 전통 다도 문화권",
    },
    {
      image: spaceLearning4,
      title: "청연 하동 티하우스",
      location: ["위치: 경상남도 하동군", "화개면 612"],
      feature: "특징: 지리산 야생차 문화권",
    },
  ],
} as const;

const carouselImages = [
  spaceCarousel1,
  spaceCarousel2,
  spaceCarousel3,
  spaceCarousel4,
  spaceCarousel5,
  spaceCarousel6,
  spaceCarousel7,
  spaceCarousel8,
  spaceCarousel9,
  spaceCarousel10,
] as const;

const spaceMapItems = [
  {
    id: 1,
    number: "01",
    title: "예절 다실",
    image: spaceMap1,
    marker: mapMarker1,
    position: { left: "18%", top: "17%" },
    description:
      "다도의 기본 예절과 차 문화를 편안하게 익힐 수 있는 클래스 공간입니다.",
  },
  {
    id: 2,
    number: "02",
    title: "블렌더 다실",
    image: spaceMap2,
    marker: mapMarker2,
    position: { left: "22%", top: "53%" },
    description: "나만의 취향을 담은 블렌딩 티를 직접 만들어보는 클래스 공간입니다.",
  },
  {
    id: 3,
    number: "03",
    title: "중정",
    image: spaceMap3,
    marker: mapMarker3,
    position: { left: "56%", top: "30%" },
    description:
      "계절의 흐름과 자연의 풍경을 가까이에서 마주하며 잠시 머무를 수 있는 휴식 공간입니다.",
  },
  {
    id: 4,
    number: "04",
    title: "프라이빗 다실",
    image: spaceMap4,
    marker: mapMarker4,
    position: { left: "83%", top: "22%" },
    description:
      "차분한 분위기 속에서 오롯이 차에 집중할 수 있는 1:1 예약 전용 클래스 공간입니다.",
  },
  {
    id: 5,
    number: "05",
    title: "숙성차 다실",
    image: spaceMap5,
    marker: mapMarker5,
    position: { left: "calc(87% - 0.625rem)", top: "80%" },
    description:
      "시간이 만든 깊은 풍미를 경험하는 숙성차만의 여운을 천천히 느낄 수 있는 클래스 공간입니다.",
  },
] as const;

function SpacePage() {
  const [selectedSpace, setSelectedSpace] = useState(1);
  const [showMapDetail, setShowMapDetail] = useState(false);
  const carouselSectionRef = useRef<HTMLElement>(null);
  const carouselCursorRef = useRef<HTMLImageElement>(null);
  const roomsSectionRef = useRef<HTMLElement>(null);
  const gallerySectionsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = roomsSectionRef.current;
    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(section.querySelectorAll<HTMLElement>(".space-rooms__item"));

    if (prefersReducedMotion || items.length === 0) {
      return;
    }

    const context = gsap.context(() => {
      items.forEach((item, index) => {
        const head = item.querySelector<HTMLElement>(".space-rooms__head");
        const line = item.querySelector<HTMLElement>(".space-rooms__line");
        const image = item.querySelector<HTMLElement>(".space-rooms__image");

        if (!head || !line || !image) {
          return;
        }

        const fromX = index === 0 ? -18 : 18;

        gsap.set([head, line, image], { opacity: 0 });
        gsap.set(head, { y: 24, x: fromX });
        gsap.set(line, { scaleX: 0.35 });
        gsap.set(image, { y: 28, scale: 1.03 });

        const timeline = gsap
          .timeline({ paused: true })
          .to(head, { opacity: 1, y: 0, x: 0, duration: 0.85, ease: "power2.out" })
          .to(line, { opacity: 1, scaleX: 1, duration: 0.75, ease: "power2.out" }, "-=0.55")
          .to(image, { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "power2.out" }, "-=0.5");

        const playRoomsAnimation = () => {
          gsap.set([head, line, image], { opacity: 0 });
          gsap.set(head, { y: 24, x: fromX });
          gsap.set(line, { scaleX: 0.35 });
          gsap.set(image, { y: 28, scale: 1.03 });
          timeline.restart();
        };

        ScrollTrigger.create({
          trigger: item,
          start: "top 84%",
          end: "bottom 16%",
          onEnter: playRoomsAnimation,
          onEnterBack: playRoomsAnimation,
        });
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const galleryGroup = gallerySectionsRef.current;
    if (!galleryGroup) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const gallery = galleryGroup.querySelector<HTMLElement>(".space-gallery");
      const learning = galleryGroup.querySelector<HTMLElement>(".space-learning");

      if (!gallery || !learning) {
        return;
      }

      const trigger = ScrollTrigger.create({
        trigger: gallery,
        start: "top top",
        endTrigger: learning,
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onToggle: (self) => {
          if (self.isActive) {
            document.documentElement.dataset.headerSpaceContentActive = "true";
          } else {
            delete document.documentElement.dataset.headerSpaceContentActive;
          }
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        delete document.documentElement.dataset.headerSpaceContentActive;
        trigger.kill();
      };
    });

    return () => {
      delete document.documentElement.dataset.headerSpaceContentActive;
      mm.revert();
    };
  }, []);

  useEffect(() => {
    const section = carouselSectionRef.current;
    const cursor = carouselCursorRef.current;

    if (!section || !cursor) {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncCursor = (event: MouseEvent) => {
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
    };

    const showCursor = () => {
      cursor.classList.add("space-gallery-carousel__cursor--visible");
    };

    const hideCursor = () => {
      cursor.classList.remove("space-gallery-carousel__cursor--visible");
    };

    const enableCustomCursor = () => {
      section.classList.add("space-gallery-carousel--custom-cursor");
    };

    const disableCustomCursor = () => {
      section.classList.remove("space-gallery-carousel--custom-cursor");
      hideCursor();
    };

    const onMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        enableCustomCursor();
      } else {
        disableCustomCursor();
      }
    };

    if (!mediaQuery.matches) {
      return;
    }

    enableCustomCursor();
    section.addEventListener("mousemove", syncCursor);
    section.addEventListener("mouseenter", showCursor);
    section.addEventListener("mouseleave", hideCursor);
    mediaQuery.addEventListener("change", onMediaChange);

    return () => {
      section.removeEventListener("mousemove", syncCursor);
      section.removeEventListener("mouseenter", showCursor);
      section.removeEventListener("mouseleave", hideCursor);
      mediaQuery.removeEventListener("change", onMediaChange);
      disableCustomCursor();
    };
  }, []);

  const activeSpace = spaceMapItems.find((item) => item.id === selectedSpace) ?? spaceMapItems[0];

  const handleMapSectionClick = () => {
    setShowMapDetail(false);
  };

  const handleMapMarkerClick = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedSpace(id);
    setShowMapDetail(true);
  };

  return (
    <main className="space">
      <PageMeta {...PAGE_SEO.space} />

      <section
        className="space-kv"
        aria-label="공간 소개 키비주얼"
      >
        <div className="space-kv__grid">
          <div className="space-kv__content">
            <div className="space-kv__head">
              <h1 className="space-kv__title ft-64r ink500">공간 소개</h1>
              <SubKvSymbolLine blockClass="space-kv" tone="responsive" />
            </div>
            <p className="space-kv__description ft-28r ink500">
              <span className="space-kv__description-line">차를 마주하는 모든 순간이</span>
              <span className="space-kv__description-line">하나의 풍경이 되길 바랍니다.</span>
            </p>
          </div>
        </div>
      </section>

      <section
        className="space-about"
        style={{ backgroundImage: `url(${aboutBg})` }}
        aria-label="청연 공간 소개"
      >
        <div className="space-about__inner">
          <div className="space-about__content">
            <h2 className="space-about__title ft-48b ink500">
              차는 마시는것이 아니라,
              <br />
              머무는 것입니다.
            </h2>
            <p className="space-about__desc ft-28r ink500">
              <span className="space-about__desc-lines space-about__desc-lines--desktop">
                청연은 동양화의 고요함을 담은
                <br />
                공간입니다. 바쁜 일상 속에서 잠시
                <br />
                멈추어, 나와 마주하는 시간을 선물합니다.
              </span>
              <span className="space-about__desc-lines space-about__desc-lines--mobile">
                청연은 동양화의 고요함을 담은 공간입니다.
                <br />
                바쁜 일상 속에서 잠시 멈추어,
                <br />
                나와 마주하는 시간을 선물합니다.
              </span>
            </p>
          </div>

          <div className="space-about__visual">
            <img src={space2} alt="" className="space-about__image" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="space-rooms" ref={roomsSectionRef} aria-label="청연 공간 구성">
        <div className="space-rooms__inner">
          <article className="space-rooms__item">
            <div className="space-rooms__head">
              <h2 className="space-rooms__title ft-48b ink500">머무름의 공간</h2>
              <p className="space-rooms__desc ft-22r ink500">
                고요한 차향이 스며드는 공간에서 복잡한
                <br />
                생각은 내려놓고, 음미하며 마음의 여백을 채워보세요.
              </p>
            </div>

            <img src={spaceLine} alt="" className="space-rooms__line" aria-hidden="true" />

            <img src={spaceRoomLeft} alt="" className="space-rooms__image" aria-hidden="true" />
          </article>

          <article className="space-rooms__item">
            <div className="space-rooms__head">
              <h2 className="space-rooms__title ft-48b ink500">배움의 공간</h2>
              <p className="space-rooms__desc ft-22r ink500">
                차를 우려내는 과정부터 향과 맛을 음미하는 순간까지,
                <br />
                다도의 깊이를 천천히 배워가는 특별한 공간입니다.
              </p>
            </div>

            <img src={spaceLine} alt="" className="space-rooms__line" aria-hidden="true" />

            <img src={spaceRoomRight} alt="" className="space-rooms__image" aria-hidden="true" />
          </article>
        </div>
      </section>

      <div ref={gallerySectionsRef} className="space-gallery-group">
        <SpaceGallerySection {...stayGalleryData} />
        <SpaceGallerySection {...learningGalleryData} />
      </div>

      <section
        ref={carouselSectionRef}
        className="space-gallery-carousel"
        style={{ backgroundImage: `url(${galleryBg})` }}
        aria-label="청연 공간 갤러리"
      >
        <img
          ref={carouselCursorRef}
          src={cuser}
          alt=""
          className="space-gallery-carousel__cursor"
          aria-hidden="true"
        />

        <div className="space-gallery-carousel__inner">
          <h2 className="space-gallery-carousel__title ft-48b ink500">청연의 공간을 소개합니다</h2>
          <p className="space-gallery-carousel__desc ft-28r ink500">
            자연과 예술, 차가 어우러진 청연의 공간은
            <br />
            머무는 순간, 온전한 휴식을 취합니다.
          </p>
        </div>

        <div className="space-gallery-carousel__viewport">
          <div className="space-gallery-carousel__track">
            <div className="space-gallery-carousel__group">
              {carouselImages.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className="space-gallery-carousel__image"
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="space-gallery-carousel__group" aria-hidden="true">
              {carouselImages.map((image) => (
                <img
                  key={`${image}-duplicate`}
                  src={image}
                  alt=""
                  className="space-gallery-carousel__image"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-map" aria-label="청연 본점 공간 안내" onClick={handleMapSectionClick}>
        <div className="space-map__inner">
          <div
            className={`space-map__intro${showMapDetail ? " space-map__intro--hidden" : ""}`}
          >
            <h2 className="space-map__title ft-48b ink500">청연 본점 공간 안내</h2>
            <p className="space-map__subtitle ft-28r ink500">
              청연은 자연의 흐름을 따라
              <br />
              다실, 중정, 전시 공간이 조화를 이루는
              <br />
              구성으로 이루어져 있습니다.
            </p>
            <p className="space-map__hint ft-16r ink400">* 번호를 눌러 공간을 확인해보세요.</p>
          </div>

          <div className="space-map__blueprint">
            <p className="space-map__guide ft-16r ink400">* 번호를 눌러 공간을 확인해보세요.</p>
            <div className="space-map__blueprint-stage">
              <img src={blueprint} alt="" className="space-map__blueprint-image" aria-hidden="true" />
              <div className="space-map__markers">
                {spaceMapItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`space-map__marker${selectedSpace === item.id ? " space-map__marker--active" : ""}`}
                    style={{
                      left: item.position.left,
                      top: item.position.top,
                      animationDelay: `${(item.id - 1) * 0.18}s`,
                    }}
                    onClick={(event) => handleMapMarkerClick(item.id, event)}
                    aria-label={item.title}
                    aria-pressed={selectedSpace === item.id}
                  >
                    <img src={item.marker} alt="" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {showMapDetail && (
            <div key={selectedSpace} className="space-map__detail">
              <img
                src={activeSpace.image}
                alt={activeSpace.title}
                className="space-map__detail-image"
              />
              <div className="space-map__detail-head">
                <span className="space-map__detail-number ft-48b">{activeSpace.number}</span>
                <h3 className="space-map__detail-title ft-48b ink500">{activeSpace.title}</h3>
              </div>
              <p className="space-map__detail-desc ft-22r ink500">{activeSpace.description}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default SpacePage;
