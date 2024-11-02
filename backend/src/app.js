const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
const bcrypt = require('bcrypt');
const {validateSignUpData} = require('./utils/validation');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cookieParser());

app.post('/signup',async (req, res) => {
  
  
  try {
    validateSignUpData(req);
    const {firstName , lastName , emailId , password} = new User(req.body);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
});
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
app.post('/login',async (req, res) => {
  try {
    const {emailId, password} = req.body;
    const user =  await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid caredinals");
    }
    const isPasswordVaild = user.validatePassword(password);
    if(isPasswordVaild){
      const token = await user.getJWT();
      res.cookie("token", token, {expires: new Date.mow()+8*3600000});
      //create a jwt token
        
      res.send("Login successful");
    }else{
      throw new Error("Invalid caredinals");
    }
  } catch (error) {
    console.log(error);
    
  }
});
app.get('/profile', async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    
  }
});

connectDB().then(()=>{
  console.log('Database connected');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((err)=>{
  console.log(err);
});
