import type { Reservation, ReservationStats, ReservationStatus } from "../types/mypage";
import { RESERVATION_SESSION_CAPACITY } from "../data/reservationClasses";
import { isFutureOrTodayReservation } from "./reservationFormat";
import { getMockBookedGuestCountForSession } from "./sessionAvailability";

export const RESERVATIONS_STORAGE_KEY = "cheongyeon-reservations";
export const RESERVATIONS_CHANGED_EVENT = "cheongyeon-reservations-changed";

function readReservations(): Reservation[] {
  const raw = localStorage.getItem(RESERVATIONS_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Reservation[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeReservations(reservations: Reservation[]) {
  localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
  window.dispatchEvent(new Event(RESERVATIONS_CHANGED_EVENT));
}

export function getReservationsByUser(userId: string) {
  return readReservations().filter((reservation) => reservation.userId === userId);
}

export function saveReservationsForUser(userId: string, userReservations: Reservation[]) {
  const others = readReservations().filter((reservation) => reservation.userId !== userId);
  writeReservations([...others, ...userReservations]);
}

export function seedReservationsIfEmpty(userId: string, seedReservations: Reservation[]) {
  const existing = getReservationsByUser(userId);

  if (existing.length > 0) {
    return existing;
  }

  saveReservationsForUser(userId, seedReservations);
  return seedReservations;
}

export function updateReservationStatus(
  userId: string,
  reservationId: string,
  status: ReservationStatus,
) {
  const reservations = getReservationsByUser(userId).map((reservation) =>
    reservation.id === reservationId ? { ...reservation, status } : reservation,
  );

  saveReservationsForUser(userId, reservations);
  return reservations;
}

export function isActiveUpcomingReservation(reservation: Reservation) {
  return reservation.status === "upcoming" && isFutureOrTodayReservation(reservation.date);
}

export function getUpcomingReservation(reservations: Reservation[]) {
  return reservations
    .filter(isActiveUpcomingReservation)
    .sort((left, right) => {
      const leftCreatedAt = new Date(left.createdAt).getTime();
      const rightCreatedAt = new Date(right.createdAt).getTime();

      if (leftCreatedAt !== rightCreatedAt) {
        return rightCreatedAt - leftCreatedAt;
      }

      const leftDate = new Date(`${left.date}T${left.time}`);
      const rightDate = new Date(`${right.date}T${right.time}`);
      return leftDate.getTime() - rightDate.getTime();
    })[0] ?? null;
}

export function getHistoryReservations(reservations: Reservation[]) {
  return reservations
    .filter((reservation) => reservation.status !== "upcoming")
    .sort((left, right) => {
      const leftDate = new Date(`${left.date}T${left.time}`);
      const rightDate = new Date(`${right.date}T${right.time}`);
      return rightDate.getTime() - leftDate.getTime();
    });
}

export function getReservationStats(reservations: Reservation[]): ReservationStats {
  const activeCount = reservations.filter(isActiveUpcomingReservation).length;
  const completedCount = reservations.filter((reservation) => reservation.status === "completed").length;

  return {
    activeCount,
    completedCount,
    stampCount: Math.min(completedCount, 8),
  };
}

export function addReservation(reservation: Reservation) {
  const reservations = readReservations();
  const nextReservations = [...reservations, reservation];
  writeReservations(nextReservations);
  return nextReservations.filter((item) => item.userId === reservation.userId);
}

export function updateReservation(userId: string, reservationId: string, updatedReservation: Reservation) {
  const reservations = getReservationsByUser(userId).map((reservation) =>
    reservation.id === reservationId ? updatedReservation : reservation,
  );

  saveReservationsForUser(userId, reservations);
  return reservations;
}

type SessionAvailabilityParams = {
  date: string;
  time: string;
  classTitle: string;
  branch: string;
  excludeReservationId?: string;
};

function isActiveSessionReservation(reservation: Reservation) {
  return reservation.status === "upcoming" && isFutureOrTodayReservation(reservation.date);
}

export function getBookedGuestCountForSession({
  date,
  time,
  classTitle,
  branch,
  excludeReservationId,
}: SessionAvailabilityParams) {
  return readReservations()
    .filter(
      (reservation) =>
        isActiveSessionReservation(reservation) &&
        reservation.date === date &&
        reservation.time === time &&
        reservation.classTitle === classTitle &&
        reservation.branch === branch &&
        reservation.id !== excludeReservationId,
    )
    .reduce((total, reservation) => total + reservation.guestCount, 0);
}

export function getRemainingSeatsForSession(params: SessionAvailabilityParams) {
  const mockBookedCount = getMockBookedGuestCountForSession(params);
  const actualBookedCount = getBookedGuestCountForSession(params);
  const totalBookedCount = mockBookedCount + actualBookedCount;

  return Math.max(0, RESERVATION_SESSION_CAPACITY - totalBookedCount);
}
