const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
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
    createThought(req, res) {
      Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
            {_id: req.body.userId},
            {$addToSet: {thoughts: thought._id}},
            {new: true}
        );
    })
    .then((user) =>
        !user
            ? res.status(404).json({
                message: 'Thought created, but found no user with that ID',
            })
            : res.json('Created the thought')
    )
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
    },

    //Update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    //Delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )
        )
        .then((user) =>
        !user
            ? res.status(404).json({
                message: 'Thought deleted but no user with this id!',
            })
            : res.json({ message: 'Thought successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },

// Add reaction to thought.
addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
    .then((thought) => 
    !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
)
.catch((err) => res.status(500).json(err));
},

// Remove reaction from thought.
removeReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    )
    .then((thought) =>
    !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
)
.catch((err) => res.status(500).json(err));
},
};