import classCarouselVideo2 from "../assets/images/08class/class-4-2.mp4";
import classCarouselVideo3 from "../assets/images/08class/class4-3.mp4";
import classCarouselVideo4 from "../assets/images/08class/class4-4.mp4";

export interface ClassIntroductionCarouselItem {
  id: number;
  title: string;
  description?: string;
  /** 준비하기는 영상 미제공 — 나머지 단계만 mp4 연결 */
  video?: string;
}

export const classIntroductionCarouselItems: ClassIntroductionCarouselItem[] = [
  {
    id: 1,
    title: "준비하기",
    description: "다구를 정돈하고\n오늘의 차를 만납니다",
  },
  {
    id: 2,
    title: "찻잎 살펴보기",
    description: "찻잎의 색과 향, 형태를\n관찰하며 차의 특징을 알아봅니다.",
    video: classCarouselVideo2,
  },
  {
    id: 3,
    title: "차 우려내기",
    description: "온도와 시간을 조절하며\n나만의 차를 우려냅니다.",
    video: classCarouselVideo3,
  },
  {
    id: 4,
    title: "차 음미하기",
    description: "차의 향과 맛을 음미하며\n마음을 천천히 채웁니다.",
    video: classCarouselVideo4,
  },
];
