import {createContext,useContext,useEffect,useState,type ReactNode} from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {buildGoogleAuthUrl,exchangeGoogleCode, fetchCurrentUser} from "../services/authService";
import type { AuthState, AuthUser } from "../types/auth";
import { clearAuthSession, readStoredAuthSession,saveAuthSession} from "../services/authStorage";

interface AuthContextType extends AuthState {
  startGoogleLogin: () => void;
  handleGoogleCallback: (code: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const hydrateSession = async () => {
    const stored = readStoredAuthSession();

    if (!stored) {
      setInitialized(true);
      return;
    }

    setUser(stored.user as AuthUser);
    setAccessToken(stored.accessToken);

    try {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      saveAuthSession(currentUser, stored.accessToken);
    } catch {
      clearAuthSession();
      setUser(null);
      setAccessToken(null);
    } finally {
      setInitialized(true);
    }
  };

  useEffect(() => {
    void hydrateSession();
  }, []);

  const startGoogleLogin = () => {
    window.location.href = buildGoogleAuthUrl();
  };

  const handleGoogleCallback = async (code: string) => {
    setLoading(true);

    try {
      const session = await exchangeGoogleCode(code);
      setUser(session.user);
      setAccessToken(session.googleTokens.accessToken);
      saveAuthSession(session.user, session.googleTokens.accessToken);
      toast.success("Signed in with Google");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    const stored = readStoredAuthSession();

    if (!stored) {
      return;
    }

    try {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      setAccessToken(stored.accessToken);
      saveAuthSession(currentUser, stored.accessToken);
    } catch {
      logout();
    }
  };

  const logout = () => {
    clearAuthSession();
    setUser(null);
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        initialized,
        startGoogleLogin,
        handleGoogleCallback,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export const getStoredAccessToken = (): string | null => {
  return readStoredAuthSession()?.accessToken ?? null;
};
