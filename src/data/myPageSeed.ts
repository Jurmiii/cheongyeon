import agedTeaClass from "../assets/images/13my-page/aged-tea-class.webp";
import basicClass from "../assets/images/13my-page/basic-class.webp";
import fallClass from "../assets/images/13my-page/fall-class.webp";
import privateClass from "../assets/images/13my-page/private-class.webp";
import springClass from "../assets/images/13my-page/spring-class.webp";
import summerClass from "../assets/images/13my-page/summer-class.webp";
import teablanderClass from "../assets/images/13my-page/teablander-class.webp";
import winterClass from "../assets/images/13my-page/winter-class.webp";
import type { Reservation, UserProfile } from "../types/mypage";

export const DEFAULT_PROFILE_SEED: Omit<UserProfile, "loginId"> = {
  name: "김청연",
  phone: "010-1234-5678",
  email: "kimju1005@naver.com",
};

export const RESERVATION_CLASS_DISPLAY_ITEMS = [
  { classTitle: "기본 다도 클래스", image: basicClass },
  { classTitle: "숙성차 클래스", image: agedTeaClass },
  { classTitle: "티 블랜더 클래스", image: teablanderClass },
  { classTitle: "프라이빗 클래스", image: privateClass },
  { classTitle: "봄 다도클래스", image: springClass },
  { classTitle: "여름 다도클래스", image: summerClass },
  { classTitle: "가을 다도클래스", image: fallClass },
  { classTitle: "겨울 다도클래스", image: winterClass },
] as const;

function createSeedReservation(
  userId: string,
  index: number,
  reservation: Omit<Reservation, "id" | "userId" | "createdAt" | "image"> & { image?: string },
): Reservation {
  return {
    id: `seed-${userId}-${index}`,
    userId,
    image: reservation.image ?? RESERVATION_CLASS_DISPLAY_ITEMS[index % RESERVATION_CLASS_DISPLAY_ITEMS.length].image,
    createdAt: new Date().toISOString(),
    ...reservation,
  };
}

export function createSeedReservations(userId: string): Reservation[] {
  return [
    createSeedReservation(userId, 0, {
      classTitle: "티 블랜더 클래스",
      branch: "북촌 지점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2026-07-01",
      time: "10:00",
      guestCount: 1,
      status: "upcoming",
      image: teablanderClass,
    }),
    createSeedReservation(userId, 1, {
      classTitle: "기본 다도 클래스",
      branch: "북촌 지점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2026-03-20",
      time: "15:00",
      guestCount: 1,
      status: "completed",
    }),
    createSeedReservation(userId, 2, {
      classTitle: "숙성차 클래스",
      branch: "하동 지점",
      location: "경상남도 하동군 화개면 612",
      date: "2026-04-10",
      time: "14:00",
      guestCount: 2,
      status: "completed",
    }),
    createSeedReservation(userId, 3, {
      classTitle: "티 블랜더 클래스",
      branch: "보성 지점",
      location: "전라남도 보성군 보성읍 821",
      date: "2026-05-03",
      time: "11:00",
      guestCount: 3,
      status: "completed",
    }),
    createSeedReservation(userId, 4, {
      classTitle: "프라이빗 클래스",
      branch: "강진 지점",
      location: "전라남도 강진군 성전면 437",
      date: "2026-02-14",
      time: "13:00",
      guestCount: 1,
      status: "completed",
    }),
    createSeedReservation(userId, 5, {
      classTitle: "봄 다도클래스",
      branch: "북촌 지점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2026-01-20",
      time: "16:00",
      guestCount: 1,
      status: "completed",
    }),
    createSeedReservation(userId, 6, {
      classTitle: "여름 다도클래스",
      branch: "하동 지점",
      location: "경상남도 하동군 화개면 612",
      date: "2025-12-08",
      time: "11:00",
      guestCount: 2,
      status: "completed",
    }),
    createSeedReservation(userId, 7, {
      classTitle: "가을 다도클래스",
      branch: "보성 지점",
      location: "전라남도 보성군 보성읍 821",
      date: "2025-11-15",
      time: "10:00",
      guestCount: 3,
      status: "completed",
    }),
    createSeedReservation(userId, 8, {
      classTitle: "겨울 다도클래스",
      branch: "강진 지점",
      location: "전라남도 강진군 성전면 437",
      date: "2025-10-02",
      time: "14:00",
      guestCount: 2,
      status: "completed",
    }),
  ];
}
