const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// route to get all users and route to create a user
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// route to get single user, update a user, and delete a user
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// route to add a new friend to user's friend list and also to delete one
router.route(':userId/friends/:friendsId')
.post(addFriend)
.delete(deleteFriend);