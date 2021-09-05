const District = require('../models/District.model');

/** Add new District to the system */
exports.addDistrict = async (req, res) =>{
    const district = {
        districtCode:req.body.districtCode,
        districtName:req.body.districtName
    }

    const newDistrict = new District(district);

    try{
        await newDistrict.save().then(data =>{
            res.status(200).send({
                success:true,
                data:data
            })
        })
    }catch (error){
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

/** Get all Districts */
exports.getAllDistrict = async (req, res) =>{
    try{
        await District.find().then(data=>{
            res.status(200).send({
                success:true,
                data:data
            })
        })
    }catch (error) {
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

/** Get  District by id */
exports.getDistrictById = async (req,res) =>{
    try{
        await District.findById(req.params.id).then(data =>{
            res.status(200).send({
                success:true,
                data:data
            })
        })
    }catch (error) {
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

/** Update District */
exports.updateDistrict = async (req, res) =>{
    const district  = {
        districtCode:req.body.districtCode,
        districtName:req.body.districtName
    }
    try {
        await District.findByIdAndUpdate(req.params.id,{$set:district})
        .then(data =>{
            res.status(200).send({
                success:true,
                data:data
            })
        })
    }catch (error) {
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

/** Delete a District */
exports.deleteDistrict = async (req, res) =>{
    try {
        await District.findByIdAndDelete(req.params.id).then(data =>{
            res.status(200).send({
                success:true,
                data:data
            })
        })
    }catch (error) {
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
}