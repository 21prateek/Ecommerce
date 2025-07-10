import { z } from "zod";

export const addCartItemSchema = z.object({
  quantity: z.number().gte(1),
});
