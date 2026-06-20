import { useEffect, useRef, useState } from "react";
import mainBg1 from "../assets/images/bg/main-bg1.png";
import mainBg2 from "../assets/images/bg/main-bg2.png";
import mainKv1 from "../assets/images/bg/main-kv1.png";
import mainKv2 from "../assets/images/bg/main-kv2.png";
import mainKv3 from "../assets/images/bg/main-kv3.png";
import fall from "../assets/images/content-img/fall.png";
import spring from "../assets/images/content-img/spring.png";
import summer from "../assets/images/content-img/summer.png";
import winter from "../assets/images/content-img/winter.png";
import kvTitle from "../assets/images/svg/kv-title.svg";
import line1 from "../assets/images/svg/line1.svg";
import line2 from "../assets/images/svg/line2.svg";
import line3 from "../assets/images/svg/line3.svg";
import mark from "../assets/images/svg/mark.svg";
import symbolBlack from "../assets/images/svg/symbol-black.svg";
import symbol1 from "../assets/images/svg/symbol1.svg";
import { Header } from "../components/common";
import "./MainPage.scss";

interface MainKvSlide {
  id: number;
  image: string;
}

type SeasonKey = "spring" | "summer" | "fall" | "winter";

const mainKvSlides: MainKvSlide[] = [
  { id: 1, image: mainKv1 },
  { id: 2, image: mainKv2 },
  { id: 3, image: mainKv3 },
];

const slideInterval = 5000;
const initialActiveSeasons: Record<SeasonKey, boolean> = {
  spring: false,
  summer: false,
  fall: false,
  winter: false,
};

export default function MainPage() {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [activeSeasons, setActiveSeasons] = useState<Record<SeasonKey, boolean>>(initialActiveSeasons);
  const seasonImageRefs = useRef<Record<SeasonKey, HTMLDivElement | null>>({
    spring: null,
    summer: null,
    fall: null,
    winter: null,
  });
  const activeSlide = mainKvSlides[activeSlideIndex];
  const currentPage = String(activeSlide.id).padStart(2, "0");

  const setSeasonImageRef = (season: SeasonKey) => (node: HTMLDivElement | null) => {
    seasonImageRefs.current[season] = node;
  };

  const getSeasonImageClassName = (season: SeasonKey, className: string) =>
    ["main-sec3__ink-image", className, activeSeasons[season] && "is-active"].filter(Boolean).join(" ");

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % mainKvSlides.length);
    }, slideInterval);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const season = entry.target.getAttribute("data-season") as SeasonKey | null;

          if (!season) {
            return;
          }

          setActiveSeasons((currentSeasons) => {
            if (currentSeasons[season]) {
              return currentSeasons;
            }

            return {
              ...currentSeasons,
              [season]: true,
            };
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    Object.values(seasonImageRefs.current).forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="main-page">
      <div className="main-page__header">
        <Header />
      </div>
      <section className="main-sec1" aria-label="청연 메인 키비주얼">
        {mainKvSlides.map((slide, index) => (
          <div
            className={["main-sec1__background", index === activeSlideIndex && "main-sec1__background--active"]
              .filter(Boolean)
              .join(" ")}
            key={slide.id}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden="true"
          />
        ))}
        <div className="main-sec1__grid">
          <div className="main-sec1__content">
            <img className="main-sec1__kv-title" src={kvTitle} alt="청연" />
            <h1 className="main-sec1__title ft-48b ink500">
              차를 우리는 순간,
              <br />
              시간은 천천히 흐른다
            </h1>
            <img className="main-sec1__symbol" src={symbol1} alt="" aria-hidden="true" />
            <p className="main-sec1__description ft-28r ink500">
              계절과 자연이 머무는
              <br />
              프리미엄 티 익스피리언스
            </p>
            <div className="main-sec1__progress" aria-label={`${currentPage} / 03`}>
              <span className="ft-18r ink500">{currentPage}</span>
              <span className="main-sec1__progress-line ink500" aria-hidden="true" />
              <span className="ft-18r ink500">03</span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-sec2" style={{ backgroundImage: `url(${mainBg1})` }} aria-label="차와 함께하는 고요한 쉼">
        <div className="main-sec2__grid">
          <div className="main-sec2__content">
            <h2 className="ft-48b ink50">
              차와 함께하는
              <br />
              고요한 쉼
            </h2>
            <p className="main-sec2__text-first ft-28r ink50">
              차는 단순한 음료가 아니라
              <br />
              삶의 여유입니다.
            </p>
            <p className="main-sec2__text-second ft-28r ink50">
              지금 이 순간을 온전히
              <br />
              느껴보세요.
            </p>
          </div>
        </div>
      </section>
      <section className="main-sec3" style={{ backgroundImage: `url(${mainBg2})` }} aria-label="사계절 다도 원데이 클래스">
        <div className="main-sec3__grid">
          <div className="main-sec3__intro">
            <h2 className="ft-64b ink500">
              사계절 다도
              <br />
              원데이 클래스
            </h2>
            <p className="main-sec3__description ft-36r ink500">
              계절의 흐름을 따라 차와 함께하는 하루,
              <br />
              자연의 색과 향을 오롯이 느끼는 시간입니다.
            </p>
            <img className="main-sec3__mark" src={mark} alt="" aria-hidden="true" />
          </div>
        </div>
        <div className="main-sec3__spring">
          <div className="main-sec3__spring-text">
            <p className="ft-48b ink500">봄</p>
            <img className="main-sec3__spring-symbol" src={symbol1} alt="" aria-hidden="true" />
            <p className="main-sec3__spring-description ft-28r ink500">
              새싹이 돋는 계절, 향기로운 봄내음이
              <br />
              몸과 마음에 생기를 더합니다.
            </p>
          </div>
          <div className="main-sec3__spring-composition">
            <img className="main-sec3__spring-line" src={line1} alt="" aria-hidden="true" />
            <img className="main-sec3__spring-symbol-black" src={symbolBlack} alt="" aria-hidden="true" />
            <div
              className={getSeasonImageClassName("spring", "main-sec3__spring-ink")}
              ref={setSeasonImageRef("spring")}
              data-season="spring"
            >
              <img className="main-sec3__spring-image" src={spring} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="main-sec3__summer">
          <div className="main-sec3__summer-text">
            <p className="ft-48b ink500">여름</p>
            <img className="main-sec3__summer-symbol" src={symbol1} alt="" aria-hidden="true" />
            <p className="main-sec3__summer-description ft-28r ink500">
              더위에 지친 마음을 맑게 씻어주는
              <br />
              시원함을 가득 안겨드립니다
            </p>
          </div>
          <div className="main-sec3__summer-composition">
            <div
              className={getSeasonImageClassName("summer", "main-sec3__summer-ink")}
              ref={setSeasonImageRef("summer")}
              data-season="summer"
            >
              <img className="main-sec3__summer-image" src={summer} alt="" aria-hidden="true" />
            </div>
            <img className="main-sec3__summer-symbol-black" src={symbolBlack} alt="" aria-hidden="true" />
            <img className="main-sec3__summer-line" src={line2} alt="" aria-hidden="true" />
          </div>
        </div>
        <div className="main-sec3__fall">
          <div className="main-sec3__fall-text">
            <p className="ft-48b ink500">가을</p>
            <img className="main-sec3__fall-symbol" src={symbol1} alt="" aria-hidden="true" />
            <p className="main-sec3__fall-description ft-28r ink500">
              익어가는 계절, 깊고 풍부한 차향이
              <br />
              내면의 여유와 성찰을 선물합니다.
            </p>
          </div>
          <div className="main-sec3__fall-composition">
            <img className="main-sec3__fall-line" src={line3} alt="" aria-hidden="true" />
            <img className="main-sec3__fall-symbol-black" src={symbolBlack} alt="" aria-hidden="true" />
            <div
              className={getSeasonImageClassName("fall", "main-sec3__fall-ink")}
              ref={setSeasonImageRef("fall")}
              data-season="fall"
            >
              <img className="main-sec3__fall-image" src={fall} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="main-sec3__winter">
          <div className="main-sec3__winter-text">
            <p className="ft-48b ink500">겨울</p>
            <img className="main-sec3__winter-symbol" src={symbol1} alt="" aria-hidden="true" />
            <p className="main-sec3__winter-description ft-28r ink500">
              몸과 마음을 녹이고 새로운 계절을
              <br />
              준비하는 시간을 갖습니다.
            </p>
          </div>
          <div className="main-sec3__winter-composition">
            <div
              className={getSeasonImageClassName("winter", "main-sec3__winter-ink")}
              ref={setSeasonImageRef("winter")}
              data-season="winter"
            >
              <img className="main-sec3__winter-image" src={winter} alt="" aria-hidden="true" />
            </div>
            <img className="main-sec3__winter-symbol-black" src={symbolBlack} alt="" aria-hidden="true" />
          </div>
        </div>
      </section>
    </main>
  );
}
