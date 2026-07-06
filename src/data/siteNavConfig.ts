export const TEA_STORY_PATH = "/product/tea-story";

export interface SiteNavLink {
  label: string;
  to: string;
}

export interface SiteNavSubmenuItem {
  label: string;
  to: string;
}

export interface SiteGnbMenuItem {
  label: string;
  to: string;
  children: SiteNavSubmenuItem[];
}

export interface SiteSnsLink {
  label: string;
  href: string;
}

export const gnbMenus: SiteGnbMenuItem[] = [
  {
    label: "브랜드 소개",
    to: "/about",
    children: [
      { label: "브랜드 스토리", to: "/about" },
      { label: "공간소개", to: "/brand/space" },
      { label: "오시는 길", to: "/store" },
    ],
  },
  {
    label: "제품 소개",
    to: "/shop",
    children: [
      { label: "차 이야기", to: TEA_STORY_PATH },
      { label: "차 컬렉션", to: "/shop" },
      { label: "계절의 차", to: "/seasontea" },
    ],
  },
  {
    label: "다도 클래스",
    to: "/class",
    children: [
      { label: "일반 클래스", to: "/class" },
      { label: "시즌 클래스", to: "/class/season" },
    ],
  },
  {
    label: "예약",
    to: "/reservation",
    children: [
      { label: "예약하기", to: "/reservation" },
      { label: "공지사항", to: "/reservation/notice" },
      { label: "자주 묻는 질문", to: "/reservation/faq" },
    ],
  },
  {
    label: "이벤트",
    to: "/event",
    children: [{ label: "이벤트", to: "/event" }],
  },
];

export const footerNavLinks: SiteNavLink[] = [
  { label: "브랜드 소개", to: "/about" },
  { label: "제품소개", to: TEA_STORY_PATH },
  { label: "다도 클래스", to: "/class" },
  { label: "예약", to: "/reservation" },
  { label: "이벤트", to: "/event" },
];

export const footerContactLink: SiteNavLink = {
  label: "문의하기",
  to: "/contact",
};

export const footerPolicyLinks: SiteNavLink[] = [
  { label: "이용약관", to: "/terms" },
  { label: "개인정보 처리 방침", to: "/privacy" },
];

export const footerSnsLinks: SiteSnsLink[] = [
  { label: "kakao", href: "https://www.kakaocorp.com/page/service/service/KakaoTalk" },
  { label: "naver", href: "https://www.naver.com/" },
  { label: "github", href: "https://github.com/Jurmiii/cheongyeon.git" },
];
