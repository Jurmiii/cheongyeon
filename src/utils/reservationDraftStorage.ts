import type {
  CardCompany,
  InstallmentPlan,
  ReservationBranch,
  ReservationTimeSlot,
} from "../data/reservationClasses";
import type { StampBenefitId } from "../data/stampBenefits";

const RESERVATION_DRAFT_KEY = "cheongyeon-reservation-draft";

export type ReservationDraft = {
  selectedBranch: ReservationBranch;
  reservationName: string;
  reservationPhone: string;
  selectedClassId: number;
  classPage: number;
  selectedDate: string;
  selectedTime: ReservationTimeSlot;
  guestCount: number;
  requestMessage: string;
  paymentMethod: "card" | "bank";
  selectedCardCompany: CardCompany | null;
  selectedInstallment: InstallmentPlan;
  savePaymentMethod: boolean;
  appliedStampBenefitId: StampBenefitId | null;
};

export function saveReservationDraft(draft: ReservationDraft) {
  try {
    sessionStorage.setItem(RESERVATION_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Ignore storage failures and continue with login redirect.
  }
}

export function readReservationDraft(): ReservationDraft | null {
  try {
    const raw = sessionStorage.getItem(RESERVATION_DRAFT_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as ReservationDraft;
  } catch {
    return null;
  }
}

export function clearReservationDraft() {
  try {
    sessionStorage.removeItem(RESERVATION_DRAFT_KEY);
  } catch {
    // Ignore storage failures.
  }
}
