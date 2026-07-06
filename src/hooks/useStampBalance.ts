import { useAuth } from "../contexts/AuthContext";
import { getAvailableStampBalance, getConsumedStamps } from "../utils/stampStorage";
import { useReservations } from "./useReservations";

export function useStampBalance() {
  const { loginId } = useAuth();
  const { stats } = useReservations();
  const earnedStamps = stats.stampCount;
  const consumedStamps = loginId ? getConsumedStamps(loginId) : 0;
  const availableStamps = loginId ? getAvailableStampBalance(loginId, earnedStamps) : 0;

  return {
    earnedStamps,
    consumedStamps,
    availableStamps,
  };
}
