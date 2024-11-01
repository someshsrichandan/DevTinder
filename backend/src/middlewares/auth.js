const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        const decoded = jwt.verify(token, "secret");
        const { _id } = decoded;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("user not found");
        }
        //req.user is the user object which we can access in the next middleware no need to find the user again
        next();
        req.user = user;

    } catch (error) {
        res.status(401).send({ error: "Please authenticate" });
    }
}
module.exports = {
    userAuth
}