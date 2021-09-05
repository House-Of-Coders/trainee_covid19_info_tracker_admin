const DivisionalSec = require('../models/DivisionalSecretariat.model');
const assert = require("assert");

/** Add divisional secretariat  */
exports.addDivision = async (req, res) =>{
    const division = {
        divisionNumber:req.body.divisionNumber,
        divisionName:req.body.divisionName,
        officeAddress:req.body.officeAddress,
        officePhone:req.body.officePhone,
        district:req.body.district
    }
    const newDivision = new DivisionalSec(division);

    try{
        await newDivision.save().then(data =>{
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

/** Get all divisional secretariat details */
exports.getAllDivision = async (req, res) =>{
    try {
        await DivisionalSec.find().then(data =>{
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

/** Get divisional secretariat by id */
exports.getAllDivisionById = async (req, res) =>{
    try {
        await DivisionalSec.findById(req.params.id).then(data =>{
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

/** Update divisional secretariat details */
exports.updateDivision = async (req, res) =>{
    const division = {
        divisionNumber:req.body.divisionNumber,
        divisionName:req.body.divisionName,
        officeAddress:req.body.officeAddress,
        officePhone:req.body.officePhone,
        district:req.body.district
    }
    try{
        await DivisionalSec.findByIdAndUpdate(req.params.id,{$set:division})
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

/** Delete divisional secretariat by id */
exports.deleteDivision = async (req, res) =>{
    try {
        await DivisionalSec.findByIdAndDelete(req.params.id).then(data =>{
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

/** Get divisions by district id */
exports.getByDistrictId = async (req, res) =>{
    try{
        await DivisionalSec.find({district:req.params.id})
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