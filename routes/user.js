import express from "express";
const router = express.Router();
import auth from '../middleware/auth.js';

import { signin, signup, refreshToken } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/refreshToken", auth, refreshToken);

export default router;