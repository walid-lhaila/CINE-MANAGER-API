import mongoose from 'mongoose';

var usersSchema = new mongoose.Schema({
    name: {
        type : String,
        require: true
    },
    
    role: {
        type : String,
        required : true
    },
    
    email: {
        type : String,
        required : true,
        unique: true
    },

    image: {
        type: String,
        required: false,
    },

    phone: {
        type : Number,
        required : true,
    },   
    
    password: {
        type : String,
        required : true
    },

    banned: {
        type: Boolean,
        default: false, 
    },

    passwordResetToken: String,
    passwordResetExpires: Date,

    lastActiveAt: {
        type: Date,
        default: null
    },

    pushToken: {
        type: String,
        required: false,
    },
})

const userDb = mongoose.model('users', usersSchema);

export default userDb;