const router = require("express").Router();
const {
  getComments,
  getSingleComment,
  createComment,
} = require("../../controllers/commentController");

// /api/comments
// router.route("/").get(getComments).post(createComment);
// router.route("/").post(createComment).get(getComments);
router.route("/").post(createComment);
// router.route("/").get(getComments);

// router.route("/").get(getComments);

// /api/comments/:commentId
router.route("/:commentId").get(getSingleComment);

router.route("/all-comment", (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Comment.find({}, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json(result);
  });
});

module.exports = router;
