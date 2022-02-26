const User = require("../models/user.model");
const Post = require("../models/post.model")

const addPost = async (req, res) => {

    let { bookId, primaryColor, secondaryColor, review, category, cover, title } = req.body;

    const newPost = new Post({
        title,
        bookId,
        primaryColor,
        secondaryColor,
        review,
        category,
        cover,

        postedBy: req.user.id,
    });

    try {

        const savedPost = await newPost.save();

        let populatedPost = await savedPost.populate([
            {
                path: "postedBy",
                select: "username",
            },

        ]);

        res.json({
            success: true,
            message: "Post created Successfully",
            post: populatedPost,
        });




    } catch (err) {
        res.json(err)
    }


};



module.exports = { addPost };
