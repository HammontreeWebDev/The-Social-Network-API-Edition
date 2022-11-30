const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then((dbThoughtData) => {
                res.json(dbThoughtData)
            })
            .catch((err) => {
                console.error(new Error);
                res.status(500).json(err)
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
        )
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'The requested thought was deleted but there was no associated user ID found' })
                }
                else {
                    res.status(200).json({ message: 'Thought successfully deleted!' })
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
        )
            .then((dbReactionData) =>
                !dbReactionData
                    ? res.status(404).json({ message: 'Unable to add a reaction to a thought that does not exist!' })
                    : res.status(200).json({message: "reaction successfully added"})
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: {reactions: { reactionId: req.body.reactionId}}}
        )
          .then((dbThoughtData) =>
            !dbThoughtData
              ? res.status(404).json({ message: 'Unable to locate this specific thought... Try again!' })
              : res.status(200).json({message: "reaction successfully deleted"})
          )
          .catch((err) => res.status(500).json(err));
      },
    }