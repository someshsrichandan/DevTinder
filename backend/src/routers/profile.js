
const express  =require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfileData } = require('../utils/validation.js');
const User = require('../models/user.js');


profileRouter.get('/profile/view',userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
      
    } catch (error) {
      console.log(error);
      
    }
  });

profileRouter.patch('/profile/update',userAuth, async (req, res) => {
    try {
       if(!validateEditProfileData(req)){
        return res.status(400).send("Invalid updates");
       };
       const login_user = req.user;
       Object.keys(req.body).forEach((update)=>login_user[update] = req.body[update]);
      await login_user.save();
      res.send("Profile updated successfully");
    } catch (error) {
        console.log(error)  
    }
})

profileRouter.patch('/profile/password',userAuth, async (req, res) => {
    try {
        const login_user = req.user;
        const user =  await User.findOne({emailId: login_user.emailId});
        const {oldPassword, newPassword} = req.body;
        const isPasswordValid = await user.validatePassword(oldPassword);
        if(!isPasswordValid){
            return res.status(400).send("Invalid password");
        }
        login_user.password = newPassword;
        await login_user.save();
        res.send("Password updated successfully");
    } catch (error) {
        console.log(error);
    }
})
module.exports = profileRouter;