const { Thought, User } = require("../models");

const thoughtController = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find({})
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(400).json(err));
  },
  // Get a single thought by its _id
  getSingleThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(400).json(err));
  },
  // Create new thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Incorrect thought data!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Update a thought by it's _id
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { body },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this ID!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete a thought by it's _id
  deleteThought({ params }, res) {
    Thought.findByIdAndDelete({ _id: params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this ID!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // create new reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Incorrect reaction data!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Incorrect reaction data!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
