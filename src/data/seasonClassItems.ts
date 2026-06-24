import seasonClassBg from "../assets/images/09season-class/season-class-2-bg.webp";
import seasonClassSubBg from "../assets/images/09season-class/season-class-2-subbg.png";
import seasonClassAuScene from "../assets/images/09season-class/season-class-au.webp";
import seasonClassAuTea from "../assets/images/09season-class/season-class-au-tea.webp";
import seasonClassAuWord from "../assets/images/09season-class/season-class-word-au-word.webp";
import seasonClassKvBg from "../assets/images/09season-class/season-class-kv-bg.webp";
import seasonClassSpScene from "../assets/images/09season-class/season-class-sp.webp";
import seasonClassSpTea from "../assets/images/09season-class/season-class-sp-tea.webp";
import seasonClassSpWord from "../assets/images/09season-class/season-class-sp-word.webp";
import seasonClassSuScene from "../assets/images/09season-class/season-class-su.webp";
import seasonClassSuTea from "../assets/images/09season-class/season-class-su-tea.webp";
import seasonClassSuWord from "../assets/images/09season-class/season-class-su-word.webp";
import seasonClassWiScene from "../assets/images/09season-class/season-class-wi.webp";
import seasonClassWiTea from "../assets/images/09season-class/season-class-wi-tea.webp";
import seasonClassWiWord from "../assets/images/09season-class/season-class-wi-word.webp";

export type SeasonKey = "spring" | "summer" | "fall" | "winter";

export interface SeasonClassItem {
  key: SeasonKey;
  seasonLabel: string;
  title: string;
  description: string;
  todayTea: string;
  duration: string;
  experience: string;
  capacity: string;
  /** 큰 메인 원형 이미지 */
  sceneImage: string;
  /** 작은 찻잔 버튼 이미지 */
  teaImage: string;
  /** 한자 이미지 */
  wordImage: string;
  cupSizeRem: number;
}

/** 섹션 배경: season-class-2-bg / 뒤 깔림: season-class-2-subbg */
export const seasonClassAssets = {
  bg: seasonClassBg,
  subBg: seasonClassSubBg,
  kvBg: seasonClassKvBg,
} as const;

export const SEASON_SECTION_TITLE = "계절을 배우는 찻자리";
export const SEASON_SECTION_DESCRIPTION =
  "계절마다 가장 잘 어울리는 차를 배우고\n한 잔의 풍경을 직접 경험합니다.";

export const SEASON_SCROLL_SNAP = [0, 0.303, 0.606, 0.909] as const;

/** Figma 1461:414 — 찻잔 슬롯 (활성·상·하) */
export const SEASON_CUP_SLOTS = [
  { leftPx: 709, topPx: 365 },
  { leftPx: 993, topPx: -48 },
  { leftPx: 965, topPx: 705 },
] as const;

const SEASON_COUNT = 4;
const SEASON_HIDDEN_OFFSET = 3;

/** 시계 반대 방향 회전 — 4번째(작은 차) 슬롯은 숨김 */
export function getSeasonCupSlotIndex(seasonIndex: number, activeIndex: number) {
  const offset =
    activeIndex === 0
      ? ((seasonIndex - activeIndex) % SEASON_COUNT + SEASON_COUNT) % SEASON_COUNT
      : ((activeIndex - seasonIndex) % SEASON_COUNT + SEASON_COUNT) % SEASON_COUNT;

  if (offset >= SEASON_HIDDEN_OFFSET) {
    return -1;
  }

  return offset;
}

export const seasonClassItems: SeasonClassItem[] = [
  {
    key: "spring",
    seasonLabel: "봄",
    title: "봄 다도클래스",
    description: "붉은 동백이 전하는 온기,\n차 한 잔에 담긴 봄의 시작",
    todayTea: "동백꽃차",
    duration: "120분",
    experience: "차 우리기 · 시음 · 다도 예절",
    capacity: "4명",
    sceneImage: seasonClassSpScene,
    teaImage: seasonClassSpTea,
    wordImage: seasonClassSpWord,
    cupSizeRem: 17.75,
  },
  {
    key: "summer",
    seasonLabel: "여름",
    title: "여름 다도클래스",
    description: "푸른 잎이 짙어지는 계절,\n시원한 냉녹차로 만나는 여름",
    todayTea: "냉녹차",
    duration: "120분",
    experience: "차 우리기 · 시음 · 다도 예절",
    capacity: "4명",
    sceneImage: seasonClassSuScene,
    teaImage: seasonClassSuTea,
    wordImage: seasonClassSuWord,
    cupSizeRem: 19.875,
  },
  {
    key: "fall",
    seasonLabel: "가을",
    title: "가을 다도클래스",
    description: "단풍이 물드는 시간,\n깊고 풍부한 발효차의 여유",
    todayTea: "국화차",
    duration: "120분",
    experience: "차 우리기 · 시음 · 다도 예절",
    capacity: "4명",
    sceneImage: seasonClassAuScene,
    teaImage: seasonClassAuTea,
    wordImage: seasonClassAuWord,
    cupSizeRem: 19.5,
  },
  {
    key: "winter",
    seasonLabel: "겨울",
    title: "겨울 다도클래스",
    description: "찬 바람 부는 날,\n따뜻한 온기로 몸과 마음을 채우는 다회",
    todayTea: "보이차",
    duration: "120분",
    experience: "차 우리기 · 시음 · 다도 예절",
    capacity: "4명",
    sceneImage: seasonClassWiScene,
    teaImage: seasonClassWiTea,
    wordImage: seasonClassWiWord,
    cupSizeRem: 10.4375,
  },
];
