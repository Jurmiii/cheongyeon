import { useEffect } from "react";

import type { Reservation } from "../../types/mypage";
import { Button, Icon } from "../../components/common";
import { useModalOpen } from "../../hooks/useLockBodyScroll";
import {
  formatGuestCount,
  formatReservationDate,
  formatReservationPaymentAmount,
} from "../../utils/reservationFormat";
import "./MyPageCancelConfirmModal.scss";

type DetailRow = {
  icon: "calendar" | "clock" | "user" | "credit-card";
  label: string;
  value: string;
  isPayment?: boolean;
};

type MyPageCancelConfirmModalProps = {
  reservation: Reservation;
  onConfirm: () => void;
  onClose: () => void;
};

export default function MyPageCancelConfirmModal({
  reservation,
  onConfirm,
  onClose,
}: MyPageCancelConfirmModalProps) {
  useModalOpen(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const detailRows: DetailRow[] = [
    { icon: "calendar", label: "날짜", value: formatReservationDate(reservation.date) },
    { icon: "clock", label: "시간", value: reservation.time },
    { icon: "user", label: "인원", value: formatGuestCount(reservation.guestCount) },
    {
      icon: "credit-card",
      label: "결제 금액",
      value: formatReservationPaymentAmount(reservation.classTitle, reservation.guestCount),
      isPayment: true,
    },
  ];

  return (
    <div className="my-page-cancel-confirm-modal" role="presentation" onClick={onClose}>
      <div
        className="my-page-cancel-confirm-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-page-cancel-confirm-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="my-page-cancel-confirm-modal__close"
          type="button"
          aria-label="닫기"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="my-page-cancel-confirm-modal__warning" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
          </svg>
        </div>

        <h2 className="my-page-cancel-confirm-modal__title ft-22b ink500" id="my-page-cancel-confirm-title">
          예약을 취소하시겠습니까?
        </h2>
        <p className="my-page-cancel-confirm-modal__subtitle ft-16r ink400">
          예약 취소 후 복구할 수 없습니다.
        </p>

        <div className="my-page-cancel-confirm-modal__divider" aria-hidden="true" />

        <div className="my-page-cancel-confirm-modal__details">
          <h3 className="my-page-cancel-confirm-modal__class-title ft-18b ink500">
            {reservation.classTitle}
          </h3>
          <ul className="my-page-cancel-confirm-modal__detail-list">
            {detailRows.map((row) => (
              <li className="my-page-cancel-confirm-modal__detail-row" key={row.label}>
                <Icon className="my-page-cancel-confirm-modal__detail-icon" name={row.icon} aria-hidden="true" />
                <span className="my-page-cancel-confirm-modal__detail-label ft-16r ink400">{row.label}</span>
                {row.isPayment ? (
                  <span className="my-page-cancel-confirm-modal__detail-value my-page-cancel-confirm-modal__detail-value--payment ft-16b ink500">
                    <Icon className="my-page-cancel-confirm-modal__won-icon" name="won-circle" aria-hidden="true" />
                    {row.value}
                  </span>
                ) : (
                  <span className="my-page-cancel-confirm-modal__detail-value ft-16b ink500">{row.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="my-page-cancel-confirm-modal__actions">
          <Button
            variant="reservationEdit"
            className="my-page-cancel-confirm-modal__button"
            type="button"
            onClick={onClose}
          >
            돌아가기
          </Button>
          <Button
            variant="payment"
            className="my-page-cancel-confirm-modal__button"
            type="button"
            onClick={onConfirm}
          >
            예약 취소하기
          </Button>
        </div>
      </div>
    </div>
  );
}
