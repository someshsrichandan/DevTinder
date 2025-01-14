const { userAuth } = require("../middlewares/auth.js");

const express  =rerquire('express');
const profileRouter = express.Router();

profileRouter.get('/profile',userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
      
    } catch (error) {
      console.log(error);
      
    }
  });

module.exports = profileRouter;