const express = require('express');
const { getUser, getEmail, getPassword, getWait } = require('./../controller/api.js')
const { getUserData, getEmailData, getPasswordData } = require('./../controller/secondApi')
const { validate } = require('./../middleware/validate.js')
const router = express.Router();

router.get("/user", validate, getUser);
router.get("/email", validate, getEmail);
router.get("/password", validate, getPassword);
router.get("/wait", validate, getWait);
// router.get("/userData", getUserData);
// router.get("/emailData", getEmailData);
// router.get("/passwordData", getPasswordData);

module.exports = router;
