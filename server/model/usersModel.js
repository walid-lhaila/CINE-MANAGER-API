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
        required : true
    },
    
    password: {
        type : String,
        required : true
    }
})

const userDb = mongoose.model('users', usersSchema);

export default userDb;