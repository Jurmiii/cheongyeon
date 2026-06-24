import historyImage1 from "../assets/images/13my-page/my-3_1.webp";
import historyImage2 from "../assets/images/13my-page/my-3_2.webp";
import historyImage3 from "../assets/images/13my-page/my-3_3.webp";
import upcomingImage from "../assets/images/13my-page/my- 2.webp";
import type { Reservation, UserProfile } from "../types/mypage";

export const DEFAULT_PROFILE_SEED: Omit<UserProfile, "loginId"> = {
  name: "김주은",
  phone: "010-1234-5678",
  email: "kimju1005@naver.com",
};

const historyImages = [historyImage1, historyImage2, historyImage3];

function createSeedReservation(
  userId: string,
  index: number,
  reservation: Omit<Reservation, "id" | "userId" | "createdAt" | "image"> & { image?: string },
): Reservation {
  return {
    id: `seed-${userId}-${index}`,
    userId,
    image: reservation.image ?? historyImages[index % historyImages.length],
    createdAt: new Date().toISOString(),
    ...reservation,
  };
}

export function createSeedReservations(userId: string): Reservation[] {
  return [
    createSeedReservation(userId, 0, {
      classTitle: "차 블렌더 클래스",
      branch: "북촌점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2026-07-01",
      time: "10:00",
      guestCount: 1,
      status: "upcoming",
      image: upcomingImage,
    }),
    createSeedReservation(userId, 1, {
      classTitle: "계절 다도 클래스",
      branch: "북촌점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2026-03-20",
      time: "15:00",
      guestCount: 1,
      status: "completed",
    }),
    createSeedReservation(userId, 2, {
      classTitle: "기본 다도 클래스",
      branch: "북촌점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2026-04-10",
      time: "14:00",
      guestCount: 1,
      status: "completed",
    }),
    createSeedReservation(userId, 3, {
      classTitle: "프라이빗 클래스",
      branch: "북촌점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2026-05-03",
      time: "11:00",
      guestCount: 1,
      status: "completed",
    }),
    createSeedReservation(userId, 4, {
      classTitle: "계절 다도 클래스",
      branch: "북촌점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2026-02-14",
      time: "13:00",
      guestCount: 2,
      status: "completed",
    }),
    createSeedReservation(userId, 5, {
      classTitle: "기본 다도 클래스",
      branch: "북촌점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2026-01-20",
      time: "16:00",
      guestCount: 1,
      status: "completed",
    }),
    createSeedReservation(userId, 6, {
      classTitle: "차 블렌더 클래스",
      branch: "북촌점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2025-12-08",
      time: "11:00",
      guestCount: 1,
      status: "completed",
    }),
    createSeedReservation(userId, 7, {
      classTitle: "프라이빗 클래스",
      branch: "북촌점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2025-11-15",
      time: "10:00",
      guestCount: 1,
      status: "completed",
    }),
    createSeedReservation(userId, 8, {
      classTitle: "기본 다도 클래스",
      branch: "북촌점",
      location: "서울특별시 종로구 북촌로 58",
      date: "2025-10-02",
      time: "14:00",
      guestCount: 1,
      status: "completed",
    }),
  ];
}
