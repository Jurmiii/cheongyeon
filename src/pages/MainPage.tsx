import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type TouchEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import aboutVideo from "../assets/images/01main/about.webm";
import mainIntroVideo from "../assets/images/01main/main-intro.webm";
import mainBg2 from "../assets/images/01main/main-bg2.webp";
import mainBg3 from "../assets/images/01main/main-bg3.webp";
import mainCtaBg from "../assets/images/01main/main-cta-bg.webp";
import mainKv1 from "../assets/images/01main/main-kv1.webp";
import mainKv2 from "../assets/images/01main/main-kv2.webp";
import mainKv3 from "../assets/images/01main/main-kv3.webp";
import eventBanner1 from "../assets/images/01main/event-banner1.webp";
import eventBanner2 from "../assets/images/01main/event-banner2.webp";
import eventBanner3 from "../assets/images/01main/event-banner3.webp";
import eventBanner4 from "../assets/images/01main/event-banner4.webp";
import eventBanner5 from "../assets/images/01main/event-banner5.webp";
import eventBanner6 from "../assets/images/01main/event-banner6.webp";
import fallBg from "../assets/images/01main/fall-bg.webp";
import leftImage from "../assets/images/01main/left.webp";
import class1 from "../assets/images/01main/class1.webp";
import class2 from "../assets/images/01main/class2.webp";
import class3 from "../assets/images/01main/class3.webp";
import class4 from "../assets/images/01main/class4.webp";
import fall from "../assets/images/01main/fall.webp";
import rightImage from "../assets/images/01main/right.webp";
import spring from "../assets/images/01main/spring.webp";
import springBg from "../assets/images/01main/spring-bg.webp";
import summer from "../assets/images/01main/summer.webp";
import summerBg from "../assets/images/01main/summer-bg.webp";
import tea1 from "../assets/images/01main/tea1.webp";
import tea2 from "../assets/images/01main/tea2.webp";
import tea3 from "../assets/images/01main/tea3.webp";
import tea4 from "../assets/images/01main/tea4.webp";
import tea5 from "../assets/images/01main/tea5.webp";
import winter from "../assets/images/01main/winter.webp";
import winterBg from "../assets/images/01main/winter-bg.webp";
import kvTitle from "../assets/images/01main/kv-title.svg";
import centerLine from "../assets/images/01main/center-line.svg";
import chajeomIcon from "../assets/images/01main/chajeom-icon.svg";
import dado1 from "../assets/images/01main/dado1.webp";
import dado2 from "../assets/images/01main/dado2.webp";
import dado3 from "../assets/images/01main/dado3.webp";
import dado4 from "../assets/images/01main/dado4.webp";
import dado5 from "../assets/images/01main/dado5.webp";
import dado6 from "../assets/images/01main/dado6.webp";
import dasilIcon from "../assets/images/01main/dasil-icon.svg";
import fallBg2 from "../assets/images/01main/fall-bg2.svg";
import fallPot from "../assets/images/01main/fall-tea.webp";
import line1Raw from "../assets/images/01main/line1.svg?raw";
import line2Raw from "../assets/images/01main/line2.svg?raw";
import line3Raw from "../assets/images/01main/line3.svg?raw";
import line4Raw from "../assets/images/01main/line4.svg?raw";
import mark from "../assets/images/01main/mark.svg";
import springBg2 from "../assets/images/01main/spring-bg2.svg";
import springPot from "../assets/images/01main/spring-tea.webp";
import symbolBlack from "../assets/images/01main/symbol-black.svg";
import symbol1 from "../assets/images/01main/symbol1.svg";
import summerBg2 from "../assets/images/01main/summer-bg2.svg";
import summerPot from "../assets/images/01main/summer-tea.webp";
import winterBg2 from "../assets/images/01main/winter-bg2.svg";
import winterPot from "../assets/images/01main/winter-tea.webp";
import { Footer, Header, Icon } from "../components/common";
import ProductContentBox from "../components/common/ProductContentBox";
import "./MainPage.scss";

interface MainKvSlide {
  id: number;
  image: string;
}

interface MainClassCard {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface MainProduct {
  id: number;
  image: string;
  name: string;
  capacity: string;
  price: string;
}

interface MainSeasonTeaSlide {
  id: number;
  key: SeasonKey;
  page: string;
  verticalTitle: string;
  title: string;
  description: string;
  baseBg: string;
  floatingBg: string;
  pot: string;
}

interface MainEventSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface MainReview {
  id: number;
  image: string;
  category: string;
  author: string;
  review: string;
}

type SeasonKey = "spring" | "summer" | "fall" | "winter";

const mainKvSlides: MainKvSlide[] = [
  { id: 1, image: mainKv1 },
  { id: 2, image: mainKv2 },
  { id: 3, image: mainKv3 },
];

const mainClassCards: MainClassCard[] = [
  {
    id: 1,
    image: class1,
    title: "기본 다도 클래스",
    description: "다도의 기본 예절과 도구 사용법을 배우는시간",
  },
  {
    id: 2,
    image: class2,
    title: "티 블렌더 클래스",
    description: "나만의 시그니처 블렌딩을 만들어보는 시간",
  },
  {
    id: 3,
    image: class3,
    title: "숙성차 클래스",
    description: "시간이 만든 깊은 풍미를 천천히 음미하는 시간",
  },
  {
    id: 4,
    image: class4,
    title: "프라이빗 클래스",
    description: "1:1 맞춤 지도 깊이 있는 다도를 경험하는 시간",
  },
];

const mainProducts: MainProduct[] = [
  { id: 1, image: tea1, name: "녹차 (綠茶)", capacity: "100g", price: "54,000원" },
  { id: 2, image: tea2, name: "백차 (白茶)", capacity: "100g", price: "54,000원" },
  { id: 3, image: tea3, name: "청차 (靑茶)", capacity: "100g", price: "40,200원" },
  { id: 4, image: tea4, name: "홍차 (紅茶)", capacity: "100g", price: "25,100원" },
  { id: 5, image: tea5, name: "흑차 (黑茶)", capacity: "100g", price: "47,800원" },
];

const mainSeasonTeaSlides: MainSeasonTeaSlide[] = [
  {
    id: 1,
    key: "spring",
    page: "01",
    verticalTitle: "동백꽃차",
    title: "동백꽃차",
    description: "봄의 첫 설렘을 담은 한 잔\n은은한 꽃향기와 부드러운\n여운이 머무는 동백꽃차",
    baseBg: springBg,
    floatingBg: springBg2,
    pot: springPot,
  },
  {
    id: 2,
    key: "summer",
    page: "02",
    verticalTitle: "냉녹차",
    title: "냉녹차",
    description: "여름의 열기를 내려놓는\n시간 맑고 깊은 풍미가\n머무는 한 잔의 여유",
    baseBg: summerBg,
    floatingBg: summerBg2,
    pot: summerPot,
  },
  {
    id: 3,
    key: "fall",
    page: "03",
    verticalTitle: "국화차",
    title: "국화차",
    description: "들꽃이 머무는 계절\n가을을 가장 맑게 담은\n국화의 향",
    baseBg: fallBg,
    floatingBg: fallBg2,
    pot: fallPot,
  },
  {
    id: 4,
    key: "winter",
    page: "04",
    verticalTitle: "우롱차",
    title: "우롱차",
    description: "산안개 머금은 찻잎이\n은은한 향으로 피어나는\n우롱의 시간",
    baseBg: winterBg,
    floatingBg: winterBg2,
    pot: winterPot,
  },
];

const mainEventSlides: MainEventSlide[] = [
  {
    id: 1,
    image: eventBanner1,
    title: "청연의 생일 이벤트",
    description: "1주년을 기념하여 선착순 50분께\n청연 다기 세트 증정",
  },
  {
    id: 2,
    image: eventBanner2,
    title: "한여름 저녁 다회",
    description: "은은한 조명 아래 즐기는 계절 찻자리\n여름밤을 위한 특별한 다회",
  },
  {
    id: 3,
    image: eventBanner3,
    title: "함께하는 찻자리",
    description: "2인 동반 예약 시\n동행 고객 10% 할인 혜택",
  },
  {
    id: 4,
    image: eventBanner4,
    title: "티 페어링 이벤트",
    description: "디저트와 차의 조화를 배우는 시간\n감각적인 티 페어링 클래스",
  },
  {
    id: 5,
    image: eventBanner5,
    title: "티하우스 방문 이벤트",
    description: "매 계절 달라지는 계절차를\n무료로 경험해보세요",
  },
  {
    id: 6,
    image: eventBanner6,
    title: "SNS 인증 이벤트",
    description: "SNS 청연 태그 후 리뷰 작성 시\n미니 티 셀렉션 증정",
  },
];

const mainReviews: MainReview[] = [
  {
    id: 1,
    image: dado1,
    category: "[숙성 차_클래스]",
    author: "노*지",
    review: "시간이 만든 풍미를 이해할 수 있었던\n특별한 수업이었습니다.\n데이트로 추천합니다~",
  },
  {
    id: 2,
    image: dado2,
    category: "[티 블렌더_클래스]",
    author: "신*원",
    review: "직접 향을 조합하며, 나만의 차를 만들\n어보는 과정이 정말 흥미로웠습니다.\n선물용으로도 좋았어요.",
  },
  {
    id: 3,
    image: dado3,
    category: "[기본 다도_클래스]",
    author: "문*주",
    review: "차를 마시는 방법보다 차와 마주하는\n시간을 배우는 경험이었습니다.\n조용히 집중할 수 있어서 좋았어요.",
  },
  {
    id: 4,
    image: dado4,
    category: "[숙성 차_클래스]",
    author: "김*연",
    review: "같은 차라도 숙성에 따라 달라지는\n향과 맛이 인상적이었습니다.\n차를 더 깊게 즐길 수 있게 되었어요 :)",
  },
  {
    id: 5,
    image: dado5,
    category: "[티 블렌더_클래스]",
    author: "하*욱",
    review: "평소 좋아하던 향과 생각하지 못했던\n향을 조합하며 저의 차 취향을 새롭게\n발견한 시간이었습니다.",
  },
  {
    id: 6,
    image: dado6,
    category: "[기본 다도_클래스]",
    author: "나*승",
    review: "평소 차를 잘 몰랐는데 기초부터 차근\n차근 배울 수 있어 부담이 없었습니다.\n차에 대한 시선이 달라졌어요.",
  },
];

const slideInterval = 5000;
const sec5CarouselDuration = 24000;
const sec9CarouselDuration = 24000;
const sec8SlideInterval = 5000;
const carouselGroupGapRem = 1.5;
const initialActiveSeasons: Record<SeasonKey, boolean> = {
  spring: false,
  summer: false,
  fall: false,
  winter: false,
};

function ProductCard({ product }: { product: MainProduct }) {
  return (
    <ProductContentBox
      className="main-sec5__product-card"
      image={product.image}
      name={product.name}
      capacity={product.capacity}
      price={product.price}
    />
  );
}

function ReviewCard({ review }: { review: MainReview }) {
  return (
    <article className="main-sec9__review-card">
      <img className="main-sec9__review-image" src={review.image} alt="" aria-hidden="true" />
      <div className="main-sec9__review-overlay ft-18r white">
        <p>{review.category}</p>
        <div className="main-sec9__review-meta">
          <span>★★★★★</span>
          <span>{review.author}</span>
        </div>
        <p className="main-sec9__review-text">
          {review.review.split("\n").map((line, index) => (
            <span key={`${review.id}-${index}`}>
              {line}
              {index < review.review.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}

function getSvgViewBox(svgOpenTag: string) {
  const viewBox = svgOpenTag.match(/\sviewBox="([^"]+)"/)?.[1]?.split(/\s+/).map(Number);

  if (viewBox?.length === 4 && viewBox.every((value) => !Number.isNaN(value))) {
    const [x, y, width, height] = viewBox;

    return { x, y, width, height };
  }

  const width = Number(svgOpenTag.match(/\swidth="([^"]+)"/)?.[1] ?? 0);
  const height = Number(svgOpenTag.match(/\sheight="([^"]+)"/)?.[1] ?? 0);

  return { x: 0, y: 0, width, height };
}

type DrawLineDirection = "vertical" | "horizontal";

function getDrawLineSvg(svgSource: string, maskId: string, direction: DrawLineDirection) {
  const svgOpenMatch = svgSource.match(/<svg\b[^>]*>/);

  if (!svgOpenMatch) {
    return svgSource;
  }

  const svgOpenTag = svgOpenMatch[0];
  const viewBox = getSvgViewBox(svgOpenTag);
  const revealMask = direction === "horizontal"
    ? `<defs><mask id="${maskId}" maskUnits="userSpaceOnUse"><rect class="main-sec3__draw-mask-rect" data-draw-direction="${direction}" data-reveal-width="${viewBox.width}" x="${viewBox.x}" y="${viewBox.y}" width="0" height="${viewBox.height}" fill="#fff" /></mask></defs><g mask="url(#${maskId})">`
    : `<defs><mask id="${maskId}" maskUnits="userSpaceOnUse"><rect class="main-sec3__draw-mask-rect" data-draw-direction="${direction}" data-reveal-height="${viewBox.height}" x="${viewBox.x}" y="${viewBox.y}" width="${viewBox.width}" height="0" fill="#fff" /></mask></defs><g mask="url(#${maskId})">`;
  const svgWithAttributes = svgSource.replace(
    svgOpenTag,
    svgOpenTag.replace("<svg", '<svg class="main-sec3__line-inner" aria-hidden="true" focusable="false"'),
  );

  return svgWithAttributes
    .replace(
      svgOpenTag.replace("<svg", '<svg class="main-sec3__line-inner" aria-hidden="true" focusable="false"'),
      `${svgOpenTag.replace("<svg", '<svg class="main-sec3__line-inner" aria-hidden="true" focusable="false"')}${revealMask}`,
    )
    .replace(/<\/svg>\s*$/, "</g></svg>");
}

function DrawLineSvg({
  className,
  direction = "vertical",
  maskId,
  svgSource,
}: {
  className: string;
  direction?: DrawLineDirection;
  maskId: string;
  svgSource: string;
}) {
  return (
    <span
      className={`${className} main-sec3__line-svg`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: getDrawLineSvg(svgSource, maskId, direction) }}
    />
  );
}

const MAIN_INTRO_SESSION_KEY = "cheongyeon-main-intro-seen";

function hasMainIntroBeenSeen() {
  try {
    return window.sessionStorage.getItem(MAIN_INTRO_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markMainIntroAsSeen() {
  try {
    window.sessionStorage.setItem(MAIN_INTRO_SESSION_KEY, "true");
  } catch {
    // Ignore storage failures and keep the intro behavior in memory only.
  }
}

export default function MainPage() {
  const [hasSeenIntroAtMount] = useState(() => hasMainIntroBeenSeen());
  const [isIntroEnded, setIsIntroEnded] = useState(hasSeenIntroAtMount);
  const [isScrollReleased, setIsScrollReleased] = useState(hasSeenIntroAtMount);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [sec1ProgressCycle, setSec1ProgressCycle] = useState<number>(0);
  const [activeSeasons, setActiveSeasons] = useState<Record<SeasonKey, boolean>>(initialActiveSeasons);
  const [sec5Carousel, setSec5Carousel] = useState<{ progress: number; translate: number }>({
    progress: 0,
    translate: 0,
  });
  const [sec9Carousel, setSec9Carousel] = useState<{ progress: number; translate: number }>({
    progress: 0,
    translate: 0,
  });
  const [activeSec6Index, setActiveSec6Index] = useState<number>(0);
  const [activeSec8Index, setActiveSec8Index] = useState<number>(0);
  const [sec8DragOffset, setSec8DragOffset] = useState<number>(0);
  const [isSec8Dragging, setIsSec8Dragging] = useState<boolean>(false);
  const [sec8AutoPlayResetKey, setSec8AutoPlayResetKey] = useState<number>(0);
  const [isSec5Dragging, setIsSec5Dragging] = useState<boolean>(false);
  const [isSec9Dragging, setIsSec9Dragging] = useState<boolean>(false);
  const sec4Ref = useRef<HTMLElement | null>(null);
  const sec4TrackRef = useRef<HTMLDivElement | null>(null);
  const sec5ProductGroupRef = useRef<HTMLDivElement | null>(null);
  const sec5AnimationFrameRef = useRef<number>(0);
  const sec5StartTimeRef = useRef<number>(0);
  const sec5PausedRef = useRef<boolean>(false);
  const sec5PauseStartedRef = useRef<number>(0);
  const sec5DragStartXRef = useRef<number>(0);
  const sec5DragStartProgressRef = useRef<number>(0);
  const sec9ReviewGroupRef = useRef<HTMLDivElement | null>(null);
  const sec9AnimationFrameRef = useRef<number>(0);
  const sec9StartTimeRef = useRef<number>(0);
  const sec9PausedRef = useRef<boolean>(false);
  const sec9PauseStartedRef = useRef<number>(0);
  const sec9DragStartXRef = useRef<number>(0);
  const sec9DragStartProgressRef = useRef<number>(0);
  const sec8DragStartXRef = useRef<number>(0);
  const sec8LatestDragXRef = useRef<number>(0);
  const sec3Ref = useRef<HTMLElement | null>(null);
  const sec6Ref = useRef<HTMLElement | null>(null);
  const sec6OrbitRef = useRef<HTMLDivElement | null>(null);
  const seasonImageRefs = useRef<Record<SeasonKey, HTMLDivElement | null>>({
    spring: null,
    summer: null,
    fall: null,
    winter: null,
  });
  const activeSlide = mainKvSlides[activeSlideIndex];
  const currentPage = String(activeSlide.id).padStart(2, "0");
  const activeSec6Slide = mainSeasonTeaSlides[activeSec6Index];
  const activeSec8Slide = mainEventSlides[activeSec8Index];

  const finishIntro = () => {
    markMainIntroAsSeen();
    setIsIntroEnded(true);
  };

  useEffect(() => {
    if (!hasSeenIntroAtMount) {
      markMainIntroAsSeen();
    }
  }, [hasSeenIntroAtMount]);

  const setSeasonImageRef = (season: SeasonKey) => (node: HTMLDivElement | null) => {
    seasonImageRefs.current[season] = node;
  };

  const getSeasonImageClassName = (season: SeasonKey, className: string) =>
    ["main-sec3__ink-image", className, activeSeasons[season] && "is-active"].filter(Boolean).join(" ");

  const getSec8SlideOffset = (index: number) => {
    const slideCount = mainEventSlides.length;
    let offset = index - activeSec8Index;

    if (offset > slideCount / 2) {
      offset -= slideCount;
    }

    if (offset < -slideCount / 2) {
      offset += slideCount;
    }

    return offset;
  };

  const moveSec8Slide = (direction: 1 | -1) => {
    setActiveSec8Index((currentIndex) => (currentIndex + direction + mainEventSlides.length) % mainEventSlides.length);
    setSec8AutoPlayResetKey((currentKey) => currentKey + 1);
  };

  const startSec8Drag = (clientX: number) => {
    sec8DragStartXRef.current = clientX;
    sec8LatestDragXRef.current = clientX;
    setIsSec8Dragging(true);
    setSec8DragOffset(0);
  };

  const moveSec8Drag = (clientX: number) => {
    if (!isSec8Dragging) {
      return;
    }

    sec8LatestDragXRef.current = clientX;
    setSec8DragOffset(clientX - sec8DragStartXRef.current);
  };

  const endSec8Drag = () => {
    if (!isSec8Dragging) {
      return;
    }

    const deltaX = sec8LatestDragXRef.current - sec8DragStartXRef.current;
    const dragThreshold = 100;

    setIsSec8Dragging(false);
    setSec8DragOffset(0);

    if (Math.abs(deltaX) < dragThreshold) {
      setSec8AutoPlayResetKey((currentKey) => currentKey + 1);
      return;
    }

    moveSec8Slide(deltaX < 0 ? 1 : -1);
  };

  const handleSec8MouseDown = (event: MouseEvent<HTMLElement>) => {
    startSec8Drag(event.clientX);
  };

  const handleSec8MouseMove = (event: MouseEvent<HTMLElement>) => {
    moveSec8Drag(event.clientX);
  };

  const handleSec8TouchStart = (event: TouchEvent<HTMLElement>) => {
    startSec8Drag(event.touches[0].clientX);
  };

  const handleSec8TouchMove = (event: TouchEvent<HTMLElement>) => {
    moveSec8Drag(event.touches[0].clientX);
  };

  const getRootFontSize = () => parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;

  const getSec5LoopWidth = () => {
    if (!sec5ProductGroupRef.current) {
      return 0;
    }

    return sec5ProductGroupRef.current.offsetWidth + carouselGroupGapRem * getRootFontSize();
  };

  const getSec9LoopWidth = () => {
    if (!sec9ReviewGroupRef.current) {
      return 0;
    }

    return sec9ReviewGroupRef.current.offsetWidth + carouselGroupGapRem * getRootFontSize();
  };

  const getWrappedProgress = (progress: number) => ((progress % 1) + 1) % 1;

  const syncSec5Carousel = (progress: number) => {
    const now = performance.now();
    const nextProgress = getWrappedProgress(progress);
    const loopWidth = getSec5LoopWidth();

    setSec5Carousel({
      progress: nextProgress,
      translate: nextProgress * loopWidth,
    });
    sec5StartTimeRef.current = now - nextProgress * sec5CarouselDuration;

    if (sec5PausedRef.current) {
      sec5PauseStartedRef.current = now;
    }
  };

  const syncSec9Carousel = (progress: number) => {
    const now = performance.now();
    const nextProgress = getWrappedProgress(progress);
    const loopWidth = getSec9LoopWidth();

    setSec9Carousel({
      progress: nextProgress,
      translate: nextProgress * loopWidth,
    });
    sec9StartTimeRef.current = now - nextProgress * sec9CarouselDuration;

    if (sec9PausedRef.current) {
      sec9PauseStartedRef.current = now;
    }
  };

  const pauseSec5Carousel = () => {
    if (sec5PausedRef.current) {
      return;
    }

    sec5PausedRef.current = true;
    sec5PauseStartedRef.current = performance.now();
  };

  const resumeSec5Carousel = () => {
    if (!sec5PausedRef.current) {
      return;
    }

    sec5StartTimeRef.current += performance.now() - sec5PauseStartedRef.current;
    sec5PausedRef.current = false;
  };

  const pauseSec9Carousel = () => {
    if (sec9PausedRef.current) {
      return;
    }

    sec9PausedRef.current = true;
    sec9PauseStartedRef.current = performance.now();
  };

  const resumeSec9Carousel = () => {
    if (!sec9PausedRef.current) {
      return;
    }

    sec9StartTimeRef.current += performance.now() - sec9PauseStartedRef.current;
    sec9PausedRef.current = false;
  };

  const startSec5CarouselDrag = (clientX: number) => {
    pauseSec5Carousel();
    sec5DragStartXRef.current = clientX;
    sec5DragStartProgressRef.current = sec5Carousel.progress;
    setIsSec5Dragging(true);
  };

  const moveSec5CarouselDrag = (clientX: number) => {
    if (!isSec5Dragging) {
      return;
    }

    const loopWidth = getSec5LoopWidth();

    if (loopWidth <= 0) {
      return;
    }

    syncSec5Carousel(sec5DragStartProgressRef.current - (clientX - sec5DragStartXRef.current) / loopWidth);
  };

  const endSec5CarouselDrag = () => {
    if (!isSec5Dragging) {
      return;
    }

    setIsSec5Dragging(false);
    resumeSec5Carousel();
  };

  const startSec9CarouselDrag = (clientX: number) => {
    pauseSec9Carousel();
    sec9DragStartXRef.current = clientX;
    sec9DragStartProgressRef.current = sec9Carousel.progress;
    setIsSec9Dragging(true);
  };

  const moveSec9CarouselDrag = (clientX: number) => {
    if (!isSec9Dragging) {
      return;
    }

    const loopWidth = getSec9LoopWidth();

    if (loopWidth <= 0) {
      return;
    }

    syncSec9Carousel(sec9DragStartProgressRef.current - (clientX - sec9DragStartXRef.current) / loopWidth);
  };

  const endSec9CarouselDrag = () => {
    if (!isSec9Dragging) {
      return;
    }

    setIsSec9Dragging(false);
    resumeSec9Carousel();
  };

  useEffect(() => {
    if (!isIntroEnded) {
      return;
    }

    const timerId = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % mainKvSlides.length;

        if (nextIndex === 0) {
          setSec1ProgressCycle((currentCycle) => currentCycle + 1);
        }

        return nextIndex;
      });
    }, slideInterval);

    return () => {
      window.clearInterval(timerId);
    };
  }, [isIntroEnded]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;

    if (!isScrollReleased) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [isScrollReleased]);

  useEffect(() => {
    if (isSec8Dragging) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setActiveSec8Index((currentIndex) => (currentIndex + 1) % mainEventSlides.length);
    }, sec8SlideInterval);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [activeSec8Index, isSec8Dragging, sec8AutoPlayResetKey]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const season = entry.target.getAttribute("data-season") as SeasonKey | null;

          if (!season) {
            return;
          }

          const isPastFadePoint = entry.intersectionRatio >= 1 / 3;

          if (isPastFadePoint) {
            setActiveSeasons((currentSeasons) => {
              if (currentSeasons[season]) {
                return currentSeasons;
              }

              return {
                ...currentSeasons,
                [season]: true,
              };
            });

            return;
          }

          if (entry.boundingClientRect.top > 0) {
            setActiveSeasons((currentSeasons) => {
              if (!currentSeasons[season]) {
                return currentSeasons;
              }

              return {
                ...currentSeasons,
                [season]: false,
              };
            });
          }
        });
      },
      { threshold: 1 / 3 },
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const section = sec3Ref.current;

      if (!section) {
        return;
      }

      const lineSelectors = [
        ".main-sec3__spring-line",
        ".main-sec3__summer-line",
        ".main-sec3__fall-line",
        ".main-sec3__line4",
      ];
      const drawLines = lineSelectors
        .map((selector) => {
          const lineElement = section.querySelector<HTMLElement>(selector);
          const rect = lineElement?.querySelector<SVGRectElement>(".main-sec3__draw-mask-rect") ?? null;

          return lineElement && rect ? { lineElement, rect } : null;
        })
        .filter((line): line is { lineElement: HTMLElement; rect: SVGRectElement } => line !== null);

      if (drawLines.length === 0) {
        return;
      }

      drawLines.forEach(({ rect }) => {
        const drawDirection = rect.dataset.drawDirection as DrawLineDirection | undefined;
        const isHorizontal = drawDirection === "horizontal";

        gsap.set(rect, {
          attr: isHorizontal ? { width: 0 } : { height: 0 },
          transformOrigin: isHorizontal ? "0% 50%" : "50% 0%",
        });
      });

      const lineTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: drawLines[0].lineElement,
          start: "top 78%",
          endTrigger: drawLines[drawLines.length - 1].lineElement,
          end: "bottom 58%",
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      drawLines.forEach(({ rect }) => {
        const drawDirection = rect.dataset.drawDirection as DrawLineDirection | undefined;
        const revealHeight = Number(rect.dataset.revealHeight ?? 0);
        const revealWidth = Number(rect.dataset.revealWidth ?? 0);
        const isHorizontal = drawDirection === "horizontal";

        lineTimeline.to(
          rect,
          {
            attr: isHorizontal ? { width: revealWidth } : { height: revealHeight },
            ease: "none",
            duration: 1,
          },
        );
      });
    }, sec3Ref);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const section = sec4Ref.current;
      const track = sec4TrackRef.current;

      if (!section || !track) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>(".main-sec4__card", section);
      const getTravelDistance = () => {
        const previousCard = cards[cards.length - 2];
        const lastCard = cards[cards.length - 1];

        if (!previousCard || !lastCard) {
          return Math.max(track.scrollWidth - section.clientWidth, 0);
        }

        const finalPairCenter = (previousCard.offsetLeft + lastCard.offsetLeft + lastCard.offsetWidth) / 2;

        return Math.max(finalPairCenter - section.clientWidth / 2, 0);
      };
      const getRootFontSize = () => parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
      const getPinDistance = () => Math.max((getTravelDistance() + window.innerHeight) * 1.25, 180 * getRootFontSize());
      const introHoldDuration = 0.28;
      const slideDuration = 0.82;
      const holdDuration = 0.18;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getPinDistance()}`,
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(
        { progress: 0 },
        {
          progress: 1,
          ease: "none",
          duration: introHoldDuration,
        },
      );
      timeline.to(
        track,
        {
          x: () => -getTravelDistance(),
          ease: "none",
          duration: slideDuration,
        },
      );
      timeline.to(
        { progress: 0 },
        {
          progress: 1,
          ease: "none",
          duration: holdDuration,
        },
      );
    }, sec4Ref);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    const animateCarousel = (timestamp: number) => {
      if (!sec5StartTimeRef.current) {
        sec5StartTimeRef.current = timestamp;
      }

      if (!sec5PausedRef.current && sec5ProductGroupRef.current) {
        const loopWidth = getSec5LoopWidth();
        const elapsed = (timestamp - sec5StartTimeRef.current) % sec5CarouselDuration;
        const progress = elapsed / sec5CarouselDuration;

        setSec5Carousel({
          progress,
          translate: progress * loopWidth,
        });
      }

      sec5AnimationFrameRef.current = window.requestAnimationFrame(animateCarousel);
    };

    sec5AnimationFrameRef.current = window.requestAnimationFrame(animateCarousel);

    return () => {
      window.cancelAnimationFrame(sec5AnimationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const animateCarousel = (timestamp: number) => {
      if (!sec9StartTimeRef.current) {
        sec9StartTimeRef.current = timestamp;
      }

      if (!sec9PausedRef.current && sec9ReviewGroupRef.current) {
        const loopWidth = getSec9LoopWidth();
        const elapsed = (timestamp - sec9StartTimeRef.current) % sec9CarouselDuration;
        const progress = elapsed / sec9CarouselDuration;

        setSec9Carousel({
          progress,
          translate: progress * loopWidth,
        });
      }

      sec9AnimationFrameRef.current = window.requestAnimationFrame(animateCarousel);
    };

    sec9AnimationFrameRef.current = window.requestAnimationFrame(animateCarousel);

    return () => {
      window.cancelAnimationFrame(sec9AnimationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const section = sec6Ref.current;
      const orbit = sec6OrbitRef.current;

      if (!section || !orbit) {
        return;
      }

      const getStableIndex = (progress: number) => Math.min(
        mainSeasonTeaSlides.length - 1,
        Math.max(0, Math.round(progress * (mainSeasonTeaSlides.length - 1))),
      );
      let currentIndex = 0;

      gsap.set(orbit, { rotate: 0, force3D: true });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=2400",
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (progress) => getStableIndex(progress) / (mainSeasonTeaSlides.length - 1),
          delay: 0.08,
          duration: { min: 0.28, max: 0.42 },
          ease: "power3.out",
          inertia: false,
        },
        onUpdate: (self) => {
          const nextIndex = getStableIndex(self.progress);

          if (nextIndex === currentIndex) {
            return;
          }

          currentIndex = nextIndex;
          setActiveSec6Index(nextIndex);
          gsap.to(orbit, {
            rotate: -90 * nextIndex,
            duration: 0.9,
            ease: "power3.inOut",
            overwrite: "auto",
            force3D: true,
          });
        },
      });
    }, sec6Ref);

    return () => {
      context.revert();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sec3Ref.current;
    let refreshFrame = 0;
    let initialRefreshFrame = 0;

    const scheduleRefresh = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    initialRefreshFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    let resizeObserver: ResizeObserver | null = null;

    if (section) {
      resizeObserver = new ResizeObserver(scheduleRefresh);
      resizeObserver.observe(section);
    }

    window.addEventListener("load", scheduleRefresh);

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.cancelAnimationFrame(initialRefreshFrame);
      resizeObserver?.disconnect();
      window.removeEventListener("load", scheduleRefresh);
    };
  }, []);

  return (
    <main className="main-page">
      {!hasSeenIntroAtMount && (
        <div
          className={["main-intro", isIntroEnded && "main-intro--hidden"].filter(Boolean).join(" ")}
        >
          <video
            className="main-intro__video"
            src={mainIntroVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noplaybackrate"
            onEnded={finishIntro}
            onError={finishIntro}
            aria-hidden="true"
          />
          <button className="main-intro__skip ft-18r" type="button" onClick={finishIntro}>
            Skip
            <Icon name="chevron-right" />
          </button>
        </div>
      )}
      <div className="main-page__header">
        <Header />
      </div>
      <section
        className={["main-sec1", isIntroEnded && "main-sec1--revealed"].filter(Boolean).join(" ")}
        aria-label="청연 메인 키비주얼"
        onTransitionEnd={(event) => {
          if (event.currentTarget !== event.target || event.propertyName !== "opacity") {
            return;
          }

          if (isIntroEnded) {
            setIsScrollReleased(true);
            ScrollTrigger.refresh();
          }
        }}
      >
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
              <span className="main-sec1__progress-number ft-18r ink500">{currentPage}</span>
              <span
                key={sec1ProgressCycle}
                className="main-sec1__progress-line ink500"
                style={{ "--main-sec1-progress-duration": `${slideInterval * mainKvSlides.length}ms` } as CSSProperties}
                aria-hidden="true"
              />
              <span className="main-sec1__progress-number main-sec1__progress-number--end ft-18r ink500">03</span>
            </div>
          </div>
        </div>
      </section>
      <section className="main-sec2" aria-label="차와 함께하는 고요한 쉼">
        <video className="main-sec2__video" src={aboutVideo} autoPlay loop muted playsInline aria-hidden="true" />
        <div className="main-sec2__grid">
          <div className="main-sec2__content">
            <h2 className="ft-48b ink50">
              차와 함께하는
              <br />
              고요한 쉼
            </h2>
            <p className="main-sec2__text-first ft-22r ink50">
              차는 단순한 음료가 아니라
              <br />
              삶의 여유입니다.
            </p>
            <p className="main-sec2__text-second ft-22r ink50">
              지금 이 순간을 온전히
              <br />
              느껴보세요.
            </p>
          </div>
        </div>
      </section>
      <section
        className="main-sec3"
        ref={sec3Ref}
        style={{ backgroundImage: `url(${mainBg2})` }}
        aria-label="사계절 다도 원데이 클래스"
      >
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
            <DrawLineSvg
              className="main-sec3__spring-line"
              maskId="main-sec3-line1-mask"
              svgSource={line1Raw}
            />
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
            <DrawLineSvg
              className="main-sec3__summer-line"
              direction="horizontal"
              maskId="main-sec3-line2-mask"
              svgSource={line2Raw}
            />
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
            <DrawLineSvg
              className="main-sec3__fall-line"
              maskId="main-sec3-line3-mask"
              svgSource={line3Raw}
            />
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
        <DrawLineSvg
          className="main-sec3__line4"
          maskId="main-sec3-line4-mask"
          svgSource={line4Raw}
        />
      </section>
      <section className="main-sec4" ref={sec4Ref} style={{ backgroundImage: `url(${mainBg3})` }} aria-label="클래스 소개">
        <div className="main-sec4__viewport">
          <div className="main-sec4__track" ref={sec4TrackRef}>
            <div className="main-sec4__intro-panel">
              <div className="main-sec4__intro">
                <h2 className="ft-64r white">클래스 소개</h2>
                <p className="main-sec4__description ft-28r white">
                  차의 깊은 향과 마음을 다스리는 시간
                  <br />
                  다양한 경험을 통해 나만의 취향을 찾아보세요
                </p>
                <Link className="cy-button cy-button--classMore ft-18b main-sec4__button" to="/class/general">
                  클래스 더보기
                  <Icon name="chevron-right" />
                </Link>
              </div>
            </div>
            <img className="main-sec4__track-line" src={centerLine} alt="" aria-hidden="true" />
            {mainClassCards.map((card, index) => (
              <div className="main-sec4__card-group" key={card.id}>
                <article className="main-sec4__card">
                  <img className="main-sec4__card-image" src={card.image} alt="" aria-hidden="true" />
                  <div className="main-sec4__card-text">
                    <h3 className="ft-28b white">{card.title}</h3>
                    <p className="ft-22r white">{card.description}</p>
                  </div>
                </article>
                {index < mainClassCards.length - 1 && (
                  <img className="main-sec4__track-line" src={centerLine} alt="" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="main-sec5" aria-label="청연 제품 소개">
        <div className="main-sec5__left">
          <h2 className="ft-48b ink500">깊고 맑은 차의 시작</h2>
          <p className="main-sec5__description ft-28r ink500">
            청연은 좋은 산지의 찻잎과
            <br />
            시간이 빚어낸 풍미를 담아
            <br />
            한 잔의 여백을 전합니다.
          </p>
          <Link className="cy-button cy-button--classMore ft-18b main-sec5__button" to="/collection">
            청연의 제품 보기
            <Icon name="chevron-right" />
          </Link>
        </div>
        <div
          className={["main-sec5__carousel", isSec5Dragging && "main-sec5__carousel--dragging"].filter(Boolean).join(" ")}
          onMouseEnter={pauseSec5Carousel}
          onMouseLeave={() => {
            endSec5CarouselDrag();
            resumeSec5Carousel();
          }}
          onMouseDown={(event) => {
            event.preventDefault();
            startSec5CarouselDrag(event.clientX);
          }}
          onMouseMove={(event) => moveSec5CarouselDrag(event.clientX)}
          onMouseUp={endSec5CarouselDrag}
          onTouchStart={(event) => startSec5CarouselDrag(event.touches[0].clientX)}
          onTouchMove={(event) => moveSec5CarouselDrag(event.touches[0].clientX)}
          onTouchEnd={endSec5CarouselDrag}
        >
          <div className="main-sec5__carousel-viewport">
            <div className="main-sec5__carousel-track" style={{ transform: `translate3d(-${sec5Carousel.translate}px, 0, 0)` }}>
              <div className="main-sec5__product-group" ref={sec5ProductGroupRef}>
                {mainProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="main-sec5__product-group" aria-hidden="true">
                {mainProducts.map((product) => (
                  <ProductCard key={`clone-${product.id}`} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`main-sec6 main-sec6--${activeSec6Slide.key}`} ref={sec6Ref} aria-label="사계절 계절차">
        {mainSeasonTeaSlides.map((slide, index) => (
          <div
            className={["main-sec6__base-bg", index === activeSec6Index && "is-active"].filter(Boolean).join(" ")}
            key={slide.key}
            style={{ backgroundImage: `url(${slide.baseBg})` }}
            aria-hidden="true"
          />
        ))}
        {mainSeasonTeaSlides.map((slide, index) => (
          <img
            className={["main-sec6__floating-bg", index === activeSec6Index && "is-active"].filter(Boolean).join(" ")}
            key={`${slide.key}-floating`}
            src={slide.floatingBg}
            alt=""
            aria-hidden="true"
          />
        ))}
        <div className="main-sec6__title ft-96r" aria-label={activeSec6Slide.verticalTitle}>
          {activeSec6Slide.verticalTitle.split("").map((letter, index) => (
            <span key={`${letter}-${index}`}>{letter}</span>
          ))}
        </div>
        <div className="main-sec6__info">
          <div className="main-sec6__progress">
            <span className="ft-28b ink500">{activeSec6Slide.page}</span>
            <span className="main-sec6__progress-line ink500" aria-hidden="true" />
            <span className="ft-28b ink500">04</span>
          </div>
          <div className="main-sec6__copy">
            <h2 className="ft-36b ink500">{activeSec6Slide.title}</h2>
            <p className="main-sec6__description ft-22r ink500">
              {activeSec6Slide.description.split("\n").map((line, index) => (
                <span key={`${activeSec6Slide.key}-${index}`}>
                  {line}
                  {index < activeSec6Slide.description.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
            <Link className="cy-button cy-button--classMore ft-18b main-sec6__button" to="/seasontea">
              계절차 더 보기
              <Icon name="chevron-right" />
            </Link>
          </div>
        </div>
        <div className="main-sec6__orbit" ref={sec6OrbitRef} aria-hidden="true">
          {mainSeasonTeaSlides.map((slide) => (
            <div className={`main-sec6__pot-item main-sec6__pot-item--${slide.key}`} key={`${slide.key}-pot`}>
              <img className="main-sec6__pot-image" src={slide.pot} alt="" />
            </div>
          ))}
        </div>
      </section>
      <section className="main-sec7" aria-label="차점과 다실">
        <article className="main-sec7__panel" style={{ backgroundImage: `url(${leftImage})` }}>
          <div className="main-sec7__content">
            <img className="main-sec7__icon" src={chajeomIcon} alt="" aria-hidden="true" />
            <h2 className="main-sec7__title ft-48b white">차점</h2>
            <p className="main-sec7__subtitle ft-28r white">차를 발견하는 공간</p>
            <p className="main-sec7__description ft-18r white">
              청연의 차를 가장 가까이에서
              <br />
              만나보세요.
            </p>
            <Link className="cy-button cy-button--classMore ft-18b main-sec7__button" to="/brand/space">
              차점보기
              <Icon name="chevron-right" />
            </Link>
          </div>
        </article>
        <article className="main-sec7__panel" style={{ backgroundImage: `url(${rightImage})` }}>
          <div className="main-sec7__content">
            <img className="main-sec7__icon" src={dasilIcon} alt="" aria-hidden="true" />
            <h2 className="main-sec7__title ft-48b white">다실</h2>
            <p className="main-sec7__subtitle ft-28r white">차의 깊이를 경험하는 공간</p>
            <p className="main-sec7__description ft-18r white">
              다도 클래스 통해,
              <br />
              청연의 깊이를 경험해보세요.
            </p>
            <Link className="cy-button cy-button--classMore ft-18b main-sec7__button" to="/brand/space">
              다실보기
              <Icon name="chevron-right" />
            </Link>
          </div>
        </article>
      </section>
      <section
        className={["main-sec8", isSec8Dragging && "main-sec8--dragging"].filter(Boolean).join(" ")}
        aria-label="청연 이벤트"
        onMouseDown={handleSec8MouseDown}
        onMouseMove={handleSec8MouseMove}
        onMouseUp={endSec8Drag}
        onMouseLeave={endSec8Drag}
        onTouchStart={handleSec8TouchStart}
        onTouchMove={handleSec8TouchMove}
        onTouchEnd={endSec8Drag}
      >
        {mainEventSlides.map((slide, index) => (
          <div
            className="main-sec8__slide"
            key={slide.id}
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: `translateX(calc(${getSec8SlideOffset(index) * 100}% + ${sec8DragOffset}px))`,
            }}
            aria-hidden={index !== activeSec8Index}
          />
        ))}
        <div className="main-sec8__grid">
          <div className="main-sec8__content" key={activeSec8Slide.id}>
            <h2 className="ft-48b white">{activeSec8Slide.title}</h2>
            <p className="main-sec8__description ft-22b white">
              {activeSec8Slide.description.split("\n").map((line, index) => (
                <span key={`${activeSec8Slide.id}-${index}`}>
                  {line}
                  {index < activeSec8Slide.description.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
            <Link
              className="cy-button cy-button--classMore ft-18b main-sec8__button"
              to="/event/ongoing"
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
            >
              이벤트 보기
              <Icon name="chevron-right" />
            </Link>
          </div>
          <div className="main-sec8__indicator" aria-label={`${activeSec8Index + 1} / ${mainEventSlides.length}`}>
            {mainEventSlides.map((slide, index) => (
              <span
                className={["main-sec8__indicator-dot", index === activeSec8Index && "is-active"].filter(Boolean).join(" ")}
                key={`indicator-${slide.id}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="main-sec9" aria-label="청연 리뷰">
        <div className="main-sec9__left">
          <h2 className="ft-48b ink500">
            머무른 시간은
            <br />
            기억이 됩니다
          </h2>
          <p className="main-sec9__description ft-28r ink500">
            청연에서 보낸 한 시간이
            <br />
            일상 속 작은 여백으로 남은 이야기들
          </p>
        </div>
        <div
          className={["main-sec9__carousel", isSec9Dragging && "main-sec9__carousel--dragging"].filter(Boolean).join(" ")}
          onMouseEnter={pauseSec9Carousel}
          onMouseLeave={() => {
            endSec9CarouselDrag();
            resumeSec9Carousel();
          }}
          onMouseDown={(event) => {
            event.preventDefault();
            startSec9CarouselDrag(event.clientX);
          }}
          onMouseMove={(event) => moveSec9CarouselDrag(event.clientX)}
          onMouseUp={endSec9CarouselDrag}
          onTouchStart={(event) => startSec9CarouselDrag(event.touches[0].clientX)}
          onTouchMove={(event) => moveSec9CarouselDrag(event.touches[0].clientX)}
          onTouchEnd={endSec9CarouselDrag}
        >
          <div className="main-sec9__carousel-viewport">
            <div className="main-sec9__carousel-track" style={{ transform: `translate3d(-${sec9Carousel.translate}px, 0, 0)` }}>
              <div className="main-sec9__review-group" ref={sec9ReviewGroupRef}>
                {mainReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
              <div className="main-sec9__review-group" aria-hidden="true">
                {mainReviews.map((review) => (
                  <ReviewCard key={`clone-${review.id}`} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-sec10" style={{ backgroundImage: `url(${mainCtaBg})` }} aria-label="다도 클래스 예약 안내">
        <div className="main-sec10__grid">
          <div className="main-sec10__content">
            <h2 className="ft-48b ink500">
              청연에서의 한 시간,
              <br />
              일상이 달라지는 경험
            </h2>
            <p className="main-sec10__description ft-28r ink500">
              바쁜 일상에서 잠시 벗어나
              <br />
              차를 내리고 향을 음미하며 나에게
              <br />
              집중하는 시간을 경험해보세요.
            </p>
            <Link className="cy-button cy-button--classMore ft-18b main-sec10__button" to="/reservation">
              다도 클래스 예약하기
              <Icon name="chevron-right" />
            </Link>
            <p className="main-sec10__notice ft-14r ink300">* 다도 클래스는 예약제로 운영됩니다.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
