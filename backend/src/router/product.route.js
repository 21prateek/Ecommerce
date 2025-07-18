import express from "express";
import { validator } from "../middleware/validator.middleware.js";
import {
  addProductSchema,
  updateProductSchema,
} from "../validation/product.validation.js";
import { authMiddlewre, checkAdmin } from "../middleware/auth.middleware.js";
import {
  addProduct,
  allProduct,
  deleteProduct,
  productDetails,
  updateProduct,
} from "../controller/product.controller.js";
import { upload } from "../middleware/upload.middleware.js";

export const productRouter = express.Router();

// Add product (Admin only)
productRouter.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  authMiddlewre,
  checkAdmin,
  validator(addProductSchema),
  addProduct
);

//all products
productRouter.get("/", authMiddlewre, allProduct);

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

// productRouter.post("/upload-test", upload.single("image"), (req, res) => {
//   console.log("Start");
//   console.log("File:", req.file);
//   res.json({ message: "Upload worked", file: req.file });
// });
