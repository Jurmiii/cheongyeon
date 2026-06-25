import type { Reservation, ReservationStats, ReservationStatus } from "../types/mypage";
import { isFutureOrTodayReservation } from "./reservationFormat";

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
    stampCount: Math.floor(completedCount / 4),
  };
}

export function addReservation(reservation: Reservation) {
  const reservations = readReservations();
  const nextReservations = [...reservations, reservation];
  writeReservations(nextReservations);
  return nextReservations.filter((item) => item.userId === reservation.userId);
}
