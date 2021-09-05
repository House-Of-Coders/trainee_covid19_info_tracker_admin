const mongoose = require('mongoose');

const DivisionalSecSchema = new mongoose.Schema({
    divisionNumber:{
        type:String,
        required:true
    },
    divisionName:{
        type:String,
        required:true
    },
    officeAddress:{
        type:String,
        required:true
    },
    officePhone:{
        type:Number,
        required:true,
        maxlength:10
    },
    district:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Districts"
    }

})
const DivisionalSec = mongoose.model('DivisionalSec',DivisionalSecSchema);
module.exports = DivisionalSec;