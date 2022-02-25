const express = require("express");
const router = express.Router();
const { addBookToCollection, getUserProfile} = require("../controllers/users.controller");



router.route("/").post(addBookToCollection);
router.route("/:id").get(getUserProfile);


module.exports = router;
