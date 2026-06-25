import eventCardAged from "../assets/images/10reservation/event-card-aged.webp";
import eventCardAutumn from "../assets/images/10reservation/event-card-autumn.webp";
import eventCardBasic from "../assets/images/10reservation/event-card-basic.webp";
import eventCardBlender from "../assets/images/10reservation/event-card-blender.webp";
import eventCardPrivate from "../assets/images/10reservation/event-card-private.webp";
import eventCardSpring from "../assets/images/10reservation/event-card-spring.webp";
import eventCardSummer from "../assets/images/10reservation/event-card-summer.webp";
import eventCardWinter from "../assets/images/10reservation/event-card-winter.webp";

export interface ReservationClassItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  duration: string;
  capacity: string;
  maxGuests: number;
  price: string;
  image: string;
  imageOverlay?: "light" | "dark";
}

export const reservationBranches = ["북촌 지점", "하동 지점", "보성 지점", "강진 지점"] as const;

export type ReservationBranch = (typeof reservationBranches)[number];

export const reservationTimeSlots = [
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
] as const;

export type ReservationTimeSlot = (typeof reservationTimeSlots)[number];

export const RESERVATION_CLASSES_PER_PAGE = 4;

export const reservationClasses: ReservationClassItem[] = [
  {
    id: 1,
    badge: "봄 한정",
    title: "봄 다도클래스",
    description: "설레는 봄의 시작,\n싱그러운 첫 잎차의 향연",
    duration: "120분",
    capacity: "1~4명",
    maxGuests: 4,
    price: "45,000원",
    image: eventCardSpring,
    imageOverlay: "light",
  },
  {
    id: 2,
    badge: "여름 한정",
    title: "여름 다도클래스",
    description: "푸른 잎이 짙어지는 계절,\n시원한 냉녹차로 만나는 여름",
    duration: "120분",
    capacity: "1~4명",
    maxGuests: 4,
    price: "45,000원",
    image: eventCardSummer,
    imageOverlay: "light",
  },
  {
    id: 3,
    badge: "가을 한정",
    title: "가을 다도클래스",
    description: "단풍이 물드는 시간,\n깊고 풍부한 발효차의 여유",
    duration: "120분",
    capacity: "1~4명",
    maxGuests: 4,
    price: "45,000원",
    image: eventCardAutumn,
    imageOverlay: "light",
  },
  {
    id: 4,
    badge: "겨울 한정",
    title: "겨울 다도클래스",
    description: "찬 바람 부는 날,\n따뜻한 온기로 몸과 마음을 채우는 다회",
    duration: "120분",
    capacity: "1~4명",
    maxGuests: 4,
    price: "45,000원",
    image: eventCardWinter,
    imageOverlay: "light",
  },
  {
    id: 5,
    badge: "입문 추천",
    title: "기본 다도 클래스",
    description: "차 도구의 쓰임과\n기본 다도 흐름을 배우며\n일상 속 차 문화를 시작합니다.",
    duration: "120분",
    capacity: "1~8명",
    maxGuests: 8,
    price: "55,000원",
    image: eventCardBasic,
    imageOverlay: "light",
  },
  {
    id: 6,
    badge: "깊은 풍미",
    title: "숙성차 클래스",
    description: "오랜 시간 숙성된 차의 향과 맛을 느끼며 차가 지닌\n깊은 여운을 배웁니다.",
    duration: "120분",
    capacity: "1~4명",
    maxGuests: 4,
    price: "65,000원",
    image: eventCardAged,
    imageOverlay: "light",
  },
  {
    id: 7,
    badge: "나만의 차",
    title: "티 블랜더 클래스",
    description: "다양한 재료의 향과 맛을\n조합해 나만의 블렌딩 티를\n완성합니다.",
    duration: "120분",
    capacity: "1~4명",
    maxGuests: 4,
    price: "75,000원",
    image: eventCardBlender,
    imageOverlay: "light",
  },
  {
    id: 8,
    badge: "1:1 맞춤",
    title: "프라이빗 클래스",
    description: "조용한 공간에서 취향에 맞춰\n차를 깊이 있게 경험하는\n1:1 수업입니다.",
    duration: "120분",
    capacity: "1~4명",
    maxGuests: 4,
    price: "75,000원",
    image: eventCardPrivate,
    imageOverlay: "light",
  },
];

export const cardCompanies = [
  "신한카드",
  "KB국민카드",
  "삼성카드",
  "현대카드",
  "롯데카드",
  "우리카드",
  "하나카드",
  "NH농협카드",
] as const;

export type CardCompany = (typeof cardCompanies)[number];

export const installmentPlans = ["일시불", "2개월", "3개월", "6개월", "12개월"] as const;

export type InstallmentPlan = (typeof installmentPlans)[number];

export interface ReservationNoticeSection {
  title: string;
  displayTitle: string;
  items: readonly string[];
}

export const reservationNoticeSections: ReservationNoticeSection[] = [
  {
    title: "유의사항",
    displayTitle: "* 유의사항",
    items: [
      "클래스 시작 10분 전까지 도착 부탁드립니다.",
      "클래스 공간 내 외부 음식 및 음료 반입은 어렵습니다.",
      "클래스 예약 인원 외 동반 입장은 어렵습니다.",
      "알레르기가 있다면 예약 시 미리 알려주세요.",
    ],
  },
  {
    title: "예약변경, 취소안내",
    displayTitle: "*예약변경, 취소안내",
    items: [
      "예약 변경 및 취소는 수업 2일전 까지만 가능 합니다.",
      "수업1일전~당일 취소 시 환불이 불가능합니다.",
      "예약은 클래스 2일전 까지만 가능합니다.",
      "최소인원 미달 시 클래스가 취소될수있습니다.",
    ],
  },
  {
    title: "문의 안내",
    displayTitle: "*문의 안내",
    items: ["클래스에 대한 문의는 10:00~20:00 (월~금)", "02-123-4567  |  Cheongyeon@gmail.com"],
  },
];
