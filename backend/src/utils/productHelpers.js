import { db } from "../db/db.js";
import { sendError } from "./response.js";

// Reusable product fetcher
export const findProductOrThrow = async (productId, res) => {
  if (!productId) {
    sendError(res, 400, "Product ID is required");
    return null;
  }

  const product = await db.products.findUnique({ where: { id: productId } });

  if (!product) {
    sendError(res, 404, "Product not found");
    return null;
  }

  return product;
};
