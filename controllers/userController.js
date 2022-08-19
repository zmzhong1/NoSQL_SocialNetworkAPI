const { Users } = require("../models");

// Set up User Controller
const userController = {
  // Get all User
  getUsers(req, res) {
    Users.find({})
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
  // Get a single user by its _id
  getSingleUser({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(userData)
      )
      .catch((err) => res.status(400).json(err));
  },
  // Create new User
  createUser({ body }, res) {
    Users.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
  // Update a user its _id
  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with that ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Delete a user by its _id
  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
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
    Users.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
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
    Users.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
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
