import express from "express";
import passport from "passport";
import { generateToken, cookieOptions } from "../utils/auth";

export const oauthRouter = express.Router();

//for google, When the user hits /auth/google, they're redirected to Google’s OAuth consent screen.
oauthRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], //scope  defines what info you’re requesting
  })
);

oauthRouter.get(
  "/google/callback",
  //if fails then it will take us back to login
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user.id);
    res.cookie("jwt", token, cookieOptions);
    res.redirect("/dashboard");
  }
);
