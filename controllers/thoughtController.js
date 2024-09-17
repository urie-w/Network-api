const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thougts))
        .catch((err) => res.status(500).json(err));
    },

    //Get single thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Create a new thought
    
}