const router = require('express').Router();
const{ 
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../controllers/userController');

router.route('/')
.get(getUser)
.post(createUser);

router.route('/')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

module.exports = router;