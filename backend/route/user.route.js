// import express from "express";
// import { signup, login, verifyOTP } from "../controller/user.controller.js"; // 👈 Add verifyOTP here


// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/verify-otp", verifyOTP); // 👈 Now this won't crash

// export default router;

import express from "express";
import { 
  signup, 
  login, 
  verifyOTP, 
  sendMobileOTP,           // Added
  sendPasswordResetOTP,    // Added
  updatePasswordWithOTP    // Added
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);

// This is the bypass route for WhatsApp
router.post("/send-mobile-otp", sendMobileOTP);

// These are for Email-based password reset
router.post("/send-password-reset-otp", sendPasswordResetOTP);
router.post("/update-password", updatePasswordWithOTP);

export default router;