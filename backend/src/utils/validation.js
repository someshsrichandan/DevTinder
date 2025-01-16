const validator = require('validator');

const validateSignUpData = (req) =>{
    const {firstName , lastName , emailId , password} = req.body;
    if(!firstName || !lastName){
        throw new Error("First name and last name are required");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Emaail is invalid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
}

const validateEditProfileData = (req) =>{
    const allowedUpdates = [
        "firstName",
        "lastName",
        "emailId",
        "age",
        "photoUrl",
        "gender",
        "about",
        "skills"
    ];
   const isEditAllowed =  Object.keys(req.body).every((update)=>allowedUpdates.includes(update));
   return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData

}