import type { CollectionTabId } from "./collectionTabs";
import greenTea1 from "../../assets/images/05collection/green-tea1.webp";
import greenTea2 from "../../assets/images/05collection/green-tea2.webp";
import greenTea3 from "../../assets/images/05collection/green-tea3.webp";
import greenTea4 from "../../assets/images/05collection/green-tea4.webp";
import whiteTea1 from "../../assets/images/05collection/white-tea1.webp";
import whiteTea2 from "../../assets/images/05collection/white-tea2.webp";
import whiteTea3 from "../../assets/images/05collection/white-tea3.webp";
import whiteTea4 from "../../assets/images/05collection/white-tea4.webp";
import oolongTea1 from "../../assets/images/05collection/oolong-tea1.webp";
import oolongTea2 from "../../assets/images/05collection/oolong-tea2.webp";
import oolongTea3 from "../../assets/images/05collection/oolong-tea3.webp";
import oolongTea4 from "../../assets/images/05collection/oolong-tea4.webp";
import blackTea1 from "../../assets/images/05collection/black-tea1.webp";
import blackTea2 from "../../assets/images/05collection/black-tea2.webp";
import blackTea3 from "../../assets/images/05collection/black-tea3.webp";
import blackTea4 from "../../assets/images/05collection/black-tea4.webp";
import darkTea1 from "../../assets/images/05collection/dark-tea1.webp";
import darkTea2 from "../../assets/images/05collection/dark-tea2.webp";
import darkTea3 from "../../assets/images/05collection/dark-tea3.webp";
import darkTea4 from "../../assets/images/05collection/dark-tea4.webp";
import bigGreenTea from "../../assets/images/05collection/big-green-tea.webp";
import bigWhiteTea from "../../assets/images/05collection/big-white-tea.webp";
import bigOolongTea from "../../assets/images/05collection/big-oolong-tea.webp";
import bigBlackTea from "../../assets/images/05collection/big-black-tea.webp";
import bigDarkTea from "../../assets/images/05collection/big-dark-tea.webp";
import bigSignature1 from "../../assets/images/05collection/big-signature1.webp";
import bigSignature2 from "../../assets/images/05collection/big-signature2.webp";
import bigSignature3 from "../../assets/images/05collection/big-signature3.webp";

export type CollectionProduct = {
  title: string;
  weight: string;
  price: string;
  summary?: string;
  description: string;
  imageSrc?: string;
};
export type CollectionCategory = {
  id: Exclude<CollectionTabId, "all">;
  title: string;
  lineupTitle: string;
  products: CollectionProduct[];
};

export const collectionCategories: CollectionCategory[] = [
  {
    id: "green",
    title: "녹차",
    lineupTitle: "청연의 녹차 라인업",
    products: [
      {
        title: "우전",
        weight: "40g",
        price: "35,000원",
        summary: "곡우 이전 첫물차",
        description: "맑고 섬세한 향과 은은한 감칠맛이 어우러집니다.\n봄의 첫 기운을 담아 깨끗한 여운을 남깁니다.",
        imageSrc: greenTea1,
      },
      {
        title: "세작",
        weight: "40g",
        price: "30,000원",
        summary: "입하 이전 어린 찻잎",
        description: "부드러운 풍미와 균형 잡힌 맛이 특징입니다.\n매일 편안하게 즐기기 좋은 녹차입니다.",
        imageSrc: greenTea2,
      },
      {
        title: "중작",
        weight: "40g",
        price: "25,000원",
        summary: "초여름의 햇살을 머금은 차",
        description: "풍부한 감칠맛과 깊어진 녹향이 조화를 이룹니다.\n한층 진한 녹차의 매력을 느낄 수 있습니다.",
        imageSrc: greenTea3,
      },
      {
        title: "대작",
        weight: "40g",
        price: "20,000원",
        summary: "여름의 시간을 담은 차",
        description: "구수하고 묵직한 풍미가 오래 남는 차입니다.\n차분한 오후와 잘 어울리는 녹차입니다.",
        imageSrc: greenTea4,
      },
    ],
  },
  {
    id: "white",
    title: "백차",
    lineupTitle: "청연의 백차 라인업",
    products: [
      {
        title: "설백",
        weight: "40g",
        price: "22,000원",
        summary: "어린 새순의 맑은 향",
        description:
          "눈처럼 맑고 깨끗한 향이 특징인 백차입니다.\n은은한 꽃향과 부드러운 단맛이 조화를 이룹니다.",
        imageSrc: whiteTea1,
      },
      {
        title: "월백",
        weight: "40g",
        price: "26,000원",
        summary: "달빛 아래 천천히 말린 차",
        description:
          "차분하고 섬세한 향이 오래 남는 백차입니다.\n부드러운 단맛과 깨끗한 여운을 즐길 수 있습니다.",
        imageSrc: whiteTea2,
      },
      {
        title: "미설",
        weight: "40g",
        price: "24,000원",
        summary: "초여름의 햇살을 머금은 차",
        description:
          "은은한 꽃향과 가벼운 바디감이 특징입니다.\n맑고 편안한 차 한 잔을 원하는 순간에 어울립니다.",
        imageSrc: whiteTea3,
      },
      {
        title: "운하",
        weight: "40g",
        price: "30,000원",
        summary: "안개 낀 산자락의 여운",
        description:
          "풍부한 향과 긴 여운이 인상적인 백차입니다.\n백차 특유의 부드러움과 깊이를 느낄 수 있습니다.",
        imageSrc: whiteTea4,
      },
    ],
  },
  {
    id: "oolong",
    title: "청차",
    lineupTitle: "청연의 청차 라인업",
    products: [
      {
        title: "화청",
        weight: "40g",
        price: "38,000원",
        summary: "꽃이 피어나는 계절의 향",
        description:
          "풍부한 꽃향과 산뜻한 풍미가 어우러진 차입니다.\n차를 마시는 순간 은은한 꽃밭을 떠올리게 합니다.",
        imageSrc: oolongTea1,
      },
      {
        title: "청운",
        weight: "40g",
        price: "32,000원",
        summary: "맑은 하늘 아래 피어나는 꽃향",
        description:
          "은은한 난초 향과 청량한 여운이 조화를 이루는\n청차 본연의 섬세함을 가장 잘 느낄 수 있습니다.",
        imageSrc: oolongTea2,
      },
      {
        title: "유청",
        weight: "40g",
        price: "29,000원",
        summary: "깊은 숲의 고요함을 담은 차",
        description:
          "맑은 꽃향 뒤로 은은한 과실향이 이어집니다.\n부드럽고 긴 여운이 인상적인 청차입니다.",
        imageSrc: oolongTea3,
      },
      {
        title: "난연",
        weight: "40g",
        price: "35,000원",
        summary: "난초 향이 머무는 시간",
        description:
          "화사한 난초 향과 부드러운 단맛이 특징입니다.\n청연을 처음 만나는 분께 추천하는 청차입니다.",
        imageSrc: oolongTea4,
      },
    ],
  },
  {
    id: "black",
    title: "홍차",
    lineupTitle: "청연의 홍차 라인업",
    products: [
      {
        title: "홍운",
        weight: "40g",
        price: "30,000원",
        summary: "붉은 구름의 여운",
        description:
          "부드러운 단맛과 은은한 꽃향이 어우러진 차입니다.\n청연을 대표하는 가장 균형 잡힌 홍차입니다.",
        imageSrc: blackTea1,
      },
      {
        title: "진홍",
        weight: "40g",
        price: "35,000원",
        summary: "깊고 진한 붉은 장미",
        description:
          "풍부한 바디감과 묵직한 단맛이 특징입니다.\n홍차 본연의 깊이를 가장 잘 느낄 수 있습니다.",
        imageSrc: blackTea2,
      },
      {
        title: "홍설",
        weight: "40g",
        price: "28,000원",
        summary: "겨울 햇살처럼 부드러운 홍차",
        description:
          "은은한 단맛과 섬세한 향이 오래 남습니다.\n부담 없이 즐기기 좋은 청연의 홍차입니다.",
        imageSrc: blackTea3,
      },
      {
        title: "노을",
        weight: "40g",
        price: "32,000원",
        summary: "하루의 끝을 닮은 차",
        description:
          "따뜻한 향과 부드러운 여운이 차분하게 이어집니다.\n조용한 저녁과 가장 잘 어울리는 홍차입니다.",
        imageSrc: blackTea4,
      },
    ],
  },
  {
    id: "dark",
    title: "흑차",
    lineupTitle: "청연의 흑차 라인업",
    products: [
      {
        title: "연흑",
        weight: "40g",
        price: "32,000원",
        summary: "깊은 연못의 고요함",
        description:
          "은은한 단맛과 부드러운 숙성향을 담은 흑차입니다.\n청연 흑차의 시작을 경험하기 좋은 차입니다.",
        imageSrc: darkTea1,
      },
      {
        title: "심연",
        weight: "40g",
        price: "42,000원",
        summary: "가장 깊은 곳의 시간",
        description:
          "풍부한 숙성감과 긴 여운이 특징입니다.\n청연을 대표하는 프리미엄 흑차입니다.",
        imageSrc: darkTea2,
      },
      {
        title: "목연",
        weight: "40g",
        price: "36,000원",
        summary: "숲의 향을 머금은 차",
        description:
          "은은한 목향과 묵직한 풍미가 조화를 이룹니다.\n차분한 시간을 위한 흑차입니다.",
        imageSrc: darkTea3,
      },
      {
        title: "후연",
        weight: "40g",
        price: "38,000원",
        summary: "오래 남는 깊은 여운",
        description:
          "숙성된 단맛과 부드러운 바디감이 인상적입니다.\n마실수록 깊이가 느껴지는 흑차입니다.",
        imageSrc: darkTea4,
      },
    ],
  },
  {
    id: "herbal",
    title: "대용량 & 시그니처",
    lineupTitle: "청연의 대용량 & 시그니처 차",
    products: [
      {
        title: "녹차",
        weight: "100g",
        price: "52,000원",
        summary: "봄을 가장 오래 머금은 찻잎",
        description:
          "청연의 대표 녹차를 넉넉한 용량으로 담았습니다.\n맑고 깨끗한 향을 오래도록 즐길 수 있습니다.",
        imageSrc: bigGreenTea,
      },
      {
        title: "백차",
        weight: "100g",
        price: "42,000원",
        summary: "시간이 천천히 흐르는 부드러운 차",
        description:
          "은은한 단맛과 부드러운 여운이 특징입니다.\n편안한 휴식과 함께하기 좋은 백차입니다.",
        imageSrc: bigWhiteTea,
      },
      {
        title: "청차",
        weight: "100g",
        price: "56,000원",
        summary: "꽃과 과일 사이에 머무는 향",
        description:
          "꽃향과 과일향이 어우러진 깊은 풍미를 담았습니다.\n우릴수록 다채로운 향을 경험할 수 있습니다.",
        imageSrc: bigOolongTea,
      },
      {
        title: "홍차",
        weight: "100g",
        price: "58,000원",
        summary: "깊은 향으로 완성되는 하루",
        description:
          "풍부한 향과 진한 맛이 조화롭게 이어집니다.\n밀크티와 스트레이트 티 모두 잘 어울립니다.",
        imageSrc: bigBlackTea,
      },
      {
        title: "흑차",
        weight: "100g",
        price: "62,000원",
        summary: "세월이 빚어낸 깊은 풍미",
        description:
          "시간이 만든 깊고 묵직한 풍미를 담았습니다.\n오랜 여운과 편안한 단맛을 느낄 수 있습니다.",
        imageSrc: bigDarkTea,
      },
      {
        title: "운무",
        weight: "100g",
        price: "68,000원",
        summary: "안개 낀 산중의 고요한 아침",
        description:
          "안개 낀 산중의 고요함을 담은 황차입니다.\n부드러운 단맛과 은은한 향이 길게 이어집니다.",
        imageSrc: bigSignature1,
      },
      {
        title: "월영",
        weight: "100g",
        price: "72,000원",
        summary: "고요한 밤을 담은 한 잔",
        description:
          "달빛 아래 피어나는 향을 담은 프리미엄 청차입니다.\n꽃향과 과일향이 어우러진 깊은 풍미를 전합니다.",
        imageSrc: bigSignature2,
      },
      {
        title: "침향",
        weight: "100g",
        price: "88,000원",
        summary: "깊은 침묵 끝에 피어나는 여운",
        description:
          "오랜 숙성으로 완성된 깊고 진한 흑차입니다.\n묵직한 목향과 긴 여운이 품격 있게 이어집니다.",
        imageSrc: bigSignature3,
      },
    ],
  },
];
