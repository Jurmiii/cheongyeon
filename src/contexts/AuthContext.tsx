import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  clearAuthSession,
  readAuthSession,
  saveAuthSession,
  type AuthSession,
} from "../utils/authStorage";

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

  const login = useCallback((loginId: string, keepLogin: boolean) => {
    const nextSession = { loginId, keepLogin };
    saveAuthSession(nextSession);
    setSession(nextSession);
  }, []);

  const logout = useCallback(() => {
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
