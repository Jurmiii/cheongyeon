import type { ReservationStatus } from "../../types/mypage";
import { Button } from "../../components/common";
import "./MyPageCancelModal.scss";

type MyPageCancelModalProps = {
  classTitle: string;
  schedule: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function MyPageCancelModal({
  classTitle,
  schedule,
  onConfirm,
  onClose,
}: MyPageCancelModalProps) {
  return (
    <div className="my-page-cancel-modal" role="presentation" onClick={onClose}>
      <div
        className="my-page-cancel-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-page-cancel-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="my-page-cancel-modal__title ft-28b ink500" id="my-page-cancel-title">
          예약을 취소하시겠습니까?
        </h2>
        <p className="my-page-cancel-modal__description ft-18r ink400">
          {classTitle}
          <br />
          {schedule}
        </p>
        <div className="my-page-cancel-modal__actions">
          <Button variant="payment" className="my-page-cancel-modal__button" type="button" onClick={onConfirm}>
            예약 취소
          </Button>
          <Button variant="reservationEdit" className="my-page-cancel-modal__button" type="button" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}

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
