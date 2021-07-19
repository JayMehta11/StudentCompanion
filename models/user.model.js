const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:  {
        type:String,
        required: true,
    },
    lastName: {
        type:String,
        required: true,
    },
    emailId : {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type:Boolean,
        required: true,
    },
    enrollmentNumber: {
        type: String,
    }

})

mongoose.model('user',userSchema);