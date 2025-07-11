import Razorpay from "razorpay";
import { sendError, sendSuccess } from "../utils/response.js";
import { db } from "../db/db.js";
import {
  createRazorPayOrder,
  verifyRazorPayOrder,
} from "../utils/paymentService.js";

//Create order to initilize payment
export const creater = async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.body;

  try {
    const order = await db.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order || order.userId !== userId) {
      return sendError(res, 404, "Invalid order or user");
    }

    // Prevent duplicate payment
    const existingPayment = await db.payment.findFirst({
      where: { orderId, status: "SUCCESS" },
    });
    if (existingPayment) {
      return sendError(res, 400, "Order already paid");
    }

    const amount = order.orderItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    ); //so order.orderItem will have an array of items , each item will have totalPrice (total quantity * actual amount , which has been already calculaed while addng the item to the orders database) so we can get the whole price

    //So we can write it here too but to make our code look clean
    const razorpayOrder = await createRazorPayOrder({
      amount,
      receipt: orderId,
    });

    //Put it inside our database
    await db.payment.create({
      data: {
        userId,
        orderId,
        amount,
        currency: "INR",
        status: "PENDING",
        paymentId: razorpayOrder.id,
      },
    });

    sendSuccess(res, 200, "Razorpay order created", { order: razorpayOrder });
  } catch (error) {
    console.error("Razorpay order error", error);
    sendError(res, 500, "Failed to create Razorpay order", error.message);
  }
};

//Verify payment
export const verify = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const isValid = verifyRazorPayOrder({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (!isValid) {
    return sendError(res, 400, "Payment verification failed");
  }

  try {
    //update it as SUCCESS
    const payment = await db.payment.update({
      where: { paymentId: razorpay_order_id },
      data: { status: "SUCCESS" },
    });

    //take the patment.orderId and update it
    await db.orders.update({
      where: { id: payment.orderId },
      data: { status: "PAID" },
    });

    sendSuccess(res, 200, "Payment verified successfully");
  } catch (error) {
    console.error("Payment update error:", error);
    sendError(res, 500, "Failed to update payment", error.message);
  }
};
