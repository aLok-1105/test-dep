const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
// const {JWT_SECRET} = require('../config/keys');
// const JWT_SECRET = process.env.SECRET_KEY


const Authenticate = async (req, res, next) =>{
    try {
        const token  = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // const verifyToken = jwt.verify(token, JWT_SECRET);

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});

        if(!rootUser){
            throw new Error('User Not Found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();

    } catch (error) {
        res.status(401).send({ error: 'Unauthorized: No token provided' });
        console.log(error);
    }
}

module.exports = Authenticate;