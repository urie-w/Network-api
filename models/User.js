const { Schema, model } = require('mongoose');

//User scheme
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtual: true,
    },
    id: false,
});

// Gets user's friend count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Creates User model
const User = model('User', userSchema);

module.exports = User;