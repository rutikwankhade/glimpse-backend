const express = require("express");
const router = express.Router();
const { addPost, getAllPosts} = require("../controllers/post.controller");


router.route("/").post(addPost)
router.route("/").get(getAllPosts)



module.exports = router;