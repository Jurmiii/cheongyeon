export const AUTH_STORAGE_KEY = "cheongyeon-auth";

export interface AuthSession {
  loginId: string;
  keepLogin: boolean;
}

function parseAuthSession(value: string | null): AuthSession | null {
  if (!value) {
    return null;
  }

  if (value === "true") {
    return { loginId: "cheongyeon", keepLogin: true };
  }

  try {
    const parsed = JSON.parse(value) as AuthSession;

    if (typeof parsed.loginId === "string" && parsed.loginId.length > 0) {
      return {
        loginId: parsed.loginId,
        keepLogin: Boolean(parsed.keepLogin),
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function readAuthSession(): AuthSession | null {
  return (
    parseAuthSession(localStorage.getItem(AUTH_STORAGE_KEY))
    ?? parseAuthSession(sessionStorage.getItem(AUTH_STORAGE_KEY))
  );
}

export function saveAuthSession(session: AuthSession) {
  const value = JSON.stringify(session);

  if (session.keepLogin) {
    localStorage.setItem(AUTH_STORAGE_KEY, value);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  sessionStorage.setItem(AUTH_STORAGE_KEY, value);
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}
