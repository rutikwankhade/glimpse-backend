const express = require("express");
const router = express.Router();
const { addPost, getAllPosts,getReviewsByBookId} = require("../controllers/post.controller");


router.route("/").post(addPost)
router.route("/").get(getAllPosts)
router.route("/:bookId").get(getReviewsByBookId)




module.exports = router;