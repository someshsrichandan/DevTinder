const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequest = require('../models/connectionRequest.js');
const User = require('../models/user');


requestRouter.post('/request/send/:status/:toUserId',userAuth, async (req, res) => {
    try {
        const fromId = req.user;
        const toId = req.params.toUserId;
        const status = req.params.status;
        
        const allowedStatus = ['ignored','interested'];
        if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid status");
        }
        if(fromId === toId){
            return res.status(400).json("Cannot send request to self");
        }
        const alreadyExists = await ConnectionRequest.findOne({
            $or: [
                { fromId: fromId, toId: toId },
                { fromId: toId, toId: fromId }
            ]
        })
        if (alreadyExists) {
            return res.status(400).send("Request already exists");
        }
        const toUser = await User.findById(toId);
        if(!toUser){
            return res.status(400).json({
                message: "User not found"
            });
        }

        const connectionRequest = new ConnectionRequest({
            fromId,
            toId,
            status
        });
        const data = await connectionRequest.save();
        res.send({
            message: req.user.firstName + " is" + status + " in" + toUser.firstName,
            data,
        })


    } catch (error) {
        console.log(error);
        res.status(400).send("Request failed");
    }

});

module.exports = requestRouter;