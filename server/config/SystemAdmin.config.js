const Admin = require('../models/Admin.model');

const createAdmin = async () =>{
    const admin = {
        userName:process.env.USER_NAME,
        password:process.env.PASSWORD
    }
    try{
        const newAdmin = new Admin(admin);
        await newAdmin.save().then(data=>{
            console.log("Admin created !");
        })
    }catch (error){
        console.error(error);
    }
}
module.exports = createAdmin;