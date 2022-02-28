const express = require("express");
const router = express.Router();
const {
    addBookToCollection,
        unfollowReader,
    getUserProfile,
    followReader,
    getUserSuggestion,
    updateUserDetails
  
} = require("../controllers/users.controller");



router.route("/").post(addBookToCollection);
router.route("/:id").get(getUserProfile);
router.route("/").get(getUserSuggestion);
router.route("/profile/:userId").post(updateUserDetails);


router.route("/:followReaderID").patch(followReader);
router.route("/v1/:unfollowReaderID").patch(unfollowReader)


module.exports = router;
