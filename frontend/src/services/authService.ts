import api from "./api";
import type { GoogleAuthResponse } from "../types/auth";

interface ApiSuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const GOOGLE_SCOPE = "openid profile email";

export const buildGoogleAuthUrl = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const authorizationUri = import.meta.env.VITE_GOOGLE_AUTHORIZATION_URI;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  if (!clientId || !authorizationUri || !redirectUri) {
    throw new Error("Missing Google OAuth frontend configuration");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: GOOGLE_SCOPE,
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "true",
  });

  return `${authorizationUri}?${params.toString()}`;
};

export const exchangeGoogleCode = async (code: string) => {
  const response = await api.post<ApiSuccessResponse<GoogleAuthResponse>>(
    "/auth/google",
    {
      code,
    },
  );

  return response.data.data;
};

export const fetchCurrentUser = async () => {
  const response =
    await api.get<ApiSuccessResponse<GoogleAuthResponse["user"]>>("/auth/me");
  return response.data.data as GoogleAuthResponse["user"];
};
