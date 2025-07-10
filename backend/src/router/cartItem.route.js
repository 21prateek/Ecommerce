import express from "express";
import { validator } from "../middleware/validator.middleware.js";
import {
  addItemToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../controller/cart.controller.js";
import { authMiddlewre } from "../middleware/auth.middleware.js";
import { addCartItemSchema } from "../validation/cartItem.validation.js";

export const cartItemRouter = express.Router();

cartItemRouter.post(
  "/add-item",
  validator(addCartItemSchema),
  authMiddlewre,
  addItemToCart
);

cartItemRouter.get("/add-cart", authMiddlewre, getCart);
cartItemRouter.post("/update-cart/:cartId", authMiddlewre, updateQuantity);
cartItemRouter.delete("/delete/:cartItemId", authMiddlewre, removeFromCart);
