import express from "express";
import { 
  signup, 
  login, 
  verifyOTP, 
  sendPasswordResetOTP, // This is your "forgot-password" logic
  updatePasswordWithOTP  // This is your "reset-password" logic
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);

// Update these two to match your Login.jsx axios calls
router.post("/forgot-password", sendPasswordResetOTP); 
router.post("/reset-password", updatePasswordWithOTP);

export default router;