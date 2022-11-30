const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      },
      updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, req.body)
        .select('-__v')
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json({ message: 'User successfully updated'}, user)
        )
        .catch((err) => res.status(500).json(err));
      },
      deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .select('-__v')
        .then((deletedUser) => 
        // tap into the Thought model and delete all thoughts that belong to the user to free up db space using the deleteMany method in conjuction with the mongoose operator $in
        !deletedUser
        ? res.status(404).json({ message: 'No user with that ID'})
        : Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })
        )
        .then((deletedUser) => 
        !deletedUser
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json({ message: 'User successfully deleted'})
        )
        .catch((err) => res.status(500).json(err));
      },
      deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {$pull: {friends: req.params.friendsId}},
        )
        .select('-__v')
        .then((user)=> 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json({ message: 'Friend successfully deleted'})
        )
        .catch((err) => res.status(500).json(err));
      },
      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {$addToSet: {friends: req.params.friendsId}},
          )
        .select('-__v')
        .then((user)=> 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json({ message: 'Friend successfully added'})
        )
        .catch((err) => res.status(500).json(err));
      },
}