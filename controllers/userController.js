const User = require('../models/User');

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
        User.findOneAndUpdate({_id: req.params.userId})
        .select('-__v')
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
      },
      deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .select('-__v')
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
      },
      deleteFriend(req, res) {
        User.findOneAndDelete({id_: req.params.userId, friends: req.params.friendsId})
        .select('-__v')
        .then((user)=> 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(user.friends)
        )
        .catch((err) => res.status(500).json(err));
      },
      addFriend(req, res) {
        User.create({id_: req.params.userId, friends: req.params.friendsId})
        .select('-__v')
        .then((user)=> 
        !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(user.friends)
        )
        .catch((err) => res.status(500).json(err));
      },
}