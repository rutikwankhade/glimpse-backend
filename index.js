const express = require('express');
const connectDB = require("./db/db");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/users.router");
const auth = require('./middleware/auth');
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());



app.use(express.json({ extended: false }))


//define routes
app.use('/api/user',auth, userRouter);
app.use("/api/auth", authRouter);
app.use("/api/auth/token",auth, authRouter);



app.get('/', (req, res)=>res.send('API running'))



const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

