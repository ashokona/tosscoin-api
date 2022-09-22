
import express from "express";
const router = express.Router();
import auth from '../middleware/auth.js';

import { coinDetails, lastGuess, createGuess } from "../controllers/coin.js";

router.get("/details", auth, coinDetails);
router.get("/guess", auth, lastGuess);
router.post("/create", auth, createGuess);

export default router;