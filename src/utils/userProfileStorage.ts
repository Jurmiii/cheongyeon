import type { UserProfile } from "../types/mypage";

export const USER_PROFILES_STORAGE_KEY = "cheongyeon-user-profiles";

function readProfiles(): Record<string, UserProfile> {
  const raw = localStorage.getItem(USER_PROFILES_STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, UserProfile>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeProfiles(profiles: Record<string, UserProfile>) {
  localStorage.setItem(USER_PROFILES_STORAGE_KEY, JSON.stringify(profiles));
}

export function getUserProfile(loginId: string): UserProfile | null {
  return readProfiles()[loginId] ?? null;
}

export function saveUserProfile(profile: UserProfile) {
  const profiles = readProfiles();
  profiles[profile.loginId] = profile;
  writeProfiles(profiles);
}

export function getOrCreateUserProfile(
  loginId: string,
  seedProfile: Omit<UserProfile, "loginId">,
): UserProfile {
  const existing = getUserProfile(loginId);

  if (existing) {
    return existing;
  }

  const profile: UserProfile = {
    loginId,
    ...seedProfile,
  };

  saveUserProfile(profile);
  return profile;
}
