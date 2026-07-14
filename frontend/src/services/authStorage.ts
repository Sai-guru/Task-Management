const AUTH_STORAGE_KEY = "o2h-auth";

export interface StoredAuthSession {
  user: unknown;
  accessToken: string;
}

export const readStoredAuthSession = (): StoredAuthSession | null => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredAuthSession;
  } catch {
    return null;
  }
};

export const saveAuthSession = (user: unknown, accessToken: string) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, accessToken }));
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getStoredAccessToken = (): string | null =>
  readStoredAuthSession()?.accessToken ?? null;
