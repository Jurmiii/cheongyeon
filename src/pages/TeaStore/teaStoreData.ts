import sec8Image1 from "../../assets/images/06tea-store/sec8-1.webp";import sec8Image2 from "../../assets/images/06tea-store/sec8-2.webp";
import sec8Image3 from "../../assets/images/06tea-store/sec8-3.webp";
import sec8Image4 from "../../assets/images/06tea-store/sec8-4.webp";
import greenTeaLeaf from "../../assets/images/06tea-store/g-tea.webp";
import greenTeaCup from "../../assets/images/06tea-store/g-tea-h.webp";
import whiteTeaLeaf from "../../assets/images/06tea-store/w-tea.webp";
import whiteTeaCup from "../../assets/images/06tea-store/w-tea-h.webp";
import oolongTeaLeaf from "../../assets/images/06tea-store/o-tea.webp";
import oolongTeaCup from "../../assets/images/06tea-store/o-tea-h.webp";
import blackTeaLeaf from "../../assets/images/06tea-store/b-tea.webp";
import blackTeaCup from "../../assets/images/06tea-store/b-tea-h.webp";
import darkTeaLeaf from "../../assets/images/06tea-store/d-tea.webp";
import darkTeaCup from "../../assets/images/06tea-store/d-tea-h.webp";

export type TeaStoreType = {
  id: string;
  name: string;
  tagline: string;
  leafImage: string;
  cupImage: string;
  description: string;
};

export type TeaStoreSeason = {
  id: string;
  image: string;
  description: string;
};

export const teaStoreSeasons: TeaStoreSeason[] = [
  {
    id: "spring",
    image: sec8Image1,
    description:
      "차밭에 새롭게 돋아나는\n찻잎의 향을 느끼며\n생명의 기운을 받아보세요",
  },
  {
    id: "summer",
    image: sec8Image2,
    description:
      "푸르름이 짙어지는 계절,\n차의 맛과 향이\n가장 깊어집니다.",
  },
  {
    id: "autumn",
    image: sec8Image3,
    description:
      "신선한 바람이 차향을\n더욱 깊게 만들고,\n마음까지 풍요로워집니다.",
  },
  {
    id: "winter",
    image: sec8Image4,
    description:
      "차와 자연이 잠시 쉬어가는\n시간, 고요한 청연에서\n몸도 마음도 쉬어갑니다.",
  },
];

export const teaStoreTypes: TeaStoreType[] = [
  {
    id: "green",
    name: "녹차",
    tagline: "맑고 산뜻한 차",
    leafImage: greenTeaLeaf,
    cupImage: greenTeaCup,
    description:
      "부분 발효를 통해 꽃향과 과일향이\n살아나며, 풍부한 향과\n부드러운 맛이 조화를 이룹니다",
  },
  {
    id: "white",
    name: "백차",
    tagline: "은은하고 부드러운 차",
    leafImage: whiteTeaLeaf,
    cupImage: whiteTeaCup,
    description:
      "어린 찻잎을 자연스럽게 말려\n만든 차로, 맑고 섬세한 향을\n느낄 수 있습니다.",
  },
  {
    id: "oolong",
    name: "청차",
    tagline: "은은한 꽃향의 차",
    leafImage: oolongTeaLeaf,
    cupImage: oolongTeaCup,
    description:
      "녹차의 맑음과 홍차의 깊이를\n함께 지닌 차로, 은은한 향과\n부드러운 풍미가 오래 이어집니다.",
  },
  {
    id: "black",
    name: "홍차",
    tagline: "향이 깊은 차",
    leafImage: blackTeaLeaf,
    cupImage: blackTeaCup,
    description:
      "부분 발효를 통해 꽃향과 과일향이\n살아나며, 풍부한 향과 부드러운 맛\n이 조화를 이룹니다.",
  },
  {
    id: "dark",
    name: "흑차",
    tagline: "깊고 진한 차",
    leafImage: darkTeaLeaf,
    cupImage: darkTeaCup,
    description:
      "충분히 발효된 찻잎으로\n만든 차로, 진한 향과 묵직한\n맛이 특징입니다.",
  },
];
