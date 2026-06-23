import { useEffect } from "react";

import { Icon } from "../../components/common";
import "./ReservationCompleteModal.scss";

interface ReservationCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ReservationCompleteModal({ isOpen, onClose }: ReservationCompleteModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

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
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="reservation-complete-modal" role="presentation" onClick={onClose}>
      <div
        className="reservation-complete-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-complete-title"
        aria-describedby="reservation-complete-description"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="reservation-complete-modal__icon-wrap" aria-hidden="true">
          <svg className="reservation-complete-modal__icon" viewBox="0 0 73 73" fill="none">
            <path
              d="M18 37.5 31.5 51 55 24.5"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="reservation-complete-modal__copy">
          <h2 className="reservation-complete-modal__title ft-48b ink500" id="reservation-complete-title">
            예약완료
          </h2>
          <p className="reservation-complete-modal__description ft-28r ink500" id="reservation-complete-description">
            소중한 시간을 청연과 함께해 주셔서 감사합니다.
          </p>
        </div>

        <button className="reservation-complete-modal__confirm ft-18r ink500" type="button" onClick={onClose}>
          <span>예약 정보 확인하기</span>
          <Icon className="reservation-complete-modal__confirm-icon" name="angle-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default ReservationCompleteModal;
