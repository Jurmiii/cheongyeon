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
  specs?: { label: string; value: string }[];
  recommendations?: string[];
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
        description: "맑고 섬세한 향과 은은한 감칠맛이 어우러집니다. 봄의 첫 기운을 담아 깨끗한 여운을 남깁니다.",
        imageSrc: greenTea1,
      },
      {
        title: "세작",
        weight: "40g",
        price: "30,000원",
        summary: "입하 이전 어린 찻잎",
        description: "부드러운 풍미와 균형 잡힌 맛이 특징입니다. 매일 편안하게 즐기기 좋은 녹차입니다.",
        imageSrc: greenTea2,
        specs: [
          { label: "종류", value: "녹차" },
          { label: "원산지", value: "전라남도 보성" },
          { label: "수확시기", value: "4월 말" },
          { label: "추천음용", value: "75℃ / 2분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "녹차를 처음 접해보시는 분",
          "부드럽고 순한 맛을 선호하시는 분",
          "식사 후 부담 없이 즐길 차를 찾는 분",
        ],
      },
      {
        title: "중작",
        weight: "40g",
        price: "25,000원",
        summary: "초여름의 햇살을 머금은 차",
        description:
          "풍부한 감칠맛과 깊어진 녹향이 조화를 이룹니다. 은은한 단맛과 진한 여운을 오래 느낄 수 있는 녹차입니다.",
        imageSrc: greenTea3,
        specs: [
          { label: "종류", value: "녹차" },
          { label: "원산지", value: "경상남도 하동" },
          { label: "수확시기", value: "5월 초" },
          { label: "추천음용", value: "75℃ / 2분 30초" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "깊고 진한 녹차의 풍미를 즐기시는 분",
          "식후 여운이 오래 남는 차를 찾는 분",
          "차 본연의 감칠맛을 천천히 음미하고 싶은 분",
        ],
      },
      {
        title: "대작",
        weight: "40g",
        price: "20,000원",
        summary: "여름의 시간을 담은 차",
        description:
          "구수하고 묵직한 풍미가 오래 남는 차입니다. 차분한 오후와 편안한 휴식에 잘 어울리는 녹차입니다.",
        imageSrc: greenTea4,
        specs: [
          { label: "종류", value: "녹차" },
          { label: "원산지", value: "제주 서귀포" },
          { label: "수확시기", value: "5월 중순" },
          { label: "추천음용", value: "80℃ / 2분 30초" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "구수하고 진한 풍미를 선호하시는 분",
          "부담 없이 편안하게 즐길 일상차를 찾는 분",
          "여유로운 오후를 함께할 차를 찾는 분",
        ],
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
          "눈처럼 맑고 깨끗한 향이 매력적인 백차입니다. 은은한 꽃향과 부드러운 단맛이 조화를 이룹니다.",
        imageSrc: whiteTea1,
        specs: [
          { label: "종류", value: "백차" },
          { label: "원산지", value: "전라북도 순창" },
          { label: "수확시기", value: "4월 초" },
          { label: "추천음용", value: "80℃ / 3분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "맑고 깨끗한 향을 좋아하시는 분",
          "은은한 꽃향을 즐기시는 분",
          "부담 없이 편안하게 마실 백차를 찾는 분",
        ],
      },
      {
        title: "월백",
        weight: "40g",
        price: "26,000원",
        summary: "달빛 아래 천천히 말린 차",
        description:
          "차분하고 섬세한 향이 오래 남는 백차입니다. 부드러운 단맛과 깨끗한 여운을 즐길 수 있습니다.",
        imageSrc: whiteTea2,
        specs: [
          { label: "종류", value: "백차" },
          { label: "원산지", value: "강원도 화천" },
          { label: "수확시기", value: "4월 중순" },
          { label: "추천음용", value: "80℃ / 3분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "은은하고 차분한 향을 선호하시는 분",
          "부드러운 차를 천천히 음미하고 싶은 분",
          "긴 여운이 남는 백차를 찾는 분",
        ],
      },
      {
        title: "미설",
        weight: "40g",
        price: "24,000원",
        summary: "초여름의 햇살을 머금은 차",
        description:
          "은은한 꽃향과 가벼운 바디감이 특징입니다. 맑고 편안한 차 한 잔을 즐기는 순간에 잘 어울립니다.",
        imageSrc: whiteTea3,
        specs: [
          { label: "종류", value: "백차" },
          { label: "원산지", value: "경상남도 하동" },
          { label: "수확시기", value: "5월 초" },
          { label: "추천음용", value: "80℃ / 2분 30초" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "산뜻하고 가벼운 풍미를 좋아하시는 분",
          "부담 없는 데일리 티를 찾는 분",
          "은은한 꽃향을 즐기고 싶은 분",
        ],
      },
      {
        title: "운하",
        weight: "40g",
        price: "30,000원",
        summary: "안개 낀 산자락의 여운",
        description:
          "풍부한 향과 깊은 여운이 인상적인 백차입니다. 백차 특유의 부드러움과 깊이를 함께 느낄 수 있습니다.",
        imageSrc: whiteTea4,
        specs: [
          { label: "종류", value: "백차" },
          { label: "원산지", value: "전라남도 보성" },
          { label: "수확시기", value: "4월 말" },
          { label: "추천음용", value: "85℃ / 3분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "깊고 풍부한 향을 선호하시는 분",
          "차를 천천히 음미하는 시간을 즐기시는 분",
          "부드럽지만 깊이 있는 백차를 찾는 분",
        ],
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
          "풍부한 꽃향과 산뜻한 풍미가 조화를 이루는 청차입니다. 차를 마시는 순간 은은한 꽃내음을 오래 느낄 수 있습니다.",
        imageSrc: oolongTea1,
        specs: [
          { label: "종류", value: "청차" },
          { label: "원산지", value: "제주 서귀포" },
          { label: "수확시기", value: "5월 초" },
          { label: "추천음용", value: "85℃ / 2분 30초" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "은은한 꽃향을 좋아하시는 분",
          "산뜻한 향과 깔끔한 마무리를 선호하시는 분",
          "봄의 분위기를 담은 차를 찾는 분",
        ],
      },
      {
        title: "청운",
        weight: "40g",
        price: "32,000원",
        summary: "맑은 하늘 아래 피어나는 꽃향",
        description:
          "은은한 난초 향과 청량한 여운이 조화를 이루는 청차입니다. 청차 본연의 섬세한 향을 편안하게 즐길 수 있습니다.",
        imageSrc: oolongTea2,
        specs: [
          { label: "종류", value: "청차" },
          { label: "원산지", value: "경상남도 하동" },
          { label: "수확시기", value: "5월 중순" },
          { label: "추천음용", value: "85℃ / 2분 30초" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "부드럽고 은은한 향을 선호하시는 분",
          "청차를 처음 접해보시는 분",
          "깔끔한 여운을 좋아하시는 분",
        ],
      },
      {
        title: "유청",
        weight: "40g",
        price: "29,000원",
        summary: "깊은 숲의 고요함을 담은 차",
        description:
          "맑은 꽃향 뒤로 은은한 과실향이 이어지는 청차입니다. 부드럽고 긴 여운이 인상적인 풍미를 전해줍니다.",
        imageSrc: oolongTea3,
        specs: [
          { label: "종류", value: "청차" },
          { label: "원산지", value: "전라남도 보성" },
          { label: "수확시기", value: "5월 말" },
          { label: "추천음용", value: "90℃ / 2분 30초" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "깊이 있는 향을 천천히 즐기고 싶은 분",
          "과실향이 은은하게 퍼지는 차를 좋아하시는 분",
          "여운이 긴 청차를 찾는 분",
        ],
      },
      {
        title: "난연",
        weight: "40g",
        price: "35,000원",
        summary: "난초 향이 머무는 시간",
        description:
          "화사한 난초 향과 부드러운 단맛이 특징인 청차입니다. 처음부터 끝까지 우아한 향을 오래 느낄 수 있습니다.",
        imageSrc: oolongTea4,
        specs: [
          { label: "종류", value: "청차" },
          { label: "원산지", value: "제주 서귀포" },
          { label: "수확시기", value: "5월 중순" },
          { label: "추천음용", value: "90℃ / 2분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "꽃향이 풍부한 차를 선호하시는 분",
          "향을 오래 음미하며 마시는 분",
          "청차의 우아한 매력을 경험하고 싶은 분",
        ],
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
          "부드러운 단맛과 은은한 꽃향이 어우러진 홍차입니다. 청연을 대표하는 가장 균형 잡힌 홍차의 풍미를 담았습니다.",
        imageSrc: blackTea1,
        specs: [
          { label: "종류", value: "홍차" },
          { label: "원산지", value: "경상남도 하동" },
          { label: "수확시기", value: "6월 초" },
          { label: "추천음용", value: "95℃ / 3분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "달콤하고 부드러운 홍차를 좋아하시는 분",
          "데일리 홍차를 찾고 계시는 분",
          "균형 잡힌 풍미를 선호하시는 분",
        ],
      },
      {
        title: "진홍",
        weight: "40g",
        price: "35,000원",
        summary: "깊고 진한 붉은 장미",
        description:
          "풍부한 바디감과 묵직한 단맛이 인상적인 홍차입니다. 깊은 향과 긴 여운이 차분한 시간을 만들어 줍니다.",
        imageSrc: blackTea2,
        specs: [
          { label: "종류", value: "홍차" },
          { label: "원산지", value: "제주 서귀포" },
          { label: "수확시기", value: "6월 중순" },
          { label: "추천음용", value: "95℃ / 3분 30초" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "진하고 깊은 홍차를 선호하시는 분",
          "묵직한 바디감을 좋아하시는 분",
          "여운이 오래 남는 차를 찾는 분",
        ],
      },
      {
        title: "홍설",
        weight: "40g",
        price: "28,000원",
        summary: "겨울 햇살처럼 부드러운 홍차",
        description:
          "은은한 단맛과 섬세한 향이 오래 이어지는 홍차입니다. 부담 없이 즐기기 좋은 부드러운 풍미가 매력입니다.",
        imageSrc: blackTea3,
        specs: [
          { label: "종류", value: "홍차" },
          { label: "원산지", value: "전라남도 보성" },
          { label: "수확시기", value: "6월 초" },
          { label: "추천음용", value: "95℃ / 3분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "부드러운 홍차를 선호하시는 분",
          "은은한 단맛을 좋아하시는 분",
          "편안하게 즐길 홍차를 찾는 분",
        ],
      },
      {
        title: "노을",
        weight: "40g",
        price: "32,000원",
        summary: "하루의 끝을 담은 차",
        description:
          "따뜻한 향과 부드러운 여운이 차분하게 이어지는 홍차입니다. 조용한 저녁 시간과 가장 잘 어울리는 풍미를 담았습니다.",
        imageSrc: blackTea4,
        specs: [
          { label: "종류", value: "홍차" },
          { label: "원산지", value: "제주 서귀포" },
          { label: "수확시기", value: "6월 말" },
          { label: "추천음용", value: "95℃ / 3분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "하루를 마무리하며 차를 즐기시는 분",
          "따뜻하고 편안한 향을 선호하시는 분",
          "저녁과 어울리는 홍차를 찾는 분",
        ],
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
          "은은한 단맛과 부드러운 숙성향을 담은 흑차입니다. 흑차를 처음 접하는 분도 부담 없이 즐길 수 있습니다.",
        imageSrc: darkTea1,
        specs: [
          { label: "종류", value: "흑차" },
          { label: "원산지", value: "전라남도 보성" },
          { label: "숙성기간", value: "2년" },
          { label: "추천음용", value: "95℃ / 4분" },
          { label: "보관방법", value: "직사광선을 피해 통풍이 잘되는 곳" },
        ],
        recommendations: [
          "부드러운 숙성차를 찾는 분",
          "흑차를 처음 경험해보고 싶은 분",
          "은은한 여운을 선호하시는 분",
        ],
      },
      {
        title: "심연",
        weight: "40g",
        price: "42,000원",
        summary: "가장 깊은 곳의 시간",
        description:
          "풍부한 숙성감과 깊은 여운이 인상적인 흑차입니다. 청연을 대표하는 프리미엄 흑차의 풍미를 담았습니다.",
        imageSrc: darkTea2,
        specs: [
          { label: "종류", value: "흑차" },
          { label: "원산지", value: "경상남도 하동" },
          { label: "숙성기간", value: "5년" },
          { label: "추천음용", value: "98℃ / 5분" },
          { label: "보관방법", value: "직사광선을 피해 통풍이 잘되는 곳" },
        ],
        recommendations: [
          "깊고 진한 숙성차를 선호하시는 분",
          "오래 남는 여운을 즐기시는 분",
          "프리미엄 흑차를 경험하고 싶은 분",
        ],
      },
      {
        title: "목연",
        weight: "40g",
        price: "36,000원",
        summary: "숲의 향을 머금은 차",
        description:
          "은은한 목향과 묵직한 풍미가 조화를 이루는 흑차입니다. 차분한 시간을 위한 깊이 있는 한 잔을 전해줍니다.",
        imageSrc: darkTea3,
        specs: [
          { label: "종류", value: "흑차" },
          { label: "원산지", value: "전라남도 보성" },
          { label: "숙성기간", value: "3년" },
          { label: "추천음용", value: "95℃ / 4분 30초" },
          { label: "보관방법", value: "직사광선을 피해 통풍이 잘되는 곳" },
        ],
        recommendations: [
          "묵직한 풍미를 좋아하시는 분",
          "차를 천천히 음미하는 시간을 즐기시는 분",
          "깊이 있는 흑차를 찾는 분",
        ],
      },
      {
        title: "후연",
        weight: "40g",
        price: "38,000원",
        summary: "오래 남는 깊은 여운",
        description:
          "숙성된 단맛과 부드러운 바디감이 인상적인 흑차입니다. 마실수록 깊이가 더해지는 풍미를 느낄 수 있습니다.",
        imageSrc: darkTea4,
        specs: [
          { label: "종류", value: "흑차" },
          { label: "원산지", value: "전라남도 보성" },
          { label: "숙성기간", value: "4년" },
          { label: "추천음용", value: "98℃ / 5분" },
          { label: "보관방법", value: "직사광선을 피해 통풍이 잘되는 곳" },
        ],
        recommendations: [
          "깊은 숙성향을 좋아하시는 분",
          "진한 풍미의 차를 선호하시는 분",
          "긴 여운을 즐기고 싶은 분",
        ],
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
          "청연의 대표 녹차를 넉넉한 용량으로 담았습니다. 맑고 깨끗한 향을 오래도록 즐길 수 있습니다.",
        imageSrc: bigGreenTea,
        specs: [
          { label: "종류", value: "녹차" },
          { label: "원산지", value: "제주 서귀포" },
          { label: "수확시기", value: "4월 초" },
          { label: "추천음용", value: "75℃ / 2분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "매일 차를 즐기시는 분",
          "가성비 좋은 대용량 제품을 찾는 분",
          "청연의 대표 녹차를 오래 즐기고 싶은 분",
        ],
      },
      {
        title: "백차",
        weight: "100g",
        price: "42,000원",
        summary: "시간이 천천히 흐르는 부드러운 차",
        description:
          "은은한 단맛과 부드러운 여운이 특징인 백차입니다. 편안한 휴식과 함께하기 좋은 넉넉한 용량입니다.",
        imageSrc: bigWhiteTea,
        specs: [
          { label: "종류", value: "백차" },
          { label: "원산지", value: "전라남도 보성" },
          { label: "수확시기", value: "4월 중순" },
          { label: "추천음용", value: "80℃ / 3분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "부드러운 차를 좋아하시는 분",
          "하루 여러 잔의 차를 즐기시는 분",
          "부담 없는 대용량 백차를 찾는 분",
        ],
      },
      {
        title: "청차",
        weight: "100g",
        price: "56,000원",
        summary: "꽃과 과일 사이에 머무는 향",
        description:
          "꽃향과 과실향이 어우러진 깊은 풍미를 담았습니다. 청차 특유의 다채로운 향을 오래 즐길 수 있습니다.",
        imageSrc: bigOolongTea,
        specs: [
          { label: "종류", value: "청차" },
          { label: "원산지", value: "제주 서귀포" },
          { label: "수확시기", value: "5월 중순" },
          { label: "추천음용", value: "90℃ / 2분 30초" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "향이 풍부한 차를 선호하시는 분",
          "청차를 자주 즐기시는 분",
          "꽃향과 과실향을 함께 느끼고 싶은 분",
        ],
      },
      {
        title: "홍차",
        weight: "100g",
        price: "58,000원",
        summary: "깊은 향으로 완성되는 하루",
        description:
          "풍부한 향과 진한 풍미가 조화를 이루는 홍차입니다. 밀크티와 스트레이트 티 모두 잘 어울립니다.",
        imageSrc: bigBlackTea,
        specs: [
          { label: "종류", value: "홍차" },
          { label: "원산지", value: "전라남도 보성" },
          { label: "수확시기", value: "6월 초" },
          { label: "추천음용", value: "95℃ / 3분" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "진한 홍차를 선호하시는 분",
          "밀크티를 즐기시는 분",
          "대용량 홍차를 찾는 분",
        ],
      },
      {
        title: "흑차",
        weight: "100g",
        price: "62,000원",
        summary: "세월이 빚어낸 깊은 풍미",
        description:
          "시간이 만든 깊고 묵직한 풍미를 담았습니다. 오랜 여운과 편안한 단맛을 느낄 수 있는 흑차입니다.",
        imageSrc: bigDarkTea,
        specs: [
          { label: "종류", value: "흑차" },
          { label: "원산지", value: "제주 서귀포" },
          { label: "숙성기간", value: "3년" },
          { label: "추천음용", value: "95℃ / 4분" },
          { label: "보관방법", value: "통풍이 잘되는 서늘한 곳" },
        ],
        recommendations: [
          "깊고 묵직한 차를 좋아하시는 분",
          "숙성차를 처음 경험해보고 싶은 분",
          "오래 남는 여운을 즐기시는 분",
        ],
      },
      {
        title: "운무",
        weight: "100g",
        price: "68,000원",
        summary: "안개 낀 산중의 고요한 아침",
        description:
          "안개 낀 산중의 고요함을 담은 청차입니다. 부드러운 단맛과 은은한 향이 길게 이어집니다.",
        imageSrc: bigSignature1,
        specs: [
          { label: "종류", value: "청차" },
          { label: "원산지", value: "경상남도 하동" },
          { label: "수확시기", value: "5월 새벽 첫물" },
          { label: "추천음용", value: "85℃ / 2분 30초" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "고요하고 섬세한 향을 좋아하시는 분",
          "프리미엄 청차를 찾는 분",
          "천천히 음미하는 차를 즐기시는 분",
        ],
      },
      {
        title: "월영",
        weight: "100g",
        price: "72,000원",
        summary: "달빛 아래 머문 한 잔",
        description:
          "달빛 아래 피어난 향을 담은 프리미엄 청차입니다. 꽃향과 과실향이 조화를 이루며 긴 여운을 남깁니다.",
        imageSrc: bigSignature2,
        specs: [
          { label: "종류", value: "청차" },
          { label: "원산지", value: "제주 서귀포" },
          { label: "수확시기", value: "5월 첫물" },
          { label: "추천음용", value: "85℃ / 2분 30초" },
          { label: "보관방법", value: "직사광선을 피해 서늘하고 건조한 곳" },
        ],
        recommendations: [
          "꽃향이 풍부한 차를 선호하시는 분",
          "특별한 선물용 차를 찾는 분",
          "우아한 향을 오래 즐기고 싶은 분",
        ],
      },
      {
        title: "침향",
        weight: "100g",
        price: "88,000원",
        summary: "깊은 침묵 끝에 피어나는 여운",
        description:
          "오랜 숙성으로 완성된 최고급 흑차입니다. 묵직한 풍미와 깊은 여운이 품격 있게 이어집니다.",
        imageSrc: bigSignature3,
        specs: [
          { label: "종류", value: "흑차" },
          { label: "원산지", value: "전라남도 보성" },
          { label: "숙성기간", value: "7년" },
          { label: "추천음용", value: "98℃ / 5분" },
          { label: "보관방법", value: "통풍이 잘되는 서늘한 곳" },
        ],
        recommendations: [
          "깊고 진한 숙성차를 선호하시는 분",
          "차를 천천히 음미하는 시간을 즐기시는 분",
          "청연의 프리미엄 시그니처 차를 경험하고 싶은 분",
        ],
      },
    ],
  },
];
