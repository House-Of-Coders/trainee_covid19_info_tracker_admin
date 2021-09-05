const jsonWebToken = require('jsonwebtoken');
const User = require('../models/User.model');

exports.protect = async (req, res, next) =>{
    let user_token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        user_token = req.headers.authorization.split(" ")[1]
    }
    if(!user_token){
        res.status(401).send({
            success:false,
            message:"Not allow to access !"
        })
        return;
    }
    try{
        const decoded = jsonWebToken.verify(user_token, process.env.SEC_TOKEN);
        console.log(decoded);
        const user = await User.findById(decoded.id);

        if(!user){
            res.status(404).send({
                success:false,
                message:"User not found !"
            })
            return;
        }

        req.user = user;

        next();
    }catch (error){
        res.status(401).send({
            success:false,
            message:"Not authorize to access this to access !",
            error:error.message
        })
    }

}
