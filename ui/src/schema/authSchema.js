import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, "Name should be greater than 3"),
  email: z.string().email(),
  password: z.string().min(3),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});
