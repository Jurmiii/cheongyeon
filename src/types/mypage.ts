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
