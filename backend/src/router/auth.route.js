import express from "express";
import { validator } from "../middleware/validator.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import { login, logout, register } from "../controller/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/signup", validator(registerSchema), register);
authRouter.post("/login", validator(loginSchema), login);
authRouter.post("/logout", logout);
