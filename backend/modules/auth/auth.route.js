const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const { authMiddleware } = require("./auth.middleware");
//user routes

//get user info : auth check

router.post("/login", authController.login);
router.post("/refresh_access_token", authController.refreshAccessToken);
router.get("/me", authMiddleware.authProvider, authController.getUser);

module.exports = router;
