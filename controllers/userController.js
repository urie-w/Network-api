const { User, Thought } = require('../models');

module.exports = {
// Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Gets single user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
)
.catch((err) => res.status(500).json(err));
    },

    // Update single user by id
updateUser(req,res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
    .then((user) => 
    !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
)
.catch((err) => res.status(500).json(err));
},

// Creates new user
createUser(res,res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
},

// Deletes user by id
deleteUser(req,res) { 
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) => 
    !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : Thought.deleteMany({ _id: { $in: user.thoughts } })
)
.then(() => res.json({ message: 'User and associated thoughts deleted!' }))
.catch((err) => res.status(500).json(err) );
},

// Add a friend to friend list
addFriend(req,res) {
User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
)
.then((user) =>
    !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
)
.catch((err) => res.status(500).json(err));
},

// Remove a friend from friend list
removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
    )
    .then((user) =>
    !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
)
.catch((err) => res.status(500).json(err));
},
};