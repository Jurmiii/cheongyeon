import { reservationClasses, reservationTimeSlots, type ReservationTimeSlot } from "../data/reservationClasses";

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"] as const;

function parseClassPrice(priceLabel: string) {
  return Number(priceLabel.replace(/[^\d]/g, "")) || 0;
}

export function getReservationUnitPrice(classTitle: string) {
  const classItem = reservationClasses.find((item) => item.title === classTitle);
  return classItem ? parseClassPrice(classItem.price) : 0;
}

export function formatReservationPaymentAmount(classTitle: string, guestCount: number) {
  const total = getReservationUnitPrice(classTitle) * guestCount;
  return total.toLocaleString("en-US");
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

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

export function parseReservationDateTime(date: string, time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return new Date(
    Number(date.slice(0, 4)),
    Number(date.slice(5, 7)) - 1,
    Number(date.slice(8, 10)),
    hours,
    minutes,
    0,
    0,
  );
}

/** 선택한 날짜·시간이 현재 시각 기준으로 이미 지났는지 (당일은 수업 시작 시각과 비교) */
export function isReservationTimeSlotPast(date: Date, time: string, now = new Date()) {
  const targetDay = startOfDay(date);
  const today = startOfDay(now);

  if (targetDay.getTime() < today.getTime()) {
    return true;
  }

  if (targetDay.getTime() > today.getTime()) {
    return false;
  }

  const [hours, minutes] = time.split(":").map(Number);
  const slotStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
    0,
    0,
  );

  return slotStart.getTime() <= now.getTime();
}

export function getFirstAvailableReservationTimeSlot(
  date: Date,
  now = new Date(),
): ReservationTimeSlot | null {
  return reservationTimeSlots.find((time) => !isReservationTimeSlotPast(date, time, now)) ?? null;
}

/** 수업 시작 시각 기준 2일 전 동일 시각까지 변경·취소 가능 */
export function canCancelReservation(date: string, time: string, now = new Date()) {
  const sessionStart = parseReservationDateTime(date, time);
  const cancelDeadline = new Date(sessionStart);
  cancelDeadline.setDate(cancelDeadline.getDate() - 2);

  return now.getTime() < cancelDeadline.getTime();
}
