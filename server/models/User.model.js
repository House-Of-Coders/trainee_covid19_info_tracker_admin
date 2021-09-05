const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');


const UserScheme = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    NIC:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

UserScheme.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }

    const saltRound = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password,saltRound);
    next();
});

UserScheme.methods.matchPasswords = async function (password){
    console.log(password);
    console.log(this.password);
    return await bcrypt.compare(password,this.password);
}

UserScheme.methods.generateToken = function (){
    return jsonWebToken.sign({id:this._id}, process.env.SEC_TOKEN,{
        expiresIn: process.env.SEC_TOKEN_EXP
    });
}

const User = mongoose.model('Users',UserScheme);
module.exports = User;