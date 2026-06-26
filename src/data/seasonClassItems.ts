import seasonClassBg from "../assets/images/09season-class/season-class-2-bg.webp";
import seasonClassEllipse from "../assets/images/09season-class/Ellipse.webp";
import seasonClassSubBg from "../assets/images/09season-class/season-class-2-subbg.webp";
import seasonClass3Bg from "../assets/images/09season-class/season-class-3-bg.webp";
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
  sceneImage: string;
  teaImage: string;
  wordImage: string;
}

/** 궤도 찻잔 통일 크기 — Figma 슬롯 최대 프레임 220px (원형) */
export const ORBIT_CUP_SIZE_REM = 13.75;

export const seasonClassAssets = {
  bg: seasonClassBg,
  ellipse: seasonClassEllipse,
  subBg: seasonClassSubBg,
  kvBg: seasonClassKvBg,
  promoBg: seasonClass3Bg,
} as const;

/** Figma 1463:681 — 여름의 차 프로모 */
export const SEASON_CLASS_PROMO = {
  title: "여름의 차",
  subtitle: "연꽃 냉차 클래스",
  openLabel: "2026. 06 OPEN",
} as const;

export const SEASON_SECTION_TITLE = "계절을 배우는 찻자리";
export const SEASON_SECTION_DESCRIPTION =
  "계절마다 가장 잘 어울리는 차를 배우고\n한 잔의 풍경을 직접 경험합니다.";

/** 원형 stroke 중심 — Figma 851 + 830/2, 세로 940/2 */
export const ORBIT_RING_CENTER = {
  xPx: 1266,
  yPx: 470,
} as const;

/** 원형 stroke 반경 — 830px / 2 */
export const ORBIT_RING_RADIUS_PX = 415;

/** 중앙 메인 장면 원 중심 — Figma 1920 기준 */
export const SEASON_SCENE_CENTER = {
  xPx: 1388,
  yPx: 470,
} as const;

export type SeasonOrbitPosition = "main" | "top" | "middle" | "bottom";

/** Figma 1461:414 — 슬롯 프레임 (좌상단 + 설계 프레임 크기) */
export const SEASON_ORBIT_SLOTS = {
  top: { leftPx: 993, topPx: -48, frameWidthPx: 211, frameHeightPx: 217 },
  middle: { leftPx: 709, topPx: 365, frameWidthPx: 211.548, frameHeightPx: 217 },
  bottom: { leftPx: 965, topPx: 705, frameWidthPx: 216.887, frameHeightPx: 220 },
} as const;

const SEASON_COUNT = 4;
const ORBIT_BY_OFFSET: SeasonOrbitPosition[] = ["main", "top", "middle", "bottom"];

export function getSeasonOrbitPosition(
  seasonIndex: number,
  activeIndex: number,
): SeasonOrbitPosition {
  const offset = (seasonIndex - activeIndex + SEASON_COUNT) % SEASON_COUNT;
  return ORBIT_BY_OFFSET[offset];
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
  },
  {
    key: "fall",
    seasonLabel: "가을",
    title: "가을 다도클래스",
    description: "천천히 물드는 단풍처럼,\n깊어지는 향을 마주하는 시간",
    todayTea: "국화차",
    duration: "120분",
    experience: "차 우리기 · 시음 · 다도 예절",
    capacity: "4명",
    sceneImage: seasonClassAuScene,
    teaImage: seasonClassAuTea,
    wordImage: seasonClassAuWord,
  },
  {
    key: "winter",
    seasonLabel: "겨울",
    title: "겨울 다도클래스",
    description: "차분한 우롱의 온기와 함께,\n고요한 겨울을 마주하는 시간",
    todayTea: "보이차",
    duration: "120분",
    experience: "차 우리기 · 시음 · 다도 예절",
    capacity: "4명",
    sceneImage: seasonClassWiScene,
    teaImage: seasonClassWiTea,
    wordImage: seasonClassWiWord,
  },
];
