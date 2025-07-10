import { db } from "../db/db.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { findProductOrThrow } from "../utils/productHelpers.js";

// Add Product (body is already validated)
export const addProduct = async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;

    const product = await db.products.create({
      data: { name, price, stock, category },
    });

    return sendSuccess(res, 201, "Product added successfully", {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
    });
  } catch (error) {
    console.error("Add product error:", error);
    return sendError(res, 500, "Internal server error", error.message);
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await findProductOrThrow(productId, res);
    if (!product) return;

    const updatedProduct = await db.products.update({
      where: { id: productId },
      data: req.body, // safe since validated by middleware
    });

    return sendSuccess(res, 200, "Product updated successfully", {
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
      },
    });
  } catch (error) {
    console.error("Update product error:", error);
    return sendError(res, 500, "Internal server error", error.message);
  }
};

// Get Product Details
export const productDetails = async (req, res) => {
  const { productId } = req.params;

  

  try {
    const product = await findProductOrThrow(productId, res);
    if (!product) return;

    return sendSuccess(res, 200, "Product fetched successfully", {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
    });
  } catch (error) {
    console.error("Fetch product error:", error);
    return sendError(res, 500, "Internal server error", error.message);
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await findProductOrThrow(productId, res);
    if (!product) return;

    await db.products.delete({ where: { id: productId } });

    return sendSuccess(res, 200, "Product deleted successfully", {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return sendError(res, 500, "Internal server error", error.message);
  }
};
