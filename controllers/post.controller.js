const User = require("../models/user.model");
const Post = require("../models/post.model")


const getAllPosts = async (req, res) => {

    try {

        const allPosts = await Post.find()
            .populate({ path: "postedBy", select: "_id username avatar" })
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



const getUserFeed = async (req, res) => {
    
  const user = await User.findById(req.user.id);
    const feedUsers = [...user.following, req.user.id];
    
  const userFeedPosts = await Post.find({ postedBy: { $in: feedUsers } })
    .populate({ path: "postedBy", select: "_id username avatar" })
    .sort({ createdAt: -1 });


  res.status(200).json({
    success: true,
    message: "got posts by people I follow",
    posts: userFeedPosts,
  });
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
                select: "_id username avatar",
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


const getReviewsByBookId = async (req, res) => {

    try {
        const reviews = await Post.find({ bookId: req.params.bookId })

            .populate({ path: "postedBy", select: "_id username avatar" })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "got all posts successfully",
            reviews: reviews
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};



const getPostsByUserId = async (req, res) => {


    try {
        const userPosts = await Post.find({ postedBy: req.params.userId })

            .populate({ path: "postedBy", select: "_id username avatar" })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "got user posts successfully",
            reviews: userPosts
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};


module.exports = { addPost, getAllPosts, getReviewsByBookId ,getPostsByUserId,getUserFeed};
