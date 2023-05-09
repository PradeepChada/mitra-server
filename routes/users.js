const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");
const { validateBody, schemas, validateParams } = require("../helpers/routeHelpers");
const UserController = require("../controllers/users");
const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
var os = require("os");


router
  .route("/signin")
  .post(validateBody(schemas.loginSchema), passportSignIn, UserController.signIn);

router
  .route("/")
  .post(validateBody(schemas.userSchema), UserController.createUser);

router.route("/:id").delete(passportJWT, UserController.deleteUser);

router.route("/:id").put(passportJWT, UserController.updateUser);

router.route("/").get(passportJWT, UserController.getUsers);

router.route("/profile").get(passportJWT, UserController.getProfile);

router.route("/profile/update").put(passportJWT, UserController.updateProfile);

module.exports = router;

