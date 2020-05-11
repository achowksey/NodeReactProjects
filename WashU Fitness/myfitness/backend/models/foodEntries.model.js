const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodEntriesSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    foodName:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    }
});

const FoodEntries = mongoose.model('FoodEntries', foodEntriesSchema);
module.exports = FoodEntries;