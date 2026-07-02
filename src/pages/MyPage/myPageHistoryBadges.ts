import type { ReservationStatus } from "../../types/mypage";

export function getHistoryBadgeVariant(status: ReservationStatus) {
  if (status === "cancelled") {
    return "guide" as const;
  }

  if (status === "noshow") {
    return "deadline" as const;
  }

  return "disabled" as const;
}

export function getHistoryBadgeLabel(status: ReservationStatus) {
  if (status === "cancelled") {
    return "예약취소";
  }

  if (status === "noshow") {
    return "노쇼";
  }

  return "이용완료";
}
