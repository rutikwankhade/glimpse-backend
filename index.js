const express = require('express');
const connectDB = require("./db/db");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/users.router");
const auth = require('./middleware/auth');


const dotenv = require("dotenv");

dotenv.config();

const app = express();



app.use(express.json({ extended: false }))


//define routes
app.use('/api/user',auth, userRouter);
app.use("/api/auth", authRouter);


app.get('/', (req, res)=>res.send('API running'))

const PORT = process.env.PORT || 5000;



const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

