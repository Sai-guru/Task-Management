import { Router } from "express";

import { googleSignIn, getCurrentUser } from "../controllers/authController.js";
import { attachUser, requireUser } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/google", googleSignIn);

router.use(attachUser);
router.get("/me", requireUser, getCurrentUser);

export default router;
