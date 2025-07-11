import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorPayOrder = async ({ amount, receipt }) => {
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt,
    payment_capture: 1,
  });

  return order; // includes id, amount, currency, status
};

export const verifyRazorPayOrder = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  //generate a sigature , as razorpay send a signature from itself if both matches then its valid, and to generate signature from our side do this use ur own key
  const generateSignatue = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  return generateSignatue === razorpay_signature;
};
