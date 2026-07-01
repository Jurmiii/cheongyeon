import { reservationClasses } from "./reservationClasses";

export const SEASON_RESERVATION_CLASS_IDS = [5, 6, 7, 8] as const;

export type SeasonReservationClassId = (typeof SEASON_RESERVATION_CLASS_IDS)[number];

export function isSeasonReservationClassId(classId: number): classId is SeasonReservationClassId {
  return SEASON_RESERVATION_CLASS_IDS.includes(classId as SeasonReservationClassId);
}

/** 선택한 날짜의 월 기준 시즌 클래스 예약 id (봄 5 / 여름 6 / 가을 7 / 겨울 8) */
export function getActiveSeasonReservationClassId(date = new Date()): SeasonReservationClassId {
  const month = date.getMonth();

  if (month >= 2 && month <= 4) {
    return 5;
  }

  if (month >= 5 && month <= 7) {
    return 6;
  }

  if (month >= 8 && month <= 10) {
    return 7;
  }

  return 8;
}

export function getActiveSeasonReservationClass(date = new Date()) {
  const classId = getActiveSeasonReservationClassId(date);
  return reservationClasses.find((classItem) => classItem.id === classId) ?? reservationClasses[4];
}

export function parseSeasonReservationClassId(value: string | null) {
  if (!value) {
    return null;
  }

  const classId = Number(value);

  if (!Number.isInteger(classId) || !isSeasonReservationClassId(classId)) {
    return null;
  }

  return classId;
}
