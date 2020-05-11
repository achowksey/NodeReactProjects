const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodsSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    calories:{
        type: Number,
        required: true,
    },
    totalFat:{
        type: Number,
        required: true,
    },
    cholestrol:{
        type: Number,
        required: true,
    },
    totalCarb:{
        type: Number,
        required: true,
    },
    dietaryFiber:{
        type: Number,
        required: true,
    },
    sugar:{
        type: Number,
        required: true,
    },
    protein:{
        type: Number,
        required: true,
    },
    username:{
        type: String,
        required: true,
    }
});

const Foods = mongoose.model('Foods', foodsSchema);
module.exports = Foods;