
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {

    let { username, email, password } = req.body;

    try {

        // check if user exists
        // if yes send error
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json('User already exists');
        } else {

            //encrypt password
            const salt = await bcrypt.genSalt(10)
            password = await bcrypt.hash(password, salt)

            let newUser = new User({
                username,
                email,
                password,
                booksCollection:[]
            })
            await newUser.save();

            //return json webtoken
            const payload = {
                user: {
                    id: newUser.id
                }
            }


            jwt.sign(payload, process.env.jwtSecret,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        message: "User ceated successfully",
                        user: {
                            userId: newUser._id,
                            username: newUser.username,
                            email: newUser.email
                        },
                        token
                    })
                });

        }

    } catch (err) {
        console.log(err)
        res.status(400).json('server error')
    }

};



const login = async (req, res) => {

    let { email, password } = req.body;

    try {

        //check if user exists
        //if yes send error
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'user does not exist' });
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }


        //return json webtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({
                    success: true,
                    message: "login successfully",
                  
                    token
                })
            });


    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }




};

module.exports = { signup, login };
