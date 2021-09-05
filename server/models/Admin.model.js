const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

AdminSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }

    const saltRound = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password,saltRound);
    next();
});

AdminSchema.methods.matchPasswords = async function (password){
    console.log(password);
    console.log(this.password);
    return await bcrypt.compare(password,this.password);
}

AdminSchema.methods.generateToken = function (){
    return jsonWebToken.sign({id:this._id}, process.env.SEC_TOKEN,{
        expiresIn: process.env.SEC_TOKEN_EXP
    });
}

const Admin = mongoose.model('Admins',AdminSchema);
module.exports = Admin;