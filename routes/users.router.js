const express = require("express");
const router = express.Router();
const { addBookToCollection, getUserProfile,followUser} = require("../controllers/users.controller");



router.route("/").post(addBookToCollection);
router.route("/:id").get(getUserProfile);
router.route("/:followUserID").patch(followUser);



module.exports = router;
