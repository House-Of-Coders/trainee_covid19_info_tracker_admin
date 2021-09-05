const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
    districtCode:{
        type:String,
        required:true
    },
    districtName:{
        type:String,
        required:true
    }
})
const District = mongoose.model('Districts',DistrictSchema);
module.exports = District;