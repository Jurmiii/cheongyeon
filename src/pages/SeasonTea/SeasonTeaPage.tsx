import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import subSymbol from "../../assets/images/01main/subsymbol.svg";
import springTeaImage from "../../assets/images/07season-tea/sec2-tea.webp";
import wayImage from "../../assets/images/07season-tea/way.webp";
import summerTeaImage from "../../assets/images/07season-tea/sec3-tea.webp";
import autumnTeaImage from "../../assets/images/07season-tea/sec4-tea.webp";
import sec4WayB from "../../assets/images/07season-tea/sec4-way-b.webp";
import winterTeaImage from "../../assets/images/07season-tea/sec5-tea.webp";
import sec5WayB from "../../assets/images/07season-tea/sec5-way-b.webp";
import sec5WayT from "../../assets/images/07season-tea/sec5-way-t.webp";
import { Button, Footer, Header } from "../../components/common";
import SeasonTeaDetailModal from "./SeasonTeaDetailModal";
import { autumnTeaDetail, springTeaDetail, summerTeaDetail, winterTeaDetail, type SeasonTeaDetail } from "./seasonTeaDetailData";
import "./SeasonTeaPage.scss";

type SeasonTeaKey = "spring" | "summer" | "autumn" | "winter";

const seasonTeaWayImages = [
  { className: "season-tea-way__image season-tea-way__image--combined", src: wayImage },
  { className: "season-tea-way__image season-tea-way__image--sec4-b", src: sec4WayB },
  { className: "season-tea-way__image season-tea-way__image--sec5-t", src: sec5WayT },
  { className: "season-tea-way__image season-tea-way__image--sec5-b", src: sec5WayB },
] as const;

const initialActiveSeasonTeaImages: Record<SeasonTeaKey, boolean> = {
  spring: false,
  summer: false,
  autumn: false,
  winter: false,
};

function SeasonTeaPage() {
  const [activeTeaDetail, setActiveTeaDetail] = useState<SeasonTeaDetail | null>(null);
  const [activeSeasonTeaImages, setActiveSeasonTeaImages] = useState<Record<SeasonTeaKey, boolean>>(
    initialActiveSeasonTeaImages,
  );
  const wayScrollRef = useRef<HTMLDivElement | null>(null);
  const wayImageRefs = useRef<Array<HTMLImageElement | null>>([]);
  const seasonTeaImageRefs = useRef<Record<SeasonTeaKey, HTMLDivElement | null>>({
    spring: null,
    summer: null,
    autumn: null,
    winter: null,
  });

  const setWayImageRef = (index: number) => (element: HTMLImageElement | null) => {
    wayImageRefs.current[index] = element;
  };

  const setSeasonTeaImageRef = (season: SeasonTeaKey) => (element: HTMLDivElement | null) => {
    seasonTeaImageRefs.current[season] = element;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const season = entry.target.getAttribute("data-season-tea") as SeasonTeaKey | null;

          if (!season || entry.intersectionRatio < 1 / 3) {
            return;
          }

          setActiveSeasonTeaImages((currentImages) => {
            if (currentImages[season]) {
              return currentImages;
            }

            return {
              ...currentImages,
              [season]: true,
            };
          });
        });
      },
      { threshold: 1 / 3 },
    );

    Object.values(seasonTeaImageRefs.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const wayImages = wayImageRefs.current.filter((element): element is HTMLImageElement => Boolean(element));

      if (!wayScrollRef.current || wayImages.length === 0) {
        return;
      }

      const wayTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: wayImages[0],
          endTrigger: wayScrollRef.current,
          start: "top 82%",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const wayDurations = [5.6, 1, 1.05, 0.55];

      wayImages.forEach((element, index) => {
        wayTimeline.fromTo(
          element,
          {
            clipPath: "inset(0 0 100% 0)",
            WebkitClipPath: "inset(0 0 100% 0)",
          },
          {
            clipPath: "inset(0 0 0% 0)",
            WebkitClipPath: "inset(0 0 0% 0)",
            ease: "none",
            duration: wayDurations[index] ?? 1,
          },
        );
      });
    }, wayScrollRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className="season-tea-page">
      <div className="season-tea-page__header">
        <Header />
      </div>

      <section className="season-tea-kv" aria-label="계절의 차 키비주얼">
        <div className="season-tea-kv__grid">
          <div className="season-tea-kv__content">
            <h1 className="season-tea-kv__title ft-64b ink500">계절의 차</h1>
            <img className="season-tea-kv__symbol" src={subSymbol} alt="" aria-hidden="true" />
            <p className="season-tea-kv__description ft-28r ink500">
              계절이 머문 향과 풍미를 담아,
              <br />
              가장 아름다운 순간을 전합니다.
            </p>
          </div>
        </div>
      </section>

      <div className="season-tea-way-scroll" ref={wayScrollRef}>
        <div className="season-tea-way-layer" aria-hidden="true">
          {seasonTeaWayImages.map((wayImage, index) => (
            <img
              className={wayImage.className}
              ref={setWayImageRef(index)}
              src={wayImage.src}
              alt=""
              key={wayImage.className}
              onLoad={() => ScrollTrigger.refresh()}
            />
          ))}
        </div>

      <section className="season-tea-spring" aria-label="봄의 차">
        <div className="season-tea-spring__grid">
          <div
            className={[
              "season-tea-spring__media",
              "season-tea-image-reveal",
              activeSeasonTeaImages.spring && "is-active",
            ].filter(Boolean).join(" ")}
            ref={setSeasonTeaImageRef("spring")}
            data-season-tea="spring"
          >
            <img
              className="season-tea-spring__image"
              src={springTeaImage}
              alt="동백꽃 차 한 잔과 동백꽃"
            />
          </div>
          <div className="season-tea-spring__content">
            <h2 className="season-tea-spring__season ft-64b plum500">봄의 차</h2>
            <p className="season-tea-spring__name ft-28r ink500">동백꽃 차</p>
            <p className="season-tea-spring__lead ft-22r ink500">
              봄의 첫 설렘을 담은 한 잔
              <br />
              은은한 꽃향기와 부드러운 여운이 머무는 동백꽃 차
            </p>
            <p className="season-tea-spring__body ft-18r ink500">
              첫 꽃이 피어나는 계절의 기운을 담아
              <br />
              부드럽고 은은한 향으로 완성했습니다.
              <br />
              한 모금마다 차분한 여운이 이어지며
              <br />
              봄의 풍경을 천천히 펼쳐냅니다.
            </p>
            <Button
              className="season-tea-spring__button"
              variant="classMore"
              type="button"
              onClick={() => setActiveTeaDetail(springTeaDetail)}
            >
              차 특징 보기
            </Button>
          </div>
        </div>
      </section>

      <section className="season-tea-summer" aria-label="여름의 차">
        <div className="season-tea-summer__grid">
          <div className="season-tea-summer__content">
            <h2 className="season-tea-summer__season ft-64b deep400">여름의 차</h2>
            <p className="season-tea-summer__name ft-28r ink500">냉녹차</p>
            <p className="season-tea-summer__lead ft-22r ink500">
              여름의 맑음을 담은 한 잔
              <br />
              청량한 향과 시원한 여운이 머무는 냉녹차
            </p>
            <p className="season-tea-summer__body ft-18r ink500">
              푸른 계절의 생기를 담아
              <br />
              맑고 산뜻한 향으로 우려냈습니다.
              <br />
              한 모금마다 시원한 여운이 이어지며
              <br />
              푸른 계절의 풍경을 천천히 펼쳐냅니다.
            </p>
            <Button
              className="season-tea-summer__button"
              variant="classMore"
              type="button"
              onClick={() => setActiveTeaDetail(summerTeaDetail)}
            >
              차 특징 보기
            </Button>
          </div>
          <div
            className={[
              "season-tea-summer__media",
              "season-tea-image-reveal",
              activeSeasonTeaImages.summer && "is-active",
            ].filter(Boolean).join(" ")}
            ref={setSeasonTeaImageRef("summer")}
            data-season-tea="summer"
          >
            <img
              className="season-tea-summer__image"
              src={summerTeaImage}
              alt="냉녹차 한 잔과 찻잎"
            />
          </div>
        </div>
      </section>

      <section className="season-tea-autumn" aria-label="가을의 차">
        <div className="season-tea-autumn__grid">
          <div
            className={[
              "season-tea-autumn__media",
              "season-tea-image-reveal",
              activeSeasonTeaImages.autumn && "is-active",
            ].filter(Boolean).join(" ")}
            ref={setSeasonTeaImageRef("autumn")}
            data-season-tea="autumn"
          >
            <img
              className="season-tea-autumn__image"
              src={autumnTeaImage}
              alt="국화차 한 잔과 가을 잎"
            />
          </div>
          <div className="season-tea-autumn__content">
            <h2 className="season-tea-autumn__season ft-64b color-fall">가을의 차</h2>
            <p className="season-tea-autumn__name ft-28r ink500">국화차</p>
            <p className="season-tea-autumn__lead ft-22r ink500">
              가을의 여백을 담은 한 잔
              <br />
              은은한 꽃향기와 깊은 여운이 머무는 국화차
            </p>
            <p className="season-tea-autumn__body ft-18r ink500">
              꽃이 지고 계절이 익어가는 시간,
              <br />
              은은한 꽃향기와 깊은 여운이 머무는 국화차
              <br />
              한 모금마다 차분한 여운이 이어지며
              <br />
              가을의 풍경을 천천히 펼쳐냅니다.
            </p>
            <Button
              className="season-tea-autumn__button"
              variant="classMore"
              type="button"
              onClick={() => setActiveTeaDetail(autumnTeaDetail)}
            >
              차 특징 보기
            </Button>
          </div>
        </div>
      </section>

      <section className="season-tea-winter" aria-label="겨울의 차">
        <div className="season-tea-winter__grid">
          <div className="season-tea-winter__content">
            <h2 className="season-tea-winter__season ft-64b color-winter">겨울의 차</h2>
            <p className="season-tea-winter__name ft-28r ink500">우롱차</p>
            <p className="season-tea-winter__lead ft-22r ink500">
              겨울의 깊이를 담은 한 잔
              <br />
              깊은 향과 긴 여운이 머무는 우롱차
            </p>
            <p className="season-tea-winter__body ft-18r ink500">
              운무가 산을 감싸는 새벽처럼
              <br />
              향은 고요하게 잔 안에 머뭅니다.
              <br />
              한 모금마다 깊은 여운이 이어지며
              <br />
              겨울의 풍경을 천천히 펼쳐냅니다.
            </p>
            <Button
              className="season-tea-winter__button"
              variant="classMore"
              type="button"
              onClick={() => setActiveTeaDetail(winterTeaDetail)}
            >
              차 특징 보기
            </Button>
          </div>
          <div
            className={[
              "season-tea-winter__media",
              "season-tea-image-reveal",
              activeSeasonTeaImages.winter && "is-active",
            ].filter(Boolean).join(" ")}
            ref={setSeasonTeaImageRef("winter")}
            data-season-tea="winter"
          >
            <img
              className="season-tea-winter__image"
              src={winterTeaImage}
              alt="우롱차 한 잔과 찻잎"
            />
          </div>
        </div>
      </section>
      </div>

      {activeTeaDetail && (
        <SeasonTeaDetailModal
          isOpen
          onClose={() => setActiveTeaDetail(null)}
          data={activeTeaDetail}
        />
      )}

      <Footer />
    </main>
  );
}

export default SeasonTeaPage;
