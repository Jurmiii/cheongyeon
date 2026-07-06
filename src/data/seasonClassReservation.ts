import { reservationClasses } from "./reservationClasses";

export const SEASON_RESERVATION_CLASS_IDS = [5, 6, 7, 8] as const;

export type SeasonReservationClassId = (typeof SEASON_RESERVATION_CLASS_IDS)[number];

export function isSeasonReservationClassId(classId: number): classId is SeasonReservationClassId {
  return SEASON_RESERVATION_CLASS_IDS.includes(classId as SeasonReservationClassId);
}

/** 봄 3~5월 / 여름 6~8월 / 가을 9~11월 / 겨울 12~2월 (로컬 날짜 기준) */
export function getActiveSeasonReservationClassId(date = new Date()): SeasonReservationClassId {
  const month = date.getMonth() + 1;

  if (month >= 3 && month <= 5) {
    return 5;
  }

  if (month >= 6 && month <= 8) {
    return 6;
  }

  if (month >= 9 && month <= 11) {
    return 7;
  }

  return 8;
}

export function isSeasonReservationClassActive(classId: number, date = new Date()) {
  if (!isSeasonReservationClassId(classId)) {
    return true;
  }

  return getActiveSeasonReservationClassId(date) === classId;
}

/** 예약 페이지 클래스 선택 가능 여부 (기존 예약 변경 시 해당 클래스는 유지) */
export function isReservationClassSelectable(
  classId: number,
  date = new Date(),
  preservedClassId?: number,
) {
  if (preservedClassId === classId) {
    return true;
  }

  return isSeasonReservationClassActive(classId, date);
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
