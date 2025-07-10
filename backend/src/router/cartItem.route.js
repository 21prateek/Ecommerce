import express from "express";

import {
  addItemToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../controller/cart.controller.js";
import { authMiddlewre } from "../middleware/auth.middleware.js";

export const cartItemRouter = express.Router();

cartItemRouter.post("/add-item", authMiddlewre, addItemToCart);
cartItemRouter.get("/add-cart", authMiddlewre, getCart);
cartItemRouter.put("/update-cart/:cartId", authMiddlewre, updateQuantity);
cartItemRouter.delete("/delete/:cartItemId", authMiddlewre, removeFromCart);
