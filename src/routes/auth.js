import { Router } from "express";
import passport from "passport";
import { CLIENT_URL } from "../utils/constants.js";

const router = Router();

// Login correcto
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      user: req.user,
      // cookies: req.cookies
    });
  }
});
// Si falla el login
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login failed",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// Cerrar sesion
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect(CLIENT_URL);
});

export default router;
