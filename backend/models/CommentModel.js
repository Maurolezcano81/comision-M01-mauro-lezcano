const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    autor :{
        type: ObjectId,
        ref: "User",
    },
    description:{
        type: String,
    }
});


module.exports = mongoose.model('Comment', commentSchema);