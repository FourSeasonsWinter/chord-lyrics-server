const express = require("express");
const passport = require("passport");
const router = express.Router();

const authController = require("../controllers/authController");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

router.get("/status", authController.status);

router.get("/logout", authController.logout);

module.exports = router;