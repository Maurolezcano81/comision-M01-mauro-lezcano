const mongoose = require('mongoose');
const { ObjectId } = mongoose;

const postSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    autor: {
        type: ObjectId,
        ref: 'User',
    },
    comments:
        [{
            type: ObjectId,
            ref: 'Comment',
        }],
    imageUrl: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);