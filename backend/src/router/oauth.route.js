import express from "express";
import passport from "passport";

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
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    session: false,
  }),
  (req, res) => {
    // Token is now attached to req.user.token
    const token = req.user.token;

    // Send token to frontend as cookie or URL param
    //As we know passport can make its own token too , but here as we know our middleware is checking jwt token as cookie and it should be named as jwt in cookies
    //so thats why we are making it mannually
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // true in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Or redirect to frontend with token
    res.redirect("http://localhost:5173"); // Redirect to frontend after successful login
  }
);

oauthRouter.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  }
  res.status(401).json({ message: "Not authenticated" });
});

oauthRouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.clearCookie("connect.sid"); // Optional: Clear cookie
    res.status(200).json({ message: "Logged out" });
  });
});
