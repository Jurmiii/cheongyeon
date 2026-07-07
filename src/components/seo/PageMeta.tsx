import { useLayoutEffect } from "react";

import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  SITE_AUTHOR,
  SITE_LOCALE,
  SITE_NAME,
  SITE_THEME_COLOR,
  SITE_TWITTER_CREATOR,
  SITE_TWITTER_SITE,
  buildCanonicalUrl,
  resolveAbsoluteUrl,
} from "../../config/siteSeo";

export type PageMetaProps = {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageAlt?: string;
  robots?: string;
  twitterSite?: string;
  twitterCreator?: string;
};

function upsertMetaByName(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export default function PageMeta({
  title,
  description,
  keywords = "",
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  ogImageWidth = DEFAULT_OG_IMAGE_WIDTH,
  ogImageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  robots = "index, follow",
  twitterSite = SITE_TWITTER_SITE,
  twitterCreator = SITE_TWITTER_CREATOR,
}: PageMetaProps) {
  useLayoutEffect(() => {
    const canonicalUrl = buildCanonicalUrl(path);
    const absoluteOgImage = resolveAbsoluteUrl(ogImage);
    const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = pageTitle;

    upsertMetaByName("title", pageTitle);
    upsertMetaByName("description", description);
    upsertMetaByName("keywords", keywords);
    upsertMetaByName("author", SITE_AUTHOR);
    upsertMetaByName("robots", robots);
    upsertMetaByName("language", "ko");
    upsertMetaByName("distribution", "global");
    upsertMetaByName("rating", "general");
    upsertMetaByName("format-detection", "telephone=no");
    upsertMetaByName("theme-color", SITE_THEME_COLOR);
    upsertMetaByName("application-name", SITE_NAME);
    upsertMetaByName("msapplication-TileColor", SITE_THEME_COLOR);
    upsertMetaByName("apple-mobile-web-app-capable", "yes");
    upsertMetaByName("apple-mobile-web-app-title", SITE_NAME);

    upsertMetaByProperty("og:title", pageTitle);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:image", absoluteOgImage);
    upsertMetaByProperty("og:image:width", ogImageWidth);
    upsertMetaByProperty("og:image:height", ogImageHeight);
    upsertMetaByProperty("og:image:alt", ogImageAlt);
    upsertMetaByProperty("og:site_name", SITE_NAME);
    upsertMetaByProperty("og:locale", SITE_LOCALE);

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", pageTitle);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", absoluteOgImage);
    upsertMetaByName("twitter:image:alt", ogImageAlt);
    upsertMetaByName("twitter:site", twitterSite);
    upsertMetaByName("twitter:creator", twitterCreator);

    upsertLink("canonical", canonicalUrl);
  }, [
    description,
    keywords,
    ogImage,
    ogImageAlt,
    ogImageHeight,
    ogImageWidth,
    path,
    robots,
    title,
    twitterCreator,
    twitterSite,
  ]);

  return null;
}
