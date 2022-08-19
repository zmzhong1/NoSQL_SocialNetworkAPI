const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users <GET, POST>
router.route("/").get(getUsers).post(createUser);

// /api/users/:id <GET, PUT, DELETE>
router.route("/:id").get(getSingleUser).put(updateUsers).delete(deleteUsers);

// /api/users/:userId/friends/:friendId <POST, DELETE>
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

// Module export router
module.exports = router;
