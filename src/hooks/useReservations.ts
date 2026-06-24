import { useCallback, useEffect, useMemo, useState } from "react";

import { createSeedReservations } from "../data/myPageSeed";
import { useAuth } from "../contexts/AuthContext";
import type { Reservation } from "../types/mypage";
import {
  getHistoryReservations,
  getReservationStats,
  getUpcomingReservation,
  seedReservationsIfEmpty,
  updateReservationStatus,
} from "../utils/reservationStorage";

export function useReservations() {
  const { loginId } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const loadReservations = useCallback(() => {
    if (!loginId) {
      setReservations([]);
      return;
    }

    const nextReservations = seedReservationsIfEmpty(loginId, createSeedReservations(loginId));
    setReservations(nextReservations);
  }, [loginId]);

  useEffect(() => {
    loadReservations();
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

      const nextReservations = updateReservationStatus(loginId, reservationId, "cancelled");
      setReservations(nextReservations);
    },
    [loginId],
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
