const User = require('../models/User.model');
const Admin = require('../models/Admin.model');

/** Add users to maintain the system*/
exports.addUser = async (req, res, next)=>{

    const newEntry = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        NIC:req.body.NIC,
        occupation:req.body.occupation,
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password
    }

    const newUser = new User(newEntry);
    console.log(newUser);
    try{
        await newUser.save().then(data=>{
            res.status(200).send({
                success:true,
                data:data
            })
        })
    }catch(error){
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
};

/** Check username availability */
exports.userNameAvailability = async (req, res)=>{
    const checkName = req.body.userName;
    await User.find({userName:checkName})
        .then(data=>{
            if(Array.isArray(data)){
                res.status(200).send({
                    success:true
                });
            }else{
                res.status(400).send({
                    success:false
                });
            }

        })
}

/** User login */
exports.userLogin = async (req, res)=>{
    const userNameCheck = req.body.userName;
    const passCheck = req.body.password;

    if(userNameCheck === process.env.USER_NAME && passCheck === process.env.PASSWORD){
        try{
            const admin = await Admin.findOne({userName:process.env.USER_NAME}).select('+password');
            res.status(200).send({
                success: true,
                token:admin.generateToken(),
                message: "Login Success as a Admin !"
            });
        }catch (error) {
            res.status(500).send({
                success:false,
                error:"Provide username and password !"
            });
        }

    }else {
        if(!userNameCheck || !passCheck){

            res.status(400).send({
                success:false,
                error:"Provide username and password !"
            });
        }else {

            try{
                const user = await User.findOne({userName:userNameCheck}).select('+password');
                if(!user){
                    res.status(400).send({
                        success:false,
                        error:"User not found !"
                    });
                }else{
                    const isMatch = await user.matchPasswords(passCheck);
                    if(!isMatch){
                        res.status(400).send({
                            success:false,
                            error:"Invalid password !"
                        })
                    }else {
                        res.status(200).send({
                            success: true,
                            token:user.generateToken(),
                            message: "Login Success !"
                        });
                    }
                }
            }catch (error) {
                res.status(500).send({
                    success:false,
                    error:error.message
                });
            }

        }

    }
}


/** Get all users of the system*/
exports.getUserDetails = async (req, res) =>{
    try{
        await User.find()
            .then(data=>{
                res.status(200).send({
                    data:data
                })
            })
    }catch(error){
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
}




/** Validate users by username and password*/

exports.validateUser = async (req, res) =>{
    const userName = req.body.userName;
    const password = req.body.password;
    let decryptedPassword = '';
    let validUsername = '';
    try{
        await User.find({userName:userName}).then(data=>{
            if(data === ''){
                res.status(200).send({
                    success:false,
                    message:"User name not found !"
                })
            }else{
                decryptedPassword = decryption(data.password);
            }
        }).then(()=>{
            if(password === decryptedPassword && userName === data.userName){
                res.status(200).send({
                    success:true
                })
            }else{
                res.status(200).send({
                    success:false
                })
            }
        })
    }catch (error){
        res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

/** Delete users by _id*/
exports.removeUserByID = async (req, res)=>{
    try{
        await User.findByIdAndRemove(req.params.id)
            .then(data=>{
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

/** Token sync */
const userToken = (user,statusCode,res)=>{
    const token = user.generateToken();
}