import { useEffect } from "react";

import logo from "../../assets/images/00header-footer/logo.svg";
import bujuk from "../../assets/images/13my-page/dojang.png";
import cup from "../../assets/images/13my-page/cup.png";
import smbujuk from "../../assets/images/13my-page/smbujuk.png";
import { useReservations } from "../../hooks/useReservations";
import "./StampPage.scss";

const STAMP_COUNT = 8;

type StampModalProps = {
  count?: number;
  onClose: () => void;
};

function StampModal({ count = STAMP_COUNT, onClose }: StampModalProps) {
  const { stats } = useReservations();
  const stampedCount = stats.stampCount;

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

  return (
    <div className="stamp-modal" role="presentation" onClick={onClose}>
      <section
        className="stamp-card"
        aria-label="스탬프 적립"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <img className="stamp-card__logo" src={logo} alt="청연" />
        <p className="stamp-card__subtitle ft-22r">
          맑은 마음이 깊은 곳에 닿기를, 청연이 함께합니다.
        </p>

        <div className="stamp-card__cups">
          {Array.from({ length: count }, (_, index) => index + 1).map((number) => (
            <div className="stamp-cup" key={number}>
              <img className="stamp-cup__image" src={cup} alt="" aria-hidden="true" />
              <span className="stamp-cup__number ft-48b">{number}</span>
              {number <= stampedCount ? (
                <img className="stamp-cup__bujuk" src={bujuk} alt="" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="stamp-card__benefits">
          <div className="stamp-benefit">
            <img className="stamp-benefit__icon" src={smbujuk} alt="" aria-hidden="true" />
            <span className="stamp-benefit__label ft-14r">4개 적립 혜택</span>
            <span className="stamp-benefit__desc ft-14r">
              원데이 클래스 <strong className="ft-18b">50%</strong> 할인
            </span>
          </div>
          <div className="stamp-benefit">
            <img className="stamp-benefit__icon" src={smbujuk} alt="" aria-hidden="true" />
            <span className="stamp-benefit__label ft-14r">8개 적립 혜택</span>
            <span className="stamp-benefit__desc ft-14r">
              원데이 클래스 <strong className="ft-18b">무료체험</strong>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StampModal;
