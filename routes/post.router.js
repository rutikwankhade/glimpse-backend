const express = require("express");
const router = express.Router();
const { addPost} = require("../controllers/post.controller");


router.route("/addpost").post(addPost)


module.exports = router;