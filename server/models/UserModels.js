const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail , 'filed must be a valid email address']
    },
    password: {
        type: String,
        required: true
    },
   
    role: {
        type: String, // ["USER", "ADMIN", "MANGER"]
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANGER],
        default: userRoles.USER
    },


})

module.exports = mongoose.model('User', userSchema);

