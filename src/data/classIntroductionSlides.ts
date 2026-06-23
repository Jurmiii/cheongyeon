import classIntro31 from "../assets/images/content-img/class-introduction-3-1.webp";
import classIntro32 from "../assets/images/content-img/class-introduction-3-2.webp";
import classIntro33 from "../assets/images/content-img/class-introduction-3-3.webp";
import classIntro34 from "../assets/images/content-img/class-introduction-3-4.webp";

export type ClassIntroductionSlideKey = "basic" | "aged" | "blending" | "private";

export interface ClassIntroductionSlide {
  id: number;
  key: ClassIntroductionSlideKey;
  filterLabel: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const classIntroductionSlides: ClassIntroductionSlide[] = [
  {
    id: 1,
    key: "basic",
    filterLabel: "기본",
    title: "기본 다도 클래스",
    description: "차 도구의 쓰임과\n기본 다도 흐름을 배우며\n일상 속 차 문화를 시작합니다.",
    image: classIntro31,
    imageAlt: "기본 다도 클래스 수업 장면",
  },
  {
    id: 2,
    key: "aged",
    filterLabel: "숙성",
    title: "숙성차 클래스",
    description: "오랜 시간 숙성된 차의 향과 맛을 느끼며 차가 지닌\n깊은 여운을 배웁니다.",
    image: classIntro32,
    imageAlt: "숙성차 클래스 수업 장면",
  },
  {
    id: 3,
    key: "blending",
    filterLabel: "블랜딩",
    title: "티 블랜더 클래스",
    description: "다양한 재료의 향과 맛을\n조합해 나만의 블렌딩 티를\n완성합니다.",
    image: classIntro33,
    imageAlt: "티 블랜더 클래스 수업 장면",
  },
  {
    id: 4,
    key: "private",
    filterLabel: "프라이빗",
    title: "프라이빗 클래스",
    description: "조용한 공간에서 취향에 맞춰\n차를 깊이 있게 경험하는 1:1 수업입니다.",
    image: classIntro34,
    imageAlt: "프라이빗 클래스 수업 장면",
  },
];
