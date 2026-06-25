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

export const seasonClassGalleryItems: SeasonClassGalleryItem[] = [
  {
    id: "gallery-ingredients",
    image: seasonClassGallery1,
    alt: "계절별 차 재료",
    frame: { leftPx: 241, topPx: 234, widthPx: 462, heightPx: 564 },
  },
  {
    id: "gallery-summer",
    image: seasonClassGallery2,
    alt: "여름 찻자리",
    frame: { leftPx: 729, topPx: 234, widthPx: 462, heightPx: 282 },
  },
  {
    id: "gallery-autumn",
    image: seasonClassGallery3,
    alt: "가을 찻자리",
    frame: { leftPx: 1217, topPx: 234, widthPx: 462, heightPx: 282 },
  },
  {
    id: "gallery-winter",
    image: seasonClassGallery4,
    alt: "겨울 찻자리",
    frame: { leftPx: 729, topPx: 537, widthPx: 341, heightPx: 261 },
  },
  {
    id: "gallery-tasting",
    image: seasonClassGallery5,
    alt: "차 시음",
    frame: { leftPx: 1096, topPx: 537, widthPx: 341, heightPx: 261 },
  },
  {
    id: "gallery-spring",
    image: seasonClassGallery6,
    alt: "봄 찻자리",
    frame: { leftPx: 1463, topPx: 537, widthPx: 216, heightPx: 261 },
  },
];
