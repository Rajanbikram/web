import express from "express";
// ❌ WRONG:
// import { register, login, getMe } from "../controllers/authController.js";

// ✅ CORRECT (Capital C):
import { register, login, getMe } from "../Controller/authcontroller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;
