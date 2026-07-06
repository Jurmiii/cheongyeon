import { useCallback, useEffect, useState } from "react";

import { DEFAULT_PROFILE_SEED } from "../data/myPageSeed";
import { useAuth } from "../contexts/AuthContext";
import type { ProfileFormValues, UserProfile } from "../types/mypage";
import { isValidEmail, isValidPhone } from "../utils/validation";
import { getAccount } from "../utils/accountStorage";
import { getOrCreateUserProfile, saveUserProfile } from "../utils/userProfileStorage";

export function useUserProfile() {
  const { loginId } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!loginId) {
      setProfile(null);
      return;
    }

    const account = getAccount(loginId);

    if (account) {
      const accountProfile: UserProfile = {
        loginId,
        name: account.name,
        phone: account.phone,
        email: account.email,
      };
      saveUserProfile(accountProfile);
      setProfile(accountProfile);
      return;
    }

    setProfile(getOrCreateUserProfile(loginId, DEFAULT_PROFILE_SEED));
  }, [loginId]);

  const updateProfile = useCallback(
    (values: ProfileFormValues) => {
      if (!loginId) {
        return { success: false as const, errors: { form: "로그인이 필요합니다." } };
      }

      const errors: Partial<Record<keyof ProfileFormValues, string>> = {};
      const name = values.name.trim();
      const phone = values.phone.trim();
      const email = values.email.trim();

      if (!name) {
        errors.name = "이름을 입력해 주세요.";
      }

      if (!phone) {
        errors.phone = "연락처를 입력해 주세요.";
      } else if (!isValidPhone(phone)) {
        errors.phone = "연락처를 올바른 형식으로 입력해 주세요.";
      }

      if (!email) {
        errors.email = "이메일을 입력해 주세요.";
      } else if (!isValidEmail(email)) {
        errors.email = "이메일을 올바른 형식으로 입력해 주세요.";
      }

      if (Object.keys(errors).length > 0) {
        return { success: false as const, errors };
      }

      const nextProfile: UserProfile = {
        loginId,
        name,
        phone,
        email,
      };

      saveUserProfile(nextProfile);
      setProfile(nextProfile);
      return { success: true as const };
    },
    [loginId],
  );

  return {
    profile,
    updateProfile,
  };
}
