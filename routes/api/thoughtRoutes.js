const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/userController');

// /api/thoughts
router
  .route('/thoughts')
  .get(getThoughts)
  .post(createThought);

// /api/:thoughtId
router
  .route('/:userId')
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

// /api/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction)

module.exports = router;