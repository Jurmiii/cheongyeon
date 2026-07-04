import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { supabase } from "../lib/supabase";
import {
  clearAuthSession,
  readAuthSession,
  saveAuthSession,
  type AuthSession,
} from "../utils/authStorage";
import { resolveLoginIdFromSession } from "../utils/kakaoAuth";

interface AuthContextValue {
  isLoggedIn: boolean;
  loginId: string | null;
  keepLogin: boolean;
  login: (loginId: string, keepLogin: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => readAuthSession());

  useEffect(() => {
    let active = true;

    async function restoreSupabaseSession() {
      if (readAuthSession()) {
        return;
      }

      const {
        data: { session: supabaseSession },
      } = await supabase.auth.getSession();

      if (!active || !supabaseSession) {
        return;
      }

      const loginId = await resolveLoginIdFromSession();

      if (!loginId) {
        return;
      }

      const nextSession = { loginId, keepLogin: true };
      saveAuthSession(nextSession);
      setSession(nextSession);
    }

    void restoreSupabaseSession();

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback((loginId: string, keepLogin: boolean) => {
    const nextSession = { loginId, keepLogin };
    saveAuthSession(nextSession);
    setSession(nextSession);
  }, []);

  const logout = useCallback(() => {
    void supabase.auth.signOut();
    clearAuthSession();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn: session !== null,
      loginId: session?.loginId ?? null,
      keepLogin: session?.keepLogin ?? false,
      login,
      logout,
    }),
    [login, logout, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
