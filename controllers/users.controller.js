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



const followUser = async (req, res) => {

    const followUserId = req.params.followUserID


    try {
        const userToFollow = await User.findById(followUserId)

        if (userToFollow.followers.indexOf(req.user.id) != -1) {

            throw ({ message: "You already follow this user." });
        } else {
            userToFollow.followers.push(req.user.id);
            await userToFollow.save();
        }

        await User.findByIdAndUpdate(
            req.user.id,
            {
                $push: { following: followUserId },
            },
            {
                new: true,
            }
        );

        const updatedUser = await User.findById(followUserId)
            .select("-password")
            .populate({ path: "followers", select: "_id username avatar" })
            .populate({ path: "following", select: "_id username avatar " });

        res.status(200).json({
            success: true,
            message: "user followed successfully",
            user: updatedUser,
        });


    } catch (err) {
        res.json(err)

    }


};





module.exports = { addBookToCollection, getUserProfile, followUser };
