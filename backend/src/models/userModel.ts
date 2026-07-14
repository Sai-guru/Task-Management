export interface User {
  id: number;
  google_id: string;
  email: string;
  name: string;
  picture: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface GoogleTokenInfo {
  email?: string;
  email_verified?: boolean | string;
  name?: string;
  picture?: string;
  sub?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  picture: string | null;
  googleId: string;
}
