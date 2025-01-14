const express = require('express');
 const authRouter = express.Router();


authRouter.post('/signup',async (req, res) => {
  
  
  try {
    validateSignUpData(req);
    const {firstName , lastName , emailId , password} = new User(req.body);
    const alreadyExists = await User.findOne({emailId: emailId});
    if(alreadyExists){
      res.status(400).send("User already exists");
    }
   else{ const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
    });
    await user.save();
    res.status(201).send(user);
  }
  } catch (error) {
    console.log(error);
  }
});

authRouter.post('/login',async (req, res) => {
    try {
      const {emailId, password} = req.body;
      const user =  await User.findOne({emailId: emailId});
      if(!user){
        throw new Error("Invalid caredinals");
      }
      const isPasswordVaild = user.validatePassword(password);
      if(isPasswordVaild){
        const token = await user.getJWT();
        res.cookie("token", token, {
          expires: new Date(Date.now() + 86400000),
        });
        //create a jwt token
          
        res.send("Login successful");
      }else{
        throw new Error("Invalid caredinals");
      }
    } catch (error) {
      console.log(error);
      
    }
  });

 module.exports = authRouter;