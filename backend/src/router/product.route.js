import express from "express";
import { validator } from "../middleware/validator.middleware.js";
import {
  addProductSchema,
  updateProductSchema,
} from "../validation/product.validation.js";
import { authMiddlewre, checkAdmin } from "../middleware/auth.middleware.js";
import {
  addProduct,
  deleteProduct,
  productDetails,
  updateProduct,
} from "../controller/product.controller.js";

export const productRouter = express.Router();

// Add product (Admin only)
productRouter.post(
  "/add",
  validator(addProductSchema),
  authMiddlewre,
  checkAdmin,
  addProduct
);

// Get single product (Public)
productRouter.get("/:productId", productDetails);

// Update product (Admin only)
productRouter.put(
  "/update/:productId", // ✅ include :productId in path
  validator(updateProductSchema),
  authMiddlewre,
  checkAdmin,
  updateProduct
);

// Delete product (Admin only)
productRouter.delete("/:productId", authMiddlewre, checkAdmin, deleteProduct);
