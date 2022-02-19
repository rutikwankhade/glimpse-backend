const express = require("express");
const router = express.Router();
const { addBookToCollection} = require("../controllers/users.controller");



router.route("/addbook").post(addBookToCollection);

module.exports = router;
