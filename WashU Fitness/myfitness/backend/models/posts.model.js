const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postsSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
   post:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    }
});

const Posts = mongoose.model('Posts', postsSchema);
module.exports = Posts;