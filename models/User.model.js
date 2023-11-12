const { Schema, model } = require("mongoose");


const UserSchema = Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

module.exports = model('User', UserSchema)