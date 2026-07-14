import { Request, Response } from "express";

import { successResponse } from "../utils/response.js";
import { exchangeGoogleAuthorizationCode, fetchGoogleUserInfo } from "../utils/auth.js";
import { findUserById, upsertGoogleUser } from "../services/userService.js";

export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { code } = req.body as { code?: string };

    if (!code) {
      res.status(400).json({
        success: false,
        message: "Google authorization code is required",
      });
      return;
    }

    const tokenSet = await exchangeGoogleAuthorizationCode(code);
    const profile = await fetchGoogleUserInfo(tokenSet.accessToken);
    const user = await upsertGoogleUser(profile);

    res.status(200).json(successResponse("Google sign-in successful.", {user,googleTokens: tokenSet}));
  } catch (error) {
    res.status(401).json({success: false,message: error instanceof Error ? error.message : "Google sign-in failed"});
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({success: false,message: "Authentication required"});
      return;
    }

    const user = await findUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json(successResponse("Authenticated user fetched successfully", user));
  } catch {
    res.status(500).json({success: false,message: "Failed to fetch authenticated user"});
  }
};
