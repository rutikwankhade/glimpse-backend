const express = require("express");
const router = express.Router();

const { signup, login, getUserByToken } = require("../controllers/auth.controller");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/").get(getUserByToken);




module.exports = router;