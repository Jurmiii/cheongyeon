import seasonClassBg from "../assets/images/09season-class/season-class-2-bg.webp";
import seasonClassEllipse from "../assets/images/09season-class/Ellipse.webp";
import seasonClassSubBg from "../assets/images/09season-class/season-class-2-subbg.webp";
import seasonClassSubBgTablet from "../assets/images/09season-class/Subtract-ta.webp";
import seasonClassSubBgMobile from "../assets/images/09season-class/Subtract-mo.webp";
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
  subBgTablet: seasonClassSubBgTablet,
  subBgMobile: seasonClassSubBgMobile,
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

export type SeasonOrbitSlot = {
  leftPx: number;
  topPx: number;
  frameWidthPx: number;
  frameHeightPx: number;
};

/** PC / 태블릿 스크롤 섹션 좌표 — GSAP 궤도 애니메이션용 */
export type SeasonScrollLayoutConfig = {
  viewWidthPx: number;
  viewHeightPx: number;
  cupWidthPx: number;
  cupHeightPx: number;
  orbitRingCenter: { xPx: number; yPx: number };
  orbitRingRadiusPx: number;
  sceneCenter: { xPx: number; yPx: number };
  orbitSlots: Record<Exclude<SeasonOrbitPosition, "main">, SeasonOrbitSlot>;
};

export const SEASON_SCROLL_DESKTOP_LAYOUT: SeasonScrollLayoutConfig = {
  viewWidthPx: 1920,
  viewHeightPx: 940,
  cupWidthPx: 220,
  cupHeightPx: 220,
  orbitRingCenter: ORBIT_RING_CENTER,
  orbitRingRadiusPx: ORBIT_RING_RADIUS_PX,
  sceneCenter: SEASON_SCENE_CENTER,
  orbitSlots: SEASON_ORBIT_SLOTS,
};

/** Figma 모바일 402×766 */
export const SEASON_SCROLL_MOBILE_LAYOUT: SeasonScrollLayoutConfig = {
  viewWidthPx: 402,
  viewHeightPx: 766,
  cupWidthPx: 109,
  cupHeightPx: 112,
  orbitRingCenter: { xPx: 208.759, yPx: 496.111 },
  orbitRingRadiusPx: 256.244,
  sceneCenter: { xPx: 201, yPx: 488 },
  orbitSlots: {
    top: { leftPx: 146, topPx: 184, frameWidthPx: 109, frameHeightPx: 112 },
    middle: { leftPx: -45, topPx: 279, frameWidthPx: 109, frameHeightPx: 112 },
    bottom: { leftPx: 345, topPx: 269, frameWidthPx: 109, frameHeightPx: 112 },
  },
};

/** Figma 태블릿 768×750 */
export const SEASON_SCROLL_TABLET_LAYOUT: SeasonScrollLayoutConfig = {
  viewWidthPx: 768,
  viewHeightPx: 750,
  cupWidthPx: 109,
  cupHeightPx: 112,
  orbitRingCenter: { xPx: 544.5, yPx: 375 },
  orbitRingRadiusPx: 234.5,
  sceneCenter: { xPx: 582.5, yPx: 375 },
  orbitSlots: {
    top: { leftPx: 434.293, topPx: 52, frameWidthPx: 109, frameHeightPx: 112 }, // left 27.1433rem
    middle: { leftPx: 230, topPx: 295, frameWidthPx: 109, frameHeightPx: 112 },
    bottom: { leftPx: 437.8432, topPx: 518, frameWidthPx: 109, frameHeightPx: 112 }, // left 27.3652rem
  },
};

const SEASON_SCROLL_FLUID_MIN_PX = 768;
const SEASON_SCROLL_FLUID_MAX_PX = 1920;
const SEASON_SCROLL_MOBILE_MAX_PX = 402;

function lerpNum(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

function lerpOrbitSlot(
  tablet: SeasonOrbitSlot,
  desktop: SeasonOrbitSlot,
  t: number,
): SeasonOrbitSlot {
  return {
    leftPx: lerpNum(tablet.leftPx, desktop.leftPx, t),
    topPx: lerpNum(tablet.topPx, desktop.topPx, t),
    frameWidthPx: lerpNum(tablet.frameWidthPx, desktop.frameWidthPx, t),
    frameHeightPx: lerpNum(tablet.frameHeightPx, desktop.frameHeightPx, t),
  };
}

function lerpSeasonScrollLayout(
  tablet: SeasonScrollLayoutConfig,
  desktop: SeasonScrollLayoutConfig,
  t: number,
): SeasonScrollLayoutConfig {
  return {
    viewWidthPx: lerpNum(tablet.viewWidthPx, desktop.viewWidthPx, t),
    viewHeightPx: lerpNum(tablet.viewHeightPx, desktop.viewHeightPx, t),
    cupWidthPx: lerpNum(tablet.cupWidthPx, desktop.cupWidthPx, t),
    cupHeightPx: lerpNum(tablet.cupHeightPx, desktop.cupHeightPx, t),
    orbitRingCenter: {
      xPx: lerpNum(tablet.orbitRingCenter.xPx, desktop.orbitRingCenter.xPx, t),
      yPx: lerpNum(tablet.orbitRingCenter.yPx, desktop.orbitRingCenter.yPx, t),
    },
    orbitRingRadiusPx: lerpNum(tablet.orbitRingRadiusPx, desktop.orbitRingRadiusPx, t),
    sceneCenter: {
      xPx: lerpNum(tablet.sceneCenter.xPx, desktop.sceneCenter.xPx, t),
      yPx: lerpNum(tablet.sceneCenter.yPx, desktop.sceneCenter.yPx, t),
    },
    orbitSlots: {
      top: lerpOrbitSlot(tablet.orbitSlots.top, desktop.orbitSlots.top, t),
      middle: lerpOrbitSlot(tablet.orbitSlots.middle, desktop.orbitSlots.middle, t),
      bottom: lerpOrbitSlot(tablet.orbitSlots.bottom, desktop.orbitSlots.bottom, t),
    },
  };
}

export function getSeasonScrollFluidT(viewportWidth: number): number {
  if (viewportWidth <= SEASON_SCROLL_FLUID_MIN_PX) {
    return 0;
  }

  if (viewportWidth >= SEASON_SCROLL_FLUID_MAX_PX) {
    return 1;
  }

  return (
    (viewportWidth - SEASON_SCROLL_FLUID_MIN_PX) /
    (SEASON_SCROLL_FLUID_MAX_PX - SEASON_SCROLL_FLUID_MIN_PX)
  );
}

export function getSeasonScrollLayout(viewportWidth: number): SeasonScrollLayoutConfig {
  if (viewportWidth <= SEASON_SCROLL_MOBILE_MAX_PX) {
    return SEASON_SCROLL_MOBILE_LAYOUT;
  }

  if (viewportWidth <= SEASON_SCROLL_FLUID_MIN_PX) {
    return SEASON_SCROLL_TABLET_LAYOUT;
  }

  if (viewportWidth >= SEASON_SCROLL_FLUID_MAX_PX) {
    return SEASON_SCROLL_DESKTOP_LAYOUT;
  }

  return lerpSeasonScrollLayout(
    SEASON_SCROLL_TABLET_LAYOUT,
    SEASON_SCROLL_DESKTOP_LAYOUT,
    getSeasonScrollFluidT(viewportWidth),
  );
}

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
