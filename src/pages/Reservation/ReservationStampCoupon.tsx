import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Icon } from "../../components/common";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import {
  STAMP_BENEFITS,
  calculateStampBenefitDiscount,
  calculateStampPricing,
  formatPriceKrw,
  getStampBenefitById,
  type StampBenefit,
  type StampBenefitId,
} from "../../data/stampBenefits";
import "./ReservationStampCoupon.scss";

type StampPricing = {
  productAmount: number;
  discountAmount: number;
  finalAmount: number;
};

type ReservationStampCouponProps = {
  isOpen: boolean;
  isDisabled?: boolean;
  availableStamps: number;
  availableCouponCount: number;
  appliedBenefitId: StampBenefitId | null;
  isPracticeAccount: boolean;
  productAmount: number;
  unitPrice: number;
  pricing: StampPricing;
  onOpen: () => void;
  onClose: () => void;
  onApply: (benefitId: StampBenefitId | null) => void;
};

type CouponTab = "available" | "unavailable";

function getIneligibilityReason(benefit: StampBenefit, availableStamps: number) {
  if (availableStamps >= benefit.requiredStamps) {
    return null;
  }

  return `스탬프 ${benefit.requiredStamps}개 적립 시 사용 가능`;
}

export default function ReservationStampCoupon({
  isOpen,
  isDisabled = false,
  availableStamps,
  availableCouponCount,
  appliedBenefitId,
  isPracticeAccount,
  productAmount,
  unitPrice,
  pricing,
  onOpen,
  onClose,
  onApply,
}: ReservationStampCouponProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<CouponTab>("available");
  const [pendingBenefitId, setPendingBenefitId] = useState<StampBenefitId | null>(appliedBenefitId);

  const appliedBenefit = appliedBenefitId ? getStampBenefitById(appliedBenefitId) : null;

  const benefitGroups = useMemo(() => {
    const available: StampBenefit[] = [];
    const unavailable: StampBenefit[] = [];

    STAMP_BENEFITS.forEach((benefit) => {
      const isEligible = isPracticeAccount || availableStamps >= benefit.requiredStamps;

      if (isEligible) {
        available.push(benefit);
      } else {
        unavailable.push(benefit);
      }
    });

    return { available, unavailable };
  }, [availableStamps, isPracticeAccount]);

  const pendingPricing = useMemo(
    () => calculateStampPricing(productAmount, unitPrice, pendingBenefitId),
    [pendingBenefitId, productAmount, unitPrice],
  );

  const visibleBenefits = activeTab === "available" ? benefitGroups.available : benefitGroups.unavailable;

  useLockBodyScroll(isOpen, sheetRef);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setPendingBenefitId(appliedBenefitId);
    setActiveTab(benefitGroups.available.length > 0 ? "available" : "unavailable");
  }, [appliedBenefitId, benefitGroups.available.length, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleApplyClick = () => {
    onApply(pendingBenefitId);
  };

  const couponRowValue = appliedBenefit
    ? appliedBenefit.title
    : isDisabled
      ? "사용 가능 0장"
      : availableCouponCount > 0
        ? `사용 가능 ${availableCouponCount}장`
        : "사용 가능한 쿠폰 없음";

  return (
    <>
      <div className="reservation-coupon-summary" aria-label="결제 금액 및 쿠폰">
        <button
          className={[
            "reservation-coupon-summary__row",
            isDisabled && "reservation-coupon-summary__row--disabled",
          ]
            .filter(Boolean)
            .join(" ")}
          type="button"
          onClick={onOpen}
          disabled={isDisabled}
          aria-disabled={isDisabled}
        >
          <span className="reservation-coupon-summary__label ft-16r ink500">쿠폰</span>
          <span className="reservation-coupon-summary__value">
            {pricing.discountAmount > 0 ? (
              <span className="reservation-coupon-summary__discount ft-16b">
                -{formatPriceKrw(pricing.discountAmount)}
              </span>
            ) : (
              <span className="reservation-coupon-summary__hint ft-16r ink400">{couponRowValue}</span>
            )}
            <Icon className="reservation-coupon-summary__chevron" name="chevron-right" aria-hidden="true" />
          </span>
        </button>

        <dl className="reservation-coupon-summary__amounts">
          <div className="reservation-coupon-summary__amount-row">
            <dt className="ft-16r ink400">상품금액</dt>
            <dd className="ft-16r ink500">{formatPriceKrw(pricing.productAmount)}</dd>
          </div>
          <div className="reservation-coupon-summary__amount-row">
            <dt className="ft-16r ink400">쿠폰할인</dt>
            <dd className="reservation-coupon-summary__discount-value ft-16r">
              {pricing.discountAmount > 0 ? `-${formatPriceKrw(pricing.discountAmount)}` : "0원"}
            </dd>
          </div>
          <div className="reservation-coupon-summary__amount-row reservation-coupon-summary__amount-row--total">
            <dt className="ft-18b ink500">결제예정금액</dt>
            <dd className="ft-18b ink500">{formatPriceKrw(pricing.finalAmount)}</dd>
          </div>
        </dl>
      </div>

      {isOpen
        ? createPortal(
            <div className="reservation-coupon-sheet" role="presentation" onClick={onClose}>
              <div
                ref={sheetRef}
                className="reservation-coupon-sheet__panel"
                role="dialog"
                aria-modal="true"
                aria-label="쿠폰 선택"
                onClick={(event) => event.stopPropagation()}
              >
                <header className="reservation-coupon-sheet__header">
                  <h2 className="reservation-coupon-sheet__title ft-18b ink500">쿠폰 선택</h2>
                  <button
                    className="reservation-coupon-sheet__close"
                    type="button"
                    aria-label="쿠폰 선택 닫기"
                    onClick={onClose}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </header>

                <div className="reservation-coupon-sheet__tabs" role="tablist" aria-label="쿠폰 목록">
                  <button
                    className={[
                      "reservation-coupon-sheet__tab",
                      "ft-16b",
                      activeTab === "available" && "reservation-coupon-sheet__tab--active",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "available"}
                    onClick={() => setActiveTab("available")}
                  >
                    사용 가능 {benefitGroups.available.length}
                  </button>
                  <button
                    className={[
                      "reservation-coupon-sheet__tab",
                      "ft-16b",
                      activeTab === "unavailable" && "reservation-coupon-sheet__tab--active",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "unavailable"}
                    onClick={() => setActiveTab("unavailable")}
                  >
                    사용 불가 {benefitGroups.unavailable.length}
                  </button>
                </div>

                <div className="reservation-coupon-sheet__body">
                  {activeTab === "available" ? (
                    <button
                      className={[
                        "reservation-coupon-sheet__none",
                        pendingBenefitId === null && "reservation-coupon-sheet__none--selected",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      type="button"
                      onClick={() => setPendingBenefitId(null)}
                    >
                      <span className="ft-16r ink500">쿠폰 사용 안 함</span>
                      <span
                        className={[
                          "reservation-coupon-sheet__radio",
                          pendingBenefitId === null && "reservation-coupon-sheet__radio--checked",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        aria-hidden="true"
                      />
                    </button>
                  ) : null}

                  <ul className="reservation-coupon-sheet__list">
                    {visibleBenefits.map((benefit) => {
                      const isSelected = pendingBenefitId === benefit.id;
                      const discountAmount = calculateStampBenefitDiscount(unitPrice, benefit.id);
                      const isEligible = isPracticeAccount || availableStamps >= benefit.requiredStamps;
                      const reason = getIneligibilityReason(benefit, availableStamps);

                      return (
                        <li className="reservation-coupon-sheet__item" key={benefit.id}>
                          <button
                            className={[
                              "reservation-coupon-sheet__card",
                              isSelected && "reservation-coupon-sheet__card--selected",
                              !isEligible && "reservation-coupon-sheet__card--disabled",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            type="button"
                            disabled={!isEligible}
                            onClick={() => setPendingBenefitId(benefit.id)}
                          >
                            <span className="reservation-coupon-sheet__ticket">
                              <span className="reservation-coupon-sheet__ticket-amount ft-18b">
                                {formatPriceKrw(discountAmount)}
                              </span>
                              <span className="reservation-coupon-sheet__ticket-label ft-12r">할인</span>
                            </span>
                            <span className="reservation-coupon-sheet__card-copy">
                              <span className="reservation-coupon-sheet__card-title ft-16b ink500">{benefit.title}</span>
                              <span className="reservation-coupon-sheet__card-desc ft-14r ink400">{benefit.description}</span>
                              {reason ? (
                                <span className="reservation-coupon-sheet__card-reason ft-12r ink300">{reason}</span>
                              ) : (
                                <span className="reservation-coupon-sheet__card-reason ft-12r ink300">
                                  스탬프 {benefit.requiredStamps}개 사용
                                </span>
                              )}
                            </span>
                            <span
                              className={[
                                "reservation-coupon-sheet__radio",
                                isSelected && "reservation-coupon-sheet__radio--checked",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              aria-hidden="true"
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {visibleBenefits.length === 0 ? (
                    <p className="reservation-coupon-sheet__empty ft-14r ink400">
                      {activeTab === "available" ? "사용 가능한 쿠폰이 없습니다." : "사용 불가 쿠폰이 없습니다."}
                    </p>
                  ) : null}
                </div>

                <footer className="reservation-coupon-sheet__footer">
                  <div className="reservation-coupon-sheet__footer-summary">
                    <span className="ft-14r ink400">결제예정금액</span>
                    <strong className="reservation-coupon-sheet__footer-total ft-18b ink500">
                      {formatPriceKrw(pendingPricing.finalAmount)}
                    </strong>
                  </div>
                  <button className="reservation-coupon-sheet__apply ft-16b" type="button" onClick={handleApplyClick}>
                    {pendingPricing.discountAmount > 0
                      ? `${formatPriceKrw(pendingPricing.discountAmount)} 할인 적용하기`
                      : "적용하기"}
                  </button>
                </footer>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
