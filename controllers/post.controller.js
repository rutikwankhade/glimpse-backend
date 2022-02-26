const User = require("../models/user.model");
const Post = require("../models/post.model")


const getAllPosts = async (req, res) => {

    try {

        const allPosts = await Post.find()
            .populate({ path: "postedBy", select: "_id username" })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "got all posts successfully",
            posts: allPosts
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

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



module.exports = { addPost, getAllPosts };
