const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// route to get all thoughts and route to create a thought
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// route to get single thought, update a thought, and delete a thought
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// route to create a new reaction and delete an existing one
router.route(':thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction);

module.exports = router;