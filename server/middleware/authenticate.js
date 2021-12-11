const jwt = require('jsonwebtoken');
const { findOne } = require('../models/user');
const User = require("../models/user")

const Authenticate = async (req, res, next) => {
    try {

        // const token = req.cookies.jwtoken;
        const token = req.headers.jwtoken;
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser) {
            throw new Error("User not found")
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next()

    } catch (err) {
        res.status(401).send("Unauthorized: No token provided")
        console.log("Unauthorized: No token provided");
        console.log(err);
    }
}

module.exports = Authenticate