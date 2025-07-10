import express from "express";

import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrder,
} from "../controller/order.controller.js";
import { authMiddlewre, checkAdmin } from "../middleware/auth.middleware.js";

export const orderRouter = express.Router();

orderRouter.post("/", authMiddlewre, placeOrder); // Place a new order
orderRouter.get("/", authMiddlewre, getUserOrders); // Get user orders
orderRouter.get("/admin", authMiddlewre, checkAdmin, getAllOrders); // Admin: Get
orderRouter.put("/admin/:orderId", authMiddlewre, checkAdmin, updateOrder); // Admin: Update order status
