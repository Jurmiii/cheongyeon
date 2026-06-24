import { startOfDay } from "../pages/Reservation/ReservationCalendar";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export function formatReservationDate(date: string) {
  const parsed = startOfDay(new Date(`${date}T00:00:00`));
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const weekday = WEEKDAY_LABELS[parsed.getDay()];

  return `${year}.${month}.${day} (${weekday})`;
}

export function formatReservationSchedule(date: string, time: string) {
  return `${formatReservationDate(date)} ${time}`;
}

export function formatGuestCount(count: number) {
  return `${count}명`;
}

export function calculateDDayLabel(date: string) {
  const today = startOfDay(new Date());
  const target = startOfDay(new Date(`${date}T00:00:00`));
  const diffDays = Math.round((target.getTime() - today.getTime()) / 86_400_000);

  if (diffDays === 0) {
    return "D-Day";
  }

  if (diffDays > 0) {
    return `D-${diffDays}`;
  }

  return `D+${Math.abs(diffDays)}`;
}

export function isFutureOrTodayReservation(date: string) {
  const today = startOfDay(new Date());
  const target = startOfDay(new Date(`${date}T00:00:00`));
  return target.getTime() >= today.getTime();
}
