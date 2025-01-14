const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
const bcrypt = require('bcrypt');
const {validateSignUpData} = require('./utils/validation');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');


app.use(express.json());
app.use(cookieParser());


app.patch("/user/:userId",async (req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;
  
  try {
    const allowedUpdates = ["userId", "photoUrl", "about", "skills"];
  const updates = Object.keys(data).every((update)=>allowedUpdates.includes(update));
  if(!updates){
    return res.status(400).send("Invalid updates");
  }
  if(data?.skills.length>10){
    throw new Error("Skills should be less than 10");
  }
    const user = await User.findByIdAndUpdate({_id:userId},data,{
      returnDocument: 'after',
      runValidators: true
    });
    console.log(user);
  } catch (error) {
    res.status(400).send("UPDATE FAILED :"+ error.message);
  }
})



connectDB().then(()=>{
  console.log('Database connected');
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
}).catch((err)=>{
  console.log(err);
});
