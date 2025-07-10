import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.string(),
});

export const updateProductSchema = z.object({
  price: z.number().gte(1, "Enter a valid stock"),
  stock: z.number().gte(5, "Enter a valid price"),
});
