



// register user
// POST /api/signup
// public

const signup = async (req, res) => {

     const { username, email, password } = req.body;

    try {

        //check if user exists
        //if yes send error
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json('User already exists');
        }

        //if no 

        user = new User({
            username,
            email,
            password
        })


       

    } catch (err) {
        console.log(err)
        res.status(400).json('server error')
    }

  res.json("sign up user");
};

module.exports = {signup};
