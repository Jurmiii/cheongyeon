import type { PageMetaProps } from "../components/seo/PageMeta";

const BASE_KEYWORDS =
  "청연, 차, 다도, 티하우스, 프리미엄차, 녹차, 홍차, 백차, 우롱차, 다도클래스, 차 클래스";

export const PAGE_SEO = {
  main: {
    title: "청연 | 프리미엄 차와 다도 문화",
    description:
      "차를 이해하고 천천히 우려내는 시간, 청연에서 계절의 향기와 다도 클래스, 티하우스 공간을 경험해 보세요.",
    keywords: `${BASE_KEYWORDS}, 메인, 브랜드`,
    path: "/",
  },
  brandStory: {
    title: "브랜드 스토리",
    description:
      "청(靑)과 연(淵)에 담긴 이야기, 차가 시작되는 생명의 시간과 청연이 지향하는 다도 문화를 소개합니다.",
    keywords: `${BASE_KEYWORDS}, 브랜드 스토리, 브랜드 철학`,
    path: "/about",
  },
  classIntroduction: {
    title: "클래스 소개",
    description:
      "차를 이해하고 천천히 우리며 청연의 다도 문화를 경험하는 클래스를 소개합니다.",
    keywords: `${BASE_KEYWORDS}, 클래스 소개, 다도 클래스, 차 클래스`,
    path: "/class/introduction",
  },
  seasonClass: {
    title: "시즌 클래스",
    description:
      "계절마다 다른 향기를 따라 새로운 차를 경험하는 청연 시즌 클래스 일정과 예약 정보를 확인하세요.",
    keywords: `${BASE_KEYWORDS}, 시즌 클래스, 계절 클래스, 클래스 예약`,
    path: "/class/season",
  },
  reservation: {
    title: "예약하기",
    description:
      "청연 지점과 클래스를 선택하고 다도 클래스 예약을 신청하세요.",
    keywords: `${BASE_KEYWORDS}, 예약, 클래스 예약, 지점 예약`,
    path: "/reservation/apply",
  },
  reservationEdit: {
    title: "예약 변경",
    description:
      "기존 예약 정보를 확인하고 원하는 일정으로 청연 클래스 예약을 변경하세요.",
    keywords: `${BASE_KEYWORDS}, 예약 변경, 예약 수정`,
    path: "/reservation/edit",
    robots: "noindex, follow",
  },
  notice: {
    title: "공지사항",
    description:
      "청연의 새로운 소식, 운영 안내, 이벤트 공지 등 최신 공지사항을 확인하세요.",
    keywords: `${BASE_KEYWORDS}, 공지사항, 안내, 소식`,
    path: "/notice",
  },
  faq: {
    title: "자주 묻는 질문",
    description:
      "청연 클래스, 예약, 매장 이용 등 자주 묻는 질문과 답변을 확인하세요.",
    keywords: `${BASE_KEYWORDS}, FAQ, 자주 묻는 질문, 이용 안내`,
    path: "/faq",
  },
  event: {
    title: "이벤트",
    description:
      "청연에서 진행 중인 이벤트와 종료된 이벤트 소식을 확인하세요.",
    keywords: `${BASE_KEYWORDS}, 이벤트, 프로모션, 혜택`,
    path: "/event",
  },
  login: {
    title: "로그인",
    description: "청연 회원 로그인 페이지입니다.",
    keywords: `${BASE_KEYWORDS}, 로그인, 회원`,
    path: "/login",
    robots: "noindex, follow",
  },
  signup: {
    title: "회원가입",
    description: "청연 회원가입 페이지입니다.",
    keywords: `${BASE_KEYWORDS}, 회원가입, 가입`,
    path: "/signup",
    robots: "noindex, follow",
  },
  stamp: {
    title: "스탬프",
    description:
      "청연 방문과 클래스 참여로 모은 스탬프 혜택과 적립 내역을 확인하세요.",
    keywords: `${BASE_KEYWORDS}, 스탬프, 멤버십, 혜택`,
    path: "/stamp",
  },
  contact: {
    title: "문의하기",
    description:
      "청연 이용, 클래스, 제품, 매장 관련 문의를 남겨 주세요.",
    keywords: `${BASE_KEYWORDS}, 문의, 고객센터, contact`,
    path: "/contact",
  },
  terms: {
    title: "이용약관",
    description: "청연 서비스 이용약관을 확인하세요.",
    keywords: `${BASE_KEYWORDS}, 이용약관, 약관`,
    path: "/terms",
  },
  privacy: {
    title: "개인정보처리방침",
    description: "청연 개인정보처리방침을 확인하세요.",
    keywords: `${BASE_KEYWORDS}, 개인정보처리방침, 개인정보`,
    path: "/privacy",
  },
  seasonTea: {
    title: "계절의 차",
    description:
      "봄, 여름, 가을, 겨울 계절에 어울리는 차와 청연의 계절 차 이야기를 만나보세요.",
    keywords: `${BASE_KEYWORDS}, 계절의 차, 시즌 티, 계절차`,
    path: "/product/season-tea",
  },
  collection: {
    title: "청연의 차 컬렉션",
    description:
      "녹차, 백차, 청차, 홍차, 흑차 등 청연의 차 라인업과 컬렉션을 소개합니다.",
    keywords: `${BASE_KEYWORDS}, 차 컬렉션, 차 라인업, 제품`,
    path: "/collection",
  },
  teaStory: {
    title: "차 이야기",
    description:
      "차의 기원과 품종, 우리는 차 이야기를 통해 청연의 차 철학을 전합니다.",
    keywords: `${BASE_KEYWORDS}, 차 이야기, 차 스토리, 티 스토리`,
    path: "/product/tea-story",
  },
  myPage: {
    title: "마이페이지",
    description: "청연 회원 예약 내역, 스탬프, 회원 정보를 확인하세요.",
    keywords: `${BASE_KEYWORDS}, 마이페이지, 회원 정보`,
    path: "/mypage",
    robots: "noindex, follow",
  },
  location: {
    title: "매장 안내",
    description:
      "청연 티하우스와 매장 위치, 운영 정보, 오시는 길을 확인하세요.",
    keywords: `${BASE_KEYWORDS}, 매장 안내, 티하우스, 위치, 오시는 길`,
    path: "/store",
  },
  space: {
    title: "공간 소개",
    description:
      "차와 사람, 시간이 머무는 청연 티하우스 공간을 소개합니다.",
    keywords: `${BASE_KEYWORDS}, 공간 소개, 티하우스, 브랜드 공간`,
    path: "/brand/space",
  },
  authCallback: {
    title: "로그인 처리 중",
    description: "청연 로그인 처리 페이지입니다.",
    keywords: BASE_KEYWORDS,
    path: "/auth/callback",
    robots: "noindex, nofollow",
  },
  kakaoCallback: {
    title: "카카오 로그인 처리 중",
    description: "청연 카카오 로그인 처리 페이지입니다.",
    keywords: BASE_KEYWORDS,
    path: "/auth/kakao/callback",
    robots: "noindex, nofollow",
  },
} as const satisfies Record<string, PageMetaProps>;
