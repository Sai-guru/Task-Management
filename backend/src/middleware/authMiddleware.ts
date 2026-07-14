import { NextFunction, Request, Response } from "express";

import { fetchGoogleUserInfo, getBearerToken } from "../utils/auth.js";
import { upsertGoogleUser } from "../services/userService.js";

export const attachUser = (req: Request,res: Response, next: NextFunction): void => {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    res.status(401).json({success: false,message: "Google access token is needed"});
    return;
  }

  void (async () => {
    try {

      const profile = await fetchGoogleUserInfo(token);
      const user = await upsertGoogleUser(profile);
      req.user = user;
      next();

    } catch {
      res.status(401).json({success: false,message: "Invalid Google access token"});
    }
  })();
};

export const requireUser = (req: Request,res: Response,next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });

    return;
  }
  next();



};
