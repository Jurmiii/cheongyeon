export type ReservationStatus = "upcoming" | "completed" | "cancelled" | "noshow";

export interface UserProfile {
  loginId: string;
  name: string;
  phone: string;
  email: string;
}

export interface Reservation {
  id: string;
  userId: string;
  classTitle: string;
  branch: string;
  location: string;
  date: string;
  time: string;
  guestCount: number;
  reserverName?: string;
  reserverPhone?: string;
  requestMessage?: string;
  paymentMethod?: "card" | "bank";
  cardCompany?: string | null;
  installmentPlan?: string;
  savePaymentMethod?: boolean;
  status: ReservationStatus;
  image: string;
  createdAt: string;
}

export interface ProfileFormValues {
  name: string;
  phone: string;
  email: string;
}

export interface ReservationStats {
  activeCount: number;
  completedCount: number;
  stampCount: number;
}
