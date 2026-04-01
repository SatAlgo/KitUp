import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobNumber: { type: String, required: true },
  whatsAppNumber: { type: String },
  address: { type: String, required: true },
  
  // --- OTP Verification Fields ---
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  
  mobileOtp: String,
  mobileOtpExpires: Date,
  isMobileVerified: { type: Boolean, default: false },
  resetOtp: String,
  resetOtpExpires: Date,
  // -------------------------------

  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;