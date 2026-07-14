import type { GoogleTokenInfo } from "../models/userModel.js";

export type GoogleOAuthConfig = {
  clientId: string;
  clientSecret: string;
  authorizationUri: string;
  tokenUri: string;
  userInfoUri: string;
  redirectUri: string;
};

export const getGoogleOAuthConfig = (): GoogleOAuthConfig => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const authorizationUri = process.env.GOOGLE_AUTHORIZATION_URI;
  const tokenUri = process.env.GOOGLE_TOKEN_URI;
  const userInfoUri = process.env.GOOGLE_USER_INFO_URI;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (
    !clientId ||
    !clientSecret ||
    !authorizationUri ||
    !tokenUri ||
    !userInfoUri ||
    !redirectUri
  ) {
    throw new Error("Missing Google OAuth configuration");
  }

  return {
    clientId,
    clientSecret,
    authorizationUri,
    tokenUri,
    userInfoUri,
    redirectUri,
  };
};

export const getBearerToken = (authorizationHeader?: string): string | null => {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.slice(7).trim() || null;
};

export const exchangeGoogleAuthorizationCode = async (
  code: string,
): Promise<{
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}> => {
  const { clientId, clientSecret, tokenUri, redirectUri } =
    getGoogleOAuthConfig();
  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const response = await fetch(tokenUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Failed to exchange Google authorization code");
  }

  const payload = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    error?: string;
  };

  if (!payload.access_token) {
    throw new Error(
      payload.error || "Google token exchange did not return an access token",
    );
  }

  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
    expiresIn: payload.expires_in,
  };
};

export const fetchGoogleUserInfo = async (
  accessToken: string,
): Promise<GoogleTokenInfo> => {
  const { userInfoUri } = getGoogleOAuthConfig();
  const response = await fetch(userInfoUri, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Google user profile");
  }

  return (await response.json()) as GoogleTokenInfo;
};
