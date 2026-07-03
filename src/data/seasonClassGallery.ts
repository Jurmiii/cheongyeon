import seasonClassGallery1 from "../assets/images/09season-class/season-class-5-1.webp";
import seasonClassGallery2 from "../assets/images/09season-class/season-class-5-2.webp";
import seasonClassGallery3 from "../assets/images/09season-class/season-class-5-3.webp";
import seasonClassGallery4 from "../assets/images/09season-class/season-class-5-4.webp";
import seasonClassGallery5 from "../assets/images/09season-class/season-class-5-5.webp";
import seasonClassGallery6 from "../assets/images/09season-class/season-class-5-6.webp";

export const SEASON_CLASS_GALLERY_TITLE = "계절 찻자리 풍경";

export interface SeasonClassGalleryItem {
  id: string;
  image: string;
  alt: string;
  /** Figma 1463:688 — 프레임 내 위치·크기 (px, 1920 기준) */
  frame: {
    leftPx: number;
    topPx: number;
    widthPx: number;
    heightPx: number;
  };
  /** 태블릿 이하(5장) 배치 — 미지정 시 frame과 동일 */
  frameTablet?: {
    leftPx: number;
    topPx: number;
    widthPx: number;
    heightPx: number;
  };
  /** 모바일(5장) 배치 — 미지정 시 frameTablet ?? frame */
  frameMobile?: {
    leftPx: number;
    topPx: number;
    widthPx: number;
    heightPx: number;
  };
  /** 태블릿 이하에서 숨김 (6번째 우하단 등) */
  hideOnTablet?: boolean;
  crop?: {
    widthPercent: number;
    heightPercent: number;
    leftPercent: number;
    topPercent: number;
  };
}

/** 그리드 기준점 — Figma (241, 234) */
export const SEASON_CLASS_GALLERY_GRID = {
  leftPx: 241,
  topPx: 234,
} as const;

/** 콜라주 캔버스 — 6장 PC 배치 기준 (1438×564) */
export const SEASON_CLASS_GALLERY_CANVAS = {
  widthPx: 1438,
  heightPx: 564,
} as const;

/** 태블릿 콜라주 캔버스 — 5장, 간격 24px (640×274) */
export const SEASON_CLASS_GALLERY_CANVAS_TABLET = {
  widthPx: 640,
  heightPx: 274,
  gapPx: 24,
} as const;

/** 모바일 콜라주 캔버스 — 5장, 간격 14px (370×325) */
export const SEASON_CLASS_GALLERY_CANVAS_MOBILE = {
  widthPx: 370,
  heightPx: 325,
  gapPx: 14,
} as const;

export type SeasonClassGalleryFrame = SeasonClassGalleryItem["frame"];

export function getSeasonGalleryFramePercents(
  frame: SeasonClassGalleryFrame,
  canvas: { widthPx: number; heightPx: number } = SEASON_CLASS_GALLERY_CANVAS,
  grid: { leftPx: number; topPx: number } = SEASON_CLASS_GALLERY_GRID,
) {
  const offsetLeft = frame.leftPx - grid.leftPx;
  const offsetTop = frame.topPx - grid.topPx;

  return {
    left: `${(offsetLeft / canvas.widthPx) * 100}%`,
    top: `${(offsetTop / canvas.heightPx) * 100}%`,
    width: `${(frame.widthPx / canvas.widthPx) * 100}%`,
    height: `${(frame.heightPx / canvas.heightPx) * 100}%`,
  };
}

export function getSeasonGalleryItemStyleVars(item: SeasonClassGalleryItem) {
  const desktop = getSeasonGalleryFramePercents(item.frame);
  const tablet = getSeasonGalleryFramePercents(
    item.frameTablet ?? item.frame,
    SEASON_CLASS_GALLERY_CANVAS_TABLET,
    { leftPx: 0, topPx: 0 },
  );
  const mobile = getSeasonGalleryFramePercents(
    item.frameMobile ?? item.frameTablet ?? item.frame,
    SEASON_CLASS_GALLERY_CANVAS_MOBILE,
    { leftPx: 0, topPx: 0 },
  );

  return {
    "--sg-left": desktop.left,
    "--sg-top": desktop.top,
    "--sg-width": desktop.width,
    "--sg-height": desktop.height,
    "--sg-left-tablet": tablet.left,
    "--sg-top-tablet": tablet.top,
    "--sg-width-tablet": tablet.width,
    "--sg-height-tablet": tablet.height,
    "--sg-left-mobile": mobile.left,
    "--sg-top-mobile": mobile.top,
    "--sg-width-mobile": mobile.width,
    "--sg-height-mobile": mobile.height,
  };
}

export const seasonClassGalleryItems: SeasonClassGalleryItem[] = [
  {
    id: "gallery-ingredients",
    image: seasonClassGallery1,
    alt: "계절별 차 재료",
    frame: { leftPx: 241, topPx: 234, widthPx: 462, heightPx: 564 },
    frameTablet: { leftPx: 0, topPx: 0, widthPx: 225, heightPx: 274 },
    frameMobile: { leftPx: 0, topPx: 0, widthPx: 178, heightPx: 218 },
  },
  {
    id: "gallery-summer",
    image: seasonClassGallery2,
    alt: "여름 찻자리",
    frame: { leftPx: 729, topPx: 234, widthPx: 462, heightPx: 282 },
    frameTablet: { leftPx: 249, topPx: 0, widthPx: 225, heightPx: 125 },
    frameMobile: { leftPx: 192, topPx: 0, widthPx: 178, heightPx: 98 },
  },
  {
    id: "gallery-autumn",
    image: seasonClassGallery3,
    alt: "가을 찻자리",
    frame: { leftPx: 1217, topPx: 234, widthPx: 462, heightPx: 282 },
    frameTablet: { leftPx: 498, topPx: 0, widthPx: 142, heightPx: 125 },
    frameMobile: { leftPx: 192, topPx: 112, widthPx: 178, heightPx: 106 },
  },
  {
    id: "gallery-winter",
    image: seasonClassGallery4,
    alt: "겨울 찻자리",
    frame: { leftPx: 729, topPx: 537, widthPx: 341, heightPx: 261 },
    frameTablet: { leftPx: 249, topPx: 149, widthPx: 142, heightPx: 125 },
    frameMobile: { leftPx: 0, topPx: 232, widthPx: 114, heightPx: 93 },
  },
  {
    id: "gallery-tasting",
    image: seasonClassGallery5,
    alt: "차 시음",
    frame: { leftPx: 1096, topPx: 537, widthPx: 341, heightPx: 261 },
    frameTablet: { leftPx: 415, topPx: 149, widthPx: 225, heightPx: 125 },
    frameMobile: { leftPx: 128, topPx: 232, widthPx: 242, heightPx: 93 },
  },
  {
    id: "gallery-spring",
    image: seasonClassGallery6,
    alt: "봄 찻자리",
    frame: { leftPx: 1463, topPx: 537, widthPx: 216, heightPx: 261 },
    hideOnTablet: true,
  },
];
