import { RESERVATION_SESSION_CAPACITY } from "../data/reservationClasses";

export type SessionAvailabilityKey = {
  date: string;
  time: string;
  classTitle: string;
  branch: string;
};

function hashSessionKey({ date, time, classTitle, branch }: SessionAvailabilityKey): number {
  const input = `${date}|${time}|${branch}|${classTitle}`;
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

/** 포트폴리오용 가상 예약 인원 — 슬롯·수용 인원에 따라 0~(capacity-1)명 */
export function getMockBookedGuestCountForSession(
  key: SessionAvailabilityKey,
  sessionCapacity = RESERVATION_SESSION_CAPACITY,
): number {
  if (sessionCapacity < 1) {
    return 0;
  }

  const hash = hashSessionKey(key);
  return hash % sessionCapacity;
}

/** 가상 데이터만 반영한 잔여석 (실제 예약 미포함) */
export function getMockRemainingSeatsForSession(
  key: SessionAvailabilityKey,
  sessionCapacity = RESERVATION_SESSION_CAPACITY,
): number {
  const mockBooked = getMockBookedGuestCountForSession(key, sessionCapacity);
  return Math.max(0, sessionCapacity - mockBooked);
}
