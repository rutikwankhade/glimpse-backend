const User = require("../models/user.model");



const addBookToCollection = async (req, res) => {

    let { bookId, status, bookTitle, cover } = req.body;
    // create a profile
    const bookdata = {
        bookId: bookId,
        status: status,
        bookTitle: bookTitle,
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
        return res.status(500).send('Server Error');
    }


};


module.exports = { addBookToCollection };
