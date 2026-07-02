import { useEffect } from "react";

import { Button } from "../../components/common";
import "./MyPageCancelSuccessModal.scss";

type MyPageCancelSuccessModalProps = {
  onClose: () => void;
};

export default function MyPageCancelSuccessModal({ onClose }: MyPageCancelSuccessModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="my-page-cancel-success-modal" role="presentation">
      <div
        className="my-page-cancel-success-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-page-cancel-success-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="my-page-cancel-success-modal__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M7 12.5 10.5 16 17 8.5" />
          </svg>
        </div>

        <h2 className="my-page-cancel-success-modal__title ft-22r ink500" id="my-page-cancel-success-title">
          예약이 취소되었습니다.
        </h2>
        <p className="my-page-cancel-success-modal__thanks ft-16r ink400">이용해 주셔서 감사합니다.</p>
        <p className="my-page-cancel-success-modal__refund ft-18r ink400">
          결제 금액은 영업일 기준
          <br />
          3~5일 내에 환불 처리됩니다.
        </p>

        <Button
          variant="payment"
          className="my-page-cancel-success-modal__button ft-16b"
          type="button"
          onClick={onClose}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
