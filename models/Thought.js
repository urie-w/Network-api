const {  Schema, model } = require('mongoose');

// Define reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleDateString(),
    },
},
{
    toJSON: {
        getters: true,
    },
    id: false,
});

// Define thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleDateString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
        virtual: true,
        getters: true,
    },
    id: false,
});

//Create virtual property that gets the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;