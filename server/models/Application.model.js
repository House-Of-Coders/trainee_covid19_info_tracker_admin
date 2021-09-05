const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    refNumber:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        t
    }
})
const Application = mongoose.model('Applications',ApplicationSchema);
module.exports = Application;