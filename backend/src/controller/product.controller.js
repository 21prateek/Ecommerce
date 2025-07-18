import { db } from "../db/db.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { findProductOrThrow } from "../utils/productHelpers.js";
import uploadOnCloudinary from "../config/cloudinary.js";

// Add Product (body is already validated)
export const addProduct = async (req, res) => {
  try {
    console.log("Image", req.files.image[0]);
    console.log("REQ.HEADERS", req.headers);
    console.log("REQ.BODY:", req.body);
    if (!req.files) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const { name, price, stock, category } = req.body;
    const pathImage = req.files.image[0];

    if (!pathImage) return sendError(res, 400, "Image is required");

    console.log(pathImage.path);
    const productImage = await uploadOnCloudinary(pathImage.path);

    // console.log(productImage);

    const product = await db.products.create({
      data: { name, price, stock, category, imageUrl: productImage.url },
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

//all product
export const allProduct = async (req, res) => {
  try {
    const products = await db.products.findMany();
    if (products.length == 0) {
      sendError(res, 403, "No product found");
    }

    sendSuccess(res, 200, "Products found", { product: products });
  } catch (error) {
    console.error("Delete product error:", error);
    return sendError(res, 500, "Internal server error", error.message);
  }
};
