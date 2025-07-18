import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./router/auth.route.js";
import { productRouter } from "./router/product.route.js";
import { cartItemRouter } from "./router/cartItem.route.js";
import { orderRouter } from "./router/orders.route.js";
import "./config/passport.js";
import passport from "passport";
import session from "express-session";
import { oauthRouter } from "./router/oauth.route.js";
dotenv.config();

export const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true if using HTTPS
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Your OAuth routes
app.use("/auth", oauthRouter);

//Controllers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartItemRouter);
app.use("/api/v1/order", orderRouter);
