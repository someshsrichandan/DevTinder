const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');

userRouter.patch("/user/:userId",async (req,res)=>{ 
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
  

module.exports = userRouter;