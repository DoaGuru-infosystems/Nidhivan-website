const express = require("express");

const controllerAdmin = require("./../controllers/controllerAdmin");

const router = express.Router();

router.post("/Sign-in", controllerAdmin.login);
router.post("/forgotPassword", controllerAdmin.forgotPassword);
router.post(
  "/verifyOtpAndResetPassword",
  controllerAdmin.verifyOtpAndResetPassword,
);

module.exports = router;
