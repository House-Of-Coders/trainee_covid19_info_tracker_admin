const mongoose = require('mongoose');
require('dotenv').config({path:"./.env"});//Path need to be configure
const URL = process.env.URL;

const db_connection = async ()=>{
    try{
        await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log("MongoDB connected !");
    }catch(error){
        console.log(error);
    }
}

module.exports = db_connection;