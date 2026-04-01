// import User from "../model/user.model.js";
// import bcrypt from "bcryptjs";
// import { sendEmailOTP } from "../utils/emailService.js";
// import { sendWhatsAppOTP } from "../utils/whatsappService.js";

// // --- 1. SIGNUP ---
// export const signup = async (req, res) => {
//   try {
//     const { name, surname, email, password, mobNumber, address } = req.body;
//     let user = await User.findOne({ email });

//     if (user && user.isVerified) {
//       return res.status(400).json({ message: "User already exists. Please login." });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 
//     const hashedPassword = await bcrypt.hash(password, 10);

//     if (user) {
//       Object.assign(user, { name, surname, password: hashedPassword, mobNumber, address, otp, otpExpires });
//     } else {
//       user = new User({ name, surname, email, password: hashedPassword, mobNumber, address, otp, otpExpires });
//     }

//     await user.save();
//     await sendEmailOTP(email, otp);
//     res.status(200).json({ message: "Verification OTP sent to Email!", email: user.email });
//   } catch (error) {
//     res.status(500).json({ message: "Signup Error", error: error.message });
//   }
// };

// // --- 2. VERIFY EMAIL (DURING SIGNUP) ---
// export const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
//     if (!user) return res.status(400).json({ message: "Invalid or expired OTP." });

//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();
//     res.status(200).json({ success: true, message: "Email Verified!" });
//   } catch (error) {
//     res.status(500).json({ message: "Verification Error", error: error.message });
//   }
// };

// // --- 3. LOGIN ---
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !user.isVerified) return res.status(403).json({ message: "Invalid credentials or unverified account." });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     res.status(200).json({ message: "Login successful", user });
//   } catch (error) {
//     res.status(500).json({ message: "Login Error", error: error.message });
//   }
// };

// // --- 4. SEND WHATSAPP OTP (FOR SELLER VERIFICATION) ---
// // export const sendMobileOTP = async (req, res) => {
// //   try {
// //     const { userId, mobNumber } = req.body;
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
// //     await User.findByIdAndUpdate(userId, { 
// //       mobileOtp: otp, 
// //       mobileOtpExpires: new Date(Date.now() + 10 * 60 * 1000) 
// //     });

// //     await sendWhatsAppOTP(mobNumber, otp); 
// //     res.status(200).json({ message: "OTP sent to WhatsApp!" });
// //   } catch (error) {
// //     res.status(500).json({ message: "WhatsApp failed", error: error.message });
// //   }
// // };
// // --- BYPASS VERSION: SEND WHATSAPP OTP ---
// export const sendMobileOTP = async (req, res) => {
//   try {
//     const { userId } = req.body;
    
//     // 1. Debug log to see if userId is arriving
//     console.log("Attempting bypass for User ID:", userId);

//     if (!userId) {
//       return res.status(400).json({ message: "User ID is missing from request" });
//     }

//     // 2. Perform the update
//     const updatedUser = await User.findByIdAndUpdate(
//       userId, 
//       { isMobileVerified: true }, 
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found in database" });
//     }

//     res.status(200).json({ 
//       message: "Mobile Verified (Bypassed)!", 
//       isMobileVerified: true 
//     });

//   } catch (error) {
//     console.error("❌ BACKEND BYPASS ERROR:", error.message);
//     res.status(500).json({ message: "Bypass failed", error: error.message });
//   }
// };

// // --- 5. VERIFY WHATSAPP OTP ---
// export const verifyMobileOTP = async (req, res) => {
//   try {
//     const { userId, otp } = req.body;
//     const user = await User.findOne({ _id: userId, mobileOtp: otp, mobileOtpExpires: { $gt: Date.now() } });

//     if (!user) return res.status(400).json({ message: "Invalid/Expired WhatsApp OTP" });

//     user.isMobileVerified = true;
//     user.mobileOtp = undefined;
//     user.mobileOtpExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: "Mobile Verified!", isMobileVerified: true });
//   } catch (error) {
//     res.status(500).json({ message: "Verification failed", error: error.message });
//   }
// };

// // --- 6. PASSWORD RESET FLOW ---
// export const sendPasswordResetOTP = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const user = await User.findOneAndUpdate({ email }, { resetOtp: otp, resetOtpExpires: new Date(Date.now() + 10 * 60 * 1000) });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     await sendEmailOTP(email, otp);
//     res.status(200).json({ message: "Reset OTP sent to email!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error", error: error.message });
//   }
// };

// export const updatePasswordWithOTP = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;
//     const user = await User.findOne({ email, resetOtp: otp, resetOtpExpires: { $gt: Date.now() } });
//     if (!user) return res.status(400).json({ message: "Invalid OTP" });

//     user.password = await bcrypt.hash(newPassword, 10);
//     user.resetOtp = undefined;
//     user.resetOtpExpires = undefined;
//     await user.save();
//     res.status(200).json({ message: "Password updated successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Update failed", error: error.message });
//   }
// };

import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { sendEmailOTP } from "../utils/emailService.js";

// --- 1. SIGNUP (Email OTP Only) ---
export const signup = async (req, res) => {
  try {
    const { name, surname, email, password, mobNumber, address } = req.body;
    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 
    const hashedPassword = await bcrypt.hash(password, 10);

    if (user) {
      Object.assign(user, { name, surname, password: hashedPassword, mobNumber, address, otp, otpExpires });
    } else {
      user = new User({ name, surname, email, password: hashedPassword, mobNumber, address, otp, otpExpires });
    }

    await user.save();
    await sendEmailOTP(email, otp); // Sending Email OTP
    res.status(200).json({ message: "Verification OTP sent to Email!", email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Signup Error", error: error.message });
  }
};

// --- 2. VERIFY EMAIL ---
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired OTP." });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ success: true, message: "Email Verified!" });
  } catch (error) {
    res.status(500).json({ message: "Verification Error", error: error.message });
  }
};

// --- 3. LOGIN ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) return res.status(403).json({ message: "Please verify your email first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Login Error", error: error.message });
  }
};

// --- 4. WHATSAPP BYPASS (No OTP sent, just verify) ---
export const sendMobileOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { isMobileVerified: true }, 
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Mobile status verified!", isMobileVerified: true });
  } catch (error) {
    res.status(500).json({ message: "Bypass failed", error: error.message });
  }
};

// --- 5. PASSWORD RESET (Email OTP) ---
export const sendPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const cleanEmail = email.toLowerCase().trim(); // Clean the input
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // We use findOne then save to ensure hooks/validation run
    const user = await User.findOne({ email: cleanEmail });
    
    if (!user) {
      console.log("User not found for email:", cleanEmail);
      return res.status(404).json({ message: "User not found" });
    }

    user.resetOtp = otp;
    user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmailOTP(user.email, otp); 
    res.status(200).json({ message: "Reset OTP sent to your email!" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const updatePasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ 
        email, 
        resetOtp: otp, 
        resetOtpExpires: { $gt: Date.now() } 
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};