// Require express router
const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts <GET>
router.route("/").get(getThoughts);

// /api/thoughts/:id <GET, PUT, DELETE>
router
  .route("/:id")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:userId <POST>
router.route("/:userId").post(createThought);

// /api/thoughts/:thoughtId/reactions <POST>
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactionId <DELETE>
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// Export module router
module.exports = router;
