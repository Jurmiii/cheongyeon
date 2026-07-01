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

/** 포트폴리오용 가상 예약 인원 — 슬롯마다 동일한 시드로 0~5명 */
export function getMockBookedGuestCountForSession(key: SessionAvailabilityKey): number {
  const hash = hashSessionKey(key);
  return hash % RESERVATION_SESSION_CAPACITY;
}

/** 가상 데이터만 반영한 잔여석 (실제 예약 미포함) */
export function getMockRemainingSeatsForSession(key: SessionAvailabilityKey): number {
  const mockBooked = getMockBookedGuestCountForSession(key);
  return Math.max(0, RESERVATION_SESSION_CAPACITY - mockBooked);
}
