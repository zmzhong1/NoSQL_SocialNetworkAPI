const { User } = require("../models");

// Set up User Controller
const userController = {
  // Get all User
  getUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
  // Get a single user by its _id
  getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(userData)
      )
      .catch((err) => res.status(400).json(err));
  },
  // Create new User
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
  // Update a user its _id
  updateUsers({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with that ID" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Delete a user by its _id
  deleteUsers({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with that ID" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Add a new friend to user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with that ID" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Delete a friend from user's friend list
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )

      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with that ID" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

// Export module user controller
module.exports = userController;
