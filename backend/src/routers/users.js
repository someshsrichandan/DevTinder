const express = require('express');
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequestModel = require('../models/connectionRequest');
const User = require('../models/user.js');

const USER_SAFE_DATA = "firstName lastName age gender photoUrl skills";

userRouter.get('/user/requests/recevied',userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            
            toId: loggedInUser._id,
            status: 'interested'

        }).populate('fromId',USER_SAFE_DATA);
        res.json({
            message: "Connection requests",
            connectionRequests
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).send("Request failed");
    }
    
});

userRouter.get('/user/requests/connections',userAuth, async (req, res) => {
try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
        $or: [
            { fromId: loggedInUser._id, status: 'accepted' },
            { toId: loggedInUser._id, status: 'accepted' }
        ]
    }).populate('fromId',USER_SAFE_DATA)
    .populate('toId',USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
        if (row.fromId._id.toString() === loggedInUser._id.toString()) {
            return row.toId;
        }
        return row.fromId;
    });

    res.json({
        message: "Connections",
        data
    })


} catch (error) {
    console.log(error);
    res.status(400).send("Request failed");
    
}


});

userRouter.get('/feed',userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        //user should see all user card expect
        //1. user itself
        //2. user with whom connection is already established
        //3. user who has sent request to logged in user
        //4. user who has received request from logged in user
        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                { fromId: loggedInUser._id, status: 'accepted' },
                { toId: loggedInUser._id, status: 'accepted' }
            ]
        }).select('fromId toId');

        const hideUserFromFeeds = new set();
        connectionRequests.forEach((row) => {
            hideUserFromFeeds.add(row.fromId.toString());
            hideUserFromFeeds.add(row.toId.toString());
        });

        const users = await User.find({
           $and:[
            {_id: { $nin: Array.from(hideUserFromFeeds)}},
            {_id: { $ne: loggedInUser._id}}
           ] 
        }).select(USER_SAFE_DATA);
        
    } catch (error) {
        console.log(error);
        res.status(400).send("Request failed");
    }
});


module.exports = userRouter;