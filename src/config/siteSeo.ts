import defaultOgImage from "../assets/images/01main/main-kv1.webp";

export const SITE_NAME = "청연";
export const SITE_AUTHOR = "청연";
export const SITE_LOCALE = "ko_KR";
export const SITE_THEME_COLOR = "#ffffff";
export const SITE_TWITTER_SITE = "";
export const SITE_TWITTER_CREATOR = "";

export const DEFAULT_OG_IMAGE = defaultOgImage;
export const DEFAULT_OG_IMAGE_WIDTH = "1920";
export const DEFAULT_OG_IMAGE_HEIGHT = "1080";
export const DEFAULT_OG_IMAGE_ALT = "청연 — 프리미엄 차와 다도 문화";

export function getSiteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");

  if (configured) {
    return configured;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

export function resolveAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const origin = getSiteOrigin();
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;

  return `${origin}${normalizedPath}`;
}

export function buildCanonicalUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return resolveAbsoluteUrl(normalizedPath);
}
