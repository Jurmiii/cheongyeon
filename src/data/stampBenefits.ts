export type StampBenefitId = "stamp-4-half" | "stamp-8-free";

export interface StampBenefit {
  id: StampBenefitId;
  requiredStamps: number;
  title: string;
  description: string;
  discountRate: number;
}

export const STAMP_BENEFITS: StampBenefit[] = [
  {
    id: "stamp-4-half",
    requiredStamps: 4,
    title: "스탬프 4개 혜택",
    description: "원데이 클래스 1인 50% 할인",
    discountRate: 0.5,
  },
  {
    id: "stamp-8-free",
    requiredStamps: 8,
    title: "스탬프 8개 혜택",
    description: "원데이 클래스 1인 무료체험",
    discountRate: 1,
  },
];

export function getStampBenefitById(id: StampBenefitId) {
  return STAMP_BENEFITS.find((benefit) => benefit.id === id) ?? null;
}

export function getAvailableStampBenefits(availableStamps: number) {
  return STAMP_BENEFITS.filter((benefit) => availableStamps >= benefit.requiredStamps);
}

export function parsePriceKrw(price: string) {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

export function formatPriceKrw(amount: number) {
  return `${amount.toLocaleString("ko-KR")}원`;
}

export function calculateStampBenefitDiscount(unitPrice: number, benefitId: StampBenefitId | null) {
  if (!benefitId) {
    return 0;
  }

  const benefit = getStampBenefitById(benefitId);

  if (!benefit) {
    return 0;
  }

  return Math.round(unitPrice * benefit.discountRate);
}

export function calculateStampPricing(
  productAmount: number,
  unitPrice: number,
  benefitId: StampBenefitId | null,
) {
  const discountAmount = calculateStampBenefitDiscount(unitPrice, benefitId);

  return {
    productAmount,
    discountAmount,
    finalAmount: Math.max(0, productAmount - discountAmount),
  };
}
