export interface AuthUser {
  id: number;
  email: string;
  name: string;
  picture: string | null;
  googleId: string;
}

export interface GoogleTokenSet {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface GoogleAuthResponse {
  user: AuthUser;
  googleTokens: GoogleTokenSet;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
  initialized: boolean;
}
