import seasonClassScheduleCup1 from "../assets/images/09season-class/season-class-schedule-cup1.webp";
import seasonClassScheduleCup2 from "../assets/images/09season-class/season-class-schedule-cup2.webp";
import seasonClassScheduleCup3 from "../assets/images/09season-class/season-class-schedule-cup3.webp";
import seasonClassScheduleDivider from "../assets/images/09season-class/season-class-schedule-divider.webp";

export type SeatDotState = "filled" | "empty";

export const SEASON_CLASS_SCHEDULE_TOTAL_SEATS = 5;

export interface SeasonClassScheduleDay {
  id: string;
  day: number;
  weekday: string;
  remainingSeats: number;
}

export function getCupImage(remainingSeats: number) {
  if (remainingSeats <= 1) return seasonClassScheduleCup3;
  if (remainingSeats <= 3) return seasonClassScheduleCup2;
  return seasonClassScheduleCup1;
}

export const SEASON_CLASS_SCHEDULE_TITLE = "청연의 클래스 자리";
export const SEASON_CLASS_SCHEDULE_DESCRIPTION =
  "소규모 정원제로 운영되어 여유롭고 깊이 있는 수업을 제공합니다";

export const SEASON_CLASS_SCHEDULE_MONTH = "2026.07";

export const SEASON_CLASS_SCHEDULE_DIVIDER = seasonClassScheduleDivider;

/** Figma 1463:552 — 기본 선택: 18일 */
export const SEASON_CLASS_SCHEDULE_DEFAULT_INDEX = 3;

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

export const seasonClassScheduleDays: SeasonClassScheduleDay[] = [
  { id: "day-15", day: 15, weekday: "목요일", remainingSeats: 2 },
  { id: "day-16", day: 16, weekday: "화요일", remainingSeats: 3 },
  { id: "day-17", day: 17, weekday: "수요일", remainingSeats: 2 },
  { id: "day-18", day: 18, weekday: "목요일", remainingSeats: 1 },
  { id: "day-19", day: 19, weekday: "금요일", remainingSeats: 2 },
  { id: "day-20", day: 20, weekday: "토요일", remainingSeats: 4 },
  { id: "day-21", day: 21, weekday: "목요일", remainingSeats: 2 },
];
