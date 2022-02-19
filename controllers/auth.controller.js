
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// register user
// POST /api/signup
// public

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
                password
            })


            // res.json({ newUser})
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
                            email:newUser.email
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

module.exports = { signup };
