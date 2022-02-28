const express = require("express");
const router = express.Router();
const { addPost, getAllPosts,getReviewsByBookId,getPostsByUserId} = require("../controllers/post.controller");


router.route("/").post(addPost)
router.route("/").get(getAllPosts)
router.route("/:bookId").get(getReviewsByBookId)
router.route("/user/:userId").get(getPostsByUserId)






module.exports = router;