const User = require("../models/user.model");


const getUserProfile = async (req, res) => {

    const { id } = req.params;

    try {
        let user = await User.findById(id);

        return res.json({
            success: "got user profile successfully",
            user
        })

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }


};

//unfollow reader
const unfollowReader = async (req, res) => {

    const { unfollowReaderID } = req.params;

    try {

  const userToUnfollow = await User.findById(unfollowReaderID);
  

  let index = userToUnfollow.followers.indexOf(req.user.id);
  if (userToUnfollow.followers.indexOf(req.user.id) != -1) {
    userToUnfollow.followers.splice(index, 1);
    await userToUnfollow.save();
  } else {
      throw ({ message: "You don't follow this user." });
  }

  await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { following: unfollowReaderID },
    },
    {
      new: true,
    }
  );

  const updatedProfile = await User.findById(unfollowReaderID)
    .select("-password")
    .populate({ path: "followers", select: "_id username avatar" })
    .populate({ path: "following", select: "_id username avatar" });

  res.status(200).json({
    success: true,
    message: "Unfollowed user successfully",
    user: updatedProfile,
  });

    } catch (err) {
        // console.error(err.message);
        return res.status(500).send(err);
    }


};


//follow a reader
const followReader = async (req, res) => {

    const { followReaderID } = req.params;

    try {
            const userToFollow = await User.findById(followReaderID)

        if (userToFollow.followers.indexOf(req.user.id) != -1) {

            throw({ message: "You already follow this user." });
        } else {
            userToFollow.followers.push(req.user.id);
            await userToFollow.save();
        }

        await User.findByIdAndUpdate(
            req.user.id,
            {
                $push: { following: followReaderID },
            },
            {
                new: true,
            }
        );

        const updatedProfile = await User.findById(followReaderID)
            .select("-password")
            .populate({ path: "followers", select: "_id username avatar" })
            .populate({ path: "following", select: "_id username avatar " });

    res.json({
            success: true,
            message: "user followed successfully",
            user: updatedProfile,
        });

    // req.json('done')

    } catch (err) {
        // console.error(err.message);
        return res.status(500).send(err);
    }


};

const addBookToCollection = async (req, res) => {

    let { bookId, status, title, cover } = req.body;
    // create a profile
    const bookdata = {
        bookId: bookId,
        status: status,
        title: title,
        cover: cover

    };


    try {
        let user = await User.findById(req.user.id);

        const books = user.booksCollection


        let bookExist = books.find(book => book.bookId == bookId);
        if (bookExist) {
            const index = books.indexOf(bookExist)
            books.splice(index, 1, bookdata)

            const updatedBooks = await User.findByIdAndUpdate(req.user.id, {
                $set: {
                    booksCollection: books
                },
            });

            return res.json({
                success: "book updated successfully",
                user
            })

        } else {
            books.push(bookdata)

            const updatedBooks = await User.findByIdAndUpdate(req.user.id, {
                $set: {
                    booksCollection: books
                },
            });

            return res.json({
                success: "book added successfully",
                user
            })

        }



    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error ff');
    }


};



const getUserSuggestion = async (req, res) => {
    const TopUsers = await User.find().select("_id username avatar name").limit(5)
    
    
    res
    .status(200)
    .json({ success: true, message: "got suggested readers", users: TopUsers });
};




const updateUserDetails = async (req, res) => {

  if (req.user.id !== req.params.userId) {
      throw ({ message: "You can't edit other user's details" });
    }
    
  const { avatarUrl } = req.body;
  const user = await User.findById(req.user.id).select("-password");
  user.avatar= avatarUrl;
  await user.save();

  const updatedUser = await User.findById(req.user.id)
    .select("-password")
    .populate({ path: "followers", select: "_id username avatar" })
    .populate({ path: "following", select: "_id username avatar" });

  res.status(201).json({
    success: true,
    message: "Succesfully updated user details",
    user: updatedUser,
  });
};






module.exports = { addBookToCollection, getUserProfile, followReader,unfollowReader,getUserSuggestion,updateUserDetails };
