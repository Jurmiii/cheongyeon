import seasonClassScheduleCup1 from "../assets/images/09season-class/season-class-schedule-cup1.webp";
import seasonClassScheduleCup2 from "../assets/images/09season-class/season-class-schedule-cup2.webp";
import seasonClassScheduleCup3 from "../assets/images/09season-class/season-class-schedule-cup3.webp";
import seasonClassScheduleCup4 from "../assets/images/09season-class/season-class-schedule-cup4.webp";
import seasonClassScheduleCup5 from "../assets/images/09season-class/season-class-schedule-cup5.webp";
import seasonClassScheduleDivider from "../assets/images/09season-class/season-class-schedule-divider.webp";
import {
  reservationTimeSlots,
  getSessionCapacityByClassTitle,
  type ReservationBranch,
  type ReservationTimeSlot,
} from "./reservationClasses";
import { getRemainingSeatsForSession } from "../utils/reservationStorage";
import { getMockRemainingSeatsForSession } from "../utils/sessionAvailability";
import { isReservationTimeSlotPast } from "../utils/reservationFormat";

export type SeatDotState = "filled" | "empty";

export type SeatSlotState = "available" | "closed";

export const SEASON_CLASS_SCHEDULE_TOTAL_SEATS = 6;

export const SEASON_CLASS_SCHEDULE_WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const SEASON_CLASS_SCHEDULE_WEEKDAY_LABELS = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
] as const;

export interface SeasonClassScheduleDay {
  id: string;
  day: number;
  weekday: string;
  date: Date;
  remainingSeats: number;
  isPast: boolean;
}

const SEASON_CLASS_SCHEDULE_CUP_IMAGES = [
  seasonClassScheduleCup1,
  seasonClassScheduleCup2,
  seasonClassScheduleCup3,
  seasonClassScheduleCup4,
  seasonClassScheduleCup5,
];

export function getCupImage(remainingSeats: number) {
  const clamped = Math.max(1, Math.min(SEASON_CLASS_SCHEDULE_TOTAL_SEATS, remainingSeats));
  const imageIndex = Math.min(
    SEASON_CLASS_SCHEDULE_CUP_IMAGES.length - 1,
    SEASON_CLASS_SCHEDULE_TOTAL_SEATS - clamped,
  );
  return SEASON_CLASS_SCHEDULE_CUP_IMAGES[imageIndex];
}

export const SEASON_CLASS_SCHEDULE_TITLE = "청연의 클래스 자리";
export const SEASON_CLASS_SCHEDULE_DESCRIPTION =
  "소규모 정원제로 운영되어 여유롭고 깊이 있는 수업을 제공합니다";

export const SEASON_CLASS_SCHEDULE_DIVIDER = seasonClassScheduleDivider;

export function formatScheduleMonthLabel(year: number, month: number) {
  return `${year}.${String(month + 1).padStart(2, "0")}`;
}

export function formatScheduleDateLabel(date: Date) {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

export function formatScheduleDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export interface SeasonClassBranch {
  id: string;
  shortLabel: string;
  name: string;
  address: string;
}

export const SEASON_CLASS_BRANCHES: SeasonClassBranch[] = [
  {
    id: "bukchon",
    shortLabel: "북촌 지점",
    name: "청연 북촌 티하우스 본원",
    address: "서울특별시 종로구 북촌로 58",
  },
  {
    id: "hadong",
    shortLabel: "하동 지점",
    name: "청연 하동 티하우스",
    address: "경상남도 하동군 화개면 612",
  },
  {
    id: "boseong",
    shortLabel: "보성 지점",
    name: "청연 보성 티하우스",
    address: "전라남도 보성군 보성읍 821",
  },
  {
    id: "gangjin",
    shortLabel: "강진 지점",
    name: "청연 강진 티하우스",
    address: "전라남도 강진군 성전면 437",
  },
];

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function isBeforeDay(date: Date, compare: Date) {
  return startOfDay(date).getTime() < startOfDay(compare).getTime();
}

export function isSameMonthView(viewMonth: Date, compare: Date) {
  return viewMonth.getFullYear() === compare.getFullYear() && viewMonth.getMonth() === compare.getMonth();
}

export function canGoToPreviousMonth(viewMonth: Date, today: Date) {
  const viewStart = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const currentStart = new Date(today.getFullYear(), today.getMonth(), 1);
  return viewStart.getTime() > currentStart.getTime();
}

/** 잔여석 수만큼 동그라미를 채워 표시 */
export function getSeatSlots(remainingSeats: number): SeatSlotState[] {
  const available = Math.max(
    0,
    Math.min(SEASON_CLASS_SCHEDULE_TOTAL_SEATS, remainingSeats),
  );

  return Array.from({ length: SEASON_CLASS_SCHEDULE_TOTAL_SEATS }, (_, index) =>
    index < available ? "available" : "closed",
  );
}

/** 잔여석 → 예약된 좌석 수만큼 왼쪽부터 채움 (반쪽 없음) */
export function getSeatDots(remainingSeats: number): SeatDotState[] {
  const booked = Math.max(
    0,
    Math.min(SEASON_CLASS_SCHEDULE_TOTAL_SEATS, SEASON_CLASS_SCHEDULE_TOTAL_SEATS - remainingSeats),
  );

  return Array.from({ length: SEASON_CLASS_SCHEDULE_TOTAL_SEATS }, (_, index) =>
    index < booked ? "filled" : "empty",
  );
}

export interface SeasonClassScheduleTimeSlot {
  id: string;
  time: ReservationTimeSlot;
  date: Date;
  remainingSeats: number;
  isPast: boolean;
}

export function isTimeSlotPast(date: Date, time: ReservationTimeSlot, now = new Date()) {
  return isReservationTimeSlotPast(date, time, now);
}

export function getScheduleTimeSlots(
  date: Date,
  branch: ReservationBranch,
  classTitle: string,
  excludeReservationId?: string,
): SeasonClassScheduleTimeSlot[] {
  const normalizedDate = startOfDay(date);
  const now = new Date();
  const dateKey = formatScheduleDateKey(normalizedDate);
  const sessionCapacity = getSessionCapacityByClassTitle(classTitle);

  return reservationTimeSlots.map((time) => {
    const isPast = isTimeSlotPast(normalizedDate, time, now);

    return {
      id: `${branch}-${formatScheduleDateLabel(normalizedDate)}-${time}`,
      time,
      date: normalizedDate,
      isPast,
      remainingSeats: isPast
        ? 0
        : getRemainingSeatsForSession({
            date: dateKey,
            time,
            classTitle,
            branch,
            sessionCapacity,
            excludeReservationId,
          }),
    };
  });
}

export function getFirstAvailableTimeIndex(slots: SeasonClassScheduleTimeSlot[]) {
  const index = slots.findIndex((slot) => !slot.isPast);
  return index >= 0 ? index : 0;
}

function getRemainingSeatsMock(year: number, month: number, day: number) {
  const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const classTitle = "여름 다도클래스";

  return getMockRemainingSeatsForSession(
    {
      date: dateKey,
      time: "12:00",
      branch: "북촌 지점",
      classTitle,
    },
    getSessionCapacityByClassTitle(classTitle),
  );
}

export function getFirstAvailableDayIndex(days: SeasonClassScheduleDay[]) {
  const index = days.findIndex((day) => !day.isPast);
  return index >= 0 ? index : 0;
}

export function getLastAvailableDayIndex(days: SeasonClassScheduleDay[]) {
  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (!days[index]?.isPast) {
      return index;
    }
  }

  return Math.max(0, days.length - 1);
}

/** leadDate부터 예약 가능한 날을 count개 — 월말 이후 다음 달로 자연스럽게 이어짐 */
export function getScheduleDaysFromDate(startDate: Date, today: Date, count = 18) {
  const days: SeasonClassScheduleDay[] = [];
  let cursor = startOfDay(startDate);
  let iterations = 0;

  while (days.length < count && iterations < 90) {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const monthDays = getScheduleDaysForMonth(year, month, today);
    const entry = monthDays.find((day) => isSameDay(day.date, cursor));

    if (entry && !entry.isPast) {
      days.push(entry);
    }

    cursor = new Date(year, month, cursor.getDate() + 1);
    iterations += 1;
  }

  return days;
}

/** 달력은 1일부터 말일까지 모두 표시. 지난 날은 isPast로 구분 */
export function getScheduleDaysForMonth(year: number, month: number, today: Date): SeasonClassScheduleDay[] {
  const lastDay = new Date(year, month + 1, 0).getDate();
  const days: SeasonClassScheduleDay[] = [];

  for (let day = 1; day <= lastDay; day += 1) {
    const date = new Date(year, month, day);
    const isPast = isBeforeDay(date, today);

    days.push({
      id: `${year}-${month + 1}-${day}`,
      day,
      weekday: SEASON_CLASS_SCHEDULE_WEEKDAY_LABELS[date.getDay()],
      date,
      isPast,
      remainingSeats: isPast ? 0 : getRemainingSeatsMock(year, month, day),
    });
  }

  return days;
}

export function getCalendarGridDates(year: number, month: number) {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  const dates: Array<Date | null> = [];

  for (let index = 0; index < firstDate.getDay(); index += 1) {
    dates.push(null);
  }

  for (let day = 1; day <= lastDate.getDate(); day += 1) {
    dates.push(new Date(year, month, day));
  }

  while (dates.length % 7 !== 0) {
    dates.push(null);
  }

  return dates;
}
