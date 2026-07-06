import { useCallback, useEffect, useMemo, useState } from "react";

import { RESERVATION_CLASS_DISPLAY_ITEMS, createSeedReservations } from "../data/myPageSeed";
import { useAuth } from "../contexts/AuthContext";
import type { Reservation } from "../types/mypage";
import {
  RESERVATIONS_CHANGED_EVENT,
  RESERVATIONS_STORAGE_KEY,
  getHistoryReservations,
  getReservationStats,
  getUpcomingReservation,
  saveReservationsForUser,
  seedReservationsIfEmpty,
  updateReservationStatus,
} from "../utils/reservationStorage";
import { getStampBenefitById } from "../data/stampBenefits";
import { restoreStamps } from "../utils/stampStorage";

function getNormalizedClassIndex(reservation: Reservation, index: number) {
  if (reservation.classTitle === "차 블렌더 클래스" || reservation.classTitle === "차 블랜더 클래스") {
    return 2;
  }

  if (reservation.classTitle === "계절 다도 클래스") {
    return 4 + (index % 4);
  }

  const exactIndex = RESERVATION_CLASS_DISPLAY_ITEMS.findIndex(
    (item) => item.classTitle === reservation.classTitle,
  );

  return exactIndex >= 0 ? exactIndex : index % RESERVATION_CLASS_DISPLAY_ITEMS.length;
}

function normalizeReservationDisplayItems(reservations: Reservation[]) {
  return reservations.map((reservation, index) => {
    const displayItem = RESERVATION_CLASS_DISPLAY_ITEMS[getNormalizedClassIndex(reservation, index)];

    return {
      ...reservation,
      classTitle: displayItem.classTitle,
      image: displayItem.image,
    };
  });
}

export function useReservations() {
  const { loginId } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const loadReservations = useCallback(() => {
    if (!loginId) {
      setReservations([]);
      return;
    }

    const seededReservations = seedReservationsIfEmpty(loginId, createSeedReservations(loginId));
    const nextReservations = normalizeReservationDisplayItems(seededReservations);

    if (JSON.stringify(seededReservations) !== JSON.stringify(nextReservations)) {
      saveReservationsForUser(loginId, nextReservations);
    }

    setReservations(nextReservations);
  }, [loginId]);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  useEffect(() => {
    const handleReservationsChange = () => {
      loadReservations();
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === RESERVATIONS_STORAGE_KEY) {
        loadReservations();
      }
    };

    window.addEventListener(RESERVATIONS_CHANGED_EVENT, handleReservationsChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(RESERVATIONS_CHANGED_EVENT, handleReservationsChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadReservations]);

  const upcomingReservation = useMemo(
    () => getUpcomingReservation(reservations),
    [reservations],
  );

  const historyReservations = useMemo(
    () => getHistoryReservations(reservations),
    [reservations],
  );

  const stats = useMemo(() => getReservationStats(reservations), [reservations]);

  const cancelReservation = useCallback(
    (reservationId: string) => {
      if (!loginId) {
        return;
      }

      const targetReservation = reservations.find((reservation) => reservation.id === reservationId);

      if (targetReservation?.stampBenefitId) {
        const benefit = getStampBenefitById(targetReservation.stampBenefitId);

        if (benefit) {
          restoreStamps(loginId, benefit.requiredStamps);
        }
      }

      const nextReservations = updateReservationStatus(loginId, reservationId, "cancelled");
      setReservations(nextReservations);
    },
    [loginId, reservations],
  );

  return {
    reservations,
    upcomingReservation,
    historyReservations,
    stats,
    cancelReservation,
    reloadReservations: loadReservations,
  };
}
