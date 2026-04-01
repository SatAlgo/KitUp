import axios from "axios";

export const sendWhatsAppOTP = async (mobNumber, otp) => {
  try {
    // Example using a generic API provider (like Wassenger or Twilio)
    const response = await axios.post(
      "https://api.provider.com/v1/messages", 
      {
        phone: mobNumber, // Receiver's number (with country code)
        message: `Your KitUp verification code is: ${otp}. It expires in 10 minutes.`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("WhatsApp API Error:", error.response?.data || error.message);
    throw new Error("Failed to send WhatsApp message");
  }
};