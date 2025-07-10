import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./router/auth.route.js";
import { productRouter } from "./router/product.route.js";
import { cartItemRouter } from "./router/cartItem.route.js";
dotenv.config();

export const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartItemRouter);
