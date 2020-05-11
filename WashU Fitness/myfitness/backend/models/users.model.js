const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    targetWeight:{
        type: Number,
        required: true,
        trim: true
    },
    currentWeight:{
        type: Number,
        required: true,
        trim: true,
    },
    currentHeight:{
        type: Number,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        required: true,
        trim: true,
    },
    activityLevel:{
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;