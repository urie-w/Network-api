const router = require('express').Router();
const{ 
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// Route for api/users
router.route('/')
.get(getUsers)
.post(createUser);

// Routes for api/users/ :userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

// Route for friends
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;