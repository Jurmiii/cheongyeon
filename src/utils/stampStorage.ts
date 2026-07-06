import { RESERVATIONS_CHANGED_EVENT } from "./reservationStorage";

const STAMP_USAGE_STORAGE_KEY = "cheongyeon-stamp-usage";

type StampUsageRecord = {
  consumedStamps: number;
};

type StampUsageStore = Record<string, StampUsageRecord>;

function readStampUsageStore(): StampUsageStore {
  const raw = localStorage.getItem(STAMP_USAGE_STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as StampUsageStore;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStampUsageStore(store: StampUsageStore) {
  localStorage.setItem(STAMP_USAGE_STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new Event(RESERVATIONS_CHANGED_EVENT));
}

function getStampUsageRecord(userId: string) {
  return readStampUsageStore()[userId] ?? { consumedStamps: 0 };
}

export function getConsumedStamps(userId: string) {
  return getStampUsageRecord(userId).consumedStamps;
}

export function getAvailableStampBalance(userId: string, earnedStamps: number) {
  return Math.max(0, earnedStamps - getConsumedStamps(userId));
}

export function consumeStamps(userId: string, amount: number) {
  const store = readStampUsageStore();
  const current = getStampUsageRecord(userId);

  store[userId] = {
    consumedStamps: current.consumedStamps + amount,
  };

  writeStampUsageStore(store);
}

export function restoreStamps(userId: string, amount: number) {
  const store = readStampUsageStore();
  const current = getStampUsageRecord(userId);

  store[userId] = {
    consumedStamps: Math.max(0, current.consumedStamps - amount),
  };

  writeStampUsageStore(store);
}
