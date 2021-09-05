exports.protectUser = (req, res, next) =>{
    res.status(200).send({
        success:true,
        message:"You got the access !"
    })
}