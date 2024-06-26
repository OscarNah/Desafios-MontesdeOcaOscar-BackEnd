const express = require("express");
const UserController = require("../controllers/user.controller.js");
const router = express.Router();
const passport = require("passport");

const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", passport.authenticate("jwt", { session: false }), userController.profile);
router.post("/logout", userController.logout.bind(userController));
// GitHub
router.get('/auth/github', userController.githubAuth);
router.get('/auth/github/callback', userController.githubAuthCallback);
//Admin
router.get("/admin", passport.authenticate("jwt", { session: false }), userController.admin);

module.exports = router;

