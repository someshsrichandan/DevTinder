const express = require('express');
const connectDB = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth');
const profileRouter = require('./routers/profile');
const requestRouter = require('./routers/requests');
const userRouter = require('./routers/users');
const cors = require('cors');


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//define all routes
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/' , userRouter);



connectDB().then(()=>{
  console.log('Database connected');
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
}).catch((err)=>{
  console.log(err);
});
